"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserPlant = exports.findAllUserPlants = void 0;
const db_1 = __importDefault(require("../db"));
const findAllUserPlants = async () => {
    const [rows] = await db_1.default.query("SELECT * FROM user_plants");
    return rows;
};
exports.findAllUserPlants = findAllUserPlants;
const createUserPlant = async (payload) => {
    const { user_id, catalog_id, custom_name, location, last_watered } = payload;
    const [result] = await db_1.default.query("INSERT INTO user_plants (user_id, catalog_id, custom_name, location, last_watered) VALUES (?, ?, ?, ?, ?)", [user_id, catalog_id ?? null, custom_name, location ?? null, last_watered ?? null]);
    return {
        id: result.insertId,
        user_id,
        catalog_id: catalog_id ?? null,
        custom_name,
        location: location ?? null,
        last_watered: last_watered ?? null,
    };
};
exports.createUserPlant = createUserPlant;
//# sourceMappingURL=userPlantModel.js.map