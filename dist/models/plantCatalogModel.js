"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPlantCatalogItems = void 0;
const db_1 = __importDefault(require("../db"));
const findAllPlantCatalogItems = async () => {
    const [rows] = await db_1.default.query("SELECT * FROM plant_catalog");
    return rows;
};
exports.findAllPlantCatalogItems = findAllPlantCatalogItems;
//# sourceMappingURL=plantCatalogModel.js.map