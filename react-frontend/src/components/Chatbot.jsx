import React, { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const botResponses = [
    "How can I assist you?",
    "Could you tell me more?",
    "I'm here to help!",
    "Let me assist you with that.",
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setTimeout(() => {
      setMessages([...messages, { text: input, sender: "user" }, { text: botResponses[Math.floor(Math.random() * botResponses.length)], sender: "bot" }]);
    }, 1000);
    setInput("");
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Ask something..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;