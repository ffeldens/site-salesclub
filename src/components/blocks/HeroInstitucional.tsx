import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export type HeroInstitucionalProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Foto de fundo full-bleed (autoridade) com overlay escuro para legibilidade. */
  imagem?: { src: string; alt: string }
}

/** Hero institucional (Home / serviços). Conteúdo no HTML inicial (SEO/GEO). */
export function HeroInstitucional({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  imagem,
}: HeroInstitucionalProps) {
  return (
    <section className="relative overflow-hidden border-b border-subtle">
      {imagem ? (
        <>
          <Image src={imagem.src} alt={imagem.alt} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/55" />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
        />
      )}
      <div className="container-content relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          {eyebrow && (
            <Badge tone="brand" className="mb-5">
              {eyebrow}
            </Badge>
          )}
          <h1 className="font-display text-display-lg text-paper-pure">{title}</h1>
          {subtitle && <p className="prose-sc mt-6 text-lg">{subtitle}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {primaryCta && (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
