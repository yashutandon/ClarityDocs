import { getDbConnection } from "./db";

export async function getSummaries(userId:string) {
    const sql= await getDbConnection();
    const summmaries= await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC `;
    return summmaries;
}