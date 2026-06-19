import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Beneficios } from '@/components/blocks/Beneficios'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { Depoimentos } from '@/components/blocks/Depoimentos'
import { FormLead } from '@/components/blocks/FormLead'
import { getDepoimentos } from '@/lib/content'

// TODO(conteúdo): validar pilares, benefícios e depoimentos de membros da ELITE.
export const metadata: Metadata = buildMetadata({
  title: 'ELITE — a comunidade de empresários do Sales Club',
  description:
    'ELITE é a comunidade de empresários do Sales Club: capacitação, Máquina de Vendas, mentoria e networking qualificado em um só lugar.',
  path: '/elite',
})

export default function ElitePage() {
  return (
    <PageShell whatsappMessage="Olá! Quero aplicar para a comunidade ELITE do Sales Club.">
      <HeroInstitucional
        eyebrow="Comunidade · Membership"
        title="ELITE: a comunidade de empresários do Sales Club"
        subtitle="A expressão do conceito clube: capacitação contínua, Máquina de Vendas, mentoria e networking qualificado entre empresários que vivem os mesmos desafios comerciais."
        primaryCta={{ label: 'Aplicar para a comunidade', href: '#cta' }}
      />

      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>
            A ELITE é a comunidade de empresários do Sales Club — o coração do conceito clube. Combina
            quatro pilares: capacitação contínua, a metodologia Máquina de Vendas, mentoria com os
            sócios e mentores de marca, e networking qualificado entre empresários B2B. O acesso é por
            aplicação, para preservar a qualidade do grupo.
          </AnswerBlock>
        </div>
      </Section>

      <Beneficios
        eyebrow="Os pilares"
        title="O que você encontra na ELITE"
        items={[
          { titulo: 'Capacitação contínua', descricao: 'Acesso a imersões, conteúdos e trilhas do ecossistema.' },
          { titulo: 'Máquina de Vendas', descricao: 'A metodologia de previsibilidade aplicada ao seu negócio.' },
          { titulo: 'Mentoria', descricao: 'Acompanhamento com os sócios e mentores de marca.' },
          { titulo: 'Networking qualificado', descricao: 'Relacionamento entre empresários que vivem os mesmos desafios.' },
        ]}
      />

      <Depoimentos title="O que dizem os membros" depoimentos={getDepoimentos()} />

      <Section id="cta" tone="card">
        <SectionHeading
          eyebrow="Aplicação"
          title="Aplicar para a comunidade"
          description="O acesso à ELITE é por aplicação. Conte um pouco sobre você e sua empresa — avaliamos o perfil e retornamos."
          align="center"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead source="elite" produto="ELITE" title="" ctaLabel="Aplicar para a comunidade" />
        </div>
      </Section>
    </PageShell>
  )
}
