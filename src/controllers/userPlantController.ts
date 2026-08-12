import { Request, Response } from "express";
import {
  createUserPlant,
  deleteUserPlant,
  findUserPlantById,
  findUserPlantsByUserId,
  updateUserPlant,
} from "../models/userPlantModel";

export const getUserPlants = async (req: Request, res: Response) => {
  try {
    const authenticatedUserId = req.user?.id;
    const userPlants = authenticatedUserId
      ? await findUserPlantsByUserId(authenticatedUserId)
      : await findUserPlantsByUserId(Number(req.query.userId) || 0);

    res.json(userPlants);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Failed to fetch user plants",
    });
  }
};

export const getUserPlantById = async (req: Request, res: Response) => {
  try {
    const authenticatedUserId = req.user?.id;
    if (!authenticatedUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const plantId = Number(req.params.id);
    if (!Number.isInteger(plantId)) {
      res.status(400).json({ error: "Invalid plant ID" });
      return;
    }

    const plant = await findUserPlantById(authenticatedUserId, plantId);
    if (!plant) {
      res.status(404).json({ error: "Plant not found" });
      return;
    }

    res.json(plant);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch plant details",
    });
  }
};

export const addUserPlant = async (req: Request, res: Response) => {
  try {
    const { user_id, catalog_id, custom_name, location, last_watered, image } =
      req.body;
    const authenticatedUserId = req.user?.id;
    const effectiveUserId = authenticatedUserId ?? user_id;

    if (!effectiveUserId || !custom_name) {
      res.status(400).json({ error: "UserID and Custom Name are required" });
      return;
    }

    const newPlant = await createUserPlant({
      user_id: effectiveUserId,
      catalog_id: catalog_id ?? null,
      custom_name,
      location: location ?? null,
      last_watered: last_watered ?? null,
      image: image ?? null,
    });

    res.status(201).json(newPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to add a new plant to your garden.",
    });
  }
};

export const editUserPlant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      res.status(400).json({ error: "Valid plant ID is required" });
      return;
    }

    const allowedFields = [
      "user_id",
      "catalog_id",
      "custom_name",
      "location",
      "last_watered",
      "image",
    ] as const;
    const updates = Object.fromEntries(
      allowedFields
        .filter((field) => req.body[field] !== undefined)
        .map((field) => [field, req.body[field]]),
    );

    if (Object.keys(updates).length === 0) {
      res
        .status(400)
        .json({ error: "At least one valid field must be provided to update" });
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

export const deleteUserPlantById = async (req: Request, res: Response) => {
  try {
    const authenticatedUserId = req.user?.id;
    if (!authenticatedUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const plantId = Number(req.params.id);
    if (!Number.isInteger(plantId)) {
      res.status(400).json({ error: "Invalid plant ID" });
      return;
    }

    const deleted = await deleteUserPlant(authenticatedUserId, plantId);
    if (!deleted) {
      res.status(404).json({ error: "User plant not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the user plant" });
  }
};
