import { Router } from "express";
import { addReminder, getReminders } from "../controllers/reminderController";

const router = Router();

router.get("/", getReminders);
router.post("/", addReminder);

export default router;
