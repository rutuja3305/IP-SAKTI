import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-forest-dark text-white hover:bg-forest-mid border border-transparent shadow-sm hover:shadow-md',
  secondary:
    'bg-transparent text-forest-dark border border-forest-dark hover:bg-forest-light',
  ghost:
    'bg-transparent text-ink-muted border border-transparent hover:bg-forest-light hover:text-forest-dark',
  link:
    'bg-transparent text-forest-mid border-none underline-offset-4 hover:underline p-0 h-auto shadow-none',
  danger:
    'bg-red-600 text-white hover:bg-red-700 border border-transparent shadow-sm',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm:  'h-8  px-3  text-xs  gap-1.5 rounded-lg',
  md:  'h-10 px-5  text-sm  gap-2   rounded-xl',
  lg:  'h-12 px-7  text-base gap-2.5 rounded-xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base
          'inline-flex items-center justify-center font-medium transition-all duration-200 select-none',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          // Variant
          variantClasses[variant],
          // Size (skip size padding/height for link variant)
          variant !== 'link' && sizeClasses[size],
          // Full width
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="shrink-0 animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
        ) : (
          icon && iconPosition === 'left' && (
            <span className="shrink-0">{icon}</span>
          )
        )}
        {children && <span>{children}</span>}
        {!loading && icon && iconPosition === 'right' && (
          <span className="shrink-0">{icon}</span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
