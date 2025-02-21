const axios = require("axios");

const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

async function generateText(prompt) {
    try {
        const response = await axios.post(GEMINI_API_URL, {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const result = response.data.candidates[0].content.parts[0].text;
        console.log("Gemini Response:", result);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

// Example usage
generateText("Write a short poem about the stars.");
