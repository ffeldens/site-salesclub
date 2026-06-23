import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section } from '@/components/ui/Section'
import { Stats } from '@/components/blocks/Stats'
import { Mentores } from '@/components/blocks/Mentores'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { CTASection } from '@/components/blocks/CTASection'
import { LivroAutoridade } from '@/components/blocks/LivroAutoridade'
import { getMentores, getStats } from '@/lib/content'

export const metadata: Metadata = buildMetadata({
  title: 'Sobre o Sales Club',
  description:
    'O Sales Club é o maior ecossistema de vendas do Brasil: imersões, serviços, comunidade e tecnologia para empresas B2B, com sede própria — o Sales Village, em São Paulo.',
  path: '/sobre',
})

export default function SobrePage() {
  return (
    <PageShell>
      <HeroInstitucional
        eyebrow="Sobre"
        title="O maior ecossistema de vendas do Brasil"
        subtitle="Há mais de 10 anos ajudando empresas a transformar vendas no improviso em máquinas comerciais previsíveis — com método, tecnologia e uma comunidade de empresários."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />

      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>
            O Sales Club é o maior ecossistema de vendas do Brasil. Reúne imersões presenciais, serviços
            de consultoria (Máquina de Vendas e Diagnóstico Comercial), uma comunidade de empresários
            (ELITE), conselho consultivo (Sales Advisory) e tecnologia (Sales AI) — com sede
            própria, o Sales Village, em São Paulo.
          </AnswerBlock>
          {/* TODO(conteúdo): manifesto institucional completo a ser fornecido pelo cliente. */}
          <p className="prose-sc mt-8">
            Nossa missão é dar previsibilidade e escala à área comercial de empresas B2B. Combinamos
            metodologia validada em mais de 800 empresas, mentores de marca e um espaço físico
            diferenciado para criar a experiência mais completa de desenvolvimento comercial do país.
          </p>
        </div>
      </Section>

      <Stats stats={getStats()} tone="card" />

      <Mentores eyebrow="Quem está à frente" title="Mentores e sócios" mentores={getMentores()} />

      <LivroAutoridade />

      <CTASection
        title="Faça parte do ecossistema"
        description="Converse com o nosso time e descubra o melhor caminho para a sua empresa."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
        secondaryCta={{ label: 'Conhecer as imersões', href: '/imersoes' }}
      />
    </PageShell>
  )
}
