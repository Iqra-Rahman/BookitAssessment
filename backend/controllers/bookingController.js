import { db } from '../config/db.js';

// new booking
export const createBooking = async (req, res) => {
  try {
    const { experience_id, user_name, user_email, booking_date, total_price } = req.body;

    if (!experience_id || !user_name || !user_email || !booking_date || !total_price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = `
      INSERT INTO bookings (experience_id, user_name, user_email, booking_date, total_price)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [experience_id, user_name, user_email, booking_date, total_price], (err, result) => {
      if (err) {
        console.error('Error inserting booking:', err);
        return res.status(500).json({ message: 'Database error while creating booking' });
      }

      res.status(201).json({
        message: 'Booking created successfully!',
        bookingId: result.insertId,
      });
    });
  } catch (error) {
    console.error('Error in createBooking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// available dates 
export const getAvailability = async (req, res) => {
  try {
    const { id } = req.params; // experience id
    const { days } = req.query; 

    if (!id || !days) {
      return res.status(400).json({ message: 'Experience ID and days are required' });
    }

    // booked dates 
    const sql = `
      SELECT booking_date FROM bookings WHERE experience_id = ?
    `;

    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error(' Error fetching availability:', err);
        return res.status(500).json({ message: 'Database error while fetching availability' });
      }
      const bookedDates = new Set(results.map(r => r.booking_date.toISOString().split('T')[0]));

      const today = new Date();
      const availableDates = [];

      for (let i = 0; i < Number(days); i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const dateStr = nextDate.toISOString().split('T')[0];

        if (!bookedDates.has(dateStr)) {
          availableDates.push(dateStr);
        }
      }

      res.status(200).json({
        message: 'Availability fetched successfully!',
        availableDates,
      });
    });
  } catch (error) {
    console.error('Error in getAvailability:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
