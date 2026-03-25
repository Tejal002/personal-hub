import express from "express";
import communityController from "../controllers/communityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isHostMiddleware } from "../middleware/isHostMiddleware.js";

const router=express.Router();

router.post("/create",authMiddleware,isHostMiddleware,communityController.createCommunity);
router.get("/all",communityController.getAllCommunity);
router.get("/getSpecificCommunity",communityController.getSpecificCommunity)
router.get("/getCommunityWithMembers",communityController.getCommunityWithMember)

export default router;