'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Validate form data properly
const FormSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().uuid({ message: 'Invalid customer UUID' }),
  amount: z.coerce.number().positive({ message: 'Amount must be positive' }),
  status: z.enum(['pending', 'paid']),
  date: z.string().optional(),
});

// Omit id and date for creation
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // Parse and validate form data
  const parsed = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!parsed.success) {
    console.error('Validation failed', parsed.error.flatten());
    throw new Error('Invalid form data');
  }

  const { customerId, amount, status } = parsed.data;

  // Convert amount to cents
  const amountInCents = Math.round(amount * 100);

  // Get current date
  const date = new Date().toISOString().split('T')[0];

  // Insert safely into DB
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}::uuid, ${amountInCents}, ${status}, ${date})
  `;

  // Revalidate invoices page and redirect
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');

  console.log('Invoice created:', { customerId, amountInCents, status, date });
}
