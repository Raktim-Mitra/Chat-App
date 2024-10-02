import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDb } from "./Config/db.config.js"
import authRouter from "./Routes/user.route.js"
import contactRouter from "./Routes/contact.route.js"
import setupSocket from "../socket.js"
import messageRouter from "./Routes/message.route.js"


const app=express();
const port=process.env.PORT;



app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","PUT","POST","PATCH","DELETE"],
    credentials:true,
}))

app.use("/uploads/profiles",express.static("uploads/profiles"))
app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"})) 

//handling routes
app.use("/api/auth",authRouter);
app.use("/api/contacts",contactRouter);
app.use("/api/messages",messageRouter);
//DB connection
connectDb();



const server = app.listen(port,()=>{
    console.log(`App is running at port ${port}`)
})

setupSocket(server);