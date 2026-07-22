import pool from "../db";

export interface UserPlantInput {
  user_id: number;
  catalog_id?: number | null;
  custom_name: string;
  location?: string | null;
  last_watered?: string | null;
  image?: string | null;
}

export const findAllUserPlants = async () => {
  const [rows] = await pool.query("SELECT * FROM user_plants");
  return rows;
};

export const createUserPlant = async (payload: UserPlantInput) => {
  const { user_id, catalog_id, custom_name, location, last_watered, image } =
    payload;

  const [result]: any = await pool.query(
    "INSERT INTO user_plants (user_id, catalog_id, custom_name, location, last_watered, image) VALUES (?, ?, ?, ?, ?, ?)",
    [
      user_id,
      catalog_id ?? null,
      custom_name,
      location ?? null,
      last_watered ?? null,
      image ?? null,
    ],
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
};

export const updateUserPlant = async (
  id: number,
  payload: Partial<UserPlantInput>,
) => {
  const entries = Object.entries(payload).filter(
    ([, value]) => value !== undefined,
  );

  if (entries.length === 0) {
    return null;
  }

  const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
  const values = entries.map(([, value]) => value ?? null);

  const [result]: any = await pool.query(
    `UPDATE user_plants SET ${setClause} WHERE id = ?`,
    [...values, id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return { id, ...payload };
};

export const deleteUserPlant = async (id: number) => {
  const [result]: any = await pool.query(
    "DELETE FROM user_plants WHERE id = ?",
    [id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return { id };
};
