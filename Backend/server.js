const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pgp = require("pg-promise")();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = pgp("postgres://postgres:password@localhost:5432/fuzzy_search_db");

db.none(`
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
  )
`);

app.get("/api/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const results = await db.any(
      `
      SELECT id, name
      FROM products
      WHERE name ~ $1
    `,
      [query]
    );

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
