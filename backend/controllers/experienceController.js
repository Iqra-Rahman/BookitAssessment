import { db } from '../config/db.js';

// export const getExperiences = async (req, res) => {
//   const [rows] = await db.query('SELECT * FROM experiences');
//   res.json(rows);
// };


// export const getExperienceById = async (req, res) => {
//   const { id } = req.params;
//   const [rows] = await db.query('SELECT * FROM experiences WHERE id = ?', [id]);
//   if (rows.length === 0) return res.status(404).json({ message: 'Not found' });
//   res.json(rows[0]);
// };

import { db } from "../config/db.js";

export const getExperiences = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM experiences");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching experiences:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM experiences WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching experience by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};
