import { Router } from "express";
import { getUserPlants, addUserPlant } from "../controllers/userPlantController";

const router = Router();

router.get("/", getUserPlants);
router.post("/", addUserPlant);

export default router;