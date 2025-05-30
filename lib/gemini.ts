import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateSummaryWithCompletion(pdfText: string) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-002", generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1500,
            }
        });

        const prompt = {
            contents: [
                {
                    role: 'user',
                    parts: [{
                        text: SUMMARY_SYSTEM_PROMPT
                    },{text:`Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`}
                    ]
                }
            ]
        };

        const result = await model.generateContent(prompt);

        const response = await result.response;
        if(!response.text()){
            throw new Error('Empty response from Gemini Api');
        }
        return response.text();
    } catch (error: any) {
        if (error?.response?.status === 429 || error?.code === 429) {
            throw new Error("RATE_LIMIT_EXCEEDED");
        }

        console.error("Gemini API Error:", error);
        throw error;
    }
}
