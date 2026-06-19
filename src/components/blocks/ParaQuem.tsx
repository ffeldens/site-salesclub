import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export type ParaQuemProps = {
  eyebrow?: string
  title?: string
  segmentos: string[]
}

/** Segmentos de público a que a oferta se destina. */
export function ParaQuem({ eyebrow = 'Para quem é', title = 'Feito para decisores comerciais', segmentos }: ParaQuemProps) {
  return (
    <Section tone="card">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {segmentos.map((s) => (
          <Card key={s} className="bg-ink">
            <p className="text-paper/85">{s}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
