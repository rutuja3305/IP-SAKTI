import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, icon, iconPosition = 'left', className, id, ...props }, ref) => {
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
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 rounded-xl border bg-white text-sm text-ink placeholder:text-ink-muted/60',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-forest-mid/30 focus:border-forest-mid',
              error
                ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                : 'border-gray-200 hover:border-gray-300',
              icon && iconPosition === 'left'  ? 'pl-9 pr-4' : '',
              icon && iconPosition === 'right' ? 'pl-4 pr-9' : '',
              !icon ? 'px-4' : '',
              className,
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none">
              {icon}
            </span>
          )}
        </div>
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

Input.displayName = 'Input'

export { Input }
