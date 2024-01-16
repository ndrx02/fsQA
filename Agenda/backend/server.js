import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Finta fonte di dati
let events = [
  { id: 1, title: "Meeting", date: "2024-01-10" },
  { id: 2, title: "Appointment", date: "2024-01-12" },
];

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.post("/api/events", (req, res) => {
  const { title, date } = req.body;
  const newEvent = { id: events.length + 1, title, date };
  events.push(newEvent);
  res.json(newEvent);
  console.log(events);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
