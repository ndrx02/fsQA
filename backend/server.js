const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:password@localhost:5432/chat_db");

const app = express();
const port = 3001;

const setupDb = async () => {
  await db.none(`CREATE TABLE IF NOT EXISTS public.messages
    (
        id SERIAL NOT NULL PRIMARY KEY,
        text TEXT NOT NULL,
        sender TEXT NOT NULL
    );
    `);
};

setupDb();

app.use(bodyParser.json());
app.use(cors());

app.get("/api/messages", async (req, res) => {
  try {
    const messages = await db.any("SELECT * FROM public.messages");
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/messages", async (req, res) => {
  const { text, sender } = req.body;
  try {
    const newMessage = await db.one(
      "INSERT INTO public.messages(text, sender) VALUES($1, $2) RETURNING *",
      [text, sender]
    );
    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
