import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

if (!GEMINI_API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not set in the environment variables")
}

export async function chatWithGemini(prompt: string): Promise<string> {
  try {
    const model = createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY })("gemini-pro")
    const { text } = await generateText({
      model,
      prompt,
    })
    return text
  } catch (error) {
    console.error("Error chatting with Gemini:", error)
    throw new Error("Failed to generate response from Gemini")
  }
}
// 4 streak
