import path from 'path'
import { extractPdf } from './extractPdf.js'

async function main() {
  const pdfPath = path.resolve(
    'data/documents/RAG_Knowledge_Base/patent Rules, Guidelines ,Resources and Manuals',
    'manual of patent.pdf'
  )

  console.log('Reading PDF:')
  console.log(pdfPath)

  const result = await extractPdf(pdfPath)

  console.log('\n========== PDF TEST ==========')
  console.log('Extracted characters:', result.text.length)
  console.log('Pages detected:', result.pages.length)

  console.log('\n========== TEXT PREVIEW ==========\n')
  console.log(result.text.slice(0, 2000))
}

main().catch((error) => {
  console.error('\nPDF extraction failed:')
  console.error(error)
  process.exit(1)
})