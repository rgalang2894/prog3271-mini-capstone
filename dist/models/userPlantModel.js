"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPlant = exports.createUserPlant = exports.findUserPlantsByUserId = exports.findAllUserPlants = void 0;
const db_1 = __importDefault(require("../db"));
const createDbError = (message, error) => {
    const detail = error instanceof Error ? error.message : String(error);
    return new Error(`${message}: ${detail}`);
};
const findAllUserPlants = async () => {
    try {
        const [rows] = await db_1.default.query("SELECT * FROM user_plants");
        return rows;
    }
    catch (error) {
        throw createDbError("Failed to fetch user plants", error);
    }
};
exports.findAllUserPlants = findAllUserPlants;
const findUserPlantsByUserId = async (userId) => {
    try {
        const [rows] = await db_1.default.query("SELECT * FROM user_plants WHERE user_id = ?", [userId]);
        return rows;
    }
    catch (error) {
        throw createDbError("Failed to fetch user plants by user ID", error);
    }
};
exports.findUserPlantsByUserId = findUserPlantsByUserId;
const createUserPlant = async (payload) => {
    const { user_id, catalog_id, custom_name, location, last_watered, image } = payload;
    if (!user_id || !custom_name) {
        throw new Error("user_id and custom_name are required to create a user plant");
    }
    try {
        const [result] = await db_1.default.query("INSERT INTO user_plants (user_id, catalog_id, custom_name, location, last_watered, image) VALUES (?, ?, ?, ?, ?, ?)", [user_id, catalog_id ?? null, custom_name, location ?? null, last_watered ?? null, image ?? null]);
        return {
            id: result.insertId,
            user_id,
            catalog_id: catalog_id ?? null,
            custom_name,
            location: location ?? null,
            last_watered: last_watered ?? null,
            image: image ?? null,
        };
    }
    catch (error) {
        throw createDbError("Failed to create user plant", error);
    }
};
exports.createUserPlant = createUserPlant;
const updateUserPlant = async (id, payload) => {
    const entries = Object.entries(payload).filter(([, value]) => value !== undefined);
    if (entries.length === 0) {
        return null;
    }
    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
    const values = entries.map(([, value]) => value ?? null);
    try {
        const [result] = await db_1.default.query(`UPDATE user_plants SET ${setClause} WHERE id = ?`, [...values, id]);
        if (result.affectedRows === 0) {
            return null;
        }
        return { id, ...payload };
    }
    catch (error) {
        throw createDbError("Failed to update user plant", error);
    }
};
exports.updateUserPlant = updateUserPlant;
//# sourceMappingURL=userPlantModel.js.map