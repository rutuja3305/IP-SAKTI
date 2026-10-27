import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, options, placeholder, className, id, ...props }, ref) => {
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
          <select
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 rounded-xl border bg-white text-sm text-ink appearance-none',
              'pl-4 pr-10 transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-forest-mid/30 focus:border-forest-mid',
              error
                ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
                : 'border-gray-200 hover:border-gray-300',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
          />
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

Select.displayName = 'Select'

export { Select }
