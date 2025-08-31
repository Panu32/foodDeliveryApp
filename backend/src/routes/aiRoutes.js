import express from "express";
import axios from "axios";
import Food from "../models/foodModel.js";

const router = express.Router();

// ✅ POST route for AI-powered "smart-search"
router.post("/smart-search", async (req, res) => {
  try {
    const { query } = req.body; // Extract user input from request body

    // If query is missing → return error
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // ✅ Fetch the entire food menu from MongoDB "foods" collection
    const foods = await Food.find({});

    // Convert MongoDB food data into a plain text format (name, category, price, description)
    // This text will be passed to Gemini as context (so AI knows your menu)
    const menuText = foods
      .map((f) => `${f.name} (${f.category}) - ₹${f.price}: ${f.description}`)
      .join("\n");

    // ✅ Hidden system prompt (instructions for Gemini AI)
    // This defines how AI should behave:
    // - Friendly assistant
    // - Handle Hinglish (Hindi + English mix)
    // - Understand vague terms like "chatpata", "light", "under 200 rupees"
    // - If user just greets or jokes, respond naturally (not only about food)
    const hiddenPrompt = `
You are a **friendly AI assistant** for a food delivery app.  

### Rules:
1. If the user asks about food/menu/prices/categories/taste → recommend dishes from the menu.  
   - Understand **Hindi + English mix (Hinglish)**.  
   - If user says "chatpata", "light", "spicy", "sweet", "under 200 rupees", etc. → suggest matching foods from menu.  
   - If exact match not found, suggest **closest alternatives**.  

2. If the user is casual (hi, hello, thanks, bye, jokes, questions, or anything random) → respond naturally like a human, not only about food.  

3. Always keep answers short, clear, and friendly.  

### Menu:
${menuText}
`;

    let suggestion = ""; // This will hold AI's reply

    try {
      // ✅ Call Gemini API
      // We send:
      // 1. hiddenPrompt (system instructions)
      // 2. query (user's actual input)
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: hiddenPrompt }, { text: query }],
            },
          ],
        }
      );

      // Extract AI's response text
      suggestion =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't get a valid AI response.";
    } catch (err) {
      // If Gemini API fails, log the error & return fallback message
      console.error("❌ Gemini API error:", err.response?.data || err.message);
      suggestion = `⚠️ Gemini API failed: ${
        err.response?.data?.error?.message || err.message
      }`;
    }

    // ✅ Send AI's suggestion back to frontend
    res.json({ suggestion });
  } catch (error) {
    // Handle unexpected server errors
    console.error("AI Route error:", error.message);
    res.status(500).json({ error: "AI suggestion failed" });
  }
});

export default router;
