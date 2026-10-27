/**
 * mockAIResponses.ts — pre-written mock AI responses.
 *
 * Phase 1: empty stub so the project builds.
 * Full mock responses will be written in Phase 5.
 */
import type { AIResponse, AIMode } from '@/types'

export function getMockAIResponse(question: string, mode: AIMode): AIResponse {
  return {
    id:                     `mock-${Date.now()}`,
    question,
    mode,
    answer:                 'Mock AI response — full data coming in Phase 5.',
    confidence:             'medium',
    humanReviewRecommended: true,
    sources:                [],
    evidenceMetadata:       { sourceCount: 0, jurisdiction: 'India', documentType: 'Stub' },
    relatedEntities:        [],
    disclaimer:
      'AI-assisted. Source-backed. Not a substitute for expert advice.',
    generatedAt:            new Date().toISOString(),
  }
}
