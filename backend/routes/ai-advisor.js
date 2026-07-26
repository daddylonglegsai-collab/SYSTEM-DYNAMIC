import express from "express";
import { askAI } from "../services/openai.service.js";
import { advisorPrompt } from "../prompts/advisor.system.js";
import { prepareContextForAI, getContextForAIAnalysis, getDashboardSummary } from "../services/data-provider.service.js";

const router = express.Router();

/**
 * POST /api/advisor
 * 
 * AI advisor endpoint that ALWAYS includes operational context
 * Every question must be analyzed with complete company data
 */
router.post("/", async (req, res) => {
    try {
        console.log("📊 Advisor Request:", req.body);

        // STEP 1: Get complete operational context
        console.log("🔄 Fetching operational context...");
        const contextData = await prepareContextForAI();

        if (!contextData.success) {
            throw new Error("Failed to retrieve operational context");
        }

        // STEP 2: Format user question with context
        const userQuestion = req.body.question || req.body.message || "";
        
        if (!userQuestion) {
            return res.status(400).json({
                error: "No question provided"
            });
        }

        // STEP 3: Build complete context message for AI
        const contextMessage = `
SIMOPRIME OPERATIONAL INTELLIGENCE DATA:

📊 PROJECTS:
${contextData.data.projects.projects.map(p => `
• ${p.name}:
  - Product: ${p.projects[0]?.product || 'N/A'}
  - Progress: ${p.projects[0]?.progress || 0}%
  - Status: ${p.projects[0]?.status || 'Unknown'}
  - Deadline: ${p.projects[0]?.deadline || 'N/A'}
  - Delay: ${p.projects[0]?.delayDays || 0} days
  - Priority: ${p.projects[0]?.priority || 'N/A'}
  - Risks: ${p.projects[0]?.risks?.join(", ") || "None"}
  - Budget: ${p.projects[0]?.budgetUsed || 0}/${p.projects[0]?.budget || 0}
`).join("")}

📈 PRODUCTION METRICS:
- Efficiency: ${contextData.data.production.efficiency}%
- Capacity Utilization: ${contextData.data.production.capacity}%
- Quality Rate: ${contextData.data.production.qualityRate}%
- Active Lines: ${contextData.data.production.activeLines}/4

💰 FINANCIAL STATUS:
- Total Budget Utilization: ${contextData.data.financial.financial.utilizationPercent}%
- Total Budget: ${contextData.data.financial.financial.totalBudget}
- Total Used: ${contextData.data.financial.financial.totalUsed}
- Remaining: ${contextData.data.financial.financial.remaining}

⚠️ RISKS:
${contextData.data.risks.risks.risks.map(r => `
- ${r.title}
  Severity: ${r.severity} | Probability: ${r.probability} | Impact: ${r.impact}
  Mitigation: ${r.mitigationPlan}
`).join("")}

⚙️ CAPACITY:
- Available Capacity: ${contextData.data.capacity.capacity.availableCapacity}%
- Can Accept New Project: ${contextData.data.capacity.capacity.canAcceptProject ? 'Yes' : 'No'}

👥 RESOURCES:
- Total Employees: ${contextData.data.resources.resources.totalEmployees}
- Available: ${contextData.data.resources.teamUtilization.available}
- Absenteeism: ${contextData.data.resources.resources.absenteeism}%

📦 INVENTORY:
- At Risk Parts: ${contextData.data.inventory.atRiskCount}
- Critical Alerts: ${contextData.data.inventory.atRiskParts.length}

USER QUESTION: ${userQuestion}
`;

        console.log("🤖 Sending to AI with full context...");

        // STEP 4: Ask AI with complete context
        const analysis = await askAI(advisorPrompt, contextMessage);

        // STEP 5: Return analysis
        res.json({
            success: true,
            question: userQuestion,
            analysis: analysis,
            timestamp: new Date().toISOString(),
            dataSource: "demo-operational-intelligence"
        });

    } catch (error) {
        console.error("❌ Advisor Error:", error);

        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * GET /api/advisor/dashboard
 * Get dashboard summary with all operational data
 */
router.get("/dashboard", async (req, res) => {
    try {
        const dashboardData = await getDashboardSummary();

        res.json({
            success: true,
            ...dashboardData
        });

    } catch (error) {
        console.error("❌ Dashboard Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/advisor/context
 * Get raw operational context (for debugging/visualization)
 */
router.get("/context", async (req, res) => {
    try {
        const contextData = await prepareContextForAI();

        res.json({
            success: true,
            ...contextData
        });

    } catch (error) {
        console.error("❌ Context Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
