import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { SectionDivider } from '@/components/ui/SectionDivider'

/**
 * InnovationIntelligencePage — Phase 1 placeholder.
 * Full Innovation Twin analysis will be built in Phase 6.
 */
export function InnovationIntelligencePage() {
  return (
    <div className="bg-parchment min-h-screen">
      <div className="container-site py-16">
        <EyebrowLabel text="INNOVATION INTELLIGENCE" color="gold" rule className="mb-6" />
        <h1 className="text-display-lg text-forest-dark mb-4">
          Analyze Your Innovation
        </h1>
        <p className="text-lg text-ink-muted max-w-2xl mb-4">
          Understand patent risk, traditional knowledge overlap, ABS obligations
          and regulatory pathways — before you invest.
        </p>
        <SectionDivider className="my-8" />
        <div className="rounded-2xl bg-sky-tint border border-blue-200 p-10 text-center max-w-lg mx-auto">
          <span className="text-4xl mb-4 block" aria-hidden="true">💡</span>
          <h2 className="text-xl font-bold text-forest-dark mb-2">Coming in Phase 6</h2>
          <p className="text-sm text-ink-muted">
            The Innovation Twin — with risk radar, IP pathway suggestions and
            regulatory guidance — will be built in Phase 6.
          </p>
        </div>
      </div>
    </div>
  )
}
