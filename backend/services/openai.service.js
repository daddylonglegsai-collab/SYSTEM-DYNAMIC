import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


export async function askAI(systemPrompt, userPrompt) {

    const response = await client.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ]

    });


    return response.choices[0].message.content;
}