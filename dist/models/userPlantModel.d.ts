export interface UserPlantInput {
  user_id: number;
  catalog_id?: number | null;
  custom_name: string;
  location?: string | null;
  last_watered?: string | null;
}
export declare const findAllUserPlants: () => Promise<
  import("mysql2").QueryResult
>;
export declare const createUserPlant: (payload: UserPlantInput) => Promise<{
  id: any;
  user_id: number;
  catalog_id: number | null;
  custom_name: string;
  location: string | null;
  last_watered: string | null;
}>;
//# sourceMappingURL=userPlantModel.d.ts.map

// STRYFES SECTION
// Delete a user plant by ID
// Exports a function that deletes a user plant by ID from the database. ID is taken as a parameter and the function returns a promise that resolces when this function is completed.
export declare const deleteUserPlant: (id: number) => Promise<void>;
