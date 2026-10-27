import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { authService } from '@/services/authService'

const DOMAIN_OPTIONS = [
  { value: 'ayurveda_research',  label: 'Ayurveda Research' },
  { value: 'pharmacology',       label: 'Pharmacology / Phytochemistry' },
  { value: 'biotechnology',      label: 'Biotechnology' },
  { value: 'clinical_research',  label: 'Clinical Research' },
  { value: 'ip_law',             label: 'IP Law / Patent Studies' },
  { value: 'innovation_mgmt',    label: 'Innovation Management' },
  { value: 'regulatory',         label: 'Regulatory Affairs' },
  { value: 'data_science',       label: 'Data Science / AI' },
  { value: 'other',              label: 'Other' },
]

export function ResearcherProfilePage() {
  const navigate = useNavigate()
  const [name,        setName]        = useState('')
  const [institution, setInstitution] = useState('')
  const [domain,      setDomain]      = useState('')
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !institution.trim() || !domain) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      authService.updateProfile({ name: name.trim(), institution: institution.trim(), fieldOfInterest: domain })
      navigate('/verify')
    } catch {
      setError('Could not save profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-parchment-gradient flex flex-col items-center justify-center px-4 py-16">

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {['Account', 'Role', 'Profile', 'Verify'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border-2
              ${i < 3 ? 'bg-forest-dark border-forest-dark text-white' : 'border-gray-200 text-ink-muted'}`}>
              {i < 2 ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i < 3 ? 'text-forest-dark' : 'text-ink-muted'}`}>{step}</span>
            {i < 3 && <span className="w-6 h-px bg-gray-200" aria-hidden="true" />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-card-hover p-8">
        <EyebrowLabel text="STEP 3 OF 4 · PROFESSIONAL" color="gold" rule className="mb-5" />
        <h1 className="text-2xl font-bold text-forest-dark mb-1">Your professional details</h1>
        <p className="text-sm text-ink-muted mb-7">This helps us personalise your AI and Innovation Intelligence experience.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="Full name" placeholder="Your full name" value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<User size={15} />} required
          />
          <Input
            label="Organisation / Institution" placeholder="Where you work or study" value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            icon={<Building2 size={15} />} required
          />
          <Select
            label="Primary domain" value={domain}
            onChange={(e) => setDomain(e.target.value)}
            options={DOMAIN_OPTIONS} placeholder="Select your domain"
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5" role="alert">{error}</p>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}
            icon={<ArrowRight size={16} />} iconPosition="right" className="mt-2">
            Continue
          </Button>
        </form>
      </div>
    </div>
  )
}
