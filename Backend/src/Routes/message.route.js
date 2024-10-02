import { Router } from "express";
import { verifyToken } from "../Middleware/auth.middleware.js";
import { getMessages } from "../Controllers/message.controller.js";

const messageRouter=Router();
messageRouter.post("/get-messages",verifyToken,getMessages)
export default messageRouter