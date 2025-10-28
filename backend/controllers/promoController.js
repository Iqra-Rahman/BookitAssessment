import { db } from '../config/db.js';

export const validatePromo = async (req, res) => {
  const { code } = req.body;

  const [promo] = await db.query('SELECT * FROM promo_codes WHERE code = ?', [code]);
  if (promo.length === 0)
    return res.status(400).json({ message: 'Invalid promo code' });

  res.json({
    valid: true,
    discount: promo[0].discount_value
  });
};
