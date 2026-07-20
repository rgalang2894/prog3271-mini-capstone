import pool from "../db";

export const findAllFavorites = async () => {
  const [rows] = await pool.query("SELECT * FROM favorites");
  return rows;
};
