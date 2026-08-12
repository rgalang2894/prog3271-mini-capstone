import { Router } from "express";
import {
  getUserPlants,
  getUserPlantById,
  addUserPlant,
  deleteUserPlantById,
  editUserPlant,
} from "../controllers/userPlantController";

const router = Router();

router.get("/", getUserPlants);
router.get("/:id", getUserPlantById);
router.post("/", addUserPlant);
router.put("/:id", editUserPlant);
router.patch("/:id", editUserPlant);
router.delete("/:id", deleteUserPlantById);

export default router;
