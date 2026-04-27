import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/success", async(req,res)=>{
  try{
    const {userId} = req.body;

    await User.findByIdAndUpdate(userId,{
      subscription:"premium",
      premiumExpiry:new Date(Date.now()+30*24*60*60*1000)
    });

    res.json({message:"Premium Activated Successfully"});
  }catch(err){
    res.json({message:"Error", error:err.message});
  }
});

router.get("/status/:userId", async(req,res)=>{
  try{
    const user = await User.findById(req.params.userId);
    if(!user) return res.json({message:"User not found"});
    
    res.json({
      subscription: user.subscription,
      premiumExpiry: user.premiumExpiry
    });
  }catch(err){
    res.json({message:"Error", error:err.message});
  }
});

export default router;
