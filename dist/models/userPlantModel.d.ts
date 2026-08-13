export interface UserPlantInput {
    user_id: number;
    catalog_id?: number | null;
    custom_name: string;
    location?: string | null;
    last_watered?: string | null;
    image?: string | null;
}
export declare const findAllUserPlants: () => Promise<import("mysql2").QueryResult>;
export declare const findUserPlantsByUserId: (userId: number) => Promise<import("mysql2").QueryResult>;
export declare const findUserPlantById: (userId: number, plantId: number) => Promise<any>;
export declare const createUserPlant: (payload: UserPlantInput) => Promise<{
    id: any;
    user_id: number;
    catalog_id: number | null;
    custom_name: string;
    location: string | null;
    last_watered: string | null;
    image: string | null;
}>;
export declare const updateUserPlant: (id: number, payload: Partial<UserPlantInput>) => Promise<{
    user_id?: number;
    catalog_id?: number | null;
    custom_name?: string;
    location?: string | null;
    last_watered?: string | null;
    image?: string | null;
    id: number;
} | null>;
export declare const deleteUserPlant: (userId: number, plantId: number) => Promise<boolean>;
//# sourceMappingURL=userPlantModel.d.ts.map