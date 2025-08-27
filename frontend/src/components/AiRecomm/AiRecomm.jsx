import React, { useState } from "react";
import axios from "axios";

const AiRecomm = ({ userId }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const response = await axios.post("http://localhost:4000/api/ai/chat", {
        message: input,
        userId,
      });

      const reply = response.data.reply;

      setMessages((prev) => [...prev, { from: "user", text: input }]);
      setMessages((prev) => [...prev, { from: "ai", text: reply }]);
      setInput("");
    } catch (error) {
      console.error("AI Error:", error);
    }
  };

  if (!userId) {
    return (
      <div className="ai-recomm">
        <h3>AI Chat (Beta)</h3>
        <p style={{ color: "red" }}>⚠️ Please log in to use the chat.</p>
      </div>
    );
  }

  return (
    <div className="ai-recomm">
      <h3>AI Chat (Beta)</h3>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index} className={msg.from}>
            <b>{msg.from === "user" ? "You:" : "AI:"}</b> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        placeholder="Ask me anything..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default AiRecomm;
