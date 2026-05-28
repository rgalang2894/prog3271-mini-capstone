import express from "express";

const app = express();

const PORT = 3000;

// allow browser access to public folder
app.use(express.static("public"));

// fake database
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// API route
app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
