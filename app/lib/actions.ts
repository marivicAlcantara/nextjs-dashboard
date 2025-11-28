'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ----------------------
// Zod Schema
// ----------------------
const FormSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().uuid({ message: 'Invalid customer UUID' }),
  amount: z.coerce.number().positive({ message: 'Amount must be positive' }),
  status: z.enum(['pending', 'paid']),
  date: z.string().optional(),
});

// Remove ID + date for creation
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// ----------------------
// DELETE INVOICE
// ----------------------
export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

// ----------------------
// CREATE INVOICE
// ----------------------
export async function createInvoice(formData: FormData) {
  // Validate incoming form data
  const parsed = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!parsed.success) {
    console.error('Validation failed:', parsed.error.flatten());
    return { message: 'Invalid form data.' };
  }

  const { customerId, amount, status } = parsed.data;
  const amountInCents = Math.round(amount * 100);
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}::uuid, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.error('DATABASE ERROR:', error);
    return { message: 'Database Error: Failed to Create Invoice.' };
  }

  // redirect MUST be outside try/catch
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
