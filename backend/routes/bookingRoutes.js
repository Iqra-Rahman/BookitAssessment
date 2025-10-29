import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

// Availability 
router.get("/availability/:experienceId/:days", async (req, res) => {
  try {
    const { experienceId, days } = req.params;
    const numDays = parseInt(days) || 7;

    const allSlots = [  
    //   "11:00 AM - 12:00 PM",
      "07:00 AM",
      "09:00 AM",
      "11:00 AM",
      "01:00 PM",
      "03:00 PM",
    ];

    const totalSeats = 5;

    const [booked] = await db.query(
      "SELECT booking_date, slot_time, COUNT(*) as bookedCount FROM bookings WHERE experience_id = ? GROUP BY booking_date, slot_time",
      [experienceId]
    );

    const bookedMap = {};
    booked.forEach((b) => {
      const key = `${b.booking_date}_${b.slot_time}`;
      bookedMap[key] = b.bookedCount;
    });

    const dates = [];
    for (let i = 0; i < numDays; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];

      const slots = allSlots.map((slot) => {
        const key = `${dateStr}_${slot}`;
        const bookedCount = bookedMap[key] || 0;
        const remaining = Math.max(0, totalSeats - bookedCount);
        return { time: slot, remaining };
      });

      dates.push({ date: dateStr, slots });
    }

    // console.log("Availability fetched:", dates.length, "days");
    console.log("Availability sample:", JSON.stringify(dates[0], null, 2));

    res.json({ dates });
  } catch (err) {
    console.error("Error fetching availability:", err);
    res.status(500).json({ message: "Error fetching availability" });
  }
});

// New booking
router.post("/", async (req, res) => {
  try {
    const { experience_id, user_name, email, booking_date, booking_time } = req.body;

    if (!experience_id || !booking_date || !booking_time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await db.query(
      "INSERT INTO bookings (experience_id, user_name, email, booking_date, slot_time) VALUES (?, ?, ?, ?, ?)",
      [experience_id, user_name, email, booking_date, booking_time]
    );

    console.log("Booking created successfully for:", booking_date, booking_time);
    res.json({ message: "Booking created successfully" });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Booking failed" });
  }
});

export default router;
