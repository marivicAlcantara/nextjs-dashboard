'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import { updateInvoice } from '@/app/lib/actions';
import * as React from 'react';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  // FIX: message must be a string (React.useActionState requirement)
  const initialState = {
    message: '',
    errors: {},
  };

  // Bind ID → server action now matches (prevState, formData)
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  // FIX: Using React.useActionState (correct hook for React 19)
  const [state, formAction] = React.useActionState(
    updateInvoiceWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Customer selection */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue={invoice.customer_id}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm"
            >
              <option value="" disabled>Select a customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          {state.errors?.customerId && (
            <p className="text-red-600 text-sm mt-1">
              {state.errors.customerId}
            </p>
          )}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              defaultValue={(invoice.amount / 100).toFixed(2)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          {state.errors?.amount && (
            <p className="text-red-600 text-sm mt-1">{state.errors.amount}</p>
          )}
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>

          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">

              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className="h-4 w-4 cursor-pointer"
                />
                <label htmlFor="pending" className="ml-2 cursor-pointer text-gray-600">
                  Pending <ClockIcon className="h-4 w-4 inline" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className="h-4 w-4 cursor-pointer"
                />
                <label htmlFor="paid" className="ml-2 cursor-pointer text-green-600">
                  Paid <CheckIcon className="h-4 w-4 inline" />
                </label>
              </div>

            </div>
          </div>

          {state.errors?.status && (
            <p className="text-red-600 text-sm mt-1">{state.errors.status}</p>
          )}
        </fieldset>

      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          Cancel
        </Link>

        <Button type="submit">Edit Invoice</Button>
      </div>

      {/* Server error message */}
      {state.message && (
        <p className="text-red-600 mt-3">{state.message}</p>
      )}
    </form>
  );
}
