import express from "express";
import cors from "cors";
import path from "path";

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

app.get("/add-user-plant", (_req, res) => {
  res.sendFile(path.join(publicDir, "user-plants.html"));
});

app.get("/update-user-plant", (_req, res) => {
  res.sendFile(path.join(publicDir, "update-user-plant.html"));
});

app.use("/users", userRoutes);
app.use("/user-plants", userPlantRoutes);
app.use("/reminders", reminderRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/plant-catalog", plantCatalogRoutes);

export default app;
