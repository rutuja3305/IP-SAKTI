import { cn } from '@/utils/cn'

export type EyebrowColor = 'gold' | 'green' | 'muted' | 'white'

export interface EyebrowLabelProps {
  text: string
  color?: EyebrowColor
  rule?: boolean       // show the decorative gold rule underneath
  className?: string
}

const colorClasses: Record<EyebrowColor, string> = {
  gold:  'text-gold',
  green: 'text-forest-mid',
  muted: 'text-ink-muted',
  white: 'text-white/80',
}

export function EyebrowLabel({
  text,
  color = 'gold',
  rule = true,
  className,
}: EyebrowLabelProps) {
  return (
    <div className={cn('inline-flex flex-col', className)}>
      <span
        className={cn(
          'text-xs font-semibold uppercase tracking-eyebrow',
          colorClasses[color],
        )}
      >
        {text}
      </span>
      {rule && (
        <span
          className="block w-8 h-0.5 bg-gold mt-2"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
