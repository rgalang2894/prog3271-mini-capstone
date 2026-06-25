"use strict";
// ─────────────────────────────────────────────────────────
//  PLANT CATALOG ROUTES
//  This file handles ALL endpoints related to plant catalog.
// ─────────────────────────────────────────────────────────
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// ─── GET /  →  Get all reminders ───────────────────────
router.get("/", async (_req, res) => {
    const [rows] = await db_1.default.query("SELECT * FROM plant_catalog");
    res.json(rows);
});
exports.default = router;
//# sourceMappingURL=plantCatalogRoutes.js.map