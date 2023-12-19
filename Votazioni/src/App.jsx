import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [voti, setVoti] = useState([]);
  const [nome, setNome] = useState('');
  const [voto, setVoto] = useState('');

  useEffect(() => {
    async function fetchVoti() {
      const response = await axios.get('http://localhost:3000/api/voti');
      setVoti(response.data);
    }

    fetchVoti();
  }, []);

  const inviaVoto = async () => {
    const nuovoVoto = { nome, voto: parseInt(voto) };
    const response = await axios.post('http://localhost:3000/api/voti', nuovoVoto);
    setVoti([...voti, response.data]);
    setNome('');
    setVoto('');
  };

  const modificaVoto = async (id, nuovoVoto) => {
    const response = await axios.put(`http://localhost:3000/api/voti/${id}`, nuovoVoto);
    setVoti(voti.map((v) => (v.id === id ? response.data : v)));
  };

  const eliminaVoto = async (id) => {
    await axios.delete(`http://localhost:3000/api/voti/${id}`);
    setVoti(voti.filter((v) => v.id !== id));
  };

  return (
    <div>
      <h1>Sistema di Voti</h1>
      <div>
        <label>Nome: </label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
        <label>Voto: </label>
        <input type="number" value={voto} onChange={(e) => setVoto(e.target.value)} />
      </div>
      <button onClick={inviaVoto}>Invia Voto</button>
      <h2>Voti Ricevuti</h2>
      <ul>
        {voti.map((voto) => (
          <li key={voto.id}>
            {`${voto.nome}: ${voto.voto}`}
            <button onClick={() => modificaVoto(voto.id, { nome: 'NuovoNome', voto: 99 })}>
              Modifica
            </button>
            <button onClick={() => eliminaVoto(voto.id)}>Elimina</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
