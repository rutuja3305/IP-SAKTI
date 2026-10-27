/**
 * knowledgeService.ts — Knowledge Atlas service.
 *
 * Phase 1: returns data directly from src/data/chapters.ts.
 * Future: replace mock blocks with apiGet('/api/v1/knowledge/...') calls.
 */

import type { Chapter, ChapterPart } from '@/types'
import { USE_MOCK, mockDelay, apiGet } from './apiClient'

// Lazy import — chapters.ts will be created in Phase 4
// For Phase 1 we return empty arrays so the build passes.
async function loadChapterData(): Promise<ChapterPart[]> {
  try {
    const mod = await import('@/data/chapters')
    return mod.CHAPTER_PARTS as ChapterPart[]
  } catch {
    return []
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const knowledgeService = {

  async getAllParts(): Promise<ChapterPart[]> {
    if (USE_MOCK) {
      await mockDelay(300)
      return loadChapterData()
    }
    return apiGet<ChapterPart[]>('/api/v1/knowledge/parts')
  },

  async getAllChapters(): Promise<Chapter[]> {
    if (USE_MOCK) {
      await mockDelay(300)
      const parts = await loadChapterData()
      return parts.flatMap((p) => p.chapters ?? [])
    }
    return apiGet<Chapter[]>('/api/v1/knowledge/chapters')
  },

  async getChapterById(id: string): Promise<Chapter | null> {
    if (USE_MOCK) {
      await mockDelay(300)
      const parts = await loadChapterData()
      const all   = parts.flatMap((p) => p.chapters ?? [])
      return all.find((c) => c.id === id) ?? null
    }
    return apiGet<Chapter>(`/api/v1/knowledge/chapters/${id}`)
  },

  async searchChapters(query: string): Promise<Chapter[]> {
    if (USE_MOCK) {
      await mockDelay(400)
      const parts   = await loadChapterData()
      const all     = parts.flatMap((p) => p.chapters ?? [])
      const q       = query.toLowerCase()
      return all.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t: string) => t.toLowerCase().includes(q)),
      )
    }
    return apiGet<Chapter[]>(`/api/v1/knowledge/chapters?query=${encodeURIComponent(query)}`)
  },
}
