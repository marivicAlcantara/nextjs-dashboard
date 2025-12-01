'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ----------------------
// Zod Schema (Invoices)
// ----------------------
const FormSchema = z.object({
  id: z.string().optional(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Amount must be greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select a status.',
  }),
  date: z.string().optional(),
});

// CreateInvoice removes fields not used during creation
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// Type for useActionState
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

// ----------------------
// AUTHENTICATE USER
// ----------------------
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const redirectTo = formData.get('redirectTo') as string;

  try {
    const user = await sql`
      SELECT * FROM users
      WHERE email = ${email}
      AND password = ${password}
    `;

    if (user.length === 0) {
      return 'Invalid email or password.';
    }

    // successful login
    redirect(redirectTo || '/dashboard');
  } catch (error) {
    return 'Authentication failed.';
  }
}

// ----------------------
// DELETE INVOICE
// ----------------------
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    throw new Error('Failed to Delete Invoice');
  }
}

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

  // If validation fails, return errors
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

  // redirect must NOT be inside try/catch
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
