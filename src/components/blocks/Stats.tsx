import { Section } from '@/components/ui/Section'
import type { Stat } from '@/lib/content'

export type StatsProps = {
  stats: Stat[]
  tone?: 'base' | 'card'
}

/**
 * Números de prova social. Renderizado no servidor (valor no HTML inicial para
 * SEO/GEO — densidade factual). Animação de contagem pode ser adicionada depois
 * sem remover o valor textual.
 */
export function Stats({ stats, tone = 'base' }: StatsProps) {
  return (
    <Section tone={tone}>
      <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <dt className="font-display text-4xl font-extrabold text-brand-vivid sm:text-5xl">
              {s.valor}
            </dt>
            <dd className="mt-2 text-sm text-paper/70">{s.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
