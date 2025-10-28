export const createExperienceTable = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS experiences (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100),
      description TEXT,
      price DECIMAL(10,2),
      available_slots INT
    )
  `);
};
