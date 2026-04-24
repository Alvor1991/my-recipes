const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const DATA_FILE = path.join(__dirname, "recipes.json");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Load recipes
app.get("/api/recipes", (req, res) => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return res.json([]);
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to load recipes" });
  }
});

// Save recipes
app.post("/api/recipes", (req, res) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save recipes" });
  }
});

app.listen(3001, () => {
  console.log("Recipe server running on http://localhost:3001");
});