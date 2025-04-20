import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.API_GEMI;
const port = process.env.PORT || 4000;

app.post('/generate', async (req, res) => {
    const { goal, level } = req.body;

    try {
        const response = await axios.post(  
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `I want to ${goal}. My current level is ${level}. Please give me a structured study roadmap with milestones, resources, and exercises.`
                            }
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

        console.log("💡 Gemini raw response:", JSON.stringify(response.data, null, 2));

        const generated = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no roadmap generated.";
        res.json({ roadmap: generated });

    } catch (error) {
        console.error("Error from Gemini API:", error.response?.data || error.message);
        if (error.response) {
            res.status(500).json({ error: error.response.data || error.message });
        } else {
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
});

app.listen(port, () => console.log(`✅ Server running on ${port}`));
