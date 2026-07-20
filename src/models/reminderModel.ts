import pool from "../db";

export const findAllReminders = async () => {
  const [rows] = await pool.query("SELECT * FROM reminders");
  return rows;
};
