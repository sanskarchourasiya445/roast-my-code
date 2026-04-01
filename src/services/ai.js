import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const roastCode = async (params) => {
  const { code, language, mode, tone } = params;

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: mode === 'savage' 
      ? `You are a savage, brutal, and hilarious AI code reviewer. Your goal is to absolutely destroy the user's code with humor, sarcasm, and technical insights. 
         Intensity Scale (0-100): 0 is "Polite Critic", 50 is "Sarcastic Senior", 100 is "Digital Gordon Ramsay". 
         Current Intensity: ${tone}
         Keep it concise but devastating. Focus on bad patterns, performance, and readability.`
      : `You are a helpful but brutally honest Mentor AI. Your goal is to point out bad patterns and suggest better ways to write the code. 
         Be educational but don't sugarcoat it. 
         Current Intensity (Tone): ${tone} out of 100.
         Focus on best practices, modern syntax, and clean code principles.`,
  });

  const prompt = `Roast this ${language} code snippet:
  
  \`\`\`${language}
  ${code}
  \`\`\`
  
  Provide your feedback as a single, coherent response. Do not use markdown headers like "The Roast:". Just give me the burn or the advice directly.`;

  try {
    const result = await model.generateContentStream(prompt);
    return result.stream;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
