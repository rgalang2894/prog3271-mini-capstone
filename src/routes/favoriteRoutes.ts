// ─────────────────────────────────────────────────────────
//  FAVORITE ROUTES
//  This file handles ALL endpoints related to favorites.
// ─────────────────────────────────────────────────────────

import { Router, Request, Response } from "express";
import pool from "../db";

const router = Router();

// ─── GET /  →  Get all favorites ──────────────────────
router.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM favorites");
  res.json(rows);
});

export default router;