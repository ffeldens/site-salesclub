import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CalendarIcon } from '@/components/ui/icons'

export type HeroImersaoProps = {
  title: string
  subtitle?: string
  data?: string
  local?: string
  formato?: string
  applyHref?: string
  whatsappHref?: string
}

/**
 * Hero das páginas de imersão: badges (formato/data/local), CTA duplo
 * (Aplicar + WhatsApp) e gancho para "adicionar à agenda" (Fase 3).
 */
export function HeroImersao({
  title,
  subtitle,
  data,
  local,
  formato = 'Presencial',
  applyHref = '#aplicar',
  whatsappHref = '#whatsapp',
}: HeroImersaoProps) {
  return (
    <section className="relative overflow-hidden border-b border-subtle">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-80 w-[600px] rounded-full bg-brand/20 blur-[120px]"
      />
      <div className="container-content relative py-20 sm:py-28">
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">{formato}</Badge>
          {data && (
            <Badge>
              <CalendarIcon className="h-3.5 w-3.5" />
              {data}
            </Badge>
          )}
          {local && <Badge>{local}</Badge>}
        </div>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg text-paper-pure">{title}</h1>
        {subtitle && <p className="prose-sc mt-5 text-lg">{subtitle}</p>}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={applyHref} size="lg">
            Aplicar para a turma
          </Button>
          <Button href={whatsappHref} variant="whatsapp" size="lg">
            Falar com especialista
          </Button>
        </div>
      </div>
    </section>
  )
}
