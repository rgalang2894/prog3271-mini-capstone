import { Request, Response } from "express";
import { createUser, verifyUserPassword } from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  try {
    const user = await createUser(name, email, password);
    return res.status(201).json({
      message: "User created successfully.",
      user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Email already registered.") {
      return res.status(409).json({ message: "Email already registered." });
    }

    return res.status(500).json({ message: "Failed to create user.", error: error instanceof Error ? error.message : String(error) });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email?.trim() || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await verifyUserPassword(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, secret || "default_secret", { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login successful.",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed." });
  }
};

// import { Request, Response } from "express";
// import { findAllUsers, createUser, verifyUserPassword } from "../models/userModel";

// export const getUsers = async (_req: Request, res: Response) => {
//   try {
//     const users = await findAllUsers();
//     res.json(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error instanceof Error ? error.message : "Failed to fetch users" });
//   }
// };


