import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import heroImg from '@/assets/hero.png'
import heroSlide2 from '@/assets/hero-slide-2.jpg'
import heroSlide3 from '@/assets/hero-slide-3.jpg'

// ─── Logo mark (reused across sections) ──────────────────────────────────────
function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3C10 7 7 8 5 8c1 3 3.5 5 7 5.5V20" stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 3C14 7 17 8 19 8c-1 3-3.5 5-7 5.5" stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 14.5c0 2 1.8 3.5 4 4 2.2-.5 4-2 4-4" stroke="#1B3A2D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── What Brings You Here Carousel ───────────────────────────────────────────
const PERSONA_SLIDES = [
  [
    {
      icon: '🌿',
      bg: 'bg-forest-light',
      iconColor: 'text-forest-dark',
      title: 'Learn',
      subtitle: 'Explore Ayurveda',
      description:
        'Understand the basics, explore its history and evolution, and discover Ayurvedic knowledge for everyone.',
      cta: 'Explore Knowledge',
      to: '/knowledge',
    },
    {
      icon: '🤖',
      bg: 'bg-gold-light',
      iconColor: 'text-gold',
      title: 'Ask AI',
      subtitle: 'Get Trusted Answers',
      description:
        'Ask questions in natural language and get accurate, evidence-backed insights from reliable Ayurvedic sources.',
      cta: 'Ask a Question',
      to: '/ai',
    },
  ],
  [
    {
      icon: '💡',
      bg: 'bg-sky-tint',
      iconColor: 'text-blue-600',
      title: 'Innovate',
      subtitle: 'Analyze an Innovation',
      description:
        'Check IP possibilities, identify regulatory needs, and get AI-assisted insights for your Ayurvedic ideas.',
      cta: 'Analyze My Innovation',
      to: '/innovation-login',
    },
    {
      icon: '🛡️',
      bg: 'bg-violet-tint',
      iconColor: 'text-violet-700',
      title: 'Protect',
      subtitle: 'Understand IP & Regulation',
      description:
        'Learn about patents, ABS, biodiversity, and market compliance for responsible growth.',
      cta: 'Explore IP & Regulation',
      to: '/innovation-login',
    },
  ],
]

