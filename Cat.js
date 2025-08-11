const db = require("./index");

async function saveCat(imageUrl, fact) {
  // Check if this image or fact already exists
  const result = await db.query(
    `SELECT * FROM saved_cats WHERE image_url = $1 OR fact = $2`,
    [imageUrl, fact]
  );

  const exists = result.rows.find(
    (row) =>
      (imageUrl && row.image_url === imageUrl) || (fact && row.fact === fact)
  );

  if (exists) {
    throw new Error("Duplicate cat image or fact.");
  }

  const insertResult = await db.query(
    `INSERT INTO saved_cats (image_url, fact) VALUES ($1, $2) RETURNING *`,
    [imageUrl, fact]
  );

  return insertResult.rows[0];
}

async function getSavedCats() {
  const result = await db.query(
    `SELECT * FROM saved_cats ORDER BY saved_at DESC`
  );
  return result.rows;
}

module.exports = { saveCat, getSavedCats };
