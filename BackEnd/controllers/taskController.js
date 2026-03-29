import { Task } from "../models/addtask.js";
import {nanoid} from "nanoid";

export const addTask = async (req, res) => {
    try {
        if (!req.user?.uid) {
            return res.status(401).json({
                message: "Invalid user token"
            });
        }

        const { title, description, location, start_time, end_time, status, picture } = req.body;

        const newTask = new Task({
            uid:req.user.uid,
            tid:"TASK_"+nanoid(8),
            title,
            description,
            location,
            start_time,
            end_time,
            status,
            picture
        });

        await newTask.save();

        return res.status(201).json({
            message: "Task added successfully"
        });

    } catch (error) {
        console.log(error);

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid task data"
            });
        }

        return res.status(500).json({
            message: "Error in adding Task"
        });
    }
};
export const allTasks=async (req,res)=>{
    try{
        const alltasks=await Task.find({isAccepted:false});
        return res.status(200).json({
            count:alltasks.length,
            tasks:alltasks
        })
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            message:"Error retrieving tasks"
        });
    }
};
export const myTasks=async (req,res)=>{
    try{
         if (!req.user?.uid) {
            return res.status(401).json({
                message: "Invalid user token"
            });
        }
        const userid=req.user.uid;
        const mytasks=await Task.find({uid:userid});
        return res.status(200).json({
            count:mytasks.length,
            tasks:mytasks
        });
    }
    
    catch(error){
        console.log(error);

        return res.status(500).json({
            message:"Error retrieving tasks"
        });
    }
}