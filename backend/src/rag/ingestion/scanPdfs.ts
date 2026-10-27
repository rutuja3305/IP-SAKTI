import fs from 'fs/promises'
import path from 'path'

export interface PdfFile {
  filePath: string
  fileName: string
  relativePath: string
  category: string
}

const KNOWLEDGE_BASE_DIR = path.resolve(
  'data/documents/RAG_Knowledge_Base'
)

async function walkDirectory(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  })

  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      const nestedFiles = await walkDirectory(fullPath)
      files.push(...nestedFiles)
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
      files.push(fullPath)
    }
  }

  return files
}

function getCategory(relativePath: string): string {
  const normalized = relativePath.toLowerCase()

  if (normalized.includes('cdsco') ||
      normalized.includes('drugs and cosmetics')) {
    return 'CDSCO / Drugs & Cosmetics'
  }

  if (normalized.includes('biodiversity') ||
      normalized.includes('nba')) {
    return 'National Biodiversity Authority'
  }

  if (normalized.includes('tkdl') ||
      normalized.includes('traditional knowledge')) {
    return 'Traditional Knowledge / TKDL'
  }

  if (normalized.includes('trade marks') ||
      normalized.includes('trademarks')) {
    return 'Trade Marks'
  }

  if (normalized.includes('ayush')) {
    return 'AYUSH'
  }

  if (normalized.includes('who')) {
    return 'WHO / Traditional Medicine'
  }

  if (normalized.includes('e-aushadhi')) {
    return 'E-Aushadhi'
  }

  if (normalized.includes('patent')) {
    return 'Patents / IP India'
  }

  return 'Other'
}

export async function scanPdfs(): Promise<PdfFile[]> {
  const absolutePaths = await walkDirectory(KNOWLEDGE_BASE_DIR)

  const pdfFiles: PdfFile[] = absolutePaths.map((filePath) => {
    const relativePath = path.relative(
      KNOWLEDGE_BASE_DIR,
      filePath
    )

    return {
      filePath,
      fileName: path.basename(filePath),
      relativePath,
      category: getCategory(relativePath),
    }
  })

  return pdfFiles.sort((a, b) =>
    a.fileName.localeCompare(b.fileName)
  )
}