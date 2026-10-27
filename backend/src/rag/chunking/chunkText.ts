export interface TextChunk {
  chunkIndex: number
  content: string
}

interface ChunkOptions {
  maxCharacters?: number
  overlapCharacters?: number
}

export function chunkText(
  text: string,
  options: ChunkOptions = {}
): TextChunk[] {
  const maxCharacters = options.maxCharacters ?? 5000
  const overlapCharacters = options.overlapCharacters ?? 500

  const cleanedText = text
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  if (!cleanedText) {
    return []
  }

  const chunks: TextChunk[] = []

  let start = 0
  let chunkIndex = 0

  while (start < cleanedText.length) {
    let end = Math.min(
      start + maxCharacters,
      cleanedText.length
    )

    if (end < cleanedText.length) {
      const paragraphBreak = cleanedText.lastIndexOf(
        '\n\n',
        end
      )

      const sentenceBreak = cleanedText.lastIndexOf(
        '. ',
        end
      )

      if (paragraphBreak > start + maxCharacters * 0.6) {
        end = paragraphBreak
      } else if (sentenceBreak > start + maxCharacters * 0.6) {
        end = sentenceBreak + 1
      }
    }

    const content = cleanedText
      .slice(start, end)
      .trim()

    if (content.length > 0) {
      chunks.push({
        chunkIndex,
        content,
      })

      chunkIndex++
    }

    if (end >= cleanedText.length) {
      break
    }

    start = Math.max(
      end - overlapCharacters,
      start + 1
    )
  }

  return chunks
}