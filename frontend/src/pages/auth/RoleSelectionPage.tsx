/**
 * RoleSelectionPage — /role-selection
 * Step 2 of innovation onboarding.
 * 5 roles from the approved reference.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { UserRole } from '@/types'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button } from '@/components/ui/Button'
import { authService } from '@/services/authService'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'

interface RoleOption {
  role: UserRole
  icon: string
  title: string
  subtitle: string
  description: string
  nextPath: '/student-profile' | '/professional-profile'
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: 'student',
    icon: '🎓',
    title: 'Student',
    subtitle: 'Academic / Educational',
    description: 'Explore the Knowledge Atlas, understand Ayurveda fundamentals and ask evidence-backed questions for your coursework or research.',
    nextPath: '/student-profile',
  },
  {
    role: 'ayurveda_professional',
    icon: '🌿',
    title: 'Ayurveda Professional',
    subtitle: 'Practitioner / Educator',
    description: 'Deepen your clinical and academic knowledge, access peer-reviewed research and cross-reference classical Ayurvedic sources.',
    nextPath: '/professional-profile',
  },
  {
    role: 'ip_professional',
    icon: '⚖️',
    title: 'IP Professional',
    subtitle: 'Patents & Regulation',
    description: 'Deep-dive into TKDL prior art, ABS obligations, patent eligibility and global IP strategy for Ayurvedic innovations.',
    nextPath: '/professional-profile',
  },
  {
    role: 'manufacturer',
    icon: '🏭',
    title: 'Manufacturer',
    subtitle: 'Industry / Production',
    description: 'Analyze product formulations for IP risk, understand CDSCO and AYUSH regulations, and navigate market compliance requirements.',
    nextPath: '/professional-profile',
  },
  {
    role: 'regulatory_professional',
    icon: '📋',
    title: 'Regulatory Professional',
    subtitle: 'Compliance / Affairs',
    description: 'Get guidance on AYUSH regulatory requirements, GMP compliance, clinical trial requirements and export market regulations.',
    nextPath: '/professional-profile',
  },
]

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
          <span className={`text-xs font-medium hidden sm:block ${i <= activeStep ? 'text-forest-dark' : 'text-ink-muted'}`}>
            {step}
          </span>
          {i < steps.length - 1 && <span className="w-6 h-px bg-gray-200" aria-hidden="true" />}
        </div>
      ))}
    </div>
  )
}

export function RoleSelectionPage() {
  const navigate          = useNavigate()
  const { user }          = useAuth()
  const [selected, setSelected] = useState<UserRole | null>(null)

  const selectedOption = ROLE_OPTIONS.find((o) => o.role === selected)

  function handleContinue() {
    if (!selected || !selectedOption) return
    if (user) authService.updateProfile({ role: selected })
    navigate(selectedOption.nextPath)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 60%, #EDE8DC 100%)' }}
    >
      <StepIndicator activeStep={1} />

      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-100 shadow-card-hover p-8">
        <EyebrowLabel text="STEP 2 OF 4 · CHOOSE YOUR ROLE" color="gold" rule className="mb-5" />
        <h1 className="font-display-serif text-2xl text-forest-dark font-black mb-1">
          Choose your role to personalize your experience
        </h1>
        <p className="text-sm text-ink-muted mb-8">
          Select the option that best describes you. This helps us tailor the AI and Innovation Intelligence to your needs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {ROLE_OPTIONS.map((opt) => {
            const isSelected = selected === opt.role
            return (
              <button
                key={opt.role}
                onClick={() => setSelected(opt.role)}
                className={cn(
                  'rounded-xl border-2 p-5 text-left transition-all duration-200 cursor-pointer',
                  isSelected
                    ? 'border-forest-dark bg-forest-light shadow-card'
                    : 'border-gray-200 bg-white hover:border-forest-mid/50 hover:bg-parchment',
                )}
              >
                <span className="text-3xl block mb-3" aria-hidden="true">{opt.icon}</span>
                <h2
                  className={cn(
                    'text-sm font-bold leading-tight mb-0.5',
                    isSelected ? 'text-forest-dark' : 'text-ink',
                  )}
                >
                  {opt.title}
                </h2>
                <p className={cn('text-[11px] font-semibold mb-2', isSelected ? 'text-gold' : 'text-ink-muted')}>
                  {opt.subtitle}
                </p>
                <p className="text-[11px] text-ink-muted leading-relaxed">{opt.description}</p>
                {isSelected && (
                  <div className="mt-3 flex items-center gap-1 text-forest-dark">
                    <div className="w-4 h-4 rounded-full bg-forest-dark flex items-center justify-center">
                      <span className="text-white text-[8px]">✓</span>
                    </div>
                    <span className="text-[10px] font-bold text-forest-dark">Selected</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selected}
          icon={<ArrowRight size={16} />}
          iconPosition="right"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>

      <p className="text-xs text-ink-muted mt-6">
        You can update your role later from your account settings.
      </p>
    </div>
  )
}
