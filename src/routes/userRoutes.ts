// Handles all user route API calls
import express, { Request, Response } from "express";
const router = express.Router();

// Notification routes
// Temporary since it doesn't connect to the database yet, will be replaced in time with actual database content
let Notifications: Array<{ id: number; userId: string; message: string }> = [];

// Get all notifications for a user
router.get("/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  const userNotifications = Notifications.filter(
    (notification) => notification.userId === userId,
  );
  res.json(userNotifications);
});

// Add a new notification for a user
router.post("/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId as string;
  const { message } = req.body as { message: string };
  const newNotification = { id: Date.now(), userId, message };
  Notifications.push(newNotification);
  res.status(201).json(newNotification);
});
