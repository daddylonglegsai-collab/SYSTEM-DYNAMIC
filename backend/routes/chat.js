import express from "express";
import { askAI } from "../services/openai.service.js";

const router = express.Router();


router.post("/", async (req, res) => {

    try {

        console.log("📩 Incoming data:", req.body);


        const systemPrompt = `
You are Simorgh AI Executive Decision Advisor.

You are an expert in:
- Industrial manufacturing
- Electrical switchgear factories
- Production planning
- Project risk management
- KPI analysis

Analyze data like a senior factory consultant.

Respond in Persian unless user asks English.

Provide:
1. Executive Summary
2. Critical Risks
3. Root Causes
4. Recommended Actions
5. Management Decision
`;


        const userData = JSON.stringify(
            req.body.data || req.body.message,
            null,
            2
        );


        const answer = await askAI(
            systemPrompt,
            userData
        );


        console.log("🤖 AI Answer:", answer);


        res.json({
            answer
        });


    } catch(error){

        console.error(error);

        res.status(500).json({
            error:error.message
        });

    }

});


export default router;