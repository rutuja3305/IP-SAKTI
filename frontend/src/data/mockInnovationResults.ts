/**
 * mockInnovationResults.ts — pre-written mock innovation analysis results.
 *
 * Phase 1: empty stub so the project builds.
 * Full mock results will be written in Phase 6.
 */
import type { InnovationInput, InnovationAnalysisResult } from '@/types'

const STUB_RISK = { level: 'medium' as const, score: 50, summary: 'Stub data — Phase 6 pending.', evidence: [] }

export function getMockInnovationResult(input: InnovationInput): InnovationAnalysisResult {
  return {
    queryId:                  `query-${Date.now()}`,
    innovationTitle:          input.productTypeCustom ?? input.productType,
    risks: {
      patent:               STUB_RISK,
      traditionalKnowledge: STUB_RISK,
      abs:                  { ...STUB_RISK, level: 'low', score: 20 },
      regulatory:           STUB_RISK,
      internationalMarket:  { ...STUB_RISK, level: 'low', score: 30 },
    },
    ipPathways:               [],
    regulatoryConsiderations: [],
    tkdlMatches:              [],
    recommendedNextSteps:     ['Full mock data coming in Phase 6.'],
    confidence:               'low',
    disclaimer:
      'AI-assisted preliminary assessment. Not a legal determination.',
    generatedAt:              new Date().toISOString(),
  }
}
