/**
 * innovationService.ts — Innovation Intelligence service.
 *
 * Phase 1: returns mock results from src/data/mockInnovationResults.ts.
 * Future: replace mock block with apiPost('/api/v1/innovation/analyze').
 */

import type { InnovationInput, InnovationAnalysisResult } from '@/types'
import { USE_MOCK, mockDelay, apiPost, apiGet } from './apiClient'

// Lazy load mock data — will be created in Phase 6
async function getMockResult(input: InnovationInput): Promise<InnovationAnalysisResult> {
  try {
    const mod = await import('@/data/mockInnovationResults')
    return mod.getMockInnovationResult(input)
  } catch {
    // Fallback stub when Phase 6 data doesn't exist yet
    return {
      queryId:                  `query-${Date.now()}`,
      innovationTitle:          input.productTypeCustom ?? input.productType,
      risks: {
        patent:              { level: 'medium', score: 50, summary: 'Stub risk data — Phase 6 pending.', evidence: [] },
        traditionalKnowledge:{ level: 'medium', score: 50, summary: 'Stub risk data — Phase 6 pending.', evidence: [] },
        abs:                 { level: 'low',    score: 20, summary: 'Stub risk data — Phase 6 pending.', evidence: [] },
        regulatory:          { level: 'medium', score: 55, summary: 'Stub risk data — Phase 6 pending.', evidence: [] },
        internationalMarket: { level: 'low',    score: 30, summary: 'Stub risk data — Phase 6 pending.', evidence: [] },
      },
      ipPathways:              [],
      regulatoryConsiderations:[],
      tkdlMatches:             [],
      recommendedNextSteps:    ['Phase 6 mock data not yet loaded.'],
      confidence:              'low',
      disclaimer:
        'AI-assisted preliminary assessment. Not a legal determination. Consult qualified IP and regulatory professionals.',
      generatedAt:             new Date().toISOString(),
    }
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const innovationService = {

  /**
   * Analyze an innovation input — returns a full risk + IP analysis.
   */
  async analyze(input: InnovationInput): Promise<InnovationAnalysisResult> {
    if (USE_MOCK) {
      await mockDelay(1200)
      return getMockResult(input)
    }
    return apiPost<InnovationAnalysisResult>('/api/v1/innovation/analyze', input)
  },

  /**
   * Fetch past innovation analyses for the authenticated user.
   */
  async getHistory(): Promise<InnovationAnalysisResult[]> {
    if (USE_MOCK) {
      await mockDelay(400)
      return []   // history populated in Phase 6
    }
    return apiGet<InnovationAnalysisResult[]>('/api/v1/innovation/history')
  },
}
