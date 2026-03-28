import { Request } from "../models/request.js";
import { Task } from "../models/addtask.js";
import { User } from "../models/user.js";
import { nanoid } from "nanoid";

export const createRequest =async(req,res) =>{
    const {description,location,taskId}=req.body;

    const task = await Task.findOne({_id:taskId});
    if (!task){
        return res.json({message:"task not found"})
    }
    const userid=await User.findOne({uid:task.uid});

    const requ = new Request({
        rId:"REQ_"+nanoid(8),
        description:description,
        location:location,
        requestedBy:req.user._id,
        requestedTo:userid._id,
        taskId:task._id
    });
    await requ.save();
    return res.status(200).json(requ);
};

export const InReq = async(req,res)=>{
    const uid = req.user._id;

    const requests = await Request.find({requestedTo:uid})
    if (!requests){
        return res.status(400).json({message:"no requests"});
    }
    return res.status(200).json(requests);
};


export const OutReq = async(req,res)=>{
    const uid = req.user._id;
    const requests =await Request.find({requestedBy:uid})
    if (!requests){
        return res.status(400).json({message:"no requests"});
    }
    return res.status(200).json(requests);
};
