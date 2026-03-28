import { User } from "../models/user.js";

export const profile=async(req,res)=>{
    const userid=req.user._id;
    const user=await User.findOne({_id:userid})
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const {username,email,phonenumber,bio }=user;
    return res.status(200).json({username,email,phonenumber,bio });
}