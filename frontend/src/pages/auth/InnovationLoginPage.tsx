/**
 * InnovationLoginPage — /innovation-login
 * Entry point for the Innovation journey.
 * Presents two clear paths:
 *   1. Existing user → sign in → /innovation
 *   2. New user → create account → full onboarding flow → /dashboard → /innovation
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, BarChart2, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { useAuth } from '@/hooks/useAuth'

function AuthLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
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

export function InnovationLoginPage() {
  const navigate  = useNavigate()
  const { login } = useAuth()

  const [tab,        setTab]      = useState<'login' | 'about'>('login')
  const [email,      setEmail]    = useState('')
  const [password,   setPassword] = useState('')
  const [error,      setError]    = useState<string | null>(null)
  const [loading,    setLoading]  = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/innovation')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 60%, #EDE8DC 100%)' }}
    >
      {/* ── Left — branding panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] bg-navy-dark flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none" aria-hidden="true">
          {['INNOVATION', 'PATENTS', 'IP', 'REGULATION', 'ABS'].map((w, i) => (
            <p
              key={w}
              className="text-white font-black uppercase tracking-widest text-5xl absolute whitespace-nowrap"
              style={{ top: `${10 + i * 18}%`, left: '-5%', transform: `rotate(-15deg)` }}
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
            <Lightbulb size={32} className="text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="font-display-serif text-3xl text-white font-black mb-3 leading-tight">
            Innovation Intelligence
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            AI-powered analysis for responsible Ayurvedic innovation — IP, regulatory, and traditional knowledge guidance.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: '⚡', text: 'Patent Risk Assessment' },
              { icon: '📜', text: 'Traditional Knowledge Overlap' },
              { icon: '🏛️', text: 'ABS Compliance Guidance' },
              { icon: '🌐', text: 'Regulatory Requirements' },
              { icon: '🗺️', text: 'International Market Risk' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-sm text-white/60">
                <span className="text-base">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
            <p className="text-xs text-white/40 leading-relaxed">
              AI-assisted preliminary assessment. Not a legal determination.
              Consult qualified IP and regulatory professionals for formal advice.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right — form panel ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <AuthLogo />
        </div>

        <div className="w-full max-w-[420px]">
          <EyebrowLabel text="INNOVATION INTELLIGENCE" color="gold" rule className="mb-5" />
          <h1 className="font-display-serif text-3xl text-forest-dark font-black mb-1">
            Analyze Your Innovation
          </h1>
          <p className="text-sm text-ink-muted mb-8">
            Sign in to your account or create a new one to start your innovation analysis.
          </p>

          {/* Tab switcher */}
          <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1 mb-7">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                tab === 'login'
                  ? 'bg-white text-forest-dark shadow-card'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Existing User
            </button>
            <button
              onClick={() => navigate('/register?context=innovation')}
              className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold text-ink-muted hover:text-forest-dark transition-all duration-200"
            >
              Create Account
            </button>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
            <Input
              type="email"
              label="Email address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={14} />}
              required
              autoComplete="email"
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
              icon={<BarChart2 size={16} />}
              className="mt-1"
            >
              Sign In & Continue <ArrowRight size={15} className="ml-1" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-ink-muted">Don't have an account?</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            onClick={() => navigate('/register?context=innovation')}
          >
            Create New Account
          </Button>

          <p className="text-xs text-ink-muted text-center mt-8">
            IP-SAKTI Sahayak · SIH 2026 · Problem Statement SIH26045
          </p>
        </div>
      </div>
    </div>
  )
}
