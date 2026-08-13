"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReminder = exports.findAllRemindersByUserId = exports.findAllReminders = void 0;
const db_1 = __importDefault(require("../db"));
const createDbError = (message, error) => {
    const detail = error instanceof Error ? error.message : String(error);
    return new Error(`${message}: ${detail}`);
};
const findAllReminders = async () => {
    try {
        const [rows] = await db_1.default.query("SELECT * FROM reminders");
        return rows;
    }
    catch (error) {
        throw createDbError("Failed to fetch reminders from database", error);
    }
};
exports.findAllReminders = findAllReminders;
const findAllRemindersByUserId = async (userId) => {
    try {
        const [rows] = await db_1.default.query(`SELECT r.*, up.custom_name, pc.common_name
       FROM reminders r
       JOIN user_plants up ON up.id = r.user_plant_id
       LEFT JOIN plant_catalog pc ON up.catalog_id = pc.id
       WHERE up.user_id = ?`, [userId]);
        return rows;
    }
    catch (error) {
        throw createDbError("Failed to fetch reminders for user", error);
    }
};
exports.findAllRemindersByUserId = findAllRemindersByUserId;
const createReminder = async (payload) => {
    const { user_plant_id, reminder_type, frequency_days, next_due_date, is_completed = 0, } = payload;
    if (!user_plant_id || !reminder_type || !frequency_days || !next_due_date) {
        throw new Error("user_plant_id, reminder_type, frequency_days, and next_due_date are required to create a reminder");
    }
    try {
        const [result] = await db_1.default.query("INSERT INTO reminders (user_plant_id, reminder_type, frequency_days, next_due_date, is_completed) VALUES (?, ?, ?, ?, ?)", [
            user_plant_id,
            reminder_type,
            frequency_days,
            next_due_date,
            is_completed,
        ]);
        return {
            id: result.insertId,
            user_plant_id,
            reminder_type,
            frequency_days,
            next_due_date,
            is_completed,
        };
    }
    catch (error) {
        throw createDbError("Failed to create reminder", error);
    }
};
exports.createReminder = createReminder;
//# sourceMappingURL=reminderModel.js.map