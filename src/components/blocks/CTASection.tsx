import { Button } from '@/components/ui/Button'

export type CTASectionProps = {
  title: string
  description?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

/** Faixa de conversão recorrente. */
export function CTASection({ title, description, primaryCta, secondaryCta }: CTASectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-content">
        <div className="relative overflow-hidden rounded-card border border-subtle bg-ink-card p-10 text-center sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-20 mx-auto h-48 w-[500px] rounded-full bg-brand/20 blur-[100px]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-display text-paper-pure">{title}</h2>
            {description && <p className="prose-sc mx-auto mt-4">{description}</p>}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
