// Express router handling cat-related API endpoints.
const express = require("express");
const axios = require("axios");
const { saveCat, getSavedCats } = require("./Cat");
const router = express.Router();

// GET /api/cats/image
router.get("/image", async (req, res) => {
  try {
    const imgRes = await axios.get(
      "https://api.thecatapi.com/v1/images/search"
    );
    res.json({ image: imgRes.data[0].url });
  } catch (err) {
    console.error("Error fetching cat image:", err);
    res.status(500).json({ error: "Failed to fetch cat image" });
  }
});

// GET /api/cats/fact
router.get("/fact", async (req, res) => {
  try {
    const factRes = await axios.get("https://meowfacts.herokuapp.com/");
    res.json({ fact: factRes.data.data[0] });
  } catch (err) {
    console.error("Error fetching cat fact:", err);
    res.status(500).json({ error: "Failed to fetch cat fact" });
  }
});

router.post("/save", async (req, res) => {
  const { image, fact } = req.body;

  if (!image && !fact) {
    return res
      .status(400)
      .json({ error: "At least one of image or fact is required." });
  }

  try {
    const saved = await saveCat(image || null, fact || null);
    res.status(201).json(saved);
  } catch (err) {
    console.error("Save failed:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.get("/saved", async (req, res) => {
  try {
    const cats = await getSavedCats();
    res.json(cats);
  } catch (err) {
    console.error("Error fetching saved cats:", err);
    res.status(500).json({ error: "Failed to fetch saved cats" });
  }
});

const db = require("./index");

router.delete("/saved/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `DELETE FROM saved_cats WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cat not found" });
    }

    res.json({ deleted: result.rows[0].id });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
