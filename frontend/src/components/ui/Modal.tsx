import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from './Button'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: ModalSize
  children: React.ReactNode
  className?: string
  /** Prevent closing when clicking the backdrop */
  disableBackdropClose?: boolean
}

const sizeClasses: Record<ModalSize, string> = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-2xl',
  full: 'max-w-5xl',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  className,
  disableBackdropClose = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fade-in"
        aria-hidden="true"
        onClick={disableBackdropClose ? undefined : onClose}
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-card-hover',
          'animate-slide-up',
          sizeClasses[size],
          className,
        )}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-6 pb-0">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-bold text-forest-dark"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-ink-muted">{description}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close modal"
              className="ml-4 -mt-1 -mr-1 shrink-0"
            >
              <X size={18} />
            </Button>
          </div>
        )}

        {/* Close button — when no header */}
        {!title && !description && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-10"
          >
            <X size={18} />
          </Button>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
