import { Request, Response } from "express";
import { findAllUsers } from "../models/userModel";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch users" });
  }
};
