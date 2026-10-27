import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { SectionDivider } from '@/components/ui/SectionDivider'

/**
 * AboutPage — Phase 1 placeholder.
 * Full About content will be built in Phase 7.
 */
export function AboutPage() {
  return (
    <div className="bg-parchment min-h-screen">
      <div className="container-site py-16">
        <EyebrowLabel text="ABOUT IP-SAKTI SAHAYAK" color="gold" rule className="mb-6" />
        <h1 className="text-display-lg text-forest-dark mb-4">
          Our Mission
        </h1>
        <p className="text-lg text-ink-muted max-w-2xl mb-2">
          IP-SAKTI Sahayak is built for SIH 2026 (Problem Statement SIH26045).
        </p>
        <p className="text-ink-muted max-w-2xl mb-4">
          Enabling informed, responsible innovation in Ayurveda — rooted in Bharat,
          built for a healthier world.
        </p>
        <SectionDivider label="TRADITION · EVIDENCE · INNOVATION · IMPACT" className="my-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          {[
            { icon: '🌿', title: 'Traditional Knowledge', desc: 'Preserving and making accessible 5,000 years of Ayurvedic wisdom from classical texts and authoritative sources.' },
            { icon: '🔬', title: 'Scientific Validation', desc: 'Bridging classical knowledge with modern pharmacology, biotechnology and evidence-based research.' },
            { icon: '💡', title: 'Innovation Enablement', desc: 'Helping innovators understand IP landscape, regulatory requirements and responsible commercialization pathways.' },
            { icon: '🌍', title: 'A Healthier Tomorrow', desc: 'Rooted in Bharat. Built for the world. For a healthier, self-reliant India and a better global future.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <span className="text-3xl shrink-0 mt-1" aria-hidden="true">{icon}</span>
              <div>
                <h2 className="text-lg font-bold text-forest-dark mb-1">{title}</h2>
                <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
