import { db } from "../config/db.js";

export const getExperiences = async (req, res) => {
  try {
    const search = req.query.search || ""; // get ?search= from frontend

    let query = "SELECT * FROM experiences";
    const values = [];

    if (search) {
      query += " WHERE title LIKE ? OR location LIKE ?";
      values.push(`%${search}%`, `%${search}%`);
    }

    const [rows] = await db.query(query, values);
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
