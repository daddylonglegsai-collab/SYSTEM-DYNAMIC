import express from "express";
import { askAI } from "../services/openai.service.js";
import { advisorPrompt } from "../prompts/advisor.system.js";
import {
    prepareContextForAI,
    getDashboardSummary
} from "../services/data-provider.service.js";

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        console.log("📊 Advisor Request:", req.body);

        console.log("🔄 Fetching operational context...");

        const contextData = await prepareContextForAI();

        console.log("✅ Context Loaded");

        if (!contextData.success) {
            throw new Error("Failed to retrieve operational context");
        }

        // پشتیبانی از هر سه حالت
        const userQuestion =
            req.body.question ||
            req.body.message ||
            req.body.context ||
            "";

        if (!userQuestion) {
            return res.status(400).json({
                success: false,
                error: "No question provided"
            });
        }

        const language = req.body.language || "fa";

        const projects = contextData.data.projects.projects;
        const production = contextData.data.production.production;
        const financial = contextData.data.financial.financial;
        const risks = contextData.data.risks.risks;
        const capacity = contextData.data.capacity.capacity;
        const inventory = contextData.data.inventory;
        const resources = contextData.data.resources;

        const contextMessage = `

SIMOPRIME OPERATIONAL INTELLIGENCE

PROJECTS

${projects.map(p => `
Project: ${p.name}
Product: ${p.product}
Progress: ${p.progress}%
Status: ${p.status}
Deadline: ${p.deadline}
Delay: ${p.delayDays} days
Priority: ${p.priority}
Budget: ${p.budgetUsed}/${p.budget}
Risks: ${(p.risks || []).join(", ")}
`).join("\n")}

PRODUCTION

Efficiency: ${production.efficiency}%
Capacity: ${production.capacity}%
Quality Rate: ${production.qualityRate}%
Active Lines: ${production.activeLines}

FINANCIAL

Budget Utilization: ${financial.utilizationPercent}%
Total Budget: ${financial.totalBudget}
Budget Used: ${financial.totalUsed}
Remaining: ${financial.remaining}

RISKS

${risks.risks.map(r => `
Title: ${r.title}
Severity: ${r.severity}
Probability: ${r.probability}
Impact: ${r.impact}
Mitigation: ${r.mitigationPlan}
`).join("\n")}

CAPACITY

Available Capacity: ${capacity.availableCapacity}%
Can Accept Project: ${capacity.canAcceptProject}

RESOURCES

Total Employees: ${resources.resources.totalEmployees}
Available Employees: ${resources.teamUtilization.available}
Absenteeism: ${resources.resources.absenteeism}

INVENTORY

Critical Parts: ${inventory.atRiskCount}

USER QUESTION

${userQuestion}

`;

        console.log("🤖 Sending request to OpenAI...");

        const analysis = await askAI(
            advisorPrompt,
            contextMessage,
            language
        );

        console.log("✅ OpenAI responded");

        return res.json({
            success: true,
            question: userQuestion,
            analysis,
            timestamp: new Date().toISOString(),
            dataSource: "demo-operational-intelligence"
        });

    } catch (error) {

        console.error("============== ADVISOR ERROR ==============");
        console.error(error);
        console.error(error.stack);
        console.error("===========================================");

        return res.status(500).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV !== "production" ? error.stack : undefined
        });
    }

});

router.get("/dashboard", async (req, res) => {

    try {

        const dashboard = await getDashboardSummary();

        res.json({
            success: true,
            ...dashboard
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

router.get("/context", async (req, res) => {

    try {

        const context = await prepareContextForAI();

        res.json({
            success: true,
            ...context
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});

export default router;
