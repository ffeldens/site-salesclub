import { cn } from '@/lib/cn'

type SectionProps = {
  children: React.ReactNode
  className?: string
  /** Fundo alternado para ritmo visual entre seções. */
  tone?: 'base' | 'card'
  id?: string
}

/** Faixa de seção full-width com container interno e respiro generoso. */
export function Section({ children, className, tone = 'base', id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 sm:py-20 lg:py-24', tone === 'card' && 'bg-ink-card', className)}
    >
      <div className="container-content">{children}</div>
    </section>
  )
}

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-vivid">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-display text-paper">{title}</h2>
      {description && <p className="prose-sc mt-4">{description}</p>}
    </div>
  )
}
