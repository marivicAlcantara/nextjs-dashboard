import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';

interface PageProps {
  params: { id: string };
}

export default async function EditInvoicePage({ params }: PageProps) {
  const { id } = params;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),   // returns invoice object from DB
    fetchCustomers(),       // returns customers list
  ]);

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
