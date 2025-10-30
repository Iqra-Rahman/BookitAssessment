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

// CORS setup
const allowedOrigins = [
  "https://bookit-assessment-i9ix.vercel.app",
  "https://bookit-assessment-3j46.vercel.app",
  "https://bookit-assessment.vercel.app", //  backend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(bodyParser.json());

// Routes
app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Server is running successfully on Railway!");
});

const PORT = process.env.PORT || 5000;

// Initialize tables and start server
const init = async () => {
  try {
    await createExperienceTable(db);
    await createBookingTable(db);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err);
  }
};

init();
