const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const catRoutes = require("./cats");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// Register cat API routes
app.use("/api/cats", catRoutes);

// Fallback for frontend routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
