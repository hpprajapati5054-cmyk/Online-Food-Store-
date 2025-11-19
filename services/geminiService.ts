
import { GoogleGenAI, Type } from '@google/genai';

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const dishSchema = {
  type: Type.OBJECT,
  properties: {
    dishName: {
      type: Type.STRING,
      description: 'A creative and appealing name for the dish.',
    },
    description: {
      type: Type.STRING,
      description: 'A short, enticing description (2-3 sentences) for a food menu.',
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: 'A list of 5-7 key ingredients for this dish.',
    },
    price: {
        type: Type.NUMBER,
        description: 'A realistic price for this dish in USD, between 12.00 and 35.00.'
    },
    category: {
        type: Type.STRING,
        description: 'A single category for the dish, like "Vegan", "Seafood", "Pasta", "Grill", "Dessert", etc.'
    }
  },
  required: ['dishName', 'description', 'ingredients', 'price', 'category'],
};

export const generateDishOfTheDay = async (preference?: string) => {
    if (!API_KEY) {
        // Mock response if API key is not available
        return {
            dishName: `Sunset Risotto with ${preference || 'Shrimp'} (Demo)`,
            description: `A creamy arborio rice risotto infused with saffron and roasted red pepper. This dish was generated with the preference: '${preference || 'none'}'. This is a mock response as the API key is not configured.`,
            ingredients: ["Arborio Rice", "Saffron", "Roasted Red Pepper", preference || "Shrimp", "Parmesan", "White Wine"],
            price: 24.50,
            category: "Seafood"
        };
    }
  
    const prompt = preference
      ? `Generate a creative, delicious-sounding main course dish for a modern restaurant menu, with a focus on this preference: "${preference}". It should be unique and sound very appealing.`
      : 'Generate a creative, delicious-sounding main course dish for a modern restaurant menu. It should be unique and sound very appealing.';

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: dishSchema,
                temperature: 0.9,
            },
        });

        const jsonText = response.text.trim();
        const dish = JSON.parse(jsonText);
        
        // Basic validation
        if (!dish.dishName || !dish.description || !dish.price) {
            throw new Error("Invalid format received from AI");
        }

        return dish;
    } catch (error) {
        console.error("Error generating dish from Gemini API:", error);
        throw new Error("Failed to generate dish. Please check the API key and connection.");
    }
};