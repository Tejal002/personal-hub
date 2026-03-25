import express from "express";
import userController from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";
const router=express.Router();

router.get("/login",userController.login);
router.post("/register",userController.register);
router.patch("/joinCommunity",authMiddleware,userController.joinCommunity);
router.patch("/make-host",authMiddleware,userController.makeHost);
export default router;