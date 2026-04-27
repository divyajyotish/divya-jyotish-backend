import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
  const token = req.headers.authorization;

  if(!token) return res.json({message:"No token"});

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  }catch{
    res.json({message:"Invalid token"});
  }
};
