require('dotenv').config();

import express from "express";
import path from "path";
import authenticateToken from "./middleware/auth";
import userRoutes from "./routes/userRoutes";
import userPlantRoutes from "./routes/userPlantRoutes";
import reminderRoutes from "./routes/reminderRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import plantCatalogRoutes from "./routes/plantCatalogRoutes";

const app = express();

const publicDir = path.resolve(__dirname, "..", "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir));


app.get("/add-user-plant", authenticateToken, (_req, res) => {
  res.sendFile(path.join(publicDir, "user-plants.html"));
});

app.get("/update-user-plant", authenticateToken, (_req, res) => {
  res.sendFile(path.join(publicDir, "update-user-plant.html"));
});

app.get("/dashboard", authenticateToken, (_req, res) => {
  res.sendFile(path.join(publicDir, "dashboard.html"));
});

app.use("/users", userRoutes);
app.use("/user-plants", authenticateToken, userPlantRoutes);
app.use("/reminders", authenticateToken, reminderRoutes);
app.use("/favorites", authenticateToken, favoriteRoutes);
app.use("/plant-catalog", authenticateToken, plantCatalogRoutes);

export default app;
