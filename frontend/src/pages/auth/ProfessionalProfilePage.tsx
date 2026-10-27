/**
 * ProfessionalProfilePage — /professional-profile
 * Step 3 of innovation onboarding for all non-student roles:
 * Ayurveda Professional, IP Professional, Manufacturer, Regulatory Professional.
 * Fields: Organization, Designation, Area of Expertise (dropdown), State.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { authService } from '@/services/authService'
import { useAuth } from '@/hooks/useAuth'

const EXPERTISE_OPTIONS = [
  { value: 'intellectual_property', label: 'Intellectual Property' },
  { value: 'patents',               label: 'Patents' },
  { value: 'regulatory_affairs',    label: 'Regulatory Affairs' },
  { value: 'ayurveda_practice',     label: 'Ayurveda / Clinical Practice' },
  { value: 'pharmacognosy',         label: 'Pharmacognosy / Phytochemistry' },
  { value: 'manufacturing_gmp',     label: 'Manufacturing / GMP Compliance' },
  { value: 'research_development',  label: 'Research & Development' },
  { value: 'technology_transfer',   label: 'Technology Transfer' },
  { value: 'policy_advocacy',       label: 'Policy & Advocacy' },
  { value: 'other',                 label: 'Other' },
]

const INDIA_STATES = [
  { value: 'andhra_pradesh',    label: 'Andhra Pradesh' },
  { value: 'assam',             label: 'Assam' },
  { value: 'bihar',             label: 'Bihar' },
  { value: 'chhattisgarh',      label: 'Chhattisgarh' },
  { value: 'delhi',             label: 'Delhi (NCT)' },
  { value: 'goa',               label: 'Goa' },
  { value: 'gujarat',           label: 'Gujarat' },
  { value: 'haryana',           label: 'Haryana' },
  { value: 'himachal_pradesh',  label: 'Himachal Pradesh' },
  { value: 'jharkhand',         label: 'Jharkhand' },
  { value: 'karnataka',         label: 'Karnataka' },
  { value: 'kerala',            label: 'Kerala' },
  { value: 'madhya_pradesh',    label: 'Madhya Pradesh' },
  { value: 'maharashtra',       label: 'Maharashtra' },
  { value: 'manipur',           label: 'Manipur' },
  { value: 'meghalaya',         label: 'Meghalaya' },
  { value: 'odisha',            label: 'Odisha' },
  { value: 'punjab',            label: 'Punjab' },
  { value: 'rajasthan',         label: 'Rajasthan' },
  { value: 'tamil_nadu',        label: 'Tamil Nadu' },
  { value: 'telangana',         label: 'Telangana' },
  { value: 'uttar_pradesh',     label: 'Uttar Pradesh' },
  { value: 'uttarakhand',       label: 'Uttarakhand' },
  { value: 'west_bengal',       label: 'West Bengal' },
  { value: 'other',             label: 'Other / Outside India' },
]

const ROLE_LABELS: Record<string, string> = {
  ayurveda_professional:  'Ayurveda Professional',
  ip_professional:        'IP Professional',
  manufacturer:           'Manufacturer',
  regulatory_professional:'Regulatory Professional',
  researcher:             'Researcher',
  innovator:              'Innovator',
}

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

export function ProfessionalProfilePage() {
  const navigate      = useNavigate()
  const { user }      = useAuth()
  const roleLabel     = ROLE_LABELS[user?.role ?? ''] ?? 'Professional'

  const [name,        setName]        = useState(user?.name?.includes('@') ? '' : (user?.name ?? ''))
  const [org,         setOrg]         = useState('')
  const [designation, setDesignation] = useState('')
  const [expertise,   setExpertise]   = useState('')
  const [state,       setState]       = useState('')
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!org.trim() || !designation.trim() || !expertise || !state) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      authService.updateProfile({
        name:            name.trim() || undefined,
        institution:     org.trim(),
        fieldOfInterest: expertise,
      })
      navigate('/verify')
    } catch {
      setError('Could not save profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 60%, #EDE8DC 100%)' }}
    >
      <StepIndicator activeStep={2} />

      <div className="w-full max-w-[480px] bg-white rounded-2xl border border-gray-100 shadow-card-hover p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sky-tint flex items-center justify-center">
            <span className="text-xl">💼</span>
          </div>
          <div>
            <EyebrowLabel text={`STEP 3 OF 4 · ${roleLabel.toUpperCase()}`} color="gold" rule={false} />
            <p className="text-[11px] text-ink-muted">Complete your professional profile</p>
          </div>
        </div>

        <h1 className="font-display-serif text-2xl text-forest-dark font-black mb-1">Complete your profile</h1>
        <p className="text-sm text-ink-muted mb-7">Tell us about your profession so we can personalise your Innovation Intelligence experience.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {(!user?.name || user.name.includes('@')) && (
            <Input
              label="Full Name *"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <Input
            label="Organisation *"
            placeholder="Company, institute or practice name"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            icon={<Building2 size={14} />}
            required
          />
          <Input
            label="Designation *"
            placeholder="e.g. Patent Attorney, AYUSH Consultant, R&D Manager"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            icon={<Briefcase size={14} />}
            required
          />
          <Select
            label="Area of Expertise *"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            options={EXPERTISE_OPTIONS}
            placeholder="Select your area of expertise"
          />
          <Select
            label="State *"
            value={state}
            onChange={(e) => setState(e.target.value)}
            options={INDIA_STATES}
            placeholder="Select your state"
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
            Continue →
          </Button>
        </form>
      </div>

      <p className="text-xs text-ink-muted mt-6 text-center">
        IP-SAKTI Sahayak · SIH 2026 · Problem Statement SIH26045
      </p>
    </div>
  )
}
