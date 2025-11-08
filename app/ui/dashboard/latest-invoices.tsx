'use client';

import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices({ latestInvoices }: { latestInvoices: any[] }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">Latest Invoices</h2>
      <ul className="divide-y divide-gray-200">
        {latestInvoices.slice(0, 5).map((invoice) => (
          <li key={invoice.id} className="py-2 flex justify-between">
            <div>
              <p className="font-medium">{invoice.name}</p>
              <p className="text-sm text-gray-500">{invoice.email}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₱{invoice.amount}</p>
              <p
                className={`text-sm ${
                  invoice.status === 'paid'
                    ? 'text-green-600'
                    : invoice.status === 'pending'
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}
              >
                {invoice.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
