import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini client
const getClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY in .env file.');
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generates a professional bio based on a short prompt.
 * @param {string} prompt User's input about themselves
 * @returns {Promise<string>} The generated bio
 */
export const generateBio = async (prompt) => {
  try {
    const genAI = getClient();
    // Use gemini-1.5-flash as it is fast and free for most use cases in AI Studio
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    const systemInstruction = "You are an expert professional resume and portfolio writer. Your task is to take brief inputs from a user about their role and experience, and write a concise, engaging, and professional 2-3 sentence bio for their portfolio website. Do not include any greetings, formatting, or explanations, just return the raw bio text itself.";
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemInstruction}\n\nUser input: ${prompt}` }] }]
    });

    return result.response.text().trim();
  } catch (error) {
    console.error("Error generating bio:", error);
    throw error;
  }
};

/**
 * Suggests a list of skills based on a short prompt or role.
 * @param {string} prompt User's role or input
 * @returns {Promise<string[]>} Array of skill strings
 */
export const generateSkills = async (prompt) => {
  try {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    const systemInstruction = "You are an expert technical recruiter. Based on the user's role or input, suggest exactly 6 to 10 highly relevant skills (both technical and soft skills). Return ONLY a comma-separated list of the skills. No bullet points, no extra text, just the comma-separated string.";
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemInstruction}\n\nUser role/input: ${prompt}` }] }]
    });

    const skillsText = result.response.text();
    // Parse the comma-separated list into an array, clean up whitespace
    return skillsText.split(',').map(skill => skill.trim()).filter(Boolean);
  } catch (error) {
    console.error("Error generating skills:", error);
    throw error;
  }
};
