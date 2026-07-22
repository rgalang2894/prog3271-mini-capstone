"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlantCatalog = void 0;
const plantCatalogModel_1 = require("../models/plantCatalogModel");
const getPlantCatalog = async (_req, res) => {
    try {
        const plantCatalog = await (0, plantCatalogModel_1.findAllPlantCatalogItems)();
        res.json(plantCatalog);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch plant catalog" });
    }
};
exports.getPlantCatalog = getPlantCatalog;
//# sourceMappingURL=plantCatalogController.js.map