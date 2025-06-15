import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chatinterface = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I’m your AI Interviewer. Ready when you are. You can begin whenever you feel prepared.',
    },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Thanks for your response.' },
      ]);
    }, 1200);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      
      <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">AI Interviewer</h1>
        <button
          onClick={() => navigate('/candidate/Candidatelogin')}
          className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded"
        >
          Exit
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">  
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[75%] text-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex items-center gap-2 bg-gray-50">
        <input
          type="text"
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your answer..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatinterface;
