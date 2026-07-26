import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function askAI(systemPrompt, userPrompt, language = "fa") {
  try {
    if (!systemPrompt) {
      throw new Error("System prompt is required");
    }

    if (!userPrompt) {
      throw new Error("User prompt is required");
    }

    const languageInstruction =
      language === "fa"
        ? `
پاسخ فقط به زبان فارسی باشد.
از متن انگلیسی استفاده نکن.
تمام تحلیل‌ها، KPIها، ریسک‌ها و پیشنهادها فارسی باشند.
`
        : `
Answer only in English.
Do not generate Persian text.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `${systemPrompt}\n${languageInstruction}`
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.5,
      max_tokens: 2000
    });

    if (!response?.choices?.[0]?.message?.content) {
      throw new Error("Invalid OpenAI response");
    }

    return response.choices[0].message.content;

  } catch (error) {
    console.error("OPENAI ERROR:", error.message);

    throw new Error(
      `OpenAI Service Error: ${error.message}`
    );
  }
}

export function validateAPIKey() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is missing");
    process.exit(1);
  }

  console.log("OpenAI API Key loaded");
}
