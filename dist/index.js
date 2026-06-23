"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Import route files.
// Each file exports a Router with its own set of endpoints.
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const userPlantRoutes_1 = __importDefault(require("./routes/userPlantRoutes"));
// Create the Express application.
const app = (0, express_1.default)();
// ─── MIDDLEWARE ────────────────────────────────────────
// cors()         → allows requests from other origins (e.g. the React frontend)
// express.json() → parses JSON request bodies so req.body works
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ─── REGISTER ROUTES ──────────────────────────────────
// app.use(PREFIX, ROUTER)
//
// This line says: "For any request that starts with /users,
// hand it off to the userRoutes router."
//
// Inside userRoutes.ts:
//   router.get("/")   → becomes  GET  /users
//   router.post("/")  → becomes  POST /users
//
app.use("/users", userRoutes_1.default);
app.use("/user-plants", userPlantRoutes_1.default);
// ─── START SERVER ─────────────────────────────────────
app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
// import express from "express";
// const app = express();
// const PORT = 3000;
// // allow browser access to public folder
// app.use(express.static("public"));
// // fake database
// const users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" },
// ];
// // API route
// app.get("/users", (req, res) => {
//   res.json(users);
// });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
//# sourceMappingURL=index.js.map