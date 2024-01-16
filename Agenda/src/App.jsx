import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '' });

  useEffect(() => {
    fetch('http://localhost:3001/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = () => {
    fetch('http://localhost:3001/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents([...events, data]);
        setNewEvent({ title: '', date: '' });
      });
  };

  return (
    <div className="App">
      <h1>Agenda</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.title} - {event.date}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newEvent.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Add Event</button>
      </div>
    </div>
  );
}

export default App;
