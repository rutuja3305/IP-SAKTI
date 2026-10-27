/**
 * StudentProfilePage — /student-profile
 * Step 3 of innovation onboarding (student path).
 * Fields: Institute, Course/Program, Department, Year, Student ID (optional).
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, Layers, Hash } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { authService } from '@/services/authService'

const YEAR_OPTIONS = [
  { value: '1', label: '1st Year' },
  { value: '2', label: '2nd Year' },
  { value: '3', label: '3rd Year' },
  { value: '4', label: '4th Year' },
  { value: '5', label: '5th Year' },
  { value: 'pg1', label: 'PG Year 1' },
  { value: 'pg2', label: 'PG Year 2' },
  { value: 'phd', label: 'PhD / Research Scholar' },
]

const COURSE_OPTIONS = [
  { value: 'bams',         label: 'BAMS — Bachelor of Ayurvedic Medicine' },
  { value: 'md_ayurveda',  label: 'MD Ayurveda' },
  { value: 'ms_ayurveda',  label: 'MS Ayurveda' },
  { value: 'bsc_biotech',  label: 'B.Sc. Biotechnology' },
  { value: 'msc_biotech',  label: 'M.Sc. Biotechnology' },
  { value: 'bpharm',       label: 'B.Pharm / Pharm.D' },
  { value: 'mpharm',       label: 'M.Pharm' },
  { value: 'btech',        label: 'B.Tech / M.Tech' },
  { value: 'llb_llm',      label: 'LLB / LLM (IP Law)' },
  { value: 'mba',          label: 'MBA' },
  { value: 'other',        label: 'Other' },
]

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

export function StudentProfilePage() {
  const navigate = useNavigate()

  const [institute,  setInstitute]  = useState('')
  const [course,     setCourse]     = useState('')
  const [department, setDepartment] = useState('')
  const [year,       setYear]       = useState('')
  const [studentId,  setStudentId]  = useState('')
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!institute.trim() || !course || !department.trim() || !year) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      authService.updateProfile({
        institution:     institute.trim(),
        fieldOfInterest: course,
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
          <div className="w-10 h-10 rounded-xl bg-forest-light flex items-center justify-center">
            <span className="text-xl">🎓</span>
          </div>
          <div>
            <EyebrowLabel text="STEP 3 OF 4 · STUDENT" color="gold" rule={false} />
            <p className="text-[11px] text-ink-muted">Completing your student profile</p>
          </div>
        </div>

        <h1 className="font-display-serif text-2xl text-forest-dark font-black mb-1">Complete your profile</h1>
        <p className="text-sm text-ink-muted mb-7">Tell us about yourself so we can personalise your experience.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="Institute / College *"
            placeholder="Name of your institution"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            icon={<Building2 size={14} />}
            required
          />
          <Select
            label="Course / Program *"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            options={COURSE_OPTIONS}
            placeholder="Select your course"
          />
          <Input
            label="Department *"
            placeholder="e.g. Kayachikitsa, Pharmacology, Biochemistry"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            icon={<Layers size={14} />}
            required
          />
          <Select
            label="Year of Study *"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            options={YEAR_OPTIONS}
            placeholder="Select your year"
          />
          <Input
            label="Student ID"
            placeholder="Optional — your enrollment / roll number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            icon={<Hash size={14} />}
            hint="Optional"
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
