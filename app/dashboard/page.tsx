import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { Lusitana } from 'next/font/google';
import { fetchRevenue, fetchFilteredInvoices } from '@/app/lib/data';

const lusitana = Lusitana({ subsets: ['latin'], weight: '400' });

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchFilteredInvoices('', 1); // show first page invoices

  return (
    <main className="p-6">
      <h1 className={`${lusitana.className} mb-6 text-2xl font-bold`}>
        Dashboard
      </h1>

      {/* Metric cards section (optional for future data) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
      </div>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
