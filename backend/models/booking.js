export const createBookingTable = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      experience_id INT,
      user_name VARCHAR(100),
      email VARCHAR(100),
      booking_date DATE,
      booking_time VARCHAR(50),
      guests INT DEFAULT 1,
      price_charged DECIMAL(10,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (experience_id) REFERENCES experiences(id)
    )
  `);
};
