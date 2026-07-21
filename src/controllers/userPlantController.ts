import { Request, Response } from "express";
import { createUserPlant, findAllUserPlants, updateUserPlant } from "../models/userPlantModel";

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
    const { user_id, catalog_id, custom_name, location, last_watered, image } = req.body;

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
      image: image ?? null,
    });

    res.status(201).json(newPlant);
  } catch (error) {
    res.status(500).json({ error: "Failed to add a new plant to your garden." });
  }
};

export const editUserPlant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      res.status(400).json({ error: "Valid plant ID is required" });
      return;
    }

    const allowedFields = ["user_id", "catalog_id", "custom_name", "location", "last_watered", "image"] as const;
    const updates = Object.fromEntries(
      allowedFields
        .filter((field) => req.body[field] !== undefined)
        .map((field) => [field, req.body[field]])
    );

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ error: "At least one valid field must be provided to update" });
      return;
    }

    const updatedPlant = await updateUserPlant(id, updates);

    if (!updatedPlant) {
      res.status(404).json({ error: "User plant not found" });
      return;
    }

    res.json(updatedPlant);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user plant" });
  }
};