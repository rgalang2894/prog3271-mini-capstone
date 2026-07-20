import pool from "../db";

export interface UserPlantInput {
  user_id: number;
  catalog_id?: number | null;
  custom_name: string;
  location?: string | null;
  last_watered?: string | null;
}

export const findAllUserPlants = async () => {
  const [rows] = await pool.query("SELECT * FROM user_plants");
  return rows;
};

export const createUserPlant = async (payload: UserPlantInput) => {
  const { user_id, catalog_id, custom_name, location, last_watered } = payload;

  const [result]: any = await pool.query(
    "INSERT INTO user_plants (user_id, catalog_id, custom_name, location, last_watered) VALUES (?, ?, ?, ?, ?)",
    [user_id, catalog_id ?? null, custom_name, location ?? null, last_watered ?? null]
  );

  return {
    id: result.insertId,
    user_id,
    catalog_id: catalog_id ?? null,
    custom_name,
    location: location ?? null,
    last_watered: last_watered ?? null,
  };
};
