"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPlantCatalogItems = void 0;
const db_1 = __importDefault(require("../db"));
const findAllPlantCatalogItems = async () => {
    try {
        const [rows] = await db_1.default.query("SELECT * FROM plant_catalog");
        return rows;
    }
    catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to fetch plant catalog items from database: ${detail}`);
    }
};
exports.findAllPlantCatalogItems = findAllPlantCatalogItems;
//# sourceMappingURL=plantCatalogModel.js.map