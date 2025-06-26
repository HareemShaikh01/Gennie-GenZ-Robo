import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://gennie-gen-z-robo-a94g.vercel.app",
    methods: ["POST"],
    credentials: true,
  })
);


const PORT = process.env.PORT || 3000;

// Load Gemini 1.5 Flash
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genai.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Gemini-compatible history format
let sessionHistory = [
    {
        role: "user",
        parts: [
            {
                text: `You're Gennie 🎮 — a Gen Z AI bot Be chill and funny.`,
            },
        ],
    },
];

app.get('/', (req, res) => {
    res.send('Welcome to Gennie\'s API! 🤖')        
});

// Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { msg } = req.body;

        // Add user message in Gemini format
        sessionHistory.push({
            role: "user",
            parts: [{ text: msg }],
        });

        // Trim history if needed
        const MAX_HISTORY = 10;
        if (sessionHistory.length > MAX_HISTORY * 2 + 1) {
            sessionHistory = [
                sessionHistory[0], // prompt
                ...sessionHistory.slice(-MAX_HISTORY * 2),
            ];
        }

        // Call Gemini API
        const result = await model.generateContent({ contents: sessionHistory });
        const reply = result.response.text();

        // Add Gennie's reply
        sessionHistory.push({
            role: "model",
            parts: [{ text: reply }],
        });

        // Send back
        console.log("🧠 Gennie's Response:", reply);
        res.status(200).json({ reply });

    } catch (error) {
        console.error("❌ Gemini Error:", error.message);
        res.status(500).json({
            reply: "Sorry bro, I got down",
            error: "Something went wrong while talking to Gennie 😢",
            details: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Gennie's server running on http://localhost:${PORT}`);
});