function WhatBringsYouHereCarousel() {
  const [slide, setSlide] = useState(0)
  const navigate = useNavigate()
  const trackRef = useRef<HTMLDivElement>(null)

  const totalSlides = PERSONA_SLIDES.length

  return (
    <section className="bg-parchment py-20 overflow-hidden">
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px flex-1 max-w-[80px] bg-gray-300" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">
              YOUR JOURNEY STARTS HERE
            </span>
            <span className="h-px flex-1 max-w-[80px] bg-gray-300" aria-hidden="true" />
          </div>
          <h2 className="font-display-serif text-display-md text-forest-dark mb-3">
            What brings you here?
          </h2>
          <p className="text-ink-muted text-base">Different people. A shared purpose.</p>
        </div>

        {/* Carousel track */}
        <div className="relative flex items-center gap-4">
          {/* Prev arrow */}
          <button
            onClick={() => setSlide((s) => Math.max(0, s - 1))}
            disabled={slide === 0}
            className="shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-ink-muted hover:text-forest-dark hover:border-forest-mid disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-card"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards — slide two at a time */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(calc(-${slide * 100}% - ${slide * 24}px))` }}
            >
              {PERSONA_SLIDES.map((pair, pairIdx) => (
                <div key={pairIdx} className="flex gap-6 min-w-full">
                  {pair.map((card) => (
                    <div
                      key={card.title}
                      className={`flex-1 ${card.bg} rounded-2xl p-8 flex flex-col gap-4 border border-black/5`}
                    >
                      <span className="text-4xl" aria-hidden="true">{card.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-forest-dark leading-tight">{card.title}</h3>
                        <p className={`text-sm font-semibold mt-0.5 ${card.iconColor}`}>{card.subtitle}</p>
                      </div>
                      <p className="text-sm text-ink-muted leading-relaxed flex-1">{card.description}</p>
                      <button
                        onClick={() => navigate(card.to)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-dark border border-forest-dark/30 rounded-full px-5 py-2 hover:bg-forest-dark hover:text-white hover:border-forest-dark transition-all duration-200 self-start"
                      >
                        {card.cta} <ArrowRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={() => setSlide((s) => Math.min(totalSlides - 1, s + 1))}
            disabled={slide === totalSlides - 1}
            className="shrink-0 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-ink-muted hover:text-forest-dark hover:border-forest-mid disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-card"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {PERSONA_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === slide
                  ? 'w-6 h-2.5 bg-forest-dark'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="text-right text-xs italic text-ink-muted mt-6 pr-2">
          "Ancient Knowledge. Modern Solutions. A Healthier Tomorrow."
        </p>
      </div>
    </section>
  )
}

// ─── Why It Matters Grid ─────────────────────────────────────────────────────
function WhyItMattersGrid() {
  const ITEMS = [
    {
      img: '🏛️',
      title: 'One Place,\nMultiple Pathways',
      desc: 'Instead of visiting multiple offices, portals and experts, get relevant Ayurvedic, IP and regulatory information in one platform.',
      accent: 'border-forest-mid/40',
    },
    {
      img: '📜',
      title: 'Built on\nAuthoritative Sources',
      desc: 'Information curated from trusted government sources such as Ministry of Ayush, IP India, TKDL and other official repositories.',
      accent: 'border-gold/40',
    },
    {
      img: '🔍',
      title: 'Evidence,\nNot Guesswork',
      desc: 'Get clear, source-cited information with jurisdiction and context, so you can make informed decisions.',
      accent: 'border-blue-300/60',
    },
    {
      img: '💡',
      title: 'Supporting\nResponsible Innovation',
      desc: 'Identify relevant IP and regulatory considerations early, and take the next step with confidence.',
      accent: 'border-forest-mid/40',
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="container-site">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px flex-1 max-w-[80px] bg-gray-200" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">WHY IP-SAKTI MATTERS</span>
            <span className="h-px flex-1 max-w-[80px] bg-gray-200" aria-hidden="true" />
          </div>
          <h2 className="font-display-serif text-display-md text-forest-dark mb-3">
            Bringing trusted knowledge within everyone's reach.
          </h2>
          <p className="text-ink-muted">Less fragmentation. More clarity. Greater impact.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 rounded-full bg-parchment flex items-center justify-center text-4xl shadow-card">
                {item.img}
              </div>
              <h3 className="text-base font-bold text-forest-dark whitespace-pre-line leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">{item.desc}</p>
              <span className={`block w-8 h-0.5 border-b-2 ${item.accent}`} aria-hidden="true" />
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">
            FROM FRAGMENTED INFORMATION TO A CONNECTED, EMPOWERED TOMORROW.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Editorial two-column section ────────────────────────────────────────────
function EditorialAboutSection() {
  return (
    <section className="bg-parchment py-20">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-muted mb-4">OUR ROOTS</p>
            <h2 className="font-display-serif text-display-sm text-forest-dark mb-5">What is Ayurveda?</h2>
            <p className="text-ink leading-relaxed mb-6">
              Ayurveda is an ancient Indian system of medicine with a documented history of over 5,000 years.
              The word "Ayurveda" means the "Science of Life." It takes a holistic approach to health,
              considering the physical, mental, spiritual and social well-being of an individual. Ayurveda
              focuses on maintaining health, preventing disease and promoting a balanced life. Its principles
              are preserved in classical texts such as the Charaka Samhita and Sushruta Samhita.
            </p>
            <p className="text-xs text-ink-muted border-t border-gray-200 pt-4">
              <span className="font-semibold">Source:</span> Ministry of AYUSH, Government of India
              <br />Annual Report 2017–18, Chapter 2.2 "Ayurveda System"
              <span className="inline-block ml-1 text-forest-mid">↗</span>
            </p>
          </div>

          {/* Divider */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true" />

          {/* Right */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-muted mb-4">EVOLVING TODAY</p>
            <h2 className="font-display-serif text-display-sm text-forest-dark mb-5">
              How is Ayurveda Evolving in this Era?
            </h2>
            <p className="text-ink leading-relaxed mb-6">
              Ayurveda is increasingly being studied using modern scientific methods. Research now integrates
              Ayurveda with fields such as physiology, pharmacology and pharmaceutical sciences. There is a
              growing focus on evidence generation, standardisation and validation of Ayurvedic principles and
              therapies. Emerging technologies like biotechnology, nanotechnology and data science are also being
              used to explore new possibilities. This convergence is helping translate traditional knowledge into
              innovative, evidence-based solutions for a healthier future.
            </p>
            <p className="text-xs text-ink-muted border-t border-gray-200 pt-4">
              <span className="font-semibold">Source:</span> CCRAS, Ministry of AYUSH, Government of India
              <br />Vision &amp; Mission | Fundamental Research Programme
              <span className="inline-block ml-1 text-forest-mid">↗</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── AI Preview section ───────────────────────────────────────────────────────
function BridgeSection() {
  const navigate = useNavigate()

  const PILLARS = [
    { icon: '📖', title: 'Explore Knowledge', desc: 'Learn from authentic Ayurvedic sources' },
    { icon: '🔬', title: 'Understand with Evidence', desc: 'Access research-backed insights' },
    { icon: '🌿', title: 'Create a Healthier Future', desc: 'Bridge tradition and modern science' },
    { icon: '⚖️', title: 'Navigate IP & Regulation', desc: 'Get guidance on legal and regulatory aspects' },
    { icon: '💡', title: 'Innovate Responsibly', desc: 'Analyze opportunities with AI' },
  ]

  return (
    <section className="bg-white py-20">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — video stub */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-muted mb-3">WATCH OUR STORY</p>
            <h2 className="font-display-serif text-display-sm text-forest-dark mb-3">
              A Bridge Between Heritage and Innovation
            </h2>
            <p className="text-sm text-ink-muted mb-6">
              A short video on how IP-SAKTI Sahayak empowers informed, responsible innovation.
            </p>

            {/* Actual IP-SAKTI video */}
            <div className="relative rounded-2xl overflow-hidden bg-forest-dark aspect-video">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                playsInline
              >
                <source
                  src="/videos/ip-sakti-story.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video element.
              </video>
            </div>
          </div>

          {/* Right — cycle diagram */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-muted mb-3">WHAT IP-SAKTI ENABLES</p>
            <h2 className="font-display-serif text-display-sm text-forest-dark mb-3">
              From Knowledge to Impact
            </h2>
            <p className="text-sm text-ink-muted mb-8">
              Explore. Understand. Innovate. Protect. For a healthier future.
            </p>

            {/* Pillars grid */}
            <div className="grid grid-cols-2 gap-4">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="bg-parchment rounded-xl p-4 border border-gray-200 hover:border-forest-mid/40 transition-colors"
                >
                  <span className="text-2xl mb-2 block" aria-hidden="true">{p.icon}</span>
                  <h3 className="text-sm font-bold text-forest-dark leading-snug mb-1">{p.title}</h3>
                  <p className="text-xs text-ink-muted leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom journey bar */}
        <div className="mt-14 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">
            <span>ANCIENT WISDOM</span>
            <ArrowRight size={14} />
            <span>MODERN SCIENCE</span>
            <ArrowRight size={14} />
            <span>REAL-WORLD IMPACT</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="container-site mt-10 text-center">
        <Button
          variant="primary"
          size="lg"
          icon={<ArrowRight size={16} />}
          iconPosition="right"
          onClick={() => navigate('/about')}
        >
          Learn More About IP-SAKTI
        </Button>
      </div>
    </section>
  )
}

// ─── Feature strip icons (SVG, matching reference images) ────────────────────
function FeatureIcon({ type }: { type: 'leaf' | 'beaker' | 'gear' | 'people' }) {
  const icons = {
    leaf: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    beaker: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 3h15" /><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
        <path d="M6 14h12" />
      </svg>
    ),
    gear: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
    people: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  }
  return icons[type]
}

const FEATURE_STRIP = [
  { icon: 'leaf'   as const, label: 'TRADITIONAL KNOWLEDGE' },
  { icon: 'beaker' as const, label: 'SCIENTIFIC VALIDATION' },
  { icon: 'gear'   as const, label: 'INNOVATION ENABLEMENT' },
  { icon: 'people' as const, label: 'A HEALTHIER TOMORROW'  },
]

// ─── Slide 2 — AI Research Desk composition (pure CSS/SVG) ───────────────────
function Slide2Visual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Warm research desk background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 60% 50%, #e8dfc8 0%, #d4c9a8 35%, #b8a87a 70%, #8a7a50 100%)',
        }}
        aria-hidden="true"
      />

      {/* Ambient warm light from window top-right */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 100% 0%, #fff8e1 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Book stack — left side (Charaka Samhita style) */}
      <div className="absolute left-8 bottom-0 top-16 flex items-end pb-6" aria-hidden="true">
        <div className="flex flex-col gap-0.5">
          {[
            { spine: '#5a3e1b', label: 'CHARAKA SAMHITA',    w: 88, h: 20 },
            { spine: '#4a3415', label: 'SUSRUTA SAMHITA',    w: 88, h: 20 },
            { spine: '#3d2c10', label: 'ASHTANGA HRIDAYA',   w: 88, h: 18 },
            { spine: '#5c4a22', label: 'BHAVAPRAKASHA',       w: 88, h: 18 },
            { spine: '#2d5a3a', label: 'Indian Medicinal Plants', w: 88, h: 16 },
          ].map((b) => (
            <div
              key={b.label}
              className="rounded-sm flex items-center justify-center"
              style={{
                width: `${b.w}px`,
                height: `${b.h}px`,
                background: `linear-gradient(to right, ${b.spine}, ${b.spine}cc)`,
                borderLeft: '3px solid rgba(255,255,255,0.15)',
                boxShadow: '2px 0 4px rgba(0,0,0,0.3)',
              }}
            >
              <span className="text-[7px] font-bold text-amber-100/80 tracking-wider px-1 truncate">
                {b.label}
              </span>
            </div>
          ))}
        </div>
        {/* Herbs/leaves spilling from behind books */}
        <div className="absolute -right-4 bottom-4 text-5xl opacity-80" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
          🌿
        </div>
      </div>

      {/* Mortar & pestle + herbs in foreground-centre */}
      <div className="absolute bottom-6 left-28 text-4xl flex gap-3 items-end" aria-hidden="true">
        <span style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.25))' }}>🫙</span>
        <span className="text-5xl" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.25))' }}>🌱</span>
      </div>

      {/* Laptop showing the AI interface */}
      <div className="absolute right-4 top-8 bottom-4 flex items-center" aria-hidden="true">
        <div className="relative" style={{ width: '320px' }}>
          {/* Screen bezel */}
          <div
            className="rounded-xl overflow-hidden border-4 border-gray-800 shadow-2xl"
            style={{ background: '#1a1a1a' }}
          >
            {/* Screen content — AI interface miniature */}
            <div className="bg-white" style={{ minHeight: '200px' }}>
              {/* Toolbar */}
              <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-3 py-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-forest-dark flex items-center justify-center">
                    <LogoMark size={10} />
                  </div>
                  <span className="text-[8px] font-bold text-forest-dark">IP-SAKTI – Sahayak</span>
                </div>
                <div className="flex gap-3 text-[7px] text-gray-400">
                  <span className="text-forest-dark font-semibold border-b border-forest-dark pb-px">Ayurveda AI</span>
                  <span>Knowledge Atlas</span>
                  <span>Saved</span>
                  <span>History</span>
                </div>
              </div>

              <div className="flex" style={{ minHeight: '170px' }}>
                {/* Left sidebar */}
                <div className="border-r border-gray-100 py-3 flex flex-col items-center gap-3" style={{ width: '44px' }}>
                  {[{ e: '💬', l: 'Ask', a: true }, { e: '🔭', l: 'Explore' }, { e: '✓', l: 'Verify' }, { e: '📚', l: 'Research' }, { e: '💡', l: 'Innovate' }].map(({ e, l, a }) => (
                    <div key={l} className={`flex flex-col items-center gap-0.5 ${a ? '' : 'opacity-40'}`}>
                      <span className="text-[10px]">{e}</span>
                      <span className="text-[6px] text-gray-500">{l}</span>
                    </div>
                  ))}
                </div>

                {/* Chat main */}
                <div className="flex-1 p-2.5">
                  {/* Query */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-4 h-4 rounded-full bg-gray-200 text-[7px] flex items-center justify-center">👤</div>
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[7px] text-gray-500">
                      What are the traditional uses of Ashwagandha?
                    </div>
                    <div className="w-4 h-4 rounded bg-forest-dark flex items-center justify-center">
                      <span className="text-white text-[7px]">→</span>
                    </div>
                  </div>

                  {/* Response */}
                  <div className="flex gap-1.5 mb-2">
                    <div className="w-4 h-4 rounded-full bg-forest-light flex items-center justify-center shrink-0">
                      <LogoMark size={9} />
                    </div>
                    <div>
                      <p className="text-[7px] font-bold text-forest-dark mb-0.5">IP-SAKTI Ayurveda AI</p>
                      <p className="text-[7px] text-gray-700 leading-tight">
                        Ashwagandha (<em>Withania somnifera</em>) is traditionally used for strengthening the body, enhancing vitality, reducing stress and anxiety, supporting mental function...
                      </p>
                    </div>
                  </div>

                  {/* Source chips */}
                  <div className="flex gap-1 flex-wrap mb-1.5">
                    {['Source 01', 'Source 02', 'Source 03'].map((s) => (
                      <span key={s} className="text-[6px] bg-blue-50 text-forest-dark px-1.5 py-0.5 rounded-full border border-blue-200">{s}</span>
                    ))}
                  </div>

                  {/* Categories */}
                  <div className="flex gap-1 flex-wrap">
                    {['Classical Texts', 'Peer-reviewed Research', 'Pharmacological Studies', 'Safety & Regulatory'].map((t) => (
                      <span key={t} className="text-[6px] bg-gray-50 border border-gray-200 rounded px-1 py-0.5 text-gray-500">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Evidence rail */}
                <div className="border-l border-gray-100 p-2 bg-gray-50/50" style={{ width: '80px' }}>
                  <p className="text-[6px] font-bold text-gray-600 uppercase tracking-wide mb-1.5">EVIDENCE</p>
                  {[{ l: 'Source', v: 'Auth. source' }, { l: 'Document', v: 'Ref.' }, { l: 'Jurisdiction', v: 'India' }, { l: 'Confidence', v: 'High', c: 'text-emerald-600' }, { l: 'Human Review', v: 'Recommended', c: 'text-blue-600' }].map(({ l, v, c }) => (
                    <div key={l} className="mb-1">
                      <p className="text-[5.5px] text-gray-400 font-medium">{l}</p>
                      <p className={`text-[6px] font-semibold ${c ?? 'text-gray-700'}`}>{v}</p>
                    </div>
                  ))}
                  <div className="mt-1.5 bg-forest-light rounded p-1">
                    <div className="w-full h-6 bg-forest-mid/20 rounded mb-0.5" />
                    <p className="text-[5.5px] font-bold text-forest-dark">Withania somnifera</p>
                    <p className="text-[5.5px] text-gray-500">Ashwagandha</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Laptop base/hinge */}
          <div className="w-full h-2 bg-gray-700 rounded-b-sm mx-auto" style={{ width: '110%', marginLeft: '-5%' }} />
          <div className="h-1 bg-gray-600 rounded-b-lg mx-auto" style={{ width: '130%', marginLeft: '-15%' }} />
        </div>
      </div>

      {/* Decorative watermark words — top left */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col gap-1 text-center select-none pointer-events-none opacity-20" aria-hidden="true">
        {['TRADITION', 'RESEARCH', 'TECHNOLOGY', 'BETTER HEALTH'].map((w) => (
          <span key={w} className="text-[11px] font-black tracking-[0.25em] text-forest-dark uppercase">{w}</span>
        ))}
      </div>

      {/* Ashwagandha root label at bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center pointer-events-none" aria-hidden="true">
        <p className="text-[9px] italic text-amber-900/60">Withania somnifera (Ashwagandha)</p>
      </div>
    </div>
  )
}

// ─── Slide 3 — Wisdom / Future cinematic background (pure CSS) ────────────────
function Slide3Visual() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Deep layered atmospheric background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, rgba(255,230,150,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 90% 60% at 80% 30%, rgba(200,180,100,0.3) 0%, transparent 50%),
            linear-gradient(175deg, #e8d5a3 0%, #c4a96b 20%, #8b7355 45%, #2d4a1e 65%, #1b3a2d 85%, #0d2415 100%)
          `,
        }}
      />

      {/* Sun glow / sunrise halo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,80,0.5) 0%, rgba(255,165,40,0.2) 30%, transparent 65%)',
          transform: 'translate(-50%, -40%)',
        }}
      />

      {/* Atmospheric haze / mist in middle ground */}
      <div
        className="absolute inset-x-0 top-1/3 h-1/3 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(240,220,180,0.25) 50%, transparent)',
        }}
      />

      {/* Temple silhouette — left side */}
      <div className="absolute left-0 bottom-0 h-4/5 w-48 pointer-events-none">
        <svg viewBox="0 0 200 400" className="w-full h-full" preserveAspectRatio="xMinYMax meet">
          <defs>
            <linearGradient id="templeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a2f15" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d1a0a" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Simplified temple shikhara silhouette */}
          <polygon points="100,10 120,80 140,90 155,130 165,135 170,160 175,165 178,200 22,200 25,165 30,160 35,135 45,130 60,90 80,80" fill="url(#templeGrad)" />
          <rect x="30" y="200" width="140" height="200" fill="url(#templeGrad)" />
          {/* Decorative horizontal bands */}
          <rect x="20" y="195" width="160" height="6" fill="#0d2415" opacity="0.8" />
          <rect x="10" y="230" width="180" height="4" fill="#0d2415" opacity="0.6" />
        </svg>
      </div>

      {/* Modern lab building — right side */}
      <div className="absolute right-0 top-1/4 bottom-0 w-52 pointer-events-none">
        <svg viewBox="0 0 220 300" className="w-full h-full" preserveAspectRatio="xMaxYMax meet">
          <defs>
            <linearGradient id="labGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2a4a35" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3a6a50" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          {/* Lab building rectangle with glass windows */}
          <rect x="20" y="40" width="180" height="260" fill="url(#labGrad)" rx="2" />
          {/* Glass panels / windows */}
          {[0,1,2,3].map(col => [0,1,2,3,4,5].map(row => (
            <rect
              key={`${col}-${row}`}
              x={28 + col * 44}
              y={55 + row * 40}
              width="36"
              height="30"
              fill="rgba(200,230,200,0.2)"
              rx="1"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
            />
          )))}
          {/* Lab coat figure suggestion */}
          <ellipse cx="80" cy="75" rx="8" ry="8" fill="rgba(255,255,255,0.35)" />
          <rect x="72" y="83" width="16" height="24" fill="rgba(255,255,255,0.3)" rx="2" />
          <ellipse cx="155" cy="80" rx="7" ry="7" fill="rgba(255,255,255,0.3)" />
          <rect x="148" y="87" width="14" height="22" fill="rgba(255,255,255,0.25)" rx="2" />
        </svg>
      </div>

      {/* Foreground research table surface */}
      <div
        className="absolute bottom-0 inset-x-0 h-2/5 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(80,55,20,0.95) 0%, rgba(120,90,40,0.8) 40%, transparent 100%)',
        }}
      />

      {/* Sanskrit manuscripts — foreground */}
      <div className="absolute bottom-8 left-12 pointer-events-none">
        {/* Open manuscript */}
        <svg width="180" height="90" viewBox="0 0 180 90">
          <defs>
            <linearGradient id="pageGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5e6c8" />
              <stop offset="100%" stopColor="#e8d4a8" />
            </linearGradient>
          </defs>
          <ellipse cx="90" cy="88" rx="88" ry="8" fill="rgba(0,0,0,0.3)" />
          <path d="M5,15 Q90,5 175,15 L178,80 Q90,70 2,80 Z" fill="url(#pageGrad)" />
          <path d="M90,12 L90,78" stroke="#c4a96b" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6" />
          {/* Sanskrit text lines */}
          {[22,32,42,52,62,72].map((y, i) => (
            <line key={i} x1={i%2===0 ? 14 : 96} y1={y} x2={i%2===0 ? 82 : 164} y2={y} stroke="#8b6914" strokeWidth="0.8" opacity="0.5" />
          ))}
          {/* Devanagari-looking script marks */}
          <text x="14" y="30" fontSize="7" fill="#6b4f10" opacity="0.7" fontFamily="serif">चरक संहिता</text>
          <text x="96" y="30" fontSize="7" fill="#6b4f10" opacity="0.7" fontFamily="serif">सुश्रुत संहिता</text>
          <text x="14" y="60" fontSize="7" fill="#6b4f10" opacity="0.6" fontFamily="serif">अष्टांग हृदयम्</text>
        </svg>
      </div>

      {/* Book stack */}
      <div className="absolute bottom-6 left-48 pointer-events-none">
        {[
          { c: '#3d2c10', w: 70, h: 14, l: 'चरक संहिता' },
          { c: '#4a3820', w: 70, h: 14, l: 'सुश्रुत संहिता' },
          { c: '#2d4a1e', w: 70, h: 12, l: 'अष्टांग हृदयम' },
        ].map((b, i) => (
          <div key={i} className="flex items-center" style={{ width: `${b.w}px`, height: `${b.h}px`, background: b.c, borderLeft: '2px solid rgba(255,255,255,0.1)', marginBottom: '1px', borderRadius: '1px' }}>
            <span className="text-[6px] text-amber-200/70 px-1 truncate font-medium">{b.l}</span>
          </div>
        ))}
      </div>

      {/* Mortar & pestle + herbs */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-5xl flex gap-4 items-end pointer-events-none" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}>
        <span>🌿</span>
        <span className="text-6xl">🔬</span>
        <span>🌱</span>
      </div>

      {/* Science equipment — right foreground */}
      <div className="absolute bottom-6 right-16 pointer-events-none">
        <svg width="100" height="120" viewBox="0 0 100 120">
          {/* Test tubes */}
          {[0,1,2].map(i => (
            <g key={i} transform={`translate(${10 + i*18}, 20)`}>
              <rect x="5" y="0" width="10" height="45" rx="5" fill={`rgba(200,230,210,${0.5 + i*0.1})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              <rect x="6" y={30-i*5} width="8" height={15+i*5} rx="4" fill={`rgba(${150+i*20},210,180,0.6)`} />
              <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(180,160,100,0.8)" strokeWidth="2" />
            </g>
          ))}
          {/* Science books */}
          {[
            { c: '#1a3a2a', l: 'BOTANICAL RESEARCH', y: 72 },
            { c: '#2a4a35', l: 'PHYTOMEDICINE', y: 84 },
            { c: '#1e3830', l: 'NATURAL PRODUCTS', y: 96 },
            { c: '#162d22', l: 'TRANSLATIONAL SCIENCE', y: 108 },
          ].map((b) => (
            <g key={b.l}>
              <rect x="0" y={b.y} width="100" height="10" fill={b.c} rx="1" />
              <text x="5" y={b.y + 7} fontSize="5" fill="rgba(200,230,200,0.8)" fontWeight="bold">{b.l}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* River/landscape in mid-ground — subtle blue-green strip */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '38%',
          left: '15%',
          right: '25%',
          height: '8%',
          background: 'linear-gradient(to bottom, transparent, rgba(120,180,150,0.3) 40%, rgba(80,140,120,0.25) 60%, transparent)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />

      {/* Tree foliage silhouettes */}
      <div className="absolute top-8 left-1/4 pointer-events-none" style={{ filter: 'blur(0.5px)' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <ellipse cx="60" cy="50" rx="55" ry="45" fill="rgba(30,70,30,0.5)" />
          <ellipse cx="45" cy="55" rx="38" ry="35" fill="rgba(40,90,40,0.4)" />
          <ellipse cx="75" cy="52" rx="35" ry="32" fill="rgba(35,80,35,0.45)" />
          <rect x="55" y="90" width="10" height="30" fill="rgba(60,40,20,0.6)" />
        </svg>
      </div>
    </div>
  )
}

// ─── Hero Slide data ──────────────────────────────────────────────────────────
interface HeroSlide {
  id: number
  eyebrow: string
  headingLines: { text: string; gold?: boolean }[]
  subtext: string
  ctaPrimary: { label: string; to: string }
  ctaSecondary: { label: string; to: string }
  featureStrip: typeof FEATURE_STRIP
  bgClass: string        // background class for the whole section
  visual: 'img' | 'slide2' | 'slide3'
  imgSrc: string
  wordsRight?: string[]  // vertical decorative words on right edge
  fullWidth?: boolean    // slide 3 is full-width
  darkText?: boolean     // slide 3 has light text on dark bg
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: 'AYURVEDA  |  SCIENCE  |  AI  |  INNOVATION',
    headingLines: [
      { text: 'From Ancient Wisdom' },
      { text: 'to Responsible' },
      { text: 'Innovation.', gold: true },
    ],
    subtext: 'Exploring Ayurveda. Enabling innovation.\nPowered by evidence. Guided by responsibility.',
    ctaPrimary:   { label: 'Explore Knowledge Atlas', to: '/login' },
    ctaSecondary: { label: 'Analyze Your Innovation', to: '/innovation-login' },
    featureStrip: FEATURE_STRIP,
    bgClass: 'bg-parchment',
    visual: 'img',
    imgSrc: heroImg,
    wordsRight: ['PEOPLE', 'PLANTS', 'PURPOSE', 'PROGRESS'],
  },
  {
    id: 2,
    eyebrow: 'AYURVEDA AI',
    headingLines: [
      { text: 'Ask.' },
      { text: 'Explore.' },
      { text: 'Verify.', gold: true },
    ],
    subtext: 'Evidence-backed answers for Ayurveda, research and innovation.',
    ctaPrimary:   { label: 'Ask Ayurveda AI', to: '/ai' },
    ctaSecondary: { label: 'Explore Knowledge Atlas', to: '/knowledge' },
    featureStrip: [
      { icon: 'leaf'   as const, label: 'TRUSTED KNOWLEDGE'  },
      { icon: 'beaker' as const, label: 'EVIDENCE LINKED'    },
      { icon: 'gear'   as const, label: 'RESEARCH READY'     },
      { icon: 'people' as const, label: 'A HEALTHIER TOMORROW' },
    ],
    bgClass: 'bg-parchment',
    visual: 'img',
    imgSrc: heroSlide2,
    wordsRight: ['TRADITION', 'RESEARCH', 'TECHNOLOGY', 'BETTER HEALTH'],
  },
  {
    id: 3,
    eyebrow: '',
    headingLines: [
      { text: 'Preserving the wisdom of the past.' },
      { text: 'Empowering the innovations', gold: true },
      { text: 'of tomorrow.', gold: true },
    ],
    subtext: 'From ancient manuscripts to modern laboratories — one platform bridging tradition and responsible innovation.',
    ctaPrimary:   { label: 'Begin Your Journey', to: '/login' },
    ctaSecondary: { label: 'About IP-SAKTI', to: '/about' },
    featureStrip: FEATURE_STRIP,
    bgClass: 'bg-forest-dark',
    visual: 'slide3',
    imgSrc: heroSlide3,
    fullWidth: true,
    darkText: false,
  },
]

// ─── Main LandingPage ─────────────────────────────────────────────────────────
export function LandingPage() {
  const navigate = useNavigate()

  // ── Hero carousel state ───────────────────────────────────────────────────
  const [activeSlide, setActiveSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [userInteracting, setUserInteracting] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const goToSlide = useCallback(
    (idx: number) => {
      if (idx === activeSlide) return
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveSlide(idx)
        setIsTransitioning(false)
      }, prefersReducedMotion ? 0 : 60)
    },
    [activeSlide, prefersReducedMotion],
  )

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveSlide((s) => (s + 1) % HERO_SLIDES.length)
    }, 4000)
  }, [])

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!prefersReducedMotion && !userInteracting) {
      startAutoplay()
    }
    return () => stopAutoplay()
  }, [userInteracting, prefersReducedMotion, startAutoplay, stopAutoplay])

  function handleDotClick(idx: number) {
    setUserInteracting(true)
    goToSlide(idx)
    // Resume autoplay after 8s of inactivity
    setTimeout(() => setUserInteracting(false), 8000)
  }

  const slide = HERO_SLIDES[activeSlide]

  return (
    <div className="bg-parchment">

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* HERO CAROUSEL — 3 slides, 4-second autoplay, crossfade transition  */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '680px', height: 'calc(100vh - 68px)', maxHeight: '820px' }}
        aria-label="Hero"
        aria-roledescription="carousel"
      >
        {/* ── Slide backgrounds — crossfade via opacity transition ── */}
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className="absolute inset-0"
            style={{
              opacity: idx === activeSlide ? 1 : 0,
              transition: prefersReducedMotion ? 'none' : 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
              zIndex: idx === activeSlide ? 1 : 0,
            }}
            aria-hidden={idx !== activeSlide}
          >
            {/* Per-slide background */}
            {s.fullWidth ? (
              <div className="absolute inset-0">
                <img
                  src={s.imgSrc}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(13,36,21,0.35) 0%, rgba(13,36,21,0.82) 100%)',
                  }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-parchment" />
            )}
          </div>
        ))}

        {/* ── Slide content layer — all slides rendered, active one visible ── */}
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={`content-${s.id}`}
            className="absolute inset-0 flex items-center"
            style={{
              opacity: idx === activeSlide && !isTransitioning ? 1 : 0,
              transition: prefersReducedMotion ? 'none' : 'opacity 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s, transform 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s',
              transform: idx === activeSlide && !isTransitioning ? 'translateY(0)' : 'translateY(10px)',
              zIndex: 2,
              pointerEvents: idx === activeSlide ? 'auto' : 'none',
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${idx + 1} of ${HERO_SLIDES.length}`}
          >
            {s.fullWidth ? (
              /* ── SLIDE 3 — full-width cinematic with overlay text ── */
              <div className="w-full h-full relative flex items-center">
                <div className="container-site relative z-10 w-full">
                  <div className="max-w-3xl mx-auto text-center py-20">
                    {/* Large quote marks */}
                    <span className="text-6xl leading-none text-gold/50 font-serif select-none block mb-2" aria-hidden="true">"</span>

                    <h1 className="font-display-serif leading-tight mb-6">
                      {s.headingLines.map((line, i) => (
                        <span
                          key={i}
                          className={`block ${
                            line.gold
                              ? 'text-gold'
                              : 'text-white'
                          } ${
                            i === 0
                              ? 'text-3xl lg:text-4xl xl:text-[2.6rem]'
                              : 'text-3xl lg:text-4xl xl:text-[2.6rem]'
                          } font-black tracking-tight`}
                        >
                          {line.text}
                        </span>
                      ))}
                    </h1>

                    <span className="text-6xl leading-none text-gold/50 font-serif select-none block mb-6" aria-hidden="true">"</span>

                    <div className="w-12 h-0.5 bg-gold mx-auto mb-7" aria-hidden="true" />

                    <p className="text-white/75 text-base lg:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                      {s.subtext}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                      <button
                        onClick={() => navigate(s.ctaPrimary.to)}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest-dark text-white font-semibold rounded-xl hover:bg-forest-mid transition-all duration-200 text-sm shadow-lg"
                      >
                        {s.ctaPrimary.label} <ArrowRight size={16} />
                      </button>
                      <button
                        onClick={() => navigate(s.ctaSecondary.to)}
                        className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/70 transition-all duration-200 text-sm"
                      >
                        {s.ctaSecondary.label} <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ── SLIDES 1 & 2 — split left text / right visual ── */
              <div className="container-site w-full h-full flex items-center relative">

                {/* LEFT — text content */}
                <div className="relative z-10 w-full lg:w-[48%] py-16 lg:py-20 pr-0 lg:pr-10">

                  {/* Eyebrow */}
                  <p className="text-xs font-semibold uppercase tracking-eyebrow text-gold mb-5">
                    {s.eyebrow}
                  </p>
                  <div className="w-8 h-0.5 bg-gold mb-7" aria-hidden="true" />

                  {/* Headline */}
                  <h1 className="font-display-serif leading-[1.06] text-forest-dark mb-5">
                    {s.headingLines.map((line, i) => (
                      <span
                        key={i}
                        className={`block font-black tracking-tight ${
                          line.gold ? 'text-gold' : 'text-forest-dark'
                        } ${
                          s.id === 2
                            ? 'text-5xl lg:text-[4.5rem] xl:text-[5rem]'
                            : 'text-4xl lg:text-5xl xl:text-[4.25rem]'
                        }`}
                      >
                        {line.text}
                      </span>
                    ))}
                  </h1>

                  {/* Gold divider */}
                  <div className="w-12 h-0.5 bg-gold mb-6" aria-hidden="true" />

                  {/* Subtext */}
                  <p className="text-base lg:text-lg text-ink-muted leading-relaxed mb-9 max-w-md whitespace-pre-line">
                    {s.subtext}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 mb-10">
                    <button
                      onClick={() => navigate(s.ctaPrimary.to)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-forest-dark text-white font-semibold rounded-xl hover:bg-forest-mid transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                    >
                      {s.ctaPrimary.label} <ArrowRight size={15} />
                    </button>
                    <button
                      onClick={() => navigate(s.ctaSecondary.to)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-forest-dark/60 text-forest-dark font-semibold rounded-xl hover:bg-forest-light hover:border-forest-dark transition-all duration-200 text-sm"
                    >
                      {s.ctaSecondary.label} <ArrowRight size={15} />
                    </button>
                  </div>

                  {/* Feature strip with SVG icons */}
                  <div className="flex flex-wrap gap-x-7 gap-y-3 pt-6 border-t border-gray-200/70">
                    {s.featureStrip.map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-2 text-ink-muted/70">
                        <FeatureIcon type={icon} />
                        <span className="text-[10px] font-semibold uppercase tracking-eyebrow">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — real visual panel */}
                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[54%] pointer-events-none">
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Soft blend into the text area */}
                    <div
                      className="absolute inset-y-0 left-0 w-44 z-10"
                      style={{
                        background:
                          'linear-gradient(to right, #F5F0E8 0%, rgba(245,240,232,0.72) 35%, rgba(245,240,232,0.18) 75%, transparent 100%)',
                      }}
                    />

                    <img
                      src={s.imgSrc}
                      alt=""
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Soft edge vignette */}
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(245,240,232,0.18) 0%, transparent 25%, transparent 82%, rgba(245,240,232,0.25) 100%)',
                      }}
                    />

                    {/* Decorative vertical words */}
                    <div
                      className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 text-right select-none z-20"
                      aria-hidden="true"
                    >
                      {(s.wordsRight ?? []).map((w) => (
                        <span
                          key={w}
                          className="text-[11px] font-black tracking-[0.2em] text-white/55 uppercase"
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* ── Mobile visual strip for slides 1 & 2 ── */}
        {!slide.fullWidth && (
          <div
            className="lg:hidden absolute bottom-0 left-0 right-0 h-44 z-0 pointer-events-none"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transition: 'opacity 0.6s',
            }}
            aria-hidden="true"
          >
            <img
              src={slide.imgSrc}
              alt=""
              className="w-full h-full object-cover object-center opacity-30"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, #F5F0E8 0%, rgba(245,240,232,0.75) 45%, rgba(245,240,232,0.15) 100%)',
              }}
            />
          </div>
        )}

        {/* ── Pagination dots — bottom centre ── */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10"
          role="tablist"
          aria-label="Hero slides"
        >
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={idx === activeSlide}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => handleDotClick(idx)}
              className="transition-all duration-400 rounded-full focus-visible:outline-2 focus-visible:outline-gold"
              style={{
                width:  idx === activeSlide ? '28px' : '10px',
                height: '10px',
                background: idx === activeSlide
                  ? (slide.fullWidth ? '#C4952A' : '#1B3A2D')
                  : (slide.fullWidth ? 'rgba(255,255,255,0.4)' : 'rgba(27,58,45,0.25)'),
              }}
            />
          ))}
        </div>

        {/* ── Subtle progress bar at very bottom ── */}
        {!prefersReducedMotion && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 z-10 overflow-hidden">
            <div
              className="h-full bg-gold/60 origin-left"
              style={{
                animation: userInteracting ? 'none' : 'heroProgress 4s linear infinite',
              }}
            />
          </div>
        )}

      </section>

      {/* ── BRIDGE / HERITEX ──────────────────────────────────────────────── */}
      <BridgeSection />

      {/* ── EDITORIAL ABOUT ───────────────────────────────────────────────── */}
      <EditorialAboutSection />

      {/* ── WHY IT MATTERS ────────────────────────────────────────────────── */}
      <WhyItMattersGrid />

      {/* ── WHAT BRINGS YOU HERE ──────────────────────────────────────────── */}
      <WhatBringsYouHereCarousel />

     

    </div>
  )
}
