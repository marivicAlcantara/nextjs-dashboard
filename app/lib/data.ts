// app/lib/data.ts

import postgres from 'postgres';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* ----------------------------------------
   FETCH CUSTOMERS
---------------------------------------- */
export async function fetchCustomers() {
  const customers = await sql`
    SELECT id, name
    FROM customers
    ORDER BY name ASC
  `;

  return customers;
}

/* ----------------------------------------
   FETCH SINGLE INVOICE BY ID (FOR EDIT PAGE)
---------------------------------------- */
export async function fetchInvoiceById(id: string) {
  const invoice = await sql`
    SELECT id, customer_id, amount, status, date
    FROM invoices
    WHERE id = ${id}::uuid
    LIMIT 1
  `;

  return invoice[0] || null;
}

/* ----------------------------------------
   FETCH LATEST INVOICES (LIST ON INVOICES PAGE)
---------------------------------------- */
export async function fetchLatestInvoices(query: string = '', page: number = 1, itemsPerPage = 5) {
  const offset = (page - 1) * itemsPerPage;

  const invoices = await sql`
    SELECT 
      invoices.id,
      invoices.amount,
      invoices.status,
      invoices.date,
      customers.name,
      customers.email,
      '/default-avatar.png' AS image_url
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE customers.name ILIKE ${'%' + query + '%'}
    ORDER BY invoices.date DESC
    LIMIT ${itemsPerPage} OFFSET ${offset}
  `;

  return invoices;
}

/* ----------------------------------------
   PAGINATION: COUNT INVOICES
---------------------------------------- */
export async function fetchInvoicesPages(query: string = '', itemsPerPage = 5) {
  const count = await sql`
    SELECT COUNT(*) 
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE customers.name ILIKE ${'%' + query + '%'}
  `;

  const total = Number(count[0].count);
  return Math.ceil(total / itemsPerPage);
}

/* ----------------------------------------
   DASHBOARD CARDS (SUMMARY STATISTICS)
---------------------------------------- */
export async function fetchCardData() {
  const totals = await sql`
    SELECT
      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS total_paid,
      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS total_pending,
      COUNT(*) AS total_invoices
    FROM invoices
  `;

  const customers = await sql`
    SELECT COUNT(*) FROM customers
  `;

  return {
    totalPaidInvoices: Number(totals[0].total_paid || 0),
    totalPendingInvoices: Number(totals[0].total_pending || 0),
    numberOfInvoices: Number(totals[0].total_invoices),
    numberOfCustomers: Number(customers[0].count),
  };
}

/* ----------------------------------------
   REVENUE CHART DATA (MONTHLY TOTALS)
---------------------------------------- */
export async function fetchRevenue() {
  const revenue = await sql`
    SELECT 
      TO_CHAR(date, 'Month') AS month,
      SUM(amount) AS revenue
    FROM invoices
    WHERE status = 'paid'
    GROUP BY month, DATE_TRUNC('month', date)
    ORDER BY DATE_TRUNC('month', date)
  `;

  return revenue.map(r => ({
    month: r.month.trim(),
    revenue: Number(r.revenue),
  }));
}
