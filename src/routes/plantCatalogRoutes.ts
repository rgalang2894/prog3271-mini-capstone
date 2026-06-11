// Plant catalog routes for managing plant information endpoints
// Items currently do not exist in their respective controller so it's throwing errors but the routes are set up.
import express, { Request, Response } from "express";
import {
  getAllPlants,
  getPlantById,
  searchPlants,
  filterByLightRequirements,
  addPlant,
  updatePlant,
  deletePlant,
} from "../controllers/plantCatalogControllers";

const router = express.Router();

// GET/Get all plants in catalog
router.get("/", getAllPlants);

// GET/Search plants in catalog by name
router.get("/search", searchPlants);

// GET/Filter plants in catalog by sunlight requirements
router.get("/light", filterByLightRequirements);

// GET/Get plant by ID
router.get("/:id", getPlantById);

// POST/Add plant to catalog
router.post("/", addPlant);

// PUT/Update plant in catalog
router.put("/:id", updatePlant);

// DELETE/Remove plant from catalog
router.delete("/:id", deletePlant);

export default router;
