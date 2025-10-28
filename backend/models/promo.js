export const createPromoTable = async (db) => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS promo_codes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(50) UNIQUE,
      discount_value DECIMAL(10,2)
    )
  `);
};
