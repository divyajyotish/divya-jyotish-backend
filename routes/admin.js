import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/users", async(req,res)=>{
  try{
    const users = await User.find().select("-password");
    res.json({
      total: users.length,
      users
    });
  }catch(err){
    res.json({message:"Error", error:err.message});
  }
});

router.get("/stats", async(req,res)=>{
  try{
    const total = await User.countDocuments();
    const premium = await User.countDocuments({subscription:"premium"});
    const free = await User.countDocuments({subscription:"free"});
    
    res.json({total, premium, free});
  }catch(err){
    res.json({message:"Error", error:err.message});
  }
});

export default router;
