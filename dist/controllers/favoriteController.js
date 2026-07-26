"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = void 0;
const favoriteModel_1 = require("../models/favoriteModel");
const getFavorites = async (_req, res) => {
    try {
        const favorites = await (0, favoriteModel_1.findAllFavorites)();
        res.json(favorites);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch favorites" });
    }
};
exports.getFavorites = getFavorites;
//# sourceMappingURL=favoriteController.js.map