// app/dashboard/page.tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { Lusitana } from 'next/font/google';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';

// ✅ Force dynamic rendering (SSR every request)
export const dynamic = 'force-dynamic';

const lusitana = Lusitana({ subsets: ['latin'], weight: '400' });

export default async function Page() {
  // ✅ Data fetched on each request
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices('', 1);
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData();

  return (
    <main className="p-6">
      <h1 className={`${lusitana.className} mb-6 text-2xl font-bold`}>
        Dashboard
      </h1>

      {/* --- Dashboard Summary Cards --- */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      </div>

      {/* --- Charts & Latest Invoices --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={[]} />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>

      <p className="mt-8 text-sm text-gray-500">
        🔄 This dashboard is dynamically rendered on every request.
      </p>
    </main>
  );
}
