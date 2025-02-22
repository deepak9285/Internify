import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate 10 multiple-choice questions on react js. 
    Each question should have 4 options with one correct answer.
    Format:
    [
      { "question": "What is React?", "options": ["Library", "Framework", "Language", "Database"], "answer": "Library" },
      ...
    ]`;

    const result = await model.generateContent(prompt);
    console.log(result);
    const content = await result.response.getContent();
    const questions = JSON.parse(content);

    return new Response(JSON.stringify({ questions }), { status: 200 });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "API Request Failed" }), { status: 500 });
  }
}
