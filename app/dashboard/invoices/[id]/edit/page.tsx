import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
   if (!invoice) {
    notFound();
  }

  return (
    <main className="p-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          { label: 'Edit', href: `/dashboard/invoices/${id}/edit` },
        ]}
      />

      <h1 className="text-2xl font-bold mb-6">Edit Invoice</h1>

      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}
