import { NavLink } from 'react-router-dom'
import { MapPin, Mail, Phone, ExternalLink, PlayCircle, Camera } from 'lucide-react'
import { cn } from '@/utils/cn'

// ── X / Twitter icon (not in lucide-react) ────────────────────────────────────
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.951-5.567ZM17.083 20.75h1.833L7.084 4.126H5.117L17.083 20.75Z" />
    </svg>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: 'Home',                    to: '/' },
  { label: 'About IP-SAKTI',         to: '/about' },
  { label: 'Knowledge Atlas',         to: '/knowledge' },
  { label: 'Ayurveda AI',            to: '/ai' },
  { label: 'Innovation Intelligence', to: '/innovation' },
]

const USEFUL_LINKS = [
  { label: 'Ministry of AYUSH',              href: 'https://ayush.gov.in' },
  { label: 'AYUSH Research Portal',          href: 'https://ayushportal.nic.in' },
  { label: 'TKDL',                           href: 'https://www.tkdl.res.in' },
  { label: 'IP India',                       href: 'https://ipindia.gov.in' },
  { label: 'CDSCO',                          href: 'https://cdsco.gov.in' },
  { label: 'WIPO',                           href: 'https://www.wipo.int' },
  { label: 'Digital India',                  href: 'https://www.digitalindia.gov.in' },
]

const PARTNER_LOGOS: { name: string; sub: string; badge: string }[] = [
  { name: 'Ministry of AYUSH',      sub: 'Government of India',      badge: 'AYUSH' },
  { name: "MoE's Innovation Cell",  sub: 'Government of India',       badge: 'MIC'   },
  { name: 'Intellectual Property India', sub: 'Patents | Designs | Trade Marks', badge: 'IPI'  },
  { name: 'WIPO',                   sub: 'World Intellectual Property Org.', badge: 'WIPO' },
]

function FooterLink({
  href,
  to,
  children,
}: {
  href?: string
  to?: string
  children: React.ReactNode
}) {
  const cls = cn(
    'text-sm text-white/60 hover:text-white transition-colors duration-200 leading-relaxed',
  )
  if (to) {
    return (
      <NavLink to={to} className={cls}>
        {children}
      </NavLink>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white mt-auto">

      {/* ── Main footer body ──────────────────────────────── */}
      <div className="container-site py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[240px_1fr_1fr_200px_180px]">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-forest-mid">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3C10 7 7 8 5 8c1 3 3.5 5 7 5.5V20" stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M12 3C14 7 17 8 19 8c-1 3-3.5 5-7 5.5" stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M12 20v-2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M8 14.5c0 2 1.8 3.5 4 4 2.2-.5 4-2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-extrabold tracking-tight text-white">IP-SAKTI</span>
                <span className="text-[11px] font-medium text-gold tracking-wide">— Sahayak</span>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-[220px]">
              Enabling informed innovation in Ayurveda for a healthier,
              self-reliant India.
            </p>

            {/* Tagline pills */}
            <div className="flex flex-wrap gap-2">
              {['TRADITION', 'EVIDENCE', 'INNOVATION', 'IMPACT'].map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-semibold tracking-widest text-white/40 uppercase"
                >
                  {t}
                  {t !== 'IMPACT' && <span className="ml-2 text-white/20">|</span>}
                </span>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { icon: <ExternalLink size={15} />, href: '#', label: 'LinkedIn' },
                { icon: <XIcon size={15} />,         href: '#', label: 'X / Twitter' },
                { icon: <PlayCircle size={15} />,    href: '#', label: 'YouTube' },
                { icon: <Camera size={15} />,        href: '#', label: 'Instagram' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Quick Links</h3>
            <div className="w-8 h-0.5 bg-gold mb-4" aria-hidden="true" />
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Useful Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Useful Links</h3>
            <div className="w-8 h-0.5 bg-gold mb-4" aria-hidden="true" />
            <ul className="flex flex-col gap-2">
              {USEFUL_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Contact Us</h3>
            <div className="w-8 h-0.5 bg-gold mb-4" aria-hidden="true" />
            <ul className="flex flex-col gap-3">
              <li className="flex gap-2.5 text-sm text-white/60 leading-snug">
                <MapPin size={15} className="shrink-0 text-gold mt-0.5" />
                <span>IP-SAKTI Innovation Support Desk<br />New Delhi, India</span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/60">
                <Mail size={15} className="shrink-0 text-gold mt-0.5" />
                <a
                  href="mailto:support@ipsakti-sahayak.example"
                  className="hover:text-white transition-colors"
                >
                  support@ipsakti-sahayak.example
                </a>
              </li>
              <li className="flex gap-2.5 text-sm text-white/60">
                <Phone size={15} className="shrink-0 text-gold mt-0.5" />
                <span>011-00000001</span>
              </li>
            </ul>
          </div>

          {/* Col 5 — Stay Connected */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Stay Connected</h3>
            <div className="w-8 h-0.5 bg-gold mb-4" aria-hidden="true" />
            <p className="text-sm text-white/60 leading-relaxed">
              Follow us for updates, insights and resources.
            </p>
          </div>

        </div>
      </div>

      {/* ── Partner logos strip ───────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-site py-5">
          <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-4">
            Relevant Government &amp; IP Ecosystems
          </p>
          <div className="flex flex-wrap gap-6 lg:gap-10 items-center">
            {PARTNER_LOGOS.map((p) => (
              <div
                key={p.badge}
                className="flex items-center gap-2.5"
              >
                {/* Badge placeholder — replace with real logos in Phase 2+ */}
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-white/60 tracking-wider">{p.badge}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/80 leading-tight">{p.name}</p>
                  <p className="text-[11px] text-white/40 leading-tight">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2025 IP-SAKTI – Sahayak. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Sitemap'].map((label, i, arr) => (
              <span key={label} className="flex items-center gap-4">
                <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                  {label}
                </a>
                {i < arr.length - 1 && <span className="text-white/20 text-xs">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
