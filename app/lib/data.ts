import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// ----------------------
// REVENUE
// ----------------------
export async function fetchRevenue() {
  return [
    { month: 'January', revenue: 12000 },
    { month: 'February', revenue: 8000 },
    { month: 'March', revenue: 14000 },
    { month: 'April', revenue: 9000 },
    { month: 'May', revenue: 16000 },
  ];
}

// ----------------------
// LATEST INVOICES (with filtering + pagination)
// ----------------------
export async function fetchLatestInvoices(query: string, currentPage: number) {
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

// ----------------------
// MOCK CUSTOMERS
// ----------------------
const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Michael Reyes', email: 'michael@example.com' },
  { id: 4, name: 'Angela Cruz', email: 'angela@example.com' },
];

// ✅ Export fetchCustomers
export async function fetchCustomers() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return customers;
}

// ----------------------
// FETCH SINGLE INVOICE BY ID
// ----------------------
export async function fetchInvoiceById(id: number | string) {
  const invoices = await fetchLatestInvoices('', 1); // get all invoices (or adjust logic if needed)
  return invoices.find((invoice) => invoice.id.toString() === id.toString()) || null;
}

// ----------------------
// DASHBOARD CARD DATA
// ----------------------
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
    numberOfCustomers: customers.length,
  };
}

// ----------------------
// PAGE COUNT (pagination helper)
// ----------------------
export async function fetchInvoicesPages(query: string) {
  const invoices = [
    { id: 1, name: 'John Doe', email: 'john@example.com', amount: 1200, status: 'paid' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 800, status: 'pending' },
    { id: 3, name: 'Michael Reyes', email: 'michael@example.com', amount: 1500, status: 'paid' },
    { id: 4, name: 'Angela Cruz', email: 'angela@example.com', amount: 950, status: 'unpaid' },
  ];

  const filtered = invoices.filter((invoice) =>
    invoice.name.toLowerCase().includes(query.toLowerCase())
  );

  const itemsPerPage = 5;
  return Math.ceil(filtered.length / itemsPerPage);
}
