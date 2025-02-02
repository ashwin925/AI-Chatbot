import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function chatWithGemini(prompt: string) {
  try {
    const { text } = await generateText({
      model: createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY })("gemini-pro"),
      prompt,
    })
    return text
  } catch (error) {
    console.error("Error chatting with Gemini:", error)
    throw error
  }
}

