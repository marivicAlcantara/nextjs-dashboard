// app/lib/data.ts

// --- PostgreSQL import and connection setup ---
import postgres from 'postgres';

// Use your database URL from environment variables
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// --- Sample revenue data (used for your Revenue Chart) ---
export async function fetchRevenue() {
   console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('Data fetch completed after 3 seconds.');
  return [
    { month: 'January', revenue: 12000 },
    { month: 'February', revenue: 8000 },
    { month: 'March', revenue: 14000 },
    { month: 'April', revenue: 9000 },
    { month: 'May', revenue: 16000 },
  ];
}
// --- Returns total number of pages based on query ---
export async function fetchInvoicesPages(query: string, itemsPerPage = 5) {
  // Simulate async fetch
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Example invoice dataset (should match fetchLatestInvoices)
  const invoices = [
    { id: 1, name: 'John Doe', email: 'john@example.com', amount: 1200 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 800 },
    { id: 3, name: 'Michael Reyes', email: 'michael@example.com', amount: 1500 },
    { id: 4, name: 'Angela Cruz', email: 'angela@example.com', amount: 950 },
  ];

  // Filter by query
  const filtered = invoices.filter((invoice) =>
    invoice.name.toLowerCase().includes(query.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  return totalPages;
}



// --- Sample invoice data (used for your Invoices Table) ---
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
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return paginated;
}

// --- Mock customer data ---
const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Michael Reyes', email: 'michael@example.com' },
  { id: 4, name: 'Angela Cruz', email: 'angela@example.com' },
];

// --- Dashboard Card Data ---
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

  const numberOfInvoices = invoices.length;
  const numberOfCustomers = customers.length;

  return {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  };
}
