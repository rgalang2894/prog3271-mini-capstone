import { Request, Response } from "express";
import { findAllFavorites } from "../models/favoriteModel";

export const getFavorites = async (_req: Request, res: Response) => {
  try {
    const favorites = await findAllFavorites();
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch favorites" });
  }
};
