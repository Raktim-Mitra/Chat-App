import mongoose,{Schema} from "mongoose";

const userSchema= new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    image:
    {
        type:String,
        required:false,
    },
    color:{
        type: Number,
        required:false,
    },
    profileSetup:{
        type:Boolean,
        default:false,
    }
})
 export const User=mongoose.model("User",userSchema);