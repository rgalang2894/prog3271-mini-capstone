"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const userModel_1 = require("../models/userModel");
const getUsers = async (_req, res) => {
    try {
        const users = await (0, userModel_1.findAllUsers)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=userController.js.map