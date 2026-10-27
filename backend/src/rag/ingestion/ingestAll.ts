import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

import { supabase } from '../../lib/supabase'
import { extractPdf } from '../pdf/extractPdf'
import { chunkText } from '../chunking/chunkText'
import { embedText } from '../embeddings/embedText'

const DATA_DIR = path.resolve(
  process.cwd(),
  'data',
  'documents',
  'RAG_Knowledge_Base'
)

const EMBEDDING_BATCH_SIZE = 50

interface PdfFile {
  filePath: string
  fileName: string
  folder: string
}

async function findPdfFiles(
  directory: string,
  parentFolder = ''
): Promise<PdfFile[]> {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  })

  const pdfFiles: PdfFile[] = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      const nestedFiles = await findPdfFiles(
        fullPath,
        parentFolder || entry.name
      )

      pdfFiles.push(...nestedFiles)
      continue
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
      pdfFiles.push({
        filePath: fullPath,
        fileName: entry.name,
        folder: parentFolder || 'Root',
      })
    }
  }

  return pdfFiles
}

function getDocumentType(fileName: string, folder: string): string {
  const text = `${fileName} ${folder}`.toLowerCase()

  if (text.includes('patent')) return 'Patent / IP'
  if (text.includes('tkdl') || text.includes('traditional knowledge')) {
    return 'Traditional Knowledge'
  }
  if (text.includes('biodivers')) return 'Biodiversity / ABS'
  if (text.includes('trade mark') || text.includes('trademark')) {
    return 'Trademark / IP'
  }
  if (text.includes('who')) return 'Health / Regulatory'
  if (
    text.includes('ayur') ||
    text.includes('e-aushadhi') ||
    text.includes('cosme')
  ) {
    return 'Ayurveda'
  }

  return 'Reference'
}

function getVersion(fileName: string): string | null {
  const match = fileName.match(/\b(20\d{2})\b/)

  return match ? match[1] : null
}

function createContentHash(buffer: Buffer): string {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest('hex')
}

async function insertInBatches<T>(
  table: string,
  rows: T[],
  batchSize = 100
): Promise<void> {
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)

    const { error } = await supabase
      .from(table)
      .insert(batch)

    if (error) {
      throw new Error(
        `Failed inserting into ${table}: ${error.message}`
      )
    }
  }
}

