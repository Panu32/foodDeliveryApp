import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiRecomm = ({ userId }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // ✅ Gemini instance
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(input);
      const reply = result.response.text();

      setMessages((prev) => [...prev, { from: "user", text: input }]);
      setMessages((prev) => [...prev, { from: "ai", text: reply }]);
      setInput("");
    } catch (error) {
      console.error("AI Error:", error);
    }
  };

  return (
    <div className="ai-recomm">
       {console.log("✅ AiRecomm rendered")}
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
