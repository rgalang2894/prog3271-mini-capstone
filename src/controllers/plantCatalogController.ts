import { Request, Response } from "express";
import { findAllPlantCatalogItems } from "../models/plantCatalogModel";

export const getPlantCatalog = async (_req: Request, res: Response) => {
  try {
    const plantCatalog = await findAllPlantCatalogItems();
    res.json(plantCatalog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plant catalog" });
  }
};
