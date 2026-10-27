import { cn } from '@/utils/cn'

export type CardVariant = 'default' | 'elevated' | 'tinted' | 'outlined' | 'flat'
export type CardColor = 'green' | 'amber' | 'blue' | 'purple' | 'neutral'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  color?: CardColor
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantClasses: Record<CardVariant, string> = {
  default:  'bg-white border border-gray-100 shadow-card',
  elevated: 'bg-white border border-gray-100 shadow-card-hover',
  tinted:   'border border-transparent',
  outlined: 'bg-white border-2 border-forest-light shadow-none',
  flat:     'bg-white border-none shadow-none',
}

const colorClasses: Record<CardColor, string> = {
  green:   'bg-forest-light border-forest-mid/20',
  amber:   'bg-gold-light border-gold/20',
  blue:    'bg-sky-tint border-blue-200',
  purple:  'bg-violet-tint border-violet-200',
  neutral: 'bg-gray-50 border-gray-200',
}

const paddingClasses = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export function Card({
  variant = 'default',
  color,
  hover = false,
  padding = 'md',
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl',
        variantClasses[variant],
        // Color overrides tinted bg
        variant === 'tinted' && color && colorClasses[color],
        paddingClasses[padding],
        hover && 'card-hover cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
