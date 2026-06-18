import express from "express";
import cors from "cors";

// Import route files.
// Each file exports a Router with its own set of endpoints.
import userRoutes from "./routes/userRoutes";
import userPlantRoutes from "./routes/userPlantRoutes"
import plantCatalogueRoutes from "./routes/plantCatalogueRoutes"
import remindersRoutes from "./routes/remindersRoutes"


// Create the Express application.
const app = express();

// ─── MIDDLEWARE ────────────────────────────────────────
// cors()         → allows requests from other origins (e.g. the React frontend)
// express.json() → parses JSON request bodies so req.body works
app.use(cors());
app.use(express.json());

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
app.use("/users", userRoutes);
app.use("/user-plants", userPlantRoutes);
app.use("/plant-catalogue", plantCatalogueRoutes);
app.use("/reminders", remindersRoutes);


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
