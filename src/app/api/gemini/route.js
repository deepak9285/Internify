import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyA8l7ivFdyYSygG_1vJJ6Gmr_WoOPVr0Fg');

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text;

    res.status(200).json({ text });
  } catch (error) {
    console.error("Error calling Gemini:", error);
    res.status(500).json({ error: error.message });
  }
}
