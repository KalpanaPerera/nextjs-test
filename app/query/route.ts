import postgres from 'postgres';

if (!process.env.POSTGRES_URL) throw new Error('POSTGRES_URL is not set');
const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

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
    const data = await listInvoices();
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
