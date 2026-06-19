import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getCursos } from '@/content/universidade'

export const metadata: Metadata = buildMetadata({
  title: 'Universidade Sales Club — formação online para times de vendas',
  description:
    'Cursos online da Universidade Sales Club para times de vendas, com método, ritmo e previsibilidade. Conheça a Formação Sales Pro.',
  path: '/universidade',
})

export default function UniversidadePage() {
  const cursos = getCursos()
  return (
    <PageShell>
      <HeroInstitucional
        eyebrow="Universidade Sales Club"
        title="Formação online para times de vendas de alta performance"
        subtitle="Cursos que transformam técnica isolada em comportamento padronizado — método, ritmo e previsibilidade para a sua operação comercial."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />

      <Section>
        <SectionHeading eyebrow="Cursos" title="Programas da Universidade" />
        <div className="grid gap-6 md:grid-cols-2">
          {cursos.map((c) => (
            <Card key={c.slug} as="article" className="flex flex-col">
              <Badge tone="brand" className="mb-3 self-start">
                {c.duracao} · Online
              </Badge>
              <h3 className="font-display text-heading text-paper-pure">
                <Link href={`/universidade/${c.slug}`} className="hover:text-brand-vivid">
                  {c.titulo}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm text-paper/70">{c.subtitulo}</p>
              <Button href={`/universidade/${c.slug}`} variant="secondary" size="sm" className="mt-4 self-start">
                Ver detalhes
              </Button>
            </Card>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
