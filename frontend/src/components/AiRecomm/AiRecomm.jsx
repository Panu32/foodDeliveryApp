import React, { useState } from "react";
import axios from "axios";

const AiRecomm = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:4000/api/ai/smart-search", {
        query,
      });

      setResponse(res.data.suggestion || "No matching food found.");
    } catch (error) {
      console.error("❌ AI search error:", error.response?.data || error.message);
      setResponse(
        error.response?.data?.error ||
          error.response?.data?.suggestion ||
          "⚠️ Something went wrong with Gemini AI."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search food with AI..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px",
            flex: 1,
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            border: "none",
            background: "#4CAF50",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {response && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#f4f4f4",
            borderRadius: "8px",
          }}
        >
          <strong>AI Suggestion:</strong>
          <p style={{ marginTop: "0.5rem" }}>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AiRecomm;
