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
import { getServicos } from '@/content/servicos'

export const metadata: Metadata = buildMetadata({
  title: 'Serviços de consultoria comercial',
  description:
    'Serviços do Sales Club para estruturar a sua operação comercial: Máquina de Vendas (squad de implementação) e Diagnóstico Comercial gratuito.',
  path: '/servicos',
})

export default function ServicosPage() {
  const servicos = getServicos()
  return (
    <PageShell>
      <HeroInstitucional
        eyebrow="Serviços"
        title="Estruture a sua máquina de vendas com quem já fez +800 vezes"
        subtitle="Do diagnóstico gratuito à implementação completa com um squad dedicado — serviços produtizados para dar previsibilidade à sua operação comercial."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />

      <Section>
        <SectionHeading eyebrow="Como podemos ajudar" title="Escolha o ponto de partida" />
        <div className="grid gap-6 md:grid-cols-2">
          {servicos.map((s) => (
            <Card key={s.slug} as="article" className="flex flex-col">
              <Badge tone="brand" className="mb-3 self-start">
                {s.tipo === 'ferramenta-gratuita' ? 'Gratuito' : 'Implementação'}
              </Badge>
              <h3 className="font-display text-heading text-paper-pure">
                <Link href={`/servicos/${s.slug}`} className="hover:text-brand-vivid">
                  {s.titulo}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm text-paper/70">{s.subtitulo}</p>
              <Button href={`/servicos/${s.slug}`} variant="secondary" size="sm" className="mt-4 self-start">
                Ver detalhes
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        title="Não sabe por onde começar?"
        description="Comece pelo Diagnóstico Comercial gratuito ou fale direto com um especialista."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
        secondaryCta={{ label: 'Fazer diagnóstico gratuito', href: '/servicos/diagnostico-comercial' }}
      />
    </PageShell>
  )
}
