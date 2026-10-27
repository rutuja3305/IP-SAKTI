import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { useAuth } from '@/hooks/useAuth'

export function LoginPage() {
  const navigate            = useNavigate()
  const location            = useLocation()
  const { login }           = useAuth()
  const from                = (location.state as { from?: string })?.from ?? '/dashboard'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-parchment-gradient flex flex-col items-center justify-center px-4 py-16">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 mb-10 group">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-forest-dark group-hover:bg-forest-mid transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3C10 7 7 8 5 8c1 3 3.5 5 7 5.5V20" stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12 3C14 7 17 8 19 8c-1 3-3.5 5-7 5.5" stroke="#C4952A" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 14.5c0 2 1.8 3.5 4 4 2.2-.5 4-2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[16px] font-extrabold tracking-tight text-forest-dark">IP-SAKTI</span>
          <span className="text-[11px] font-medium text-gold tracking-wide">— Sahayak</span>
        </div>
      </Link>

      {/* Card */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-card-hover p-8">
        <EyebrowLabel text="SIGN IN" color="gold" rule className="mb-5" />
        <h1 className="text-2xl font-bold text-forest-dark mb-1">Welcome back</h1>
        <p className="text-sm text-ink-muted mb-7">
          Sign in to access your dashboard and saved research.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            type="email"
            label="Email address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={15} />}
            required
            autoComplete="email"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={15} />}
            required
            autoComplete="current-password"
          />

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
            className="mt-2"
          >
            Sign In
          </Button>
        </form>

        <p className="text-sm text-center text-ink-muted mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-forest-mid font-medium hover:text-forest-dark transition-colors">
            Create one
          </Link>
        </p>
      </div>

      <p className="text-xs text-ink-muted mt-6 text-center max-w-sm">
        IP-SAKTI Sahayak · SIH 2026 · Problem Statement SIH26045
      </p>
    </div>
  )
}
