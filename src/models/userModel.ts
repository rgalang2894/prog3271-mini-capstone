import pool from "../db";

export const findAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};
