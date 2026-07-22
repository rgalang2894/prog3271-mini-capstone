import { Router } from "express";
import { getPlantCatalog } from "../controllers/plantCatalogController";

const router = Router();

router.get("/", getPlantCatalog);

export default router;