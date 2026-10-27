import { scanPdfs } from './scanPdfs.js'

async function main() {
  console.log('Scanning RAG knowledge base...\n')

  const pdfs = await scanPdfs()

  console.log(`Found ${pdfs.length} PDF files.\n`)

  for (const [index, pdf] of pdfs.entries()) {
    console.log(`${index + 1}. ${pdf.fileName}`)
    console.log(`   Category: ${pdf.category}`)
    console.log(`   Path: ${pdf.relativePath}`)
    console.log('')
  }
}

main().catch((error) => {
  console.error('PDF scanning failed:')
  console.error(error)
  process.exit(1)
})