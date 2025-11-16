'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// --- Zod schema with safe coercion ---
const FormSchema = z.object({
  id: z.string().optional(),
  customerId: z
    .string()
    .nonempty('Customer is required')
    .transform((val) => Number(val)), // convert to number for SQL
  amount: z
    .any() // allow string/number input
    .refine((val) => val !== null && val !== undefined && val !== '', 'Amount is required')
    .transform((val) => Number(val) * 100), // convert to cents
  status: z.enum(['pending', 'paid'], { required_error: 'Status is required' }),
  date: z.string().optional(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  try {
    // --- Convert FormData to object ---
    const rawData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    };

    console.log('RAW FORM DATA:', rawData);

    // --- Parse & validate form data ---
    const parsed = CreateInvoice.parse(rawData);

    // --- Use parsed values ---
    const { customerId, amount, status } = parsed;
    const date = new Date().toISOString().split('T')[0];

    console.log('PARSED DATA:', { customerId, amount, status, date });

    // --- Insert into database ---
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amount}, ${status}, ${date})
    `;

    // --- Revalidate cache and redirect ---
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  } catch (err) {
    console.error('❌ CREATE INVOICE ERROR:', err);
    throw err;
  }
}
