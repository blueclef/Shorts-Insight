
import { GoogleGenAI } from "@google/genai";
import type { ShortVideo } from '../types';

// IMPORTANT: This check is to prevent crashing in environments where process.env is not defined.
const apiKey = typeof process !== 'undefined' && process.env && process.env.API_KEY
  ? process.env.API_KEY
  : "YOUR_API_KEY_HERE"; // Fallback, though the app expects the env var to be set.

if (apiKey === "YOUR_API_KEY_HERE") {
    console.warn("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey });

export const generateSuccessFactorTag = async (video: ShortVideo): Promise<string> => {
    if (apiKey === "YOUR_API_KEY_HERE") {
        return "AI Insight Disabled";
    }
    
    const prompt = `
    Analyze this YouTube Shorts data and provide a very short, catchy success factor tag (max 3 words).
    Focus on the most likely reason for its success based on title and metrics.

    Data:
    - Title: "${video.title}"
    - Views: ${video.views.toLocaleString()}
    - Audience Retention: ${video.retention}%
    - Likes Ratio: ${video.likesRatio}%

    Example Tags: "Viral Trend", "Strong Hook", "Satisfying Content", "High Emotion", "Cute Animal", "Educational Bite".

    Generate only the tag itself, with no extra explanation.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 } // For low latency
            }
        });
        const text = response.text.trim().replace(/"/g, ''); // Clean up response
        return text || "Insightful Tag";
    } catch (error) {
        console.error("Error generating success factor tag:", error);
        return "AI Error";
    }
};
