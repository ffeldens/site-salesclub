import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { LpHeader, LpFooter } from '@/components/lp/LpChrome'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { Section, SectionHeading } from '@/components/ui/Section'
import { DiagnosticoTool } from '@/components/blocks/DiagnosticoTool'

// LP de campanha do diagnóstico — fora do índice (a página canônica de SEO é
// /servicos/diagnostico-comercial).
export const metadata: Metadata = buildMetadata({
  title: 'Diagnóstico de Maturidade Comercial gratuito',
  description:
    'Em 5 minutos, descubra o nível de maturidade da sua operação comercial — score por pilar e a etapa do método DREG a priorizar.',
  path: '/diagnostico',
  noindex: true,
})

export default function DiagnosticoLpPage() {
  return (
    <>
      <LpHeader ctaLabel="Começar agora" ctaHref="#tool" />
      <main>
        <Section>
          <SectionHeading
            eyebrow="Diagnóstico gratuito · 5 minutos"
            title="Onde sua operação comercial está perdendo vendas?"
            description="Responda às perguntas (escala 0 a 10) e receba na hora o score de maturidade da sua empresa, pilar por pilar, com a etapa do método DREG que você deve priorizar. Sem custo, resultado imediato."
            align="center"
          />
          <div id="tool">
            <DiagnosticoTool />
          </div>
        </Section>
      </main>
      <LpFooter />
      <WhatsAppFloat />
    </>
  )
}
