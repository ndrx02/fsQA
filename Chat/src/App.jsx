import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ text: '', sender: '' });

  useEffect(() => {
    fetch('http://localhost:3001/api/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage({ ...newMessage, [name]: value });
  };

  const handleSubmit = () => {
    fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages([...messages, data]);
        setNewMessage({ text: '', sender: '' });
      });
  };

  return (
    <div className="App">
      <h1>Chat Application</h1>
      <div className="chat-box">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.sender}: </strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          name="sender"
          placeholder="Your Name"
          value={newMessage.sender}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="text"
          placeholder="Type your message"
          value={newMessage.text}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default App;
