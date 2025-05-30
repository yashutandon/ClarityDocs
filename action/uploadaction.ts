'use server'

import { FetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryfromOpenAI } from "@/lib/openAi";
import { generateSummaryWithCompletion } from "@/lib/gemini";

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
            if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED'){
                try {
                    summary=await generateSummaryWithCompletion(pdfText);
                } catch (geminiError) {
                    console.error('Gemini API failed after OpenAi quota exceeded',geminiError);

                }
                throw new Error('Failed to generate summary with available AI providers')
            }
        }

        if (!summary) {
            return {
                success: false,
                message: 'failed to generate summary',
                data: null,
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