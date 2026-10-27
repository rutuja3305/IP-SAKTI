/**
 * RegisterPage — /register
 * Context-aware: reads ?context=basic|innovation from URL.
 * basic     → after success, navigates to /knowledge (no role/profile)
 * innovation → after success, navigates to /role-selection (full onboarding)
 */
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
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

// Step indicator — only shown in innovation context
function StepIndicator({ activeStep }: { activeStep: number }) {
  const steps = ['Account', 'Role', 'Profile', 'Verify']
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2 transition-all ${
              i < activeStep
                ? 'bg-forest-dark border-forest-dark text-white'
                : i === activeStep
                ? 'bg-forest-dark border-forest-dark text-white'
                : 'border-gray-200 text-ink-muted'
            }`}
          >
            {i < activeStep ? '✓' : i + 1}
          </div>
          <span
            className={`text-xs font-medium hidden sm:block ${
              i <= activeStep ? 'text-forest-dark' : 'text-ink-muted'
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="w-6 h-px bg-gray-200" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}

export function RegisterPage() {
  const navigate                    = useNavigate()
  const { register }                = useAuth()
  const [searchParams]              = useSearchParams()
  const context                     = searchParams.get('context') ?? 'innovation'
  const isBasic                     = context === 'basic'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [error,    setError]    = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)

  const loginTarget = isBasic ? '/login' : `/innovation-login`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      await register(email, password)
      if (isBasic) {
        // Basic: skip role/profile, go straight to knowledge atlas
        navigate('/knowledge')
      } else {
        // Innovation: full onboarding
        navigate('/role-selection')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 60%, #EDE8DC 100%)' }}
    >
      {/* Logo */}
      <div className="mb-8">
        <AuthLogo />
      </div>

      {/* Step indicator — only for innovation context */}
      {!isBasic && <StepIndicator activeStep={0} />}

      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-gray-100 shadow-card-hover p-8">
        <EyebrowLabel
          text={isBasic ? 'CREATE ACCOUNT' : 'STEP 1 OF 4 · CREATE ACCOUNT'}
          color="gold"
          rule
          className="mb-5"
        />
        <h1 className="font-display-serif text-2xl text-forest-dark font-black mb-1">
          {isBasic ? 'Get started for free' : 'Create your account'}
        </h1>
        <p className="text-sm text-ink-muted mb-7">
          {isBasic
            ? 'Create an account to save your progress and access the Knowledge Atlas.'
            : 'Create your IP-SAKTI account to begin your innovation analysis journey.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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
          <Input
            type="password"
            label="Password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={14} />}
            required
            autoComplete="new-password"
          />
          <Input
            type="password"
            label="Confirm password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            icon={<Lock size={14} />}
            required
            autoComplete="new-password"
            error={confirm.length > 0 && confirm !== password ? 'Passwords do not match' : undefined}
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
            {isBasic ? 'Create Account' : 'Create Account & Continue'}
          </Button>
        </form>

        <p className="text-sm text-center text-ink-muted mt-6">
          Already have an account?{' '}
          <Link
            to={loginTarget}
            className="text-forest-mid font-semibold hover:text-forest-dark transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      <p className="text-xs text-ink-muted mt-6 text-center">
        IP-SAKTI Sahayak · SIH 2026 · Problem Statement SIH26045
      </p>
    </div>
  )
}
