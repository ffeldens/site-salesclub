import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import type { Depoimento } from '@/lib/content'

export type DepoimentosProps = {
  eyebrow?: string
  title?: string
  depoimentos: Depoimento[]
}

/** Quotes de clientes. Schema Review/AggregateRating fica na página. */
export function Depoimentos({ eyebrow = 'Prova social', title = 'O que dizem nossos membros', depoimentos }: DepoimentosProps) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="grid gap-6 md:grid-cols-2">
        {depoimentos.map((d, i) => (
          <Card key={i} as="article">
            <p className="font-display text-lg text-paper">“{d.quote}”</p>
            <footer className="mt-4 text-sm text-mute">
              <span className="font-medium text-paper/90">{d.nome}</span> — {d.empresa}
            </footer>
          </Card>
        ))}
      </div>
    </Section>
  )
}
