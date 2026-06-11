import express from "express";
import plantCatalogRoutes from "./routes/plantCatalogRoutes";
import storePlannerRoutes from "./routes/storePlannerRoutes";

const app = express();

const PORT = 3000;

// allow browser access to public folder
app.use(express.static("public"));

// middleware to parse JSON
app.use(express.json());

// fake database
const users = [
  { id: 1, name: "Snake Plant (Sansevieria trifasciata)" },
  { id: 2, name: "ZZ Plant (Zamioculcas zamiifolia)" },
  { id: 3, name: "Pothos (Epipremnum aurem)" },
];

// API route for users
app.get("/users", (req, res) => {
  res.json(users);
});

// Mount API routes
app.use("/plants", plantCatalogRoutes);
app.use("/store", storePlannerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
