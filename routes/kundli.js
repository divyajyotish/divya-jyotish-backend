import express from "express";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.post("/generate", verifyToken, async(req,res)=>{
  try{
    const {name, dob, time, place} = req.body;
    
    res.json({
      success: true,
      name,
      dob,
      time,
      place,
      message: "Kundli generated successfully"
    });
  }catch(err){
    res.json({message:"Error", error:err.message});
  }
});

export default router;
