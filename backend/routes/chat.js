import express from "express";
import { askAI } from "../services/openai.service.js";
import { prepareContextForAI } from "../services/data-provider.service.js";

const router = express.Router();

/**
 * POST /api/chat
 * 
 * Chat endpoint with full company operational context
 * Every response includes relevant operational data
 */
router.post("/", async (req, res) => {
    try {
        console.log("💬 Chat Request:", req.body);

        // Get user message
        const userMessage = req.body.message || req.body.data || "";
        
        if (!userMessage) {
            return res.status(400).json({
                error: "No message provided"
            });
        }

        // STEP 1: Get complete operational context
        console.log("🔄 Loading operational context...");
        const contextData = await prepareContextForAI();

        if (!contextData.success) {
            throw new Error("Failed to retrieve operational context");
        }

        // STEP 2: Create system prompt with context awareness
        const systemPrompt = `You are Simorgh AI Executive Decision Advisor.

You are an expert in:
- Industrial manufacturing and electrical switchgear production
- Production planning and project management
- Supply chain and procurement
- KPI analysis and performance optimization
- Financial and risk analysis

CURRENT COMPANY OPERATIONAL DATA:
${JSON.stringify(contextData.data, null, 2)}

RULES:
1. Respond ONLY IN PERSIAN (فارسی) unless user explicitly requests English
2. Use formal business Persian
3. Always reference actual company data in your analysis
4. Provide specific, data-driven recommendations
5. Structure responses with:
   - وضعیت فعلی (Current Status)
   - تحلیل (Analysis)
   - ریسک‌ها (Risks)
   - توصیه‌ها (Recommendations)
   - تصمیم (Decision)

Analyze as a senior factory consultant with 20+ years experience.
Never give generic answers - always use the provided company data.`;

        // STEP 3: Ask AI with context
        console.log("🤖 Processing with context...");
        const answer = await askAI(systemPrompt, userMessage);

        // STEP 4: Return response
        console.log("✅ Response generated");

        res.json({
            success: true,
            message: userMessage,
            answer: answer,
            timestamp: new Date().toISOString(),
            language: "Persian",
            dataSource: "demo-operational-intelligence"
        });

    } catch (error) {
        console.error("❌ Chat Error:", error);

        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

export default router;
