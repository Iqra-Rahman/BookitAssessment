import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import { createExperienceTable } from "./models/experience.js";
import { createBookingTable } from "./models/booking.js";

import experienceRoutes from "./routes/experienceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());

// Routes
app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes);

// itnialize tables
const init = async () => {
  try {
    await createExperienceTable(db);
    await createBookingTable(db);
    console.log("Tables initialized successfully");
  } catch (error) {
    console.error(" Error initializing tables:", error);
  }
};

init();

export default app;
