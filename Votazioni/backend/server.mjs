import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Database "dummy" (array in memoria)
let voti = [
  { id: 1, nome: "Alice", voto: 5 },
  { id: 2, nome: "Bob", voto: 4 },
  { id: 3, nome: "Charlie", voto: 3 },
];

app.get("/api/voti", (req, res) => {
  res.status(200).json(voti);
});

app.post("/api/voti", (req, res) => {
  const nuovoVoto = { id: voti.length + 1, ...req.body };
  voti.push(nuovoVoto);
  res.status(201).json(nuovoVoto);
});

app.put("/api/voti/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const votoModificato = req.body;
  voti = voti.map((voto) => (voto.id === id ? votoModificato : voto));
  res.status(200).json(votoModificato);
});

app.delete("/api/voti/:id", (req, res) => {
  const id = parseInt(req.params.id);
  voti = voti.filter((voto) => voto.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
