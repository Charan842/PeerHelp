import express from "express";
import {addTask,allTasks,myTasks} from "../controllers/taskController.js"
import { verifyToken } from "../middleware/authMiddleware.js";
const router= express.Router();

router.post("/addtask",verifyToken,addTask);
router.get("/feed",allTasks);
router.get("/mytasks",verifyToken,myTasks);
export default router;