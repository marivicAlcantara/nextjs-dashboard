import postgres from 'postgres';

// Ensure POSTGRES_URL exists
const url = process.env.POSTGRES_URL;
if (!url) {
  throw new Error("POSTGRES_URL environment variable is missing.");
}

// Initialize the client
const sql = postgres(url, {
  ssl: {
    rejectUnauthorized: false,
  },
});

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  try {
    const result = await listInvoices();
    return Response.json(result);
  } catch (error) {
    console.error("Query error:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
