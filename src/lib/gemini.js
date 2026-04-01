import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the API Key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Roasts the provided code snippets using Gemini 1.5 Flash.
 *
 * @param {string} code - The source code to roast.
 * @param {string} language - The programming language of the code.
 * @param {string} mode - The roast mode ("Savage" or "Mentor").
 * @param {number} tone - The roast intensity (0–100).
 * @returns {Promise<string>} - The roasted text from Gemini.
 */
export async function roastCode(code, language, mode, tone) {
  if (!API_KEY || API_KEY === "your_key_here") {
    throw new Error("Missing Gemini API Key. Please add GEMINI_API_KEY to your .env file.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Determine Persona based on mode
    const persona = mode.toLowerCase() === "savage" 
      ? `a sarcastic Indian Senior Developer who has seen too much 'spaghetti code' and is completely done with mediocrity. Use Indian dev slang (like 'beta', 'chai-sutta break', 'production phat jayega', 'Jugaad') where it fits naturally. You are funny, witty, and sharp.`
      : `a strict but helpful Mentor. You are firm about mistakes, you don't tolerate loose ends, but you genuinely want the student to learn and improve. You are professional and insightful.`;

    // Determine Intensity based on tone (0-100)
    let intensityLevel = "";
    if (tone < 30) {
      intensityLevel = "relatively gentle and more constructive. Focus 80% on help and 20% on light poking.";
    } else if (tone < 70) {
      intensityLevel = "noticeably witty and sharp. Balance the roast and the help 50/50.";
    } else {
      intensityLevel = "absolutely brutal, ruthless, and hysterically mean. Maximum sarcasm. Don't hold back, but stay within the persona.";
    }

    // Construct the prompt with specific sections
    const prompt = `
      System Persona: You are ${persona}.
      Current Context: You are roasting a piece of ${language} code.
      Roast Intensity: ${tone}/100 (${intensityLevel}).

      Analyze the following code:
      \`\`\`${language}
      ${code}
      \`\`\`

      Your response MUST follow this structure (using Markdown):
      1. 🔥 **The Roast**: A dedicated sections for the funny, witty roast.
      2. 🐛 **Code Issues**: A bulleted list of actual technical flaws, anti-patterns, or performance bottlenecks.
      3. 💡 **Improvement Suggestions**: Strategic advice on how to fix the mess.
      4. 🚀 **The "Don't Be a Noob" Snippet**: A quick, clean, and optimized code snippet showing the better way.

      Keep the persona consistent in every section. If you are Savage, even your "Better Way" snippet should feel slightly condescending. If you are a Mentor, make the snippet feel like a masterclass.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error("Gemini AI Roast Error:", error);
    
    const errorMessage = error.message.toLowerCase();
    if (errorMessage.includes("api_key_invalid") || errorMessage.includes("invalid api key")) {
      throw new Error("Invalid API Key. Please verify your Gemini API key in the .env file.");
    } else if (errorMessage.includes("quota") || errorMessage.includes("limit")) {
      throw new Error("API Quota exceeded. Please try again later.");
    }
    
    throw new Error("The roast engine stalled! Gemini is probably crying over your code. Try again later.");
  }
}
