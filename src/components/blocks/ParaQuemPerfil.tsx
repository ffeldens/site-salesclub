import Link from 'next/link'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { getPerfis } from '@/content/ecossistema'

/** Navegação por perfil de público — caminho recomendado para cada momento. */
export function ParaQuemPerfil() {
  const perfis = getPerfis()
  return (
    <Section tone="card">
      <SectionHeading
        eyebrow="Por onde começar"
        title="Para o seu momento"
        description="Escolha o seu perfil e veja o caminho recomendado dentro do ecossistema."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {perfis.map((p) => (
          <Card key={p.perfil} className="flex flex-col bg-ink">
            <h3 className="font-display text-heading text-paper-pure">{p.perfil}</h3>
            <p className="mt-2 flex-1 text-sm text-paper/65">{p.dor}</p>
            <div className="mt-4 flex flex-col gap-2 border-t border-subtle pt-4">
              {p.recomendados.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="text-sm font-medium text-brand-vivid hover:underline"
                >
                  {r.label} →
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
