/**
 * SuccessPage — /account-created
 * Final screen after successful onboarding.
 * "Account Created!" + personalised welcome + Go to Dashboard.
 */
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'

const ROLE_LABELS: Record<string, string> = {
  student:                 'Student',
  ayurveda_professional:   'Ayurveda Professional',
  ip_professional:         'IP Professional',
  manufacturer:            'Manufacturer',
  regulatory_professional: 'Regulatory Professional',
  researcher:              'Researcher',
  innovator:               'Innovator',
  admin:                   'Administrator',
}

export function SuccessPage() {
  const navigate  = useNavigate()
  const { user }  = useAuth()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 60%, #EDE8DC 100%)' }}
    >
      <div className="w-full max-w-[460px] bg-white rounded-2xl border border-gray-100 shadow-card-hover p-8 text-center">

        {/* Animated success icon */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-forest-light animate-ping opacity-30" />
          <div className="relative w-20 h-20 bg-forest-light rounded-full flex items-center justify-center">
            <CheckCircle2 size={40} className="text-forest-dark" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={18} className="text-gold" />
          <h1 className="font-display-serif text-2xl text-forest-dark font-black">
            Account Created!
          </h1>
          <Sparkles size={18} className="text-gold" />
        </div>

        <p className="text-base text-ink-muted mb-2">
          Welcome to your personalised innovation workspace.
        </p>
        <p className="text-sm text-ink mb-4">
          <span className="font-semibold">{user?.name ?? 'There'}</span>,
          your IP-SAKTI Sahayak account is ready.
        </p>

        {user?.role && (
          <div className="flex justify-center mb-6">
            <Badge variant="role" dot>
              {ROLE_LABELS[user.role] ?? user.role}
            </Badge>
          </div>
        )}

        {/* Access unlocked */}
        <div className="bg-parchment rounded-xl p-5 mb-7 text-left">
          <p className="text-xs font-bold text-forest-dark uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="text-gold">✦</span> Your workspace is ready
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🌿', label: 'Knowledge Atlas',        desc: '30 curated chapters' },
              { icon: '🤖', label: 'Ayurveda AI',           desc: 'Evidence-backed answers' },
              { icon: '💡', label: 'Innovation Intelligence', desc: 'IP & risk analysis' },
              { icon: '💾', label: 'Save & Revisit',         desc: 'Track your research' },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-2.5">
                <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                <div>
                  <p className="text-xs font-semibold text-forest-dark leading-tight">{label}</p>
                  <p className="text-[10px] text-ink-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          icon={<ArrowRight size={16} />}
          iconPosition="right"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>

      <p className="text-xs text-ink-muted mt-6 text-center">
        IP-SAKTI Sahayak · SIH 2026 · Problem Statement SIH26045
      </p>
    </div>
  )
}
