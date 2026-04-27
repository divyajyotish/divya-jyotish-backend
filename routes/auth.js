import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async(req,res)=>{
  try{
    const existing = await User.findOne({email:req.body.email});
    if(existing) return res.json({message:"Email already exists"});
    
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({...req.body, password:hash});
    await user.save();
    res.json({message:"Registered successfully"});
  }catch(err){
    res.json({message:"Error", error:err.message});
  }
});

router.post("/login", async(req,res)=>{
  try{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.json({message:"User not found"});

    const valid = await bcrypt.compare(req.body.password, user.password);
    if(!valid) return res.json({message:"Wrong password"});

    const token = jwt.sign(
      {id:user._id}, 
      process.env.JWT_SECRET || "secret",
      {expiresIn:"7d"}
    );
    res.json({token, user:{name:user.name, email:user.email, subscription:user.subscription}});
  }catch(err){
    res.json({message:"Error", error:err.message});
  }
});

export default router;
