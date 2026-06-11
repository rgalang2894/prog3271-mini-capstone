// Temporary user controllers for demonstrations
import { Request, Response } from "express";

// Get user information
export const getUserInfo = (req: Request, res: Response) => {
  const userId = req.params.userId;
  // Temporary user data
  const user = {
    id: userId,
    name: "John Doe",
    email: "John@gmail.com",
    password: "password123",
  };
  res.json(user);
};
