"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reminderController_1 = require("../controllers/reminderController");
const router = (0, express_1.Router)();
router.get("/", reminderController_1.getReminders);
exports.default = router;
//# sourceMappingURL=reminderRoutes.js.map