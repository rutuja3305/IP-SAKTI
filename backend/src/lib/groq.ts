import Groq from 'groq-sdk'
import dotenv from 'dotenv'

dotenv.config()

const groqApiKey = process.env.GROQ_API_KEY

if (!groqApiKey) {
  throw new Error('GROQ_API_KEY is missing from .env')
}

export const groq = new Groq({
  apiKey: groqApiKey,
})