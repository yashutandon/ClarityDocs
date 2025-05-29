'use server'

import { FetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryfromOpenAI } from "@/lib/openAi";

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
            summary = await generateSummaryfromOpenAI(pdfText);
            console.log({ summary });
        } catch (error) {
            console.log(error);
            //call gemini
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