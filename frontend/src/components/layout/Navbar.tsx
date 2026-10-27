import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronRight, User } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

interface NavItem { label: string; to: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',                    to: '/' },
  { label: 'Knowledge Atlas',         to: '/knowledge' },
  { label: 'Ayurveda AI',            to: '/ai' },
  { label: 'Innovation Intelligence', to: '/innovation' },
  { label: 'About',                   to: '/about' },
]

// Inline lotus SVG mark — keeps Navbar self-contained
function LotusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3C10 7 7 8 5 8c1 3 3.5 5 7 5.5V20" stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 3C14 7 17 8 19 8c-1 3-3.5 5-7 5.5"  stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 14.5c0 2 1.8 3.5 4 4 2.2-.5 4-2 4-4" stroke="white"   strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const { isAuthenticated, user }   = useAuth()
  const navigate                    = useNavigate()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const h = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 bg-white transition-shadow duration-300',
          scrolled ? 'shadow-nav' : 'border-b border-gray-100',
        )}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* ── Logo ───────────────────────────────────────────────────── */}
            <NavLink
              to="/"
              className="flex items-center gap-2.5 shrink-0 group"
              aria-label="IP-SAKTI Sahayak — Home"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-forest-dark group-hover:bg-forest-mid transition-colors duration-200">
                <LotusIcon />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-extrabold tracking-tight text-forest-dark">IP-SAKTI</span>
                <span className="text-[11px] font-medium text-gold tracking-wide">— Sahayak</span>
              </div>
            </NavLink>

            {/* ── Desktop nav links ───────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'nav-link px-3 py-2 rounded-lg text-[13px]',
                      isActive && 'active text-forest-dark bg-forest-light',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* ── Desktop right actions ───────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-2">
              {isAuthenticated && user ? (
                /* ── Authenticated: avatar → dashboard only ─────────────── */
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-8 h-8 rounded-full bg-forest-dark text-white text-xs font-bold flex items-center justify-center hover:bg-forest-mid transition-colors"
                  aria-label={`Dashboard — ${user.name}`}
                  title={user.name}
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
              ) : (
                /* ── Unauthenticated: Log in only ───────────────────────── */
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-ink-muted border border-gray-200 rounded-lg hover:text-forest-dark hover:border-forest-mid hover:bg-forest-light transition-all duration-200"
                >
                  <User size={13} />
                  Log in
                </button>
              )}
            </div>

            {/* ── Mobile hamburger ────────────────────────────────────────── */}
            <button
              className="lg:hidden p-2 rounded-lg text-ink-muted hover:text-forest-dark hover:bg-forest-light transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-30 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav className="absolute top-16 right-0 bottom-0 w-72 bg-white shadow-card-hover flex flex-col">
            <ul className="flex flex-col gap-1 p-4 flex-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-forest-light text-forest-dark'
                          : 'text-ink-muted hover:bg-gray-50 hover:text-forest-dark',
                      )
                    }
                  >
                    {item.label}
                    <ChevronRight size={16} className="text-ink-muted/50" />
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
              {!isAuthenticated ? (
                <Button
                  variant="primary"
                  fullWidth
                  icon={<User size={15} />}
                  onClick={() => { navigate('/login'); setMobileOpen(false) }}
                >
                  Log in
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => { navigate('/dashboard'); setMobileOpen(false) }}
                >
                  My Dashboard
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Spacer — prevents content hiding under fixed navbar */}
      <div className="h-16 lg:h-[68px]" aria-hidden="true" />
    </>
  )
}
