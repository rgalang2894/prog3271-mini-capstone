"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favoriteController_1 = require("../controllers/favoriteController");
const router = (0, express_1.Router)();
router.get("/", favoriteController_1.getFavorites);
exports.default = router;
//# sourceMappingURL=favoriteRoutes.js.map