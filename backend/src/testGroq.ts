import { groq } from './lib/groq.js'

async function main() {
  console.log('Testing Groq...\n')

  const response = await groq.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    messages: [
      {
        role: 'user',
        content:
          'Explain in one sentence what Ayurveda is.',
      },
    ],
    temperature: 0.2,
  })

  const answer =
    response.choices[0]?.message?.content

  console.log('========== GROQ RESPONSE ==========\n')
  console.log(answer)
}

main().catch((error) => {
  console.error('\nGroq test failed:')
  console.error(error)
  process.exit(1)
})