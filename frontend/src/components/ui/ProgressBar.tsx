import { cn } from '@/utils/cn'

export type ProgressBarColor = 'forest' | 'gold' | 'blue' | 'red' | 'orange'

export interface ProgressBarProps {
  value: number          // 0–100
  color?: ProgressBarColor
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const colorClasses: Record<ProgressBarColor, string> = {
  forest: 'bg-forest-dark',
  gold:   'bg-gold',
  blue:   'bg-blue-500',
  red:    'bg-red-500',
  orange: 'bg-orange-500',
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export function ProgressBar({
  value,
  color = 'forest',
  label,
  showValue = false,
  size = 'md',
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-ink-muted">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-ink">{clamped}%</span>
          )}
        </div>
      )}
      <div
        className={cn('w-full bg-gray-100 rounded-full overflow-hidden', sizeClasses[size])}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500', colorClasses[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
