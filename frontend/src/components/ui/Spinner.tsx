import { cn } from '@/utils/cn'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerColor = 'forest' | 'gold' | 'white' | 'muted'

export interface SpinnerProps {
  size?: SpinnerSize
  color?: SpinnerColor
  className?: string
  label?: string
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-2',
  xl: 'w-12 h-12 border-[3px]',
}

const colorClasses: Record<SpinnerColor, string> = {
  forest: 'border-forest-light border-t-forest-dark',
  gold:   'border-gold-light  border-t-gold',
  white:  'border-white/20    border-t-white',
  muted:  'border-gray-200    border-t-gray-400',
}

export function Spinner({
  size = 'md',
  color = 'forest',
  className,
  label = 'Loading…',
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn('inline-block rounded-full animate-spin', sizeClasses[size], colorClasses[color], className)}
    />
  )
}
