import { Router } from "express";
import { getUserInfo, loginUser, signupUser,updateUser,addProfileImage, logout } from "../Controllers/auth.controller.js";
import { verifyToken } from "../Middleware/auth.middleware.js";
import multer from "multer"

const authRouter=Router();
const uploads=multer({dest:"uploads/profiles/"})
authRouter.post("/signup",signupUser);
authRouter.post("/login",loginUser);
authRouter.get("/user-info",verifyToken,getUserInfo);
authRouter.post("/update-profile",verifyToken,updateUser);
authRouter.post("/add-profile-image",verifyToken,uploads.single("profile-image"),addProfileImage);
authRouter.post("/logout",logout);
export default authRouter;