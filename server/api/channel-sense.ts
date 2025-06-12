import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/api/channel-sense", async (req, res) => {
  const { query } = req.body;

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: "API key not set." });
  }

  try {
    const prompt = `
      Ти — асистент для аналізу каналів Farcaster.
      Користувач запитав: "${query}"
      Дай коротку й точну відповідь українською мовою.
    `;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "Ти — помічник Farcaster каналу, відповідай стисло та українською." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7
      })
    });

    const data = await openaiResponse.json();

    const answer = data.choices?.[0]?.message?.content || "Немає відповіді.";

    res.json({ result: answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка під час виклику OpenAI API." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
