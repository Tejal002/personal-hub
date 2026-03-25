import express from "express";
import eventController from "../controllers/eventController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { isHostMiddleware } from "../middleware/isHostMiddleware.js";

const router=express.Router();

// router.get("/:id",eventController.createEvent);
router.post("/create",authMiddleware,isHostMiddleware,eventController.createEvent);
// router.post("/cancel-rsvp",eventController.getEvent);
router.get("/all",eventController.getAllEvents);
router.get("/specific",eventController.getSpecificEvent);

export default router;