import { Router } from "express";
import { getUserPlants, addUserPlant, editUserPlant } from "../controllers/userPlantController";

const router = Router();

router.get("/", getUserPlants);
router.post("/", addUserPlant);
router.put("/:id", editUserPlant);
router.patch("/:id", editUserPlant);

export default router;