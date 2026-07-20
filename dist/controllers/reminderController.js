"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReminders = void 0;
const reminderModel_1 = require("../models/reminderModel");
const getReminders = async (_req, res) => {
    try {
        const reminders = await (0, reminderModel_1.findAllReminders)();
        res.json(reminders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch reminders" });
    }
};
exports.getReminders = getReminders;
//# sourceMappingURL=reminderController.js.map