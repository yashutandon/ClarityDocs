import { getDbConnection } from "@/lib/db";

export async function getSummaries(userId:string) {
    const sql= await getDbConnection();
    const summmaries= await sql`SELECT * FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC `;
    return summmaries;
}


export async function getSummaryId(id:string){
    try {
        const sql= await getDbConnection();
        const [summmary]= await sql`SELECT 
    id,
    user_id,
    title,
    original_text,
    summary_text,
    file_name,
    status,
    created_at,
    updated_at,
    LENGTH(summary_text) - LENGTH(REPLACE(summary_text,' ','')) + 1 as word_count FROM pdf_summaries WHERE id = ${id} ORDER BY created_at DESC `;
    return summmary;

    } catch (error) {
        console.log('Error fetching summary by id',error);
        return null;

    }
}

export async function getUserUploadCount(userId:string){
    const sql=await getDbConnection();
    try {
        const [result]=await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;
        return result?.count || 0;
    } catch (error) {
        console.error('Error fetching user upload count',error);
        return 0;
    }
}