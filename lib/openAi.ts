import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";
import OpenAI from "openai";
import { toast } from "sonner";

const client = new OpenAI({
    apiKey: process.env.OpenAI_API_KEY,
});

export async function generateSummaryfromOpenAI(pdfText: string) {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: SUMMARY_SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: `Transform this document into an engaging,easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
                },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        return response.choices[0].message.content;
    } catch (error: any) {
        if (error?.status === 429) {
            throw new Error('Rate limit exceeded');
        }
        throw error;
    }
}
