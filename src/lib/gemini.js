import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the API Key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(API_KEY);

// Models to try in order — if the primary model's quota is hit, fall back
const MODELS = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash"];

// Retry configuration
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 2000;

/**
 * Sleeps for the given number of milliseconds.
 * @param {number} ms - Milliseconds to wait.
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extracts a retry delay (in ms) from a 429 error message, if present.
 * Falls back to the provided default delay.
 * @param {Error} error - The caught error.
 * @param {number} fallbackMs - Default delay if none found in the error.
 * @returns {number}
 */
function getRetryDelay(error, fallbackMs) {
  const match = error.message?.match(/retry\s*in\s*([\d.]+)s/i);
  if (match) {
    return Math.ceil(parseFloat(match[1]) * 1000);
  }
  return fallbackMs;
}

/**
 * Builds the roast prompt from the given parameters.
 */
function buildPrompt(code, language, mode, tone) {
  const persona =
    mode.toLowerCase() === "savage"
      ? `a sarcastic Indian Senior Developer who has seen too much 'spaghetti code' and is completely done with mediocrity. Use Indian dev slang (like 'beta', 'chai-sutta break', 'production phat jayega', 'Jugaad') where it fits naturally. You are funny, witty, and sharp.`
      : `a strict but helpful Mentor. You are firm about mistakes, you don't tolerate loose ends, but you genuinely want the student to learn and improve. You are professional and insightful.`;

  let intensityLevel = "";
  if (tone < 30) {
    intensityLevel =
      "relatively gentle and more constructive. Focus 80% on help and 20% on light poking.";
  } else if (tone < 70) {
    intensityLevel =
      "noticeably witty and sharp. Balance the roast and the help 50/50.";
  } else {
    intensityLevel =
      "absolutely brutal, ruthless, and hysterically mean. Maximum sarcasm. Don't hold back, but stay within the persona.";
  }

  return `
    System Persona: You are ${persona}.
    Current Context: You are roasting a piece of ${language} code.
    Roast Intensity: ${tone}/100 (${intensityLevel}).

    Analyze the following code:
    \`\`\`${language}
    ${code}
    \`\`\`

    Your response MUST follow this structure (using Markdown):
    1. 🔥 **The Roast**: A dedicated section for the funny, witty roast.
    2. 🐛 **Code Issues**: A bulleted list of actual technical flaws, anti-patterns, or performance bottlenecks.
    3. 💡 **Improvement Suggestions**: Strategic advice on how to fix the mess.
    4. 🚀 **The "Don't Be a Noob" Snippet**: A quick, clean, and optimized code snippet showing the better way.

    Keep the persona consistent in every section. If you are Savage, even your "Better Way" snippet should feel slightly condescending. If you are a Mentor, make the snippet feel like a masterclass.
  `;
}

/**
 * Attempts to generate content with a single model, retrying on 429 errors.
 * @param {string} modelName - The Gemini model identifier.
 * @param {string} prompt - The prompt to send.
 * @returns {Promise<string>} - The generated text.
 * @throws Will throw if all retries are exhausted or a non-retryable error occurs.
 */
async function tryModelWithRetry(modelName, prompt) {
  const model = genAI.getGenerativeModel({ model: modelName });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      const is429 =
        error.message?.includes("429") ||
        error.message?.toLowerCase().includes("quota") ||
        error.message?.toLowerCase().includes("rate");

      if (is429 && attempt < MAX_RETRIES) {
        const delay = getRetryDelay(error, BASE_DELAY_MS * Math.pow(2, attempt - 1));
        console.warn(
          `⏳ Rate limited on ${modelName} (attempt ${attempt}/${MAX_RETRIES}). Retrying in ${delay}ms...`
        );
        await sleep(delay);
        continue;
      }

      // Non-retryable or final attempt — rethrow
      throw error;
    }
  }
}

/**
 * Roasts the provided code using Gemini, with automatic retry & model fallback.
 *
 * @param {string} code - The source code to roast.
 * @param {string} language - The programming language of the code.
 * @param {string} mode - The roast mode ("Savage" or "Mentor").
 * @param {number} tone - The roast intensity (0–100).
 * @returns {Promise<string>} - The roasted text from Gemini.
 */
export async function roastCode(code, language, mode, tone) {
  if (!API_KEY || API_KEY === "your_key_here") {
    throw new Error(
      "Missing Gemini API Key. Please add VITE_GEMINI_API_KEY to your .env file."
    );
  }

  const prompt = buildPrompt(code, language, mode, tone);

  for (let i = 0; i < MODELS.length; i++) {
    const modelName = MODELS[i];
    try {
      console.log(`🤖 Trying model: ${modelName}...`);
      return await tryModelWithRetry(modelName, prompt);
    } catch (error) {
      console.error(`❌ ${modelName} failed:`, error.message);

      const isQuotaError =
        error.message?.includes("429") ||
        error.message?.toLowerCase().includes("quota") ||
        error.message?.toLowerCase().includes("rate") ||
        error.message?.toLowerCase().includes("limit");

      // If it's a quota error and there's a fallback model, try it
      if (isQuotaError && i < MODELS.length - 1) {
        console.warn(`🔄 Falling back to ${MODELS[i + 1]}...`);
        continue;
      }

      // Final failure — throw a user-friendly error
      const errorMessage = error.message?.toLowerCase() || "";
      if (
        errorMessage.includes("api_key_invalid") ||
        errorMessage.includes("invalid api key")
      ) {
        throw new Error(
          "Invalid API Key. Please verify your Gemini API key in the .env file."
        );
      } else if (isQuotaError) {
        throw new Error(
          "🚫 API quota exhausted on all models. Your free-tier daily limit has been reached. " +
            "Please wait a few minutes, or generate a new API key at https://aistudio.google.com/apikey"
        );
      }

      throw new Error(
        "The roast engine stalled! Gemini is probably crying over your code. Try again later."
      );
    }
  }
}
