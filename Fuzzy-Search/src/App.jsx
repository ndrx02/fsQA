import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Fuzzy Search App</h1>
      <div>
        <label>Search:</label>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Results</h2>
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              {result.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
