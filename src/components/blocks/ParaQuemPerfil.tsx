import Link from 'next/link'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { getRecomendadorDor } from '@/content/ecossistema'

/**
 * "Para o seu momento" (P3.2): a pessoa escolhe a DOR, vê a etapa DREG
 * correspondente e a trilha recomendada — com ponte para o diagnóstico.
 */
export function ParaQuemPerfil() {
  const dores = getRecomendadorDor()
  return (
    <Section tone="card">
      <SectionHeading
        eyebrow="Para o seu momento"
        title="Qual é a sua principal dor hoje?"
        description="Identifique o seu maior gargalo, descubra a etapa do método DREG por trás dele e veja a trilha recomendada. Na dúvida, o diagnóstico aponta para você."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dores.map((d) => (
          <Card key={d.dor} className="flex flex-col bg-ink">
            <span className="mb-3 inline-flex self-start rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-vivid">
              Etapa DREG · {d.etapa}
            </span>
            <p className="flex-1 font-display text-base text-paper">“{d.dor}”</p>
            <div className="mt-4 border-t border-subtle pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-mute">
                Trilha recomendada
              </p>
              {d.recomendados.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="block text-sm font-medium text-brand-vivid hover:underline"
                >
                  {r.label} →
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/servicos/diagnostico-comercial" size="lg">
          Não sei minha etapa — fazer diagnóstico gratuito
        </Button>
      </div>
    </Section>
  )
}
