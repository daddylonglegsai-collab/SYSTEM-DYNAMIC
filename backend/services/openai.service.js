import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function askAI(systemPrompt, userPrompt, language = "en") {
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
تمام پاسخ‌ها باید فقط به زبان فارسی باشند.
هیچ متن انگلیسی تولید نکن.
تمام تحلیل‌ها، KPIها، ریسک‌ها و پیشنهادها باید فارسی باشند.
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
          content: `${systemPrompt}\n\n${languageInstruction}`
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    if (
      !response ||
      !response.choices ||
      !response.choices.length ||
      !response.choices[0].message
    ) {
      throw new Error("Invalid response received from OpenAI.");
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error("\n========== OPENAI ERROR ==========\n");

    console.error("Status:");
    console.error(error.status);

    console.error("\nMessage:");
    console.error(error.message);

    console.error("\nError Object:");
    console.error(error.error);

    console.error("\nResponse:");
    console.error(error.response?.data);

    console.error("\nComplete Error:");
    console.error(JSON.stringify(error, null, 2));

    console.error("\n==================================\n");

    throw new Error(`OpenAI Service Error: ${error.message}`);
  }
}

export function validateAPIKey() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is missing.");
    process.exit(1);
  }

  console.log("✅ OpenAI API Key loaded.");
}
