import { Router } from "express";
import {
  getUserPlants,
  getUserPlantById,
  addUserPlant,
  deleteUserPlantById,
  editUserPlant,
} from "../controllers/userPlantController";
import authenticateToken from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken, getUserPlants);
router.get("/:id", authenticateToken, getUserPlantById);
router.post("/", authenticateToken, addUserPlant);
router.put("/:id", authenticateToken, editUserPlant);
router.patch("/:id", authenticateToken, editUserPlant);
router.delete("/:id", authenticateToken, deleteUserPlantById);

export default router;
