export const createBookingTable = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      experience_id INT,
      user_name VARCHAR(100),
      email VARCHAR(100),
      slot_time VARCHAR(50),
      FOREIGN KEY (experience_id) REFERENCES experiences(id)
    )
  `);
};
