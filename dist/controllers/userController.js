"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }
    try {
        const user = await (0, userModel_1.createUser)(name, email, password);
        return res.status(201).json({
            message: "User created successfully.",
            user,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message === "Email already registered.") {
            return res.status(409).json({ message: "Email already registered." });
        }
        return res.status(500).json({ message: "Failed to create user.", error: error instanceof Error ? error.message : String(error) });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }
    try {
        const user = await (0, userModel_1.verifyUserPassword)(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, secret || "default_secret", { expiresIn: "1h" });
        return res.status(200).json({
            message: "Login successful.",
            user,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Login failed." });
    }
};
exports.loginUser = loginUser;
// import { Request, Response } from "express";
// import { findAllUsers, createUser, verifyUserPassword } from "../models/userModel";
// export const getUsers = async (_req: Request, res: Response) => {
//   try {
//     const users = await findAllUsers();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch users" });
//   }
// };
//# sourceMappingURL=userController.js.map