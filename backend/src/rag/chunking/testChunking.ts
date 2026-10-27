import path from 'path'
import { extractPdf } from '../pdf/extractPdf.js'
import { chunkText } from './chunkText.js'

async function main() {
  const pdfPath = path.resolve(
    'data/documents/RAG_Knowledge_Base/patent Rules, Guidelines ,Resources and Manuals',
    'manual of patent.pdf'
  )

  console.log('Reading PDF...\n')

  const result = await extractPdf(pdfPath)

  console.log(
    `Extracted characters: ${result.text.length}`
  )

  const chunks = chunkText(result.text)

  console.log(`Created chunks: ${chunks.length}\n`)

  console.log('========== FIRST 3 CHUNKS ==========\n')

  for (const chunk of chunks.slice(0, 3)) {
    console.log(`--- Chunk ${chunk.chunkIndex} ---`)
    console.log(`Characters: ${chunk.content.length}`)
    console.log(chunk.content.slice(0, 1000))
    console.log('\n')
  }
}

main().catch((error) => {
  console.error('Chunking failed:')
  console.error(error)
  process.exit(1)
})