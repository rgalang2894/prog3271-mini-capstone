import { Router } from "express";
import { getFavorites } from "../controllers/favoriteController";

const router = Router();

router.get("/", getFavorites);

export default router;