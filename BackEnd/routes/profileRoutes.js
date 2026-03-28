import express from "express";
import { profile } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router  = express.Router();

router.get("/profile",verifyToken,profile);

export default router;