import pool from "../db";

const createDbError = (message: string, error: unknown) => {
  const detail = error instanceof Error ? error.message : String(error);
  return new Error(`${message}: ${detail}`);
};

export const findAllReminders = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM reminders");
    return rows;
  } catch (error) {
    throw createDbError("Failed to fetch reminders from database", error);
  }
};

export const findAllRemindersByUserId = async (userId: number) => {
  try {
    const [rows] = await pool.query(
      `SELECT r.*, up.custom_name, pc.common_name
       FROM reminders r
       JOIN user_plants up ON up.id = r.user_plant_id
       LEFT JOIN plant_catalog pc ON up.catalog_id = pc.id
       WHERE up.user_id = ?`,
      [userId],
    );
    return rows;
  } catch (error) {
    throw createDbError("Failed to fetch reminders for user", error);
  }
};

export const createReminder = async (payload: {
  user_plant_id: number;
  reminder_type: string;
  frequency_days: number;
  next_due_date: string;
  is_completed?: number;
}) => {
  const {
    user_plant_id,
    reminder_type,
    frequency_days,
    next_due_date,
    is_completed = 0,
  } = payload;

  if (!user_plant_id || !reminder_type || !frequency_days || !next_due_date) {
    throw new Error(
      "user_plant_id, reminder_type, frequency_days, and next_due_date are required to create a reminder",
    );
  }

  try {
    const [result]: any = await pool.query(
      "INSERT INTO reminders (user_plant_id, reminder_type, frequency_days, next_due_date, is_completed) VALUES (?, ?, ?, ?, ?)",
      [
        user_plant_id,
        reminder_type,
        frequency_days,
        next_due_date,
        is_completed,
      ],
    );

    return {
      id: result.insertId,
      user_plant_id,
      reminder_type,
      frequency_days,
      next_due_date,
      is_completed,
    };
  } catch (error) {
    throw createDbError("Failed to create reminder", error);
  }
};
