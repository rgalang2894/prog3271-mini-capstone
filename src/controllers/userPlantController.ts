import { Request, Response } from "express";
import {
  createUserPlant,
  deleteUserPlant,
  findAllUserPlants,
  updateUserPlant,
} from "../models/userPlantModel";

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
    const { user_id, catalog_id, custom_name, location, last_watered, image } =
      req.body;

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
    res
      .status(500)
      .json({ error: "Failed to add a new plant to your garden." });
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

// STRYFES SECTION
// Add the delete function here that deletes a specific plant from the database with error handling
export const removeUserPlant = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // Check if the provided ID is a valid integer (throw an error if it's not a number))
    if (!Number.isInteger(id)) {
      res.status(400).json({ error: "Valid plant ID is required" });
      return;
    }

    // Check if the provided ID is a positive integer
    if (id <= 0) {
      res.status(400).json({ error: "Plant ID must be a positive integer" });
      return;
    }

    // Call the delete function from the model to then delete it from the database
    const deletedPlant = await deleteUserPlant(id);

    // If the plant was NOT found in the database, throw a 404 error
    if (!deletedPlant) {
      res.status(404).json({ error: "User plant not found" });
      return;
    }

    // If the delete function was successful throw a success message along with the ID of the deleted plant
    // Status 200
    res.json({ message: "User plant deleted successfully", id });
  } catch (error) {
    // Error catch if the delete function fails
    res.status(500).json({ error: "Failed to delete the user plant" });
  }
};
