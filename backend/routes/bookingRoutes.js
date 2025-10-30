import express from "express";
import { getAvailability, createBooking } from "../controllers/bookingController.js";

const router = express.Router();

// Routes
router.get("/availability/:experienceId/:days", getAvailability);
router.post("/", createBooking);

export default router;
