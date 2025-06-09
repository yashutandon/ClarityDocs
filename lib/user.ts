import { getDbConnection } from "./db";

export async function getPriceId(email: string) {
  const sql = await getDbConnection();

  const query = await sql`
    SELECT price_id FROM users WHERE LOWER(email) = LOWER(${email}) AND status = 'active'
  `;

  console.log("📦 DB result for", email, "=>", query);
  return query?.[0]?.price_id || null;
}
