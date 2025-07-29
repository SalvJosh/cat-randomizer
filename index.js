const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql:///cat_randomizer",
});

module.exports = db;
