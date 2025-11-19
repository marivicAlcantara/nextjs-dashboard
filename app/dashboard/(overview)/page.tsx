// app/dashboard/page.tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from '@/app/lib/data';
import { Suspense } from 'react';
import CardWrapper from '@/app/ui/dashboard/cards';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton} from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/font';

export default async function Page() {
  const latestInvoices = await fetchLatestInvoices('', 1); // make sure query and page are passed
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  const revenueData = await fetchRevenue(); // fetch revenue data

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* Revenue Chart + Latest Invoices */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 p-4 bg-white rounded-lg shadow">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart revenue={revenueData} />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={latestInvoices} />

        </Suspense>
         <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
    </main>
  );
}
