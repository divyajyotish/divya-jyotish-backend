import jwt from "jsonwebtoken";
export const verifyToken = (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.json({message:"No token"});
  
  const token = authHeader.startsWith("Bearer ") 
    ? authHeader.slice(7) 
    : authHeader;
    
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  }catch{
    res.json({message:"Invalid token"});
  }
};
