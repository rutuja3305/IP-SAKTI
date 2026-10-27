/**
 * BasicLoginPage — /login
 * Knowledge Atlas journey: quick access login.
 * No professional profile required.
 * "Create Account" → /register?context=basic → directly to /knowledge after success.
 */
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Phone, ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { useAuth } from '@/hooks/useAuth'

function AuthLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group" aria-label="IP-SAKTI Sahayak — Home">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-forest-dark group-hover:bg-forest-mid transition-colors">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3C10 7 7 8 5 8c1 3 3.5 5 7 5.5V20" stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 3C14 7 17 8 19 8c-1 3-3.5 5-7 5.5"  stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 14.5c0 2 1.8 3.5 4 4 2.2-.5 4-2 4-4" stroke="white"   strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-extrabold tracking-tight text-forest-dark">IP-SAKTI</span>
        <span className="text-[11px] font-medium text-gold tracking-wide">— Sahayak</span>
      </div>
    </Link>
  )
}

export function BasicLoginPage() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { login } = useAuth()

  // Honour redirect-from state — default to Knowledge Atlas after basic login
  const from = (location.state as { from?: string })?.from ?? '/knowledge'

  const [identifier, setIdentifier] = useState('')
  const [password,   setPassword]   = useState('')
  const [error,      setError]      = useState<string | null>(null)
  const [loading,    setLoading]    = useState(false)
  const [showForgot, setShowForgot] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(identifier, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 60%, #EDE8DC 100%)' }}
    >
      {/* ── Left decorative panel (desktop) ──────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] bg-forest-dark flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none" aria-hidden="true">
          {['KNOWLEDGE', 'AYURVEDA', 'WISDOM', 'SCIENCE', 'HERITAGE'].map((w, i) => (
            <p
              key={w}
              className="text-white font-black uppercase tracking-widest text-5xl absolute whitespace-nowrap"
              style={{ top: `${12 + i * 18}%`, left: '-5%', transform: `rotate(-15deg)` }}
            >
              {w}
            </p>
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3C10 7 7 8 5 8c1 3 3.5 5 7 5.5V20" stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M12 3C14 7 17 8 19 8c-1 3-3.5 5-7 5.5"  stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M8 14.5c0 2 1.8 3.5 4 4 2.2-.5 4-2 4-4" stroke="white"   strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-extrabold tracking-tight text-white">IP-SAKTI</span>
              <span className="text-[11px] font-medium text-gold tracking-wide">— Sahayak</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-6">
            <BookOpen size={32} className="text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="font-display-serif text-3xl text-white font-black mb-3 leading-tight">
            Knowledge Atlas
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Explore 30 chapters of Ayurvedic wisdom — from ancient origins to modern innovation.
          </p>
          <div className="flex flex-col gap-2">
            {[
              '30 chapters of curated knowledge',
              'Evidence-backed information',
              'Classical texts & modern science',
              'Free to explore',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                <span className="text-gold text-base">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-white/30 uppercase tracking-widest">
            TRADITION · EVIDENCE · INNOVATION · IMPACT
          </p>
        </div>
      </div>

      {/* ── Right — form panel ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <AuthLogo />
        </div>

        <div className="w-full max-w-[400px]">
          <EyebrowLabel text="KNOWLEDGE ATLAS ACCESS" color="gold" rule className="mb-5" />
          <h1 className="font-display-serif text-3xl text-forest-dark font-black mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-ink-muted mb-8">
            Sign in to access the Knowledge Atlas and your saved research.
          </p>

          {showForgot ? (
            /* ── Forgot password panel ───────────────────────────────────── */
            <div className="bg-gold-light border border-gold/20 rounded-xl p-5 mb-6">
              <h2 className="text-sm font-bold text-forest-dark mb-2">Reset your password</h2>
              <p className="text-xs text-ink-muted mb-4">
                Enter your email and we'll send reset instructions.
              </p>
              <Input
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={14} />}
                className="mb-3"
              />
              <div className="flex gap-2">
                <Button variant="primary" size="sm" fullWidth>
                  Send Reset Link
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowForgot(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <Input
                type="text"
                label="Email / Mobile Number"
                placeholder="you@example.com or 9876543210"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                icon={identifier.match(/^\d/) ? <Phone size={14} /> : <Mail size={14} />}
                required
                autoComplete="username"
                hint="You can sign in with your email address or mobile number"
              />
              <div>
                <Input
                  type="password"
                  label="Password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock size={14} />}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="mt-1.5 text-xs text-forest-mid hover:text-forest-dark transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                className="mt-1"
              >
                Sign In
              </Button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-ink-muted">New to IP-SAKTI?</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Create account — basic context */}
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => navigate('/register?context=basic')}
          >
            Create Account
          </Button>

          <p className="text-xs text-ink-muted text-center mt-8">
            IP-SAKTI Sahayak · SIH 2026 · Problem Statement SIH26045
          </p>
        </div>
      </div>
    </div>
  )
}
