import express from "express";
import { createRequest, InReq, OutReq } from "../controllers/requestController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/createrequest",verifyToken,createRequest);
router.get("/inrequests",verifyToken,InReq);
router.get("/outrequests",verifyToken,OutReq);

export default router;