"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userPlantController_1 = require("../controllers/userPlantController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.get("/", auth_1.default, userPlantController_1.getUserPlants);
router.get("/:id", auth_1.default, userPlantController_1.getUserPlantById);
router.post("/", auth_1.default, userPlantController_1.addUserPlant);
router.put("/:id", auth_1.default, userPlantController_1.editUserPlant);
router.patch("/:id", auth_1.default, userPlantController_1.editUserPlant);
router.delete("/:id", auth_1.default, userPlantController_1.deleteUserPlantById);
exports.default = router;
//# sourceMappingURL=userPlantRoutes.js.map