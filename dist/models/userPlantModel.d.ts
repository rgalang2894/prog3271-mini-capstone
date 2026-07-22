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

// DELETE FUNCTION THAT DELETES FROM DATABASE WITH ERROR HANDLING
export declare const deleteUserPlant: (id: number) => Promise<void>;
