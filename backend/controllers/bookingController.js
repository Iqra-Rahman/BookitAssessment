import { db } from '../config/db.js';

export const createBooking = async (req, res) => {
  const { experience_id, user_name, email, slot_time } = req.body;

  if (!experience_id || !user_name || !email || !slot_time)
    return res.status(400).json({ message: 'All fields are required' });

  // Prevent double booking
  const [existing] = await db.query(
    'SELECT * FROM bookings WHERE experience_id = ? AND slot_time = ?',
    [experience_id, slot_time]
  );

  if (existing.length > 0)
    return res.status(400).json({ message: 'Slot already booked' });

  await db.query(
    'INSERT INTO bookings (experience_id, user_name, email, slot_time) VALUES (?, ?, ?, ?)',
    [experience_id, user_name, email, slot_time]
  );

  res.status(201).json({ message: 'Booking confirmed' });
};
