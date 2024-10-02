import { Router } from "express";
import { verifyToken } from "../Middleware/auth.middleware.js";
import { searchContacts } from "../Controllers/contact.controller.js";

const contactRouter=Router();
contactRouter.post("/search",verifyToken,searchContacts)
export default contactRouter