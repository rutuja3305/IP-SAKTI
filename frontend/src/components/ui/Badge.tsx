import { cn } from '@/utils/cn'

export type BadgeVariant =
  | 'confidence-high'
  | 'confidence-medium'
  | 'confidence-low'
  | 'source'
  | 'jurisdiction'
  | 'role'
  | 'risk-low'
  | 'risk-medium'
  | 'risk-high'
  | 'risk-critical'
  | 'neutral'

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  dot?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  'confidence-high':    'bg-emerald-50  text-emerald-700 border-emerald-200',
  'confidence-medium':  'bg-amber-50    text-amber-700   border-amber-200',
  'confidence-low':     'bg-red-50      text-red-700     border-red-200',
  'source':             'bg-sky-tint    text-forest-dark border-blue-200',
  'jurisdiction':       'bg-violet-tint text-violet-700  border-violet-200',
  'role':               'bg-forest-light text-forest-dark border-forest-mid/30',
  'risk-low':           'bg-emerald-50  text-emerald-700 border-emerald-200',
  'risk-medium':        'bg-amber-50    text-amber-700   border-amber-200',
  'risk-high':          'bg-orange-50   text-orange-700  border-orange-200',
  'risk-critical':      'bg-red-50      text-red-700     border-red-200',
  'neutral':            'bg-gray-100    text-ink-muted   border-gray-200',
}

const dotColors: Record<BadgeVariant, string> = {
  'confidence-high':    'bg-emerald-500',
  'confidence-medium':  'bg-amber-500',
  'confidence-low':     'bg-red-500',
  'source':             'bg-blue-500',
  'jurisdiction':       'bg-violet-500',
  'role':               'bg-forest-mid',
  'risk-low':           'bg-emerald-500',
  'risk-medium':        'bg-amber-500',
  'risk-high':          'bg-orange-500',
  'risk-critical':      'bg-red-500',
  'neutral':            'bg-gray-400',
}

export function Badge({ variant = 'neutral', children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5',
        'text-xs font-medium rounded-full border',
        variantClasses[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
