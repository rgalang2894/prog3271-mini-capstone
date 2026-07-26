"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserPassword = exports.createUser = exports.findByUsername = exports.findUserByEmail = exports.findAllUsers = void 0;
const db_1 = __importDefault(require("../db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//error message for db errors
const createDbError = (message, error) => {
    const detail = error instanceof Error ? error.message : String(error);
    return new Error(`${message}: ${detail}`);
};
//to find all users in our db
const findAllUsers = async () => {
    try {
        const [rows] = await db_1.default.query("SELECT id, name, email FROM users ORDER BY id");
        return rows;
    }
    catch (error) {
        throw createDbError("Failed to fetch users from database", error);
    }
};
exports.findAllUsers = findAllUsers;
//to find users by email in our db
const findUserByEmail = async (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    try {
        const [rows] = await db_1.default.query("SELECT id, name, email, password_hash FROM users WHERE email = ?", [trimmedEmail]);
        return rows[0];
    }
    catch (error) {
        throw createDbError("Failed to find user", error);
    }
};
exports.findUserByEmail = findUserByEmail;
//to find users by username in our db
const findByUsername = async (username) => {
    return (0, exports.findUserByEmail)(username);
};
exports.findByUsername = findByUsername;
//to create a new user in our db
const createUser = async (name, email, password) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const existingUser = await (0, exports.findUserByEmail)(trimmedEmail);
    if (existingUser) {
        throw new Error("Email already registered");
    }
    try {
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const [result] = await db_1.default.query("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [trimmedName, trimmedEmail, passwordHash]);
        return {
            id: result.insertId,
            name: trimmedName,
            email: trimmedEmail,
        };
    }
    catch (error) {
        throw createDbError("Failed to create user", error);
    }
};
exports.createUser = createUser;
//to verify user password in our db
const verifyUserPassword = async (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const user = await (0, exports.findUserByEmail)(trimmedEmail);
    if (!user) {
        return null;
    }
    try {
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isValidPassword) {
            return null;
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
    catch (error) {
        throw createDbError("Failed to verify password", error);
    }
};
exports.verifyUserPassword = verifyUserPassword;
// import pool from "../db";
// export const findAllUsers = async () => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM users");
//     return rows;
//   } catch (error) {
//     const detail = error instanceof Error ? error.message : String(error);
//     throw new Error(`Failed to fetch users from database: ${detail}`);
//   }
// };
//# sourceMappingURL=userModel.js.map