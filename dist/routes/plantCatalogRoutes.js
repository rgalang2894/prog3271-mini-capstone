"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plantCatalogController_1 = require("../controllers/plantCatalogController");
const router = (0, express_1.Router)();
router.get("/", plantCatalogController_1.getPlantCatalog);
exports.default = router;
//# sourceMappingURL=plantCatalogRoutes.js.map