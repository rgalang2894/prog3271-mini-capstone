"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserPlant = exports.getUserPlants = void 0;
const userPlantModel_1 = require("../models/userPlantModel");
const getUserPlants = async (_req, res) => {
    try {
        const userPlants = await (0, userPlantModel_1.findAllUserPlants)();
        res.json(userPlants);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user plants" });
    }
};
exports.getUserPlants = getUserPlants;
const addUserPlant = async (req, res) => {
    try {
        const { user_id, catalog_id, custom_name, location, last_watered } = req.body;
        if (!user_id || !custom_name) {
            res.status(400).json({ error: "UserID and Custom Name are required" });
            return;
        }
        const newPlant = await (0, userPlantModel_1.createUserPlant)({
            user_id,
            catalog_id: catalog_id ?? null,
            custom_name,
            location: location ?? null,
            last_watered: last_watered ?? null,
        });
        res.status(201).json(newPlant);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add a new plant to your garden." });
    }
};
exports.addUserPlant = addUserPlant;
//# sourceMappingURL=userPlantController.js.map