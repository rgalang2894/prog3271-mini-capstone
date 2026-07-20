import { Request, Response } from "express";
import { findAllUsers } from "../models/userModel";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
