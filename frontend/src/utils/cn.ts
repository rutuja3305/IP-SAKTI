/**
 * cn — lightweight className merge utility.
 * Joins class strings, filtering falsy values.
 * No dependency on clsx or tailwind-merge needed for this project scale.
 *
 * Usage:
 *   cn('base-class', condition && 'conditional-class', 'always-class')
 *   cn('px-4', variant === 'primary' && 'bg-forest-dark text-white')
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
