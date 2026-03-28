import express from "express";
import { otpVerify, registerUser,login } from "../controllers/authControllers.js";
const router = express.Router();
router.post("/signup",registerUser);
router.post("/verifyotp",otpVerify);
router.post("/login",login)
export default router;