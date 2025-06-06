import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const verifyToken=(req,res,next)=>{
    const token=req.cookies.jwt;
    const JWT_SECRET_KEY=process.env.JWT_KEY;
   if(!token) return res.status(401).send("You are not authenticated");
   jwt.verify(token,JWT_SECRET_KEY, async(err,payload)=>{
    if(err) return res.status(403).send("Token is not valid");
    req.userId=payload.userId;
    next()
   })
}