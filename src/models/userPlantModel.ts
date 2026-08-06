import pool from "../db";

export interface UserPlantInput {
  user_id: number;
  catalog_id?: number | null;
  custom_name: string;
  location?: string | null;
  last_watered?: string | null;
  image?: string | null;
}

const createDbError = (message: string, error: unknown) => {
  const detail = error instanceof Error ? error.message : String(error);
  return new Error(`${message}: ${detail}`);
};

export const findAllUserPlants = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM user_plants");
    return rows;
  } catch (error) {
    throw createDbError("Failed to fetch user plants", error);
  }
};

export const findUserPlantsByUserId = async (userId: number) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user_plants WHERE user_id = ?", [userId]);
    return rows;
  } catch (error) {
    throw createDbError("Failed to fetch user plants by user ID", error);
  }
};

export const createUserPlant = async (payload: UserPlantInput) => {
  const { user_id, catalog_id, custom_name, location, last_watered, image } = payload;

  if (!user_id || !custom_name) {
    throw new Error("user_id and custom_name are required to create a user plant");
  }

  try {
    const [result]: any = await pool.query(
      "INSERT INTO user_plants (user_id, catalog_id, custom_name, location, last_watered, image) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, catalog_id ?? null, custom_name, location ?? null, last_watered ?? null, image ?? null]
    );

    return {
      id: result.insertId,
      user_id,
      catalog_id: catalog_id ?? null,
      custom_name,
      location: location ?? null,
      last_watered: last_watered ?? null,
      image: image ?? null,
    };
  } catch (error) {
    throw createDbError("Failed to create user plant", error);
  }
};

export const updateUserPlant = async (id: number, payload: Partial<UserPlantInput>) => {
  const entries = Object.entries(payload).filter(([, value]) => value !== undefined);

  if (entries.length === 0) {
    return null;
  }

  const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
  const values = entries.map(([, value]) => value ?? null);

  try {
    const [result]: any = await pool.query(
      `UPDATE user_plants SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return { id, ...payload };
  } catch (error) {
    throw createDbError("Failed to update user plant", error);
  }
};