import express from "express";
import eventController from "../controllers/eventController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isHostMiddleware } from "../middleware/isHostMiddleware.js";

const router=express.Router();

router.get("/:id",eventController.createEvent);
router.post("/rsvp",authMiddleware,isHostMiddleware,eventController.createEvent);
router.post("/cancel-rsvp",eventController.getEvent);


export default router;