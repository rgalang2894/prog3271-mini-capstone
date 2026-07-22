import pool from "../db";

export const findAllPlantCatalogItems = async () => {
  const [rows] = await pool.query("SELECT * FROM plant_catalog");
  return rows;
};
