/**
 * aiService.ts — Ayurveda AI service.
 *
 * Phase 1: returns mock responses from src/data/mockAIResponses.ts.
 * Future: replace mock block with apiPost('/api/v1/ai/ask').
 *
 * The UI never calls an LLM, vector DB, or embedding model directly.
 * All intelligence lives in FastAPI → RAG → LLM, invisible to the frontend.
 */

import type { AIMode, AIResponse, AIMessage } from '@/types'
import { USE_MOCK, mockDelay, apiPost, apiGet } from './apiClient'

// Session ID for grouping messages — generated once per browser session
let _sessionId: string | null = null
function getSessionId(): string {
  if (!_sessionId) {
    _sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  }
  return _sessionId
}

// Lazy load mock data — will be created in Phase 5
async function getMockResponse(question: string, mode: AIMode): Promise<AIResponse> {
  try {
    const mod = await import('@/data/mockAIResponses')
    return mod.getMockAIResponse(question, mode)
  } catch {
    // Fallback stub when Phase 5 data doesn't exist yet
    return {
      id:                      `mock-${Date.now()}`,
      question,
      mode,
      answer:
        'This is a placeholder response. Mock AI data will be added in Phase 5.',
      confidence:              'medium',
      humanReviewRecommended:  true,
      sources:                 [],
      evidenceMetadata:        { sourceCount: 0, jurisdiction: 'India', documentType: 'Stub' },
      relatedEntities:         [],
      disclaimer:
        'AI-assisted. Source-backed. Not a substitute for expert advice.',
      generatedAt:             new Date().toISOString(),
    }
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const aiService = {

  /**
   * Ask a question in a given mode.
   * Returns a structured AIResponse — never raw LLM output.
   */
  async ask(question: string, mode: AIMode): Promise<AIResponse> {
    if (USE_MOCK) {
      await mockDelay(900)
      return getMockResponse(question, mode)
    }

    return apiPost<AIResponse>('/api/v1/ai/ask', {
      question,
      mode,
      sessionId: getSessionId(),
    })
  },

  /**
   * Fetch query history for the authenticated user.
   * Protected endpoint — requires token in Authorization header.
   */
  async getHistory(): Promise<AIMessage[]> {
    if (USE_MOCK) {
      await mockDelay(400)
      return []   // history populated in Phase 5
    }
    return apiGet<AIMessage[]>('/api/v1/ai/history')
  },

  /**
   * Reset the client-side session ID (e.g. when user clicks "New conversation").
   */
  resetSession() {
    _sessionId = null
  },
}
