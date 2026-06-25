// ─────────────────────────────────────────────────────────
//  PLANT CATALOG ROUTES
//  This file handles ALL endpoints related to plant catalog.
// ─────────────────────────────────────────────────────────

import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// ─── GET /  →  Get all reminders ───────────────────────
router.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM plant_catalog");
  res.json(rows);
});

export default router;