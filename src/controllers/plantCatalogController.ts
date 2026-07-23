import { Request, Response } from "express";
import { findAllPlantCatalogItems } from "../models/plantCatalogModel";

export const getPlantCatalog = async (_req: Request, res: Response) => {
  try {
    const plantCatalog = await findAllPlantCatalogItems();
    res.json(plantCatalog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch plant catalog" });
  }
};
