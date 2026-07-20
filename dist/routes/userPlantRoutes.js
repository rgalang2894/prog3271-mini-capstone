"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userPlantController_1 = require("../controllers/userPlantController");
const router = (0, express_1.Router)();
router.get("/", userPlantController_1.getUserPlants);
router.post("/", userPlantController_1.addUserPlant);
exports.default = router;
//# sourceMappingURL=userPlantRoutes.js.map