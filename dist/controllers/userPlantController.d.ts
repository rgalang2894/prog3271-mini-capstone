import { Request, Response } from "express";
export declare const getUserPlants: (
  _req: Request,
  res: Response,
) => Promise<void>;
export declare const addUserPlant: (
  req: Request,
  res: Response,
) => Promise<void>;
//# sourceMappingURL=userPlantController.d.ts.map

// STRYFES SECTION
// ADD DELETE FUNCTION HERE THAT DELETES FROM DATABASE WITH ERROR HANDLING
// Delete a user plant by ID with express architecture
export declare const deleteUserPlant: (
  req: Request,
  res: Response,
) => Promise<void>;
