import { Router } from "express";
import { verifyToken } from "../Middleware/auth.middleware.js";
import { getContactsForDMList, searchContacts } from "../Controllers/contact.controller.js";

const contactRouter=Router();
contactRouter.post("/search",verifyToken,searchContacts)
contactRouter.get("/get-contacts-for-dm",verifyToken,getContactsForDMList);
export default contactRouter