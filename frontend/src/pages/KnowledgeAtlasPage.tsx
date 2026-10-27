import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { SectionDivider } from '@/components/ui/SectionDivider'

/**
 * KnowledgeAtlasPage — Phase 1 placeholder.
 * Full chapter grid, part navigation and search will be built in Phase 4.
 */
export function KnowledgeAtlasPage() {
  return (
    <div className="bg-parchment min-h-screen">
      <div className="container-site py-16">
        <EyebrowLabel text="KNOWLEDGE ATLAS" color="gold" rule className="mb-6" />
        <h1 className="text-display-lg text-forest-dark mb-4">
          5,000 Years of Wisdom
        </h1>
        <p className="text-lg text-ink-muted max-w-2xl mb-4">
          A 30-chapter visual educational journey — from the origins of Ayurveda
          to the future of responsible innovation.
        </p>
        <SectionDivider label="30 CHAPTERS · 6 PARTS" className="my-8" />
        <div className="rounded-2xl bg-forest-light border border-forest-mid/20 p-10 text-center max-w-lg mx-auto">
          <span className="text-4xl mb-4 block" aria-hidden="true">📖</span>
          <h2 className="text-xl font-bold text-forest-dark mb-2">Coming in Phase 4</h2>
          <p className="text-sm text-ink-muted">
            The full chapter grid, part navigation, search and reading experience
            will be built in Phase 4.
          </p>
        </div>
      </div>
    </div>
  )
}
