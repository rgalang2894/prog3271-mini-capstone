import { Router } from "express";
import { getReminders } from "../controllers/reminderController";

const router = Router();

router.get("/", getReminders);

export default router;