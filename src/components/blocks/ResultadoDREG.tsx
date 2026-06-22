import Link from 'next/link'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { dregEtapas, dregMapa } from '@/content/metodo'

/**
 * P2.4 — lê o resultado do diagnóstico pela ótica DREG: cada etapa com a trilha
 * recomendada (solução para fortalecer a etapa mais fraca).
 */
export function ResultadoDREG() {
  const trilhaPorEtapa = (etapa: string) =>
    dregMapa.find((m) => m.etapa === etapa)?.solucoes.slice(0, 2) ?? []

  return (
    <Section>
      <SectionHeading
        eyebrow="Seu resultado, lido pelo DREG"
        title="Da nota à ação: por onde começar"
        description="No resultado, os 10 pilares são organizados nas quatro etapas do método DREG. A etapa com a menor nota é o seu maior gargalo — e aponta a trilha recomendada para começar."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dregEtapas.map((e) => (
          <Card key={e.nome} className="flex flex-col">
            <span className="font-display text-3xl font-extrabold text-brand/40">{e.letra}</span>
            <h3 className="mt-1 font-display text-heading text-paper-pure">{e.nome}</h3>
            <p className="mt-2 flex-1 text-sm text-paper/65">{e.descricao}</p>
            <div className="mt-4 border-t border-subtle pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mute">
                Comece por
              </p>
              <ul className="space-y-1">
                {trilhaPorEtapa(e.nome).map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-sm font-medium text-brand-vivid hover:underline">
                      {s.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm text-mute">
        Quer ajuda para ler o seu resultado?{' '}
        <Link href="/metodo" className="text-paper/85 hover:text-paper">
          Entenda o método DREG
        </Link>
        .
      </p>
    </Section>
  )
}
