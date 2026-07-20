import { Request, Response } from "express";
import { createUserPlant, findAllUserPlants } from "../models/userPlantModel";

export const getUserPlants = async (_req: Request, res: Response) => {
  try {
    const userPlants = await findAllUserPlants();
    res.json(userPlants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user plants" });
  }
};

export const addUserPlant = async (req: Request, res: Response) => {
  try {
    const { user_id, catalog_id, custom_name, location, last_watered } = req.body;

    if (!user_id || !custom_name) {
      res.status(400).json({ error: "UserID and Custom Name are required" });
      return;
    }

    const newPlant = await createUserPlant({
      user_id,
      catalog_id: catalog_id ?? null,
      custom_name,
      location: location ?? null,
      last_watered: last_watered ?? null,
    });

    res.status(201).json(newPlant);
  } catch (error) {
    res.status(500).json({ error: "Failed to add a new plant to your garden." });
  }
};
