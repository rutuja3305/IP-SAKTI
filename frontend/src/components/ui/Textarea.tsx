import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-ink mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-xl border bg-white text-sm text-ink placeholder:text-ink-muted/60',
            'px-4 py-3 resize-y min-h-[100px]',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-forest-mid/30 focus:border-forest-mid',
            error
              ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
              : 'border-gray-200 hover:border-gray-300',
            className,
          )}
          {...props}
        />
        {hint && !error && (
          <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>
        )}
        {error && (
          <p className="mt-1.5 text-xs text-red-600" role="alert">{error}</p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export { Textarea }
