
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../Models/user.model.js";
import { renameSync } from 'fs';
import dotenv from "dotenv"

dotenv.config()
const maxAge=3*24*60*60*1000;
const createToken=(email,userId)=>{
  const JWT_SECRET=process.env.JWT_KEY;
    return jwt.sign({email,userId},JWT_SECRET,{
      expiresIn:maxAge,
    })
}
// Register a new user
const signupUser= async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

   const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email: email,
      password: hashedPassword, 
    });
   res.cookie("jwt",createToken(email,newUser._id),{
    maxAge,
    secure:true,
    sameSite:"None",
   })
    return res.status(201).json({
       success: true,
      message: 'New user created successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        profileSetup:newUser.profileSetup,
      },
    });
  } 
  catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Signup failed'
    });
  }
 
};

// Login an existing user
const loginUser= async (req, res) => {
  const { email, password } = req.body;
 

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });
    res.cookie("jwt",createToken(email,user._id),{
      maxAge,
      secure:true,
      sameSite:"None",
     })
     return res.status(200).json({
      user:{
        id:user._id,
        email:user.email,
        profileSetup:user.profileSetup,
        firstName:user.firstName,
        lastName:user.lastName,
        image:user.image,
        color:user.color,
      }
     })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
};

const getUserInfo= async(req,res)=>{
  try{
  
    const userData=await User.findById(req.userId)
    if(!userData) return res.status(404).send("user with the email is not found");
    return res.status(200).json({
     id:userData._id,
     email:userData.email,
     profileSetup:userData.profileSetup,
     firstName:userData.firstName,
     lastName:userData.lastName,
     image:userData.image,
     color:userData.color,
    })
  } catch(error){
    res.status(500).json({ message: 'failed to get data' });
  }
}
const updateUser= async(req,res)=>{
 try{
  const {userId}= req;
  const{firstName,lastName}=req.body;
  if(!firstName || !lastName){
    return res.status(400).send("Firstname and lastname is required")
  }
  const userData=await User.findByIdAndUpdate(
    userId,{
      firstName,
      lastName,
      profileSetup:true,
    },
    {new:true,runValidators:true}
  )
  return res.status(200).json({
    id:userData._id,
    email:userData.email,
    profileSetup:userData.profileSetup,
    firstName:userData.firstName,
    lastName:userData.lastName,
    image:userData.image,
    color:userData.color,
   })
 } catch(error){
  res.status(500).json({ message: 'failed to get data' });
 }
}

const addProfileImage=async(req,res)=>{
 try{
  const {file}= req;
  if(!file) return res.status(400).send("File is required");
  const date=Date.now();
  let fileName="uploads/profiles/"+date+file.originalname;
  renameSync(file.path,fileName);
  const updateduser=await User.findByIdAndUpdate(
    req.userId,
    {image:fileName},
    {new:true,runValidators:true}
  )
  return res.status(200).json({
      image:updateduser.image,
  })
 }catch(error){
  console.log(error)
 }
 }

 const logout=async(req,res)=>{
  try{
    res.cookie("jwt","",{maxAge:1,secure:true,sameSite:"None"})
    res.status(200).send("Logout successful")
  }catch(error){
    console.log(error)
  }
 }
export {signupUser,loginUser,getUserInfo,updateUser,addProfileImage,logout};