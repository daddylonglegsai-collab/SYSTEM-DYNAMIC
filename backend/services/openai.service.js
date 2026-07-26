import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * ✅ FIXED:
 * - Changed model from "gpt-4.1-mini" (invalid) to "gpt-4o-mini" (valid)
 * - Added error logging
 * - Validates API key on startup
 * - Handles language parameter properly
 */
export async function askAI(systemPrompt, userPrompt, language = 'en') {
    try {
        // Validate inputs
        if (!systemPrompt || !userPrompt) {
            throw new Error('System prompt and user prompt are required');
        }

        // Inject language instruction into system prompt
        const languageInstruction = language === 'fa' 
            ? "\n\n[LANGUAGE RULE] تمام پاسخ باید فقط به فارسی باشد. تحلیل‌ها، KPI‌ها، ریسک‌ها، پیشنهادها و نتیجه‌گیری باید فارسی باشند."
            : "\n\n[LANGUAGE RULE] Answer only in English.";
        
        const enhancedSystemPrompt = systemPrompt + languageInstruction;

        // Call OpenAI API with VALID model
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini", // ✅ FIXED: Was "gpt-4.1-mini"
            messages: [
                {
                    role: "system",
                    content: enhancedSystemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        });

        if (!response.choices || !response.choices[0] || !response.choices[0].message) {
            throw new Error('Invalid response structure from OpenAI API');
        }

        return response.choices[0].message.content;

    } catch (error) {
        // ✅ FIXED: Better error logging
        console.error('❌ OpenAI API Error:', {
            message: error.message,
            status: error.status,
            type: error.type,
            timestamp: new Date().toISOString()
        });

        // Re-throw with more context
        throw new Error(`OpenAI Service Error: ${error.message}`);
    }
}

// ✅ Validate API key on startup
export function validateAPIKey() {
    if (!process.env.OPENAI_API_KEY) {
        console.error('❌ CRITICAL: OPENAI_API_KEY environment variable is not set');
        process.exit(1);
    }
    console.log('✅ OpenAI API key validated');
}
