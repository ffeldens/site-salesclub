import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import type { Depoimento } from '@/lib/content'

export type DepoimentosProps = {
  eyebrow?: string
  title?: string
  depoimentos: Depoimento[]
}

/** Quotes de clientes com atribuição nominal e número de resultado. */
export function Depoimentos({ eyebrow = 'Prova social', title = 'O que dizem nossos membros', depoimentos }: DepoimentosProps) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="grid gap-6 md:grid-cols-3">
        {depoimentos.map((d, i) => (
          <Card key={i} as="article" className="flex flex-col">
            {d.resultado && (
              <p className="mb-3 inline-flex self-start rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand-vivid">
                {d.resultado}
              </p>
            )}
            <p className="flex-1 font-display text-lg text-paper">“{d.quote}”</p>
            <footer className="mt-4 border-t border-subtle pt-4 text-sm">
              <span className="font-medium text-paper/90">{d.nome}</span>
              {d.cargo && <span className="text-mute"> · {d.cargo}</span>}
              <span className="block text-mute">{d.empresa}</span>
            </footer>
          </Card>
        ))}
      </div>
    </Section>
  )
}
