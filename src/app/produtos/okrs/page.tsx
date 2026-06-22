import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section } from '@/components/ui/Section'
import { Beneficios } from '@/components/blocks/Beneficios'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { CTASection } from '@/components/blocks/CTASection'
import { BadgeDREG } from '@/components/BadgeDREG'

// TODO(produto): definir se a v1 terá apenas vitrine + link de login externo
// (atual) ou login integrado. Atualizar OKRS_APP_URL com a URL real do app.
const OKRS_APP_URL = 'https://gtp.salesclub.com.br'

export const metadata: Metadata = buildMetadata({
  title: 'App de OKRs — gestão por objetivos para times comerciais',
  description:
    'O app de OKRs do Sales Club ajuda times comerciais a definir, acompanhar e bater metas com gestão por objetivos e resultados-chave.',
  path: '/produtos/okrs',
})

export default function OkrsPage() {
  return (
    <PageShell whatsappMessage="Olá! Quero saber mais sobre o app de OKRs do Sales Club.">
      <HeroInstitucional
        eyebrow="Produto · Tecnologia"
        title="App de OKRs para a sua área comercial"
        subtitle="Defina objetivos, acompanhe resultados-chave e dê ritmo de gestão ao time comercial — a tecnologia do Sales Club para previsibilidade."
        primaryCta={{ label: 'Acessar o app', href: OKRS_APP_URL }}
        secondaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />

      <Section>
        <div className="max-w-3xl">
          <div className="mb-6">
            <BadgeDREG etapa="Gerenciar" />
          </div>
          <AnswerBlock>
            O app de OKRs do Sales Club é a ferramenta de gestão por objetivos e resultados-chave para
            times comerciais. Permite definir metas, acompanhar o progresso em tempo real e sustentar
            rituais de gestão — conectando estratégia e execução da área de vendas.
          </AnswerBlock>
        </div>
      </Section>

      <Beneficios
        eyebrow="Recursos"
        title="O que o app entrega"
        items={[
          { titulo: 'Objetivos e resultados-chave', descricao: 'Estruture OKRs por time e por pessoa.' },
          { titulo: 'Acompanhamento em tempo real', descricao: 'Progresso visível para liderança e time.' },
          { titulo: 'Rituais de gestão', descricao: 'Apoie 1:1, check-ins e revisões de meta.' },
          { titulo: 'Integrado ao ecossistema', descricao: 'Alinhado à metodologia Máquina de Vendas.' },
        ]}
      />

      <CTASection
        title="Dê ritmo de gestão ao seu time comercial"
        description="Acesse o app de OKRs ou fale com um especialista para entender como aplicá-lo na sua operação."
        primaryCta={{ label: 'Acessar o app', href: OKRS_APP_URL }}
        secondaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />
    </PageShell>
  )
}
