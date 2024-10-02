import { User } from "../Models/user.model.js";

export const searchContacts=async(req,res)=>{
    try {
        const {searchTerm}=req.body;
        if(searchTerm===undefined || searchTerm===null) return res.status(400).send("Search term in not defined")
        const santitizedSearchTerm= searchTerm.replace(
         /[.*+?^${}()|[\]\\]/g,"\\$&"
        ) 
        const regex = new RegExp(santitizedSearchTerm,"i")  
        const contacts= await User.find({
            $and: [
                {_id: { $ne: req.userId}},
                {
                    $or:[{firstName:regex},{lastName:regex},{email:regex}],
                },
            ],
        })   
        return res.status(200).json({contacts})
    } catch (error) {
        console.log(error)
    }
}