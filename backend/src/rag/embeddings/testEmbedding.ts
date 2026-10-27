import { embedText } from './embedText.js'

async function main() {
  console.log('Testing embedding model...\n')

  const text =
    'Ayurvedic inventions involving biological material may require consideration of patent law, traditional knowledge and biodiversity regulations.'

  const embedding = await embedText(text)

  console.log('\n========== EMBEDDING TEST ==========')
  console.log('Vector dimensions:', embedding.length)
  console.log('First 10 values:')
  console.log(embedding.slice(0, 10))
}

main().catch((error) => {
  console.error('\nEmbedding test failed:')
  console.error(error)
  process.exit(1)
})