'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(), // should be UUID
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // Parse and validate form data
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // Make sure customerId is a string (UUID)
  const customerUUID = String(customerId);

  // Convert amount to cents
  const amountInCents = Math.round(amount * 100);

  // Get current date in YYYY-MM-DD format
  const date = new Date().toISOString().split('T')[0];

  // Insert into DB safely
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerUUID}::uuid, ${amountInCents}, ${status}, ${date})
  `;

  // Revalidate invoices page and redirect
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');

  console.log('Invoice created:', { customerUUID, amountInCents, status, date });
}
