/**
 * VerificationPage — /verify
 * Step 4 of innovation onboarding.
 * Shows OTP code input UI with Resend option.
 * For SIH prototype: any 4-digit code or click Verify bypasses real email.
 */
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { useAuth } from '@/hooks/useAuth'

function StepIndicator({ activeStep }: { activeStep: number }) {
  const steps = ['Account', 'Role', 'Profile', 'Verify']
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2 transition-all ${
              i < activeStep ? 'bg-forest-dark border-forest-dark text-white'
              : i === activeStep ? 'bg-forest-dark border-forest-dark text-white'
              : 'border-gray-200 text-ink-muted'
            }`}
          >
            {i < activeStep ? '✓' : i + 1}
          </div>
          <span className={`text-xs font-medium hidden sm:block ${i <= activeStep ? 'text-forest-dark' : 'text-ink-muted'}`}>
            {step}
          </span>
          {i < steps.length - 1 && <span className="w-6 h-px bg-gray-200" aria-hidden="true" />}
        </div>
      ))}
    </div>
  )
}

// OTP input — 4 individual digit boxes
function OtpInput({
  value,
  onChange,
}: {
  value: string[]
  onChange: (v: string[]) => void
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(i: number, char: string) {
    const next = [...value]
    next[i] = char.replace(/\D/g, '').slice(-1)
    onChange(next)
    if (char && i < 3) inputs.current[i + 1]?.focus()
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (pasted.length === 4) {
      onChange(pasted.split(''))
      inputs.current[3]?.focus()
    }
    e.preventDefault()
  }

  return (
    <div className="flex items-center gap-3 justify-center my-6">
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-14 h-14 text-center text-2xl font-bold text-forest-dark border-2 border-gray-200 rounded-xl focus:border-forest-dark focus:ring-2 focus:ring-forest-dark/20 outline-none transition-all"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}

export function VerificationPage() {
  const navigate  = useNavigate()
  const { user }  = useAuth()

  const [otp,       setOtp]       = useState(['', '', '', ''])
  const [error,     setError]     = useState<string | null>(null)
  const [loading,   setLoading]   = useState(false)
  const [resent,    setResent]    = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [countdown])

  function handleResend() {
    setResent(true)
    setCountdown(30)
    setOtp(['', '', '', ''])
    setError(null)
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const code = otp.join('')
    if (code.length < 4) {
      setError('Please enter the 4-digit verification code.')
      return
    }
    setLoading(true)
    // Mock: any 4-digit code is accepted for SIH prototype
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    navigate('/account-created')
  }

  const codeComplete = otp.every(Boolean)

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 60%, #EDE8DC 100%)' }}
    >
      <StepIndicator activeStep={3} />

      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-gray-100 shadow-card-hover p-8 text-center">
        {/* Mail icon */}
        <div className="w-16 h-16 rounded-full bg-gold-light flex items-center justify-center mx-auto mb-5">
          <Mail size={28} className="text-gold" />
        </div>

        <EyebrowLabel text="STEP 4 OF 4 · VERIFY YOUR ACCOUNT" color="gold" rule className="mb-4 items-center mx-auto" />
        <h1 className="font-display-serif text-2xl text-forest-dark font-black mb-2">
          Verify your account
        </h1>
        <p className="text-sm text-ink-muted mb-1">
          We've sent a verification code to your email.
        </p>
        <p className="text-sm font-semibold text-forest-dark mb-2">
          {user?.email ?? 'your email address'}
        </p>

        {resent && (
          <p className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 mb-4">
            Verification code resent successfully.
          </p>
        )}

        <form onSubmit={handleVerify} noValidate>
          <p className="text-xs text-ink-muted mb-1">Enter the 4-digit code</p>
          <OtpInput value={otp} onChange={setOtp} />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-4" role="alert">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={!codeComplete}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Verify Account
          </Button>
        </form>

        {/* Prototype shortcut */}
        <div className="mt-4 rounded-lg bg-parchment border border-gray-200 px-4 py-3">
          <p className="text-xs text-ink-muted mb-2">
            <span className="font-semibold">SIH Prototype:</span> Email verification is simulated.
            Enter any 4 digits or click below to skip.
          </p>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={() => navigate('/account-created')}
          >
            Skip verification →
          </Button>
        </div>

        {/* Resend */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <p className="text-xs text-ink-muted">Didn't receive the code?</p>
          {countdown > 0 ? (
            <span className="text-xs text-ink-muted">Resend in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="flex items-center gap-1 text-xs font-semibold text-forest-mid hover:text-forest-dark transition-colors"
            >
              <RotateCcw size={12} />
              Resend code
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-ink-muted mt-6 text-center">
        IP-SAKTI Sahayak · SIH 2026 · Problem Statement SIH26045
      </p>
    </div>
  )
}
