"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllFavorites = void 0;
const db_1 = __importDefault(require("../db"));
const findAllFavorites = async () => {
    try {
        const [rows] = await db_1.default.query("SELECT * FROM favorites");
        return rows;
    }
    catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to fetch favorites from database: ${detail}`);
    }
};
exports.findAllFavorites = findAllFavorites;
//# sourceMappingURL=favoriteModel.js.map