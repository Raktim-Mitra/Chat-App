import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const database_url=process.env.DATABASE_URL;

export const connectDb=async()=>{
    try{
        await mongoose.connect(database_url);
        console.log("mongoDb connection successfull")
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
}