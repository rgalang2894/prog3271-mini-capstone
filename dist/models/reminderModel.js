"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllReminders = void 0;
const db_1 = __importDefault(require("../db"));
const findAllReminders = async () => {
    try {
        const [rows] = await db_1.default.query("SELECT * FROM reminders");
        return rows;
    }
    catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to fetch reminders from database: ${detail}`);
    }
};
exports.findAllReminders = findAllReminders;
//# sourceMappingURL=reminderModel.js.map