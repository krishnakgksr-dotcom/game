
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const gameDataSchema = {
  type: Type.OBJECT,
  properties: {
    word: {
      type: Type.STRING,
      description: "A single, common, lowercase word related to the category. Should not be a proper noun unless the category is 'Famous People'.",
    },
    clue: {
      type: Type.STRING,
      description: "A short, clever clue for the word. The clue should not contain the word itself.",
    },
  },
  required: ["word", "clue"],
};

export const getNewGameData = async (category: string): Promise<{ word: string; clue: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a new game for a word guessing game. The category is "${category}". Please provide a single word and one clue for it. The word should be appropriate for a general audience.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: gameDataSchema,
      },
    });

    const jsonString = response.text.trim();
    const data = JSON.parse(jsonString);

    if (typeof data.word === 'string' && typeof data.clue === 'string') {
      return { word: data.word.toLowerCase(), clue: data.clue };
    } else {
      throw new Error("Invalid data format from API");
    }
  } catch (error) {
    console.error("Error fetching new game data:", error);
    throw new Error("Failed to start a new game. Please try again.");
  }
};

export const getNewClue = async (word: string, category: string, existingClues: string[]): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `The word to guess is "${word}" from the category "${category}". The player already has these clues: ${existingClues.join(", ")}. Please provide a new, different clue. The clue must not contain the word "${word}".`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching new clue:", error);
    throw new Error("Failed to get a new clue. Please try again.");
  }
};
