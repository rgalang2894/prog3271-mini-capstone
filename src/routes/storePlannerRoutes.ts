// Store planner routes for managing store inventory and planning endpoints
// Items currently do not exist in their respective controller so it's throwing errors but the routes are set up.
import express, { Request, Response } from "express";
import {
  getAllInventory,
  getInventoryById,
  getInventoryByCategory,
  searchInventory,
  getLowStockItems,
  addInventoryItem,
  updateInventoryItem,
  updateQuantity,
  deleteInventoryItem,
  getStoreDetails,
  updateStoreDetails,
  getInventorySummary,
} from "../controllers/storePlannerControllers";

const router = express.Router();

// Inventory endpoints
// GET/Get all inventory items
router.get("/inventory", getAllInventory);

// GET/Searh inventory items by name
router.get("/inventory/search", searchInventory);

// GET/Get filtered items
router.get("/inventory/category", getInventoryByCategory);

// GET/Get low stock inventory items
router.get("/inventory/low-stock", getLowStockItems);

// GET/Get specific inventory item by ID
router.get("/inventory/:id", getInventoryById);

// POST/Add new inventory item
router.post("/inventory", addInventoryItem);

// PUT/Update inventory item
router.put("/inventory/:id", updateInventoryItem);

// DELETE/Remove inventory item
router.delete("/inventory/:id", deleteInventoryItem);

// Store details endpoints
// GET/Get store information
router.get("/details", getStoreDetails);

// PUT/Update store information
router.put("/details", updateStoreDetails);

// Store planning endpoints
// GET/Get inventory summary
router.get("/summary", getInventorySummary);

export default router;
