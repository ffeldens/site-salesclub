import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section } from '@/components/ui/Section'
import { Beneficios } from '@/components/blocks/Beneficios'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { CTASection } from '@/components/blocks/CTASection'
import { BadgeDREG } from '@/components/BadgeDREG'

// TODO(conteúdo): validar a descrição e o formato do Sales Board com o cliente.
export const metadata: Metadata = buildMetadata({
  title: 'Sales Board — conselho consultivo de vendas',
  description:
    'O Sales Board é o conselho consultivo de vendas do Sales Club: acompanhamento estratégico recorrente da sua área comercial por especialistas.',
  path: '/sales-board',
})

export default function SalesBoardPage() {
  return (
    <PageShell whatsappMessage="Olá! Quero saber mais sobre o Sales Board.">
      <HeroInstitucional
        eyebrow="Conselho consultivo"
        title="Sales Board: um conselho de vendas para a sua empresa"
        subtitle="Acompanhamento estratégico recorrente da sua área comercial, com especialistas do Sales Club atuando como conselho consultivo de vendas."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />

      <Section>
        <div className="max-w-3xl">
          <div className="mb-6">
            <BadgeDREG etapa="Gerenciar" />
          </div>
          <AnswerBlock>
            O Sales Board é o conselho consultivo de vendas do Sales Club: um grupo de especialistas que
            acompanha a sua operação comercial de forma recorrente, ajudando a tomar decisões de
            estratégia, gestão e crescimento com base em método e dados.
          </AnswerBlock>
        </div>
      </Section>

      <Beneficios
        eyebrow="Como funciona"
        title="O que o Sales Board entrega"
        items={[
          { titulo: 'Acompanhamento estratégico recorrente', descricao: 'Encontros periódicos de conselho com a liderança comercial.' },
          { titulo: 'Visão externa qualificada', descricao: 'Especialistas que já estruturaram +800 operações.' },
          { titulo: 'Decisões baseadas em dados', descricao: 'Leitura de indicadores e direcionamento de prioridades.' },
          { titulo: 'Conexão com o ecossistema', descricao: 'Acesso à metodologia, imersões e rede do Sales Club.' },
        ]}
      />

      <CTASection
        title="Leve um conselho de vendas para a sua empresa"
        description="Converse com o time do Sales Club e entenda como o Sales Board pode acompanhar a sua operação."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />
    </PageShell>
  )
}
