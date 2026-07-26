"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const userPlantRoutes_1 = __importDefault(require("./routes/userPlantRoutes"));
const reminderRoutes_1 = __importDefault(require("./routes/reminderRoutes"));
const favoriteRoutes_1 = __importDefault(require("./routes/favoriteRoutes"));
const plantCatalogRoutes_1 = __importDefault(require("./routes/plantCatalogRoutes"));
const app = (0, express_1.default)();
const publicDir = path_1.default.resolve(__dirname, "..", "public");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(publicDir));
app.get("/add-user-plant", (_req, res) => {
    res.sendFile(path_1.default.join(publicDir, "user-plants.html"));
});
app.get("/update-user-plant", (_req, res) => {
    res.sendFile(path_1.default.join(publicDir, "update-user-plant.html"));
});
app.use("/users", userRoutes_1.default);
app.use("/user-plants", userPlantRoutes_1.default);
app.use("/reminders", reminderRoutes_1.default);
app.use("/favorites", favoriteRoutes_1.default);
app.use("/plant-catalog", plantCatalogRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map