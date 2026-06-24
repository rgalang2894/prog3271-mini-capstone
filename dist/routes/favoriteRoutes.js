"use strict";
// ─────────────────────────────────────────────────────────
//  FAVORITE ROUTES
//  This file handles ALL endpoints related to favorites.
// ─────────────────────────────────────────────────────────
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// ─── GET /  →  Get all favorites ──────────────────────
router.get("/", async (_req, res) => {
    const [rows] = await db_1.default.query("SELECT * FROM favorites");
    res.json(rows);
});
exports.default = router;
//# sourceMappingURL=favoriteRoutes.js.map