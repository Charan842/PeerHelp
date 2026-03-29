import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const profile=async(req,res)=>{
    const userid=req.user._id;
    const user=await User.findOne({_id:userid})
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const {username,email,phonenumber,bio }=user;
    return res.status(200).json({username,email,phonenumber,bio });
}

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const email = req.user.email;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

       
        if (currentPassword === newPassword) {
            return res.status(400).json({
                message: "New password must be different"
            });
        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {
        console.log("Error in changePassword:", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};