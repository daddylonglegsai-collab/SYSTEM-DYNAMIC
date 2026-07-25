import dotenv from "dotenv";
dotenv.config();  // ← اول dotenv رو load کن

// بعد بقیه import ها
import express from "express";
import cors from "cors";

// این import ها بعد از dotenv.config() باشن
import chatRouter from "./routes/chat.js";
import advisorRouter from "./routes/ai-advisor.js";
import simulationRouter from "./routes/simulation.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "Simorgh AI Backend Running 🚀",
        apiKeyExists: !!process.env.OPENAI_API_KEY,
        apiKeyPrefix: process.env.OPENAI_API_KEY?.slice(0, 10) || "none"
    });
});

app.use("/api/chat", chatRouter);
app.use("/api/advisor", advisorRouter);
app.use("/api/simulation", simulationRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔑 API Key exists: ${!!process.env.OPENAI_API_KEY}`);
});