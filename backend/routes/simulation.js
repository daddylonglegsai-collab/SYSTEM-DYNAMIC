import express from "express";
import { askAI } from "../services/openai.service.js";
import { simulationPrompt } from "../prompts/simulation.system.js";


const router = express.Router();


router.post("/", async(req,res)=>{


try{

const result = await askAI(
    simulationPrompt,
    JSON.stringify(req.body)
);


res.json({
    success:true,
    simulation:result
});


}
catch(error){

res.status(500).json({
error:error.message
});

}


});


export default router;
