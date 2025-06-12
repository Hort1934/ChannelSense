import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/channel-sense", async (req, res) => {
  const { query } = req.body;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "API key not set." });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [
              { text: query }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Відповідь API повертає текст в response.data.candidates[0].content або подібному
    // За потреби подивись реальний формат у response.data
    const generatedText = response.data.candidates?.[0]?.content || "Немає відповіді.";

    res.json({ result: generatedText });
  } catch (error: any) {
    console.error("Помилка при зверненні до Gemini API:", error.response?.data || error.message || error);
    res.status(500).json({ error: "Помилка під час виклику Gemini API." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
