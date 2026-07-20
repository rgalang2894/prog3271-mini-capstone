"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsers = void 0;
const db_1 = __importDefault(require("../db"));
const findAllUsers = async () => {
    const [rows] = await db_1.default.query("SELECT * FROM users");
    return rows;
};
exports.findAllUsers = findAllUsers;
//# sourceMappingURL=userModel.js.map