import { useState } from 'react';
import Sidebar from './components/Sidebar';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages(prev => [...prev, { role: 'user', content: input }, { role: 'assistant', content: data.reply }]);
    setInput('');
  }

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <h1>CPRGPT</h1>
        <div>
          {messages.map((msg, i) => (
            <p key={i}><strong>{msg.role}:</strong> {msg.content}</p>
          ))}
        </div>
        <div style={{ display:'flex', gap:8, marginTop:8 }}>
          <input style={{ flex:1 }} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something..." />
          <button onClick={sendMessage}>Send</button>
        </div>
      </main>
    </div>
  );
}

export default App;
