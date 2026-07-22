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

// ADD DELETE FUNCTION HERE THAT DELETES FROM DATABASE WITH ERROR HANDLING
export declare const deleteUserPlant: (
  req: Request,
  res: Response,
) => Promise<void>;
