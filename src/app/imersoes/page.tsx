import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CTASection } from '@/components/blocks/CTASection'
import { getImersoes } from '@/content/imersoes'

export const metadata: Metadata = buildMetadata({
  title: 'Imersões presenciais de vendas',
  description:
    'Imersões presenciais do Sales Club para empresários e líderes comerciais: Sales Strategy, Sales Leadership e Sales AI, no Sales Village em São Paulo.',
  path: '/imersoes',
})

export default function ImersoesPage() {
  const imersoes = getImersoes()
  return (
    <PageShell>
      <HeroInstitucional
        eyebrow="Imersões presenciais"
        title="Imersões para transformar a sua liderança comercial"
        subtitle="Programas presenciais no Sales Village, em São Paulo, com mentores de marca e metodologia aplicada. Escolha a imersão certa para o seu momento."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />

      <Section>
        <SectionHeading
          eyebrow="Escolha a sua"
          title="Três imersões, um ecossistema"
          description="Estratégia comercial, liderança de vendas e IA aplicada — para empresários, gestores e times que querem previsibilidade."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {imersoes.map((im) => (
            <Card key={im.slug} as="article" className="flex flex-col">
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge tone="brand">{im.formato}</Badge>
                {im.destaque && <Badge>Mais procurada</Badge>}
              </div>
              <h3 className="font-display text-heading text-paper-pure">
                <Link href={`/imersoes/${im.slug}`} className="hover:text-brand-vivid">
                  {im.titulo}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm text-paper/70">{im.subtitulo}</p>
              {im.data && <p className="mt-4 text-xs text-mute">📅 {im.data}</p>}
              <Button href={`/imersoes/${im.slug}`} variant="secondary" size="sm" className="mt-4 self-start">
                Ver detalhes
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        title="Não sabe qual imersão é a ideal?"
        description="Converse com um especialista do Sales Club e receba uma recomendação para o seu momento."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />
    </PageShell>
  )
}
