import { Request, Response } from "express";
import {
  createReminder,
  findAllRemindersByUserId,
} from "../models/reminderModel";

export const getReminders = async (req: Request, res: Response) => {
  try {
    const authenticatedUserId = req.user?.id;
    if (!authenticatedUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const reminders = await findAllRemindersByUserId(authenticatedUserId);
    res.json(reminders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "Failed to fetch reminders",
      });
  }
};

export const addReminder = async (req: Request, res: Response) => {
  try {
    const authenticatedUserId = req.user?.id;
    if (!authenticatedUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const {
      user_plant_id,
      reminder_type,
      frequency_days,
      next_due_date,
      is_completed = 0,
    } = req.body;
    if (!user_plant_id || !reminder_type || !frequency_days || !next_due_date) {
      res
        .status(400)
        .json({
          error:
            "user_plant_id, reminder_type, frequency_days, and next_due_date are required",
        });
      return;
    }

    const newReminder = await createReminder({
      user_plant_id: Number(user_plant_id),
      reminder_type,
      frequency_days: Number(frequency_days),
      next_due_date,
      is_completed: Number(is_completed) || 0,
    });

    res.status(201).json(newReminder);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "Failed to create reminder",
      });
  }
};
