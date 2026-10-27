import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-parchment flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="text-6xl mb-6" aria-hidden="true">🌿</span>
      <h1 className="text-display-lg text-forest-dark mb-3">404</h1>
      <p className="text-lg font-semibold text-forest-dark mb-2">Page not found</p>
      <p className="text-ink-muted mb-8 max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button
        variant="primary"
        icon={<ArrowLeft size={16} />}
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </div>
  )
}
