import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'

/**
 * ChapterDetailPage — Phase 1 placeholder.
 * Full chapter reader with content blocks will be built in Phase 4.
 */
export function ChapterDetailPage() {
  const { chapterId } = useParams<{ chapterId: string }>()

  return (
    <div className="bg-parchment min-h-screen">
      <div className="container-site py-16">
        <Link
          to="/knowledge"
          className="inline-flex items-center gap-2 text-sm text-forest-mid hover:text-forest-dark mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Knowledge Atlas
        </Link>
        <EyebrowLabel text="CHAPTER READER" color="gold" rule className="mb-6" />
        <h1 className="text-display-md text-forest-dark mb-4">
          Chapter: {chapterId}
        </h1>
        <p className="text-ink-muted">
          Full chapter reading experience will be available in Phase 4.
        </p>
      </div>
    </div>
  )
}
