import { GoogleGenAI, Type } from "@google/genai";
import { TravelPackage } from "../types";
import { MOCK_PACKAGES } from "../constants";

// In a real app, this would be more complex. Here we use Gemini to parse intent 
// and map it to our mock database or generate suggestions.

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiTravelSuggestions = async (userQuery: string): Promise<TravelPackage[]> => {
  try {
    const model = "gemini-3-flash-preview";
    
    // We ask Gemini to analyze the "vibe" and return matching IDs from our catalog
    // or hallucinate new valid JSON entries if it were a real dynamic backend.
    // For this demo, we'll ask it to pick the best matches from our MOCK list descriptions.
    
    const availableDestinations = MOCK_PACKAGES.map(p => ({
      id: p.id,
      destination: p.destination,
      tags: p.tags
    }));

    const prompt = `
      You are an expert travel agent AI. The user is searching for a trip with this description: "${userQuery}".
      
      Here is the list of available packages:
      ${JSON.stringify(availableDestinations)}
      
      Return a JSON object containing an array of 'recommendedIds' that best match the user's vibe (e.g., romantic, beach, cheap, family).
      Also return a short 'reasoning' string explaining why.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            reasoning: { type: Type.STRING }
          }
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    const ids = result.recommendedIds || [];
    
    // Filter mock packages based on AI recommendation
    const suggestions = MOCK_PACKAGES.filter(pkg => ids.includes(pkg.id));
    
    // Fallback if AI returns nothing suitable (or empty list)
    return suggestions.length > 0 ? suggestions : MOCK_PACKAGES;

  } catch (error) {
    console.error("AI Search Error:", error);
    // Fallback to all packages on error
    return MOCK_PACKAGES;
  }
};