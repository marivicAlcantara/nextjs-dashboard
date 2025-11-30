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
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Amount must be greater than $0.' }),
  status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select a status.' }),
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
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
// ----------------------
// CREATE INVOICE
// ----------------------
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate incoming form data
   const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

 // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  const { customerId, amount, status } = validatedFields.data;
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
