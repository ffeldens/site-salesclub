import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { LogosProvaSocial } from '@/components/blocks/LogosProvaSocial'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { CTASection } from '@/components/blocks/CTASection'
import { getCorporateOfertas } from '@/content/corporate'

export const metadata: Metadata = buildMetadata({
  title: 'Corporate — educação e soluções comerciais para grandes contas',
  description:
    'Capacitações, palestras, convenções, projetos especiais e mentoria executiva do Sales Club para empresas enterprise.',
  path: '/corporate',
})

export default function CorporatePage() {
  const ofertas = getCorporateOfertas()
  return (
    <PageShell whatsappMessage="Olá! Quero falar sobre uma solução corporativa do Sales Club.">
      <HeroInstitucional
        eyebrow="Corporate · Enterprise"
        title="Soluções comerciais para grandes contas"
        subtitle="Educação corporativa, palestras, convenções, projetos especiais e mentoria executiva — a metodologia do Sales Club dentro da sua organização."
        primaryCta={{ label: 'Solicitar proposta', href: '/contato' }}
      />

      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>
            O Sales Club Corporate leva a metodologia comercial validada em +800 empresas para grandes
            organizações, por meio de capacitações in company, palestras, convenções, projetos especiais
            e mentoria executiva — com escopo desenhado caso a caso e medição de impacto.
          </AnswerBlock>
        </div>
      </Section>

      <LogosProvaSocial title="Já atendemos times comerciais de" logos={['Coca-Cola', 'Disney', 'Google', 'Eletrobras', 'Pearson', 'Cyrela']} />

      <Section tone="card">
        <SectionHeading eyebrow="O que oferecemos" title="Cinco frentes para o seu time comercial" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ofertas.map((o) => (
            <Card key={o.slug} as="article" className="flex flex-col bg-ink">
              <h3 className="font-display text-heading text-paper-pure">
                <Link href={`/corporate/${o.slug}`} className="hover:text-brand-vivid">
                  {o.titulo}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm text-paper/70">{o.headline}</p>
              <Button href={`/corporate/${o.slug}`} variant="secondary" size="sm" className="mt-4 self-start">
                Saiba mais
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        title="Vamos desenhar a solução certa para a sua empresa"
        description="Conte o seu desafio comercial e receba uma proposta sob medida do time enterprise do Sales Club."
        primaryCta={{ label: 'Solicitar proposta', href: '/contato' }}
      />
    </PageShell>
  )
}
