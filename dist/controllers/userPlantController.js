"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserPlantById = exports.editUserPlant = exports.addUserPlant = exports.getUserPlantById = exports.getUserPlants = void 0;
const userPlantModel_1 = require("../models/userPlantModel");
const getUserPlants = async (req, res) => {
    try {
        const authenticatedUserId = req.user?.id;
        const userPlants = authenticatedUserId
            ? await (0, userPlantModel_1.findUserPlantsByUserId)(authenticatedUserId)
            : await (0, userPlantModel_1.findUserPlantsByUserId)(Number(req.query.userId) || 0);
        res.json(userPlants);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to fetch user plants",
        });
    }
};
exports.getUserPlants = getUserPlants;
const getUserPlantById = async (req, res) => {
    try {
        const authenticatedUserId = req.user?.id;
        if (!authenticatedUserId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const plantId = Number(req.params.id);
        if (!Number.isInteger(plantId)) {
            res.status(400).json({ error: "Invalid plant ID" });
            return;
        }
        const plant = await (0, userPlantModel_1.findUserPlantById)(authenticatedUserId, plantId);
        if (!plant) {
            res.status(404).json({ error: "Plant not found" });
            return;
        }
        res.json(plant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to fetch plant details",
        });
    }
};
exports.getUserPlantById = getUserPlantById;
const addUserPlant = async (req, res) => {
    try {
        const { user_id, catalog_id, custom_name, location, last_watered, image } = req.body;
        const authenticatedUserId = req.user?.id;
        const effectiveUserId = authenticatedUserId ?? user_id;
        if (!effectiveUserId || !custom_name) {
            res.status(400).json({ error: "UserID and Custom Name are required" });
            return;
        }
        const newPlant = await (0, userPlantModel_1.createUserPlant)({
            user_id: effectiveUserId,
            catalog_id: catalog_id ?? null,
            custom_name,
            location: location ?? null,
            last_watered: last_watered ?? null,
            image: image ?? null,
        });
        res.status(201).json(newPlant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to add a new plant to your garden.",
        });
    }
};
exports.addUserPlant = addUserPlant;
const editUserPlant = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            res.status(400).json({ error: "Valid plant ID is required" });
            return;
        }
        const allowedFields = [
            "user_id",
            "catalog_id",
            "custom_name",
            "location",
            "last_watered",
            "image",
        ];
        const updates = Object.fromEntries(allowedFields
            .filter((field) => req.body[field] !== undefined)
            .map((field) => [field, req.body[field]]));
        if (Object.keys(updates).length === 0) {
            res
                .status(400)
                .json({ error: "At least one valid field must be provided to update" });
            return;
        }
        const updatedPlant = await (0, userPlantModel_1.updateUserPlant)(id, updates);
        if (!updatedPlant) {
            res.status(404).json({ error: "User plant not found" });
            return;
        }
        res.json(updatedPlant);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update the user plant" });
    }
};
exports.editUserPlant = editUserPlant;
// Delete function that's used in the userPlantRoutes.ts file to delete a plant by id (can be tested in the edit plant page)
const deleteUserPlantById = async (req, res) => {
    try {
        const authenticatedUserId = req.user?.id;
        if (!authenticatedUserId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const plantId = Number(req.params.id);
        if (!Number.isInteger(plantId)) {
            res.status(400).json({ error: "Invalid plant ID" });
            return;
        }
        const deleted = await (0, userPlantModel_1.deleteUserPlant)(authenticatedUserId, plantId);
        if (!deleted) {
            res.status(404).json({ error: "User plant not found" });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the user plant" });
    }
};
exports.deleteUserPlantById = deleteUserPlantById;
//# sourceMappingURL=userPlantController.js.map