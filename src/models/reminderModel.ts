import pool from "../db";

export const findAllReminders = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM reminders");
    return rows;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch reminders from database: ${detail}`);
  }
};
