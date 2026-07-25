import express from "express";
import { askAI } from "../services/openai.service.js";
import { advisorPrompt } from "../prompts/advisor.system.js";


const router = express.Router();


router.post("/", async (req,res)=>{

    try {

        const result = await askAI(
            advisorPrompt,
            req.body.context
        );


        res.json({
            success:true,
            analysis:result
        });


    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});


export default router;
