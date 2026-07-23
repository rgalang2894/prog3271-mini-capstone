import pool from "../db";

export const findAllFavorites = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM favorites");
    return rows;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch favorites from database: ${detail}`);
  }
};
