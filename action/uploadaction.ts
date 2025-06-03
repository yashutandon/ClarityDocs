'use server'

import { FetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryfromOpenAI } from "@/lib/openAi";
import { generateSummaryWithCompletion } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";

import { formFileNameAsTitle } from "@/utils/format";
import { revalidatePath } from "next/cache";

interface PdfsSummaryType {
    userId?: string, fileUrl: string, summary: string, title: string, fileName: string
}

export async function generatePdfSummary(uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            ufsUrl: string;
            name: string;
        }
    }
}]) {
    if (!uploadResponse) {
        return {
            success: false,
            message: 'file upload failed',
            data: null,
        }
    }
    const { serverData: { userId, file: { ufsUrl: ufsUrl, name: fileName } } } = uploadResponse[0];

    if (!ufsUrl) {
        return {
            success: false,
            message: 'file  upload failed',
            data: null,
        }
    }

    try {
        const pdfText = await FetchAndExtractPdfText(ufsUrl)
        console.log({ pdfText });
        let summary;
        try {
            summary = await generateSummaryWithCompletion(pdfText);
            console.log({ summary });
        } catch (error) {
            console.log(error);
            //call gemini
            if (error instanceof Error && error.message === 'Rate limit exceeded') {
                try {
                    summary = await generateSummaryfromOpenAI(pdfText);
                    console.log({ summary });
                } catch (openaiError) {
                    console.error('Open API failed after GeminiAi quota exceeded', openaiError);

                }
                throw new Error('Failed to generate summary with available AI providers')
            }
        }

        if (!summary) {
            return {
                success: false,
                message: 'failed to generate summary',
                data: null,
            };
        }
        const fomattedfilename = formFileNameAsTitle(fileName);
        return {
            success: true,
            message: 'summary generated',
            data: {
                summary: summary,
                title: fileName,
                fileufsUrl:ufsUrl,
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'file upload failed',
            data: null,
        }
    }
}

async function savepdfsummary({ userId, fileUrl, summary, title, fileName }: PdfsSummaryType) {
    try {
        const sql = await getDbConnection();
       const [savesummary]= await sql`INSERT INTO pdf_summaries(
    user_id, original_text, 
    summary_text, title, file_name)
     VALUES (
    ${userId}, 
    ${fileUrl}, 
    ${summary},
    ${title},
    ${fileName}
  )RETURNING id,summary_text;`;
  return savesummary;
    } catch (error) {
        console.error('Error saving PDF summary', error);
        throw error;
    }
}

export async function storePdfSummaryAction({ fileUrl, summary, title, fileName }: PdfsSummaryType) {
    let savedsummary: any;
    try {
        const { userId } = await auth();
        if (!userId) {
            return {
                success: false,
                message: 'User not found',

            }
        }
        savedsummary = await savepdfsummary({ userId, fileUrl, summary, title, fileName });

        if (!savedsummary) {
            return {
                success: false,
                message: 'failed to save summary',
            }
        }
        
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Error saving PDF summary',

        }
    }

    revalidatePath(`/summaries/${savedsummary.id}`);
    return {
            success: true,
            message: 'PDF summary saved',
            data:{
                id:savedsummary.id,
            }
        }
}