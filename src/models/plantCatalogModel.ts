import pool from "../db";

export const findAllPlantCatalogItems = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM plant_catalog");
    return rows;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch plant catalog items from database: ${detail}`);
  }
};
