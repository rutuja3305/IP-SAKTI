import fs from 'fs/promises'
import { PDFParse } from 'pdf-parse'

export interface PdfPage {
  pageNumber: number
  text: string
}

export interface ParsedPdf {
  text: string
  pages: PdfPage[]
}

export async function extractPdf(filePath: string): Promise<ParsedPdf> {
  const buffer = await fs.readFile(filePath)

  const parser = new PDFParse({
    data: buffer,
  })

  const result = await parser.getText()

  await parser.destroy()

  return {
    text: result.text,
    pages: [],
  }
}