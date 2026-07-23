import { Request, Response } from "express";
import { findAllReminders } from "../models/reminderModel";

export const getReminders = async (_req: Request, res: Response) => {
  try {
    const reminders = await findAllReminders();
    res.json(reminders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch reminders" });
  }
};
