// app/lib/data.ts

import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* ----------------------------------------
   FETCH REAL CUSTOMERS (UUID IDs)
---------------------------------------- */
export async function fetchCustomers() {
  const customers = await sql`
    SELECT id, name
    FROM customers
    ORDER BY name ASC
  `;

  return customers.map((c: any) => ({
    id: c.id,      // UUID – required by your form
    name: c.name,
  }));
}

/* ----------------------------------------
   MOCK REVENUE (OK TO KEEP)
---------------------------------------- */
export async function fetchRevenue() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    { month: 'January', revenue: 12000 },
    { month: 'February', revenue: 8000 },
    { month: 'March', revenue: 14000 },
    { month: 'April', revenue: 9000 },
    { month: 'May', revenue: 16000 },
  ];
}

/* ----------------------------------------
   MOCK PAGINATION FOR DEMO
---------------------------------------- */
export async function fetchInvoicesPages(query: string = '', itemsPerPage = 5) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Mock data still OK
  const invoices = [
    { id: 1, name: 'John Doe', amount: 1200 },
    { id: 2, name: 'Jane Smith', amount: 800 },
    { id: 3, name: 'Michael Reyes', amount: 1500 },
    { id: 4, name: 'Angela Cruz', amount: 950 },
  ];

  const filtered = invoices.filter((invoice) =>
    invoice.name.toLowerCase().includes(query.toLowerCase())
  );

  return Math.ceil(filtered.length / itemsPerPage);
}

/* ----------------------------------------
   MOCK INVOICES LIST (SAFE TO KEEP)
---------------------------------------- */
export async function fetchLatestInvoices(query: string = '', currentPage: number = 1) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const invoices = [
    { id: 1, name: 'John Doe', email: 'john@example.com', amount: 1200, date: '2025-10-10', status: 'paid', image_url: '/default-avatar.png' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 800, date: '2025-10-11', status: 'pending', image_url: '/default-avatar.png' },
    { id: 3, name: 'Michael Reyes', email: 'michael@example.com', amount: 1500, date: '2025-10-12', status: 'paid', image_url: '/default-avatar.png' },
    { id: 4, name: 'Angela Cruz', email: 'angela@example.com', amount: 950, date: '2025-10-13', status: 'unpaid', image_url: '/default-avatar.png' },
  ];

  const filtered = invoices.filter((invoice) =>
    invoice.name.toLowerCase().includes(query.toLowerCase())
  );

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;

  return filtered.slice(startIndex, startIndex + itemsPerPage);
}

/* ----------------------------------------
   DASHBOARD CARD DATA
---------------------------------------- */
export async function fetchCardData() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const invoices = [
    { amount: 1200, status: 'paid' },
    { amount: 800, status: 'pending' },
    { amount: 1500, status: 'paid' },
    { amount: 950, status: 'unpaid' },
  ];

  const totalPaidInvoices = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPendingInvoices = invoices
    .filter((i) => i.status === 'pending')
    .reduce((sum, i) => sum + i.amount, 0);

  return {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices: invoices.length,
    numberOfCustomers: invoices.length, // You can change this later
  };
}
