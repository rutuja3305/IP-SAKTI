import { cn } from '@/utils/cn'

export interface SectionDividerProps {
  label?: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

export function SectionDivider({
  label,
  align = 'center',
  className,
}: SectionDividerProps) {
  if (!label) {
    return (
      <hr
        className={cn('border-t border-gray-200 my-12', className)}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className={cn(
        'flex items-center gap-4 my-12',
        align === 'center' && 'justify-center',
        align === 'right'  && 'justify-end flex-row-reverse',
        className,
      )}
      aria-hidden="true"
    >
      <span className="flex-1 h-px bg-gray-200 max-w-[120px]" />
      <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-muted whitespace-nowrap">
        {label}
      </span>
      <span className="flex-1 h-px bg-gray-200 max-w-[120px]" />
    </div>
  )
}
