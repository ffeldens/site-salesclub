import { cn } from '@/lib/cn'

type BadgeProps = {
  children: React.ReactNode
  className?: string
  tone?: 'brand' | 'neutral'
}

/** Selo pequeno — usado em badges de data/local nos heros de imersão. */
export function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide',
        tone === 'brand'
          ? 'bg-brand/15 text-brand-vivid ring-1 ring-brand/30'
          : 'bg-paper/5 text-paper/80 ring-1 ring-subtle',
        className,
      )}
    >
      {children}
    </span>
  )
}
