// app/lib/data.ts

// --- Sample revenue data (used for your Revenue Chart) ---
export async function fetchRevenue() {
  // temporary data for testing chart
  return [
    { month: 'January', revenue: 12000 },
    { month: 'February', revenue: 8000 },
    { month: 'March', revenue: 14000 },
    { month: 'April', revenue: 9000 },
    { month: 'May', revenue: 16000 },
  ];
}

// --- Sample invoice data (used for your Invoices Table) ---
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  // Simulate a short delay (like a real database fetch)
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Temporary mock data for testing
  const invoices = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      amount: 1200,
      date: '2025-10-10',
      status: 'paid',
      image_url: '/default-avatar.png',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      amount: 800,
      date: '2025-10-11',
      status: 'pending',
      image_url: '/default-avatar.png',
    },
    {
      id: 3,
      name: 'Michael Reyes',
      email: 'michael@example.com',
      amount: 1500,
      date: '2025-10-12',
      status: 'paid',
      image_url: '/default-avatar.png',
    },
    {
      id: 4,
      name: 'Angela Cruz',
      email: 'angela@example.com',
      amount: 950,
      date: '2025-10-13',
      status: 'unpaid',
      image_url: '/default-avatar.png',
    },
  ];

  // Simple search filter (simulates "WHERE name LIKE %query%")
  const filtered = invoices.filter((invoice) =>
    invoice.name.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination simulation (5 per page for example)
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return paginated;
}