async function processPdf(pdf: PdfFile, index: number, total: number) {
  console.log('')
  console.log(
    `[${index}/${total}] ${pdf.fileName}`
  )

  // --------------------------------------------------
  // 1. Read file + create hash
  // --------------------------------------------------

  const buffer = await fs.readFile(pdf.filePath)

  const contentHash = createContentHash(buffer)

  // --------------------------------------------------
  // 2. Check whether document already exists
  // --------------------------------------------------

  const { data: existingDocument, error: lookupError } =
    await supabase
      .from('documents')
      .select('id, title')
      .eq('content_hash', contentHash)
      .maybeSingle()

  if (lookupError) {
    throw new Error(
      `Document lookup failed: ${lookupError.message}`
    )
  }

  if (existingDocument) {
    console.log('   ↳ Already ingested. Skipping.')
    return {
      skipped: true,
      chunks: 0,
      embeddings: 0,
    }
  }

  // --------------------------------------------------
  // 3. Extract PDF text
  // --------------------------------------------------

  console.log('   Extracting PDF text...')

  const parsedPdf = await extractPdf(pdf.filePath)

  if (!parsedPdf.text.trim()) {
    console.log('   ⚠ No text found. Skipping.')

    return {
      skipped: true,
      chunks: 0,
      embeddings: 0,
    }
  }

  console.log(
    `   ✓ Extracted ${parsedPdf.text.length.toLocaleString()} characters`
  )

  // --------------------------------------------------
  // 4. Create chunks
  // --------------------------------------------------

  const chunks = chunkText(parsedPdf.text, {
    maxCharacters: 5000,
    overlapCharacters: 500,
  })

  console.log(
    `   ✓ Created ${chunks.length} chunks`
  )

  if (chunks.length === 0) {
    return {
      skipped: true,
      chunks: 0,
      embeddings: 0,
    }
  }

  // --------------------------------------------------
  // 5. Insert document metadata
  // --------------------------------------------------

  const documentType = getDocumentType(
    pdf.fileName,
    pdf.folder
  )

  const version = getVersion(pdf.fileName)

  const { data: document, error: documentError } =
    await supabase
      .from('documents')
      .insert({
        title: pdf.fileName,
        source: pdf.folder,
        authority: pdf.folder,
        jurisdiction: 'To be classified',
        document_type: documentType,
        version,
        publication_date: null,
        file_path: pdf.filePath,
        content_hash: contentHash,
      })
      .select('id')
      .single()

  if (documentError || !document) {
    throw new Error(
      `Failed inserting document: ${
        documentError?.message || 'Unknown error'
      }`
    )
  }

  const documentId = document.id

  console.log('   ✓ Document metadata stored')

  // --------------------------------------------------
  // 6. Insert chunks
  // --------------------------------------------------

  const chunkRows = chunks.map((chunk) => ({
    document_id: documentId,
    chunk_index: chunk.chunkIndex,
    content: chunk.content,
    page_start: null,
    page_end: null,
  }))

  await insertInBatches(
    'chunks',
    chunkRows,
    100
  )

  console.log('   ✓ Chunks stored')

  // --------------------------------------------------
  // 7. Generate embeddings
  // --------------------------------------------------

  console.log('   Generating embeddings...')

  const embeddingRows: Array<{
    chunk_id: string
    embedding: number[]
  }> = []

  // Get the chunk IDs we just inserted
  const { data: insertedChunks, error: chunksError } =
    await supabase
      .from('chunks')
      .select('id, chunk_index')
      .eq('document_id', documentId)
      .order('chunk_index', { ascending: true })

  if (chunksError || !insertedChunks) {
    throw new Error(
      `Failed retrieving inserted chunks: ${
        chunksError?.message || 'Unknown error'
      }`
    )
  }

  for (
    let i = 0;
    i < chunks.length;
    i += EMBEDDING_BATCH_SIZE
  ) {
    const batch = chunks.slice(
      i,
      i + EMBEDDING_BATCH_SIZE
    )

    console.log(
      `   Embeddings ${i + 1}-${Math.min(
        i + batch.length,
        chunks.length
      )}/${chunks.length}`
    )

    for (const chunk of batch) {
      const embedding = await embedText(
        chunk.content
      )

      embeddingRows.push({
        chunk_id:
          insertedChunks[chunk.chunkIndex].id,
        embedding,
      })
    }
  }

  // --------------------------------------------------
  // 8. Store embeddings
  // --------------------------------------------------

  await insertInBatches(
    'embeddings',
    embeddingRows,
    100
  )

  console.log(
    `   ✓ Stored ${embeddingRows.length} embeddings`
  )

  return {
    skipped: false,
    chunks: chunks.length,
    embeddings: embeddingRows.length,
  }
}

async function main() {
  console.log('')
  console.log('======================================')
  console.log('🚀 IP-SAKTI RAG INGESTION')
  console.log('======================================')
  console.log('')

  console.log(`Knowledge base:`)
  console.log(DATA_DIR)
  console.log('')

  const pdfFiles = await findPdfFiles(DATA_DIR)

  console.log(
    `Found ${pdfFiles.length} PDF files`
  )

  if (pdfFiles.length === 0) {
    console.log(
      '❌ No PDF files found.'
    )
    return
  }

  let processedDocuments = 0
  let skippedDocuments = 0
  let totalChunks = 0
  let totalEmbeddings = 0
  let failedDocuments = 0

  for (let i = 0; i < pdfFiles.length; i++) {
    try {
      const result = await processPdf(
        pdfFiles[i],
        i + 1,
        pdfFiles.length
      )

      if (result.skipped) {
        skippedDocuments++
      } else {
        processedDocuments++
        totalChunks += result.chunks
        totalEmbeddings += result.embeddings
      }
    } catch (error) {
      failedDocuments++

      console.error(
        `   ❌ Failed: ${
          error instanceof Error
            ? error.message
            : String(error)
        }`
      )
    }
  }

  console.log('')
  console.log('======================================')
  console.log('✅ INGESTION COMPLETE')
  console.log('======================================')
  console.log(
    `Documents processed : ${processedDocuments}`
  )
  console.log(
    `Documents skipped   : ${skippedDocuments}`
  )
  console.log(
    `Chunks created      : ${totalChunks}`
  )
  console.log(
    `Embeddings stored   : ${totalEmbeddings}`
  )
  console.log(
    `Failed documents    : ${failedDocuments}`
  )
  console.log('======================================')
  console.log('')
}

main().catch((error) => {
  console.error('')
  console.error('❌ INGESTION FAILED')
  console.error(error)
  process.exit(1)
})