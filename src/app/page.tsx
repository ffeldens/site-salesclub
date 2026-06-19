import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { LogosProvaSocial } from '@/components/blocks/LogosProvaSocial'
import { Stats } from '@/components/blocks/Stats'
import { Beneficios } from '@/components/blocks/Beneficios'
import { Mentores } from '@/components/blocks/Mentores'
import { SalesVillage } from '@/components/blocks/SalesVillage'
import { Depoimentos } from '@/components/blocks/Depoimentos'
import { FAQ } from '@/components/blocks/FAQ'
import { CTASection } from '@/components/blocks/CTASection'
import {
  getClienteLogos,
  getDepoimentos,
  getFaqHome,
  getMentores,
  getStats,
} from '@/lib/content'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroInstitucional
          eyebrow="O maior ecossistema de vendas do Brasil"
          title="Transforme sua área comercial em uma máquina de vendas previsível."
          subtitle="Imersões, serviços, comunidade e tecnologia para dar processo, gestão e escala às vendas de empresas B2B."
          primaryCta={{ label: 'Conhecer as imersões', href: '/imersoes' }}
          secondaryCta={{ label: 'Falar com especialista', href: '/contato' }}
        />

        <LogosProvaSocial logos={getClienteLogos()} />

        <Stats stats={getStats()} />

        <Beneficios
          eyebrow="O que muda na sua operação"
          title="Previsibilidade, processo e governança comercial"
          items={[
            { titulo: 'Processo comercial estruturado', descricao: 'Do topo do funil ao fechamento, com etapas claras.' },
            { titulo: 'Gestão por indicadores e OKRs', descricao: 'Decisões guiadas por dados, não por achismo.' },
            { titulo: 'Times mais produtivos', descricao: 'Playbooks, cadências e ritmo de vendas.' },
            { titulo: 'IA aplicada a vendas', descricao: 'Ganho de eficiência com Sales AI e automações.' },
          ]}
        />

        <Mentores mentores={getMentores()} />

        <SalesVillage />

        <Depoimentos depoimentos={getDepoimentos()} />

        <FAQ items={getFaqHome()} />

        <CTASection
          title="Pronto para dar previsibilidade às suas vendas?"
          description="Converse com um especialista do Sales Club e descubra o melhor caminho para a sua empresa."
          primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
          secondaryCta={{ label: 'Aplicar para uma imersão', href: '/imersoes' }}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
