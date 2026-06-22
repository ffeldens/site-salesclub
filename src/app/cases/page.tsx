import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { LogosProvaSocial } from '@/components/blocks/LogosProvaSocial'
import { Stats } from '@/components/blocks/Stats'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Depoimentos } from '@/components/blocks/Depoimentos'
import { CTASection } from '@/components/blocks/CTASection'
import { getClienteLogos, getDepoimentos, getStats } from '@/lib/content'

export const metadata: Metadata = buildMetadata({
  title: 'Cases e resultados',
  description:
    'Resultados de empresas que estruturaram a máquina de vendas com o Sales Club: crescimento de receita, conversão e previsibilidade.',
  path: '/cases',
})

// TODO(conteúdo): números reais dos cases (site atual exibe placeholders) e
// nomes/empresas dos depoimentos.
const CASES = [
  { setor: 'Indústria de Transformação', desafio: '90% das vendas dependiam de representantes externos, com baixo controle de conversão.', resultado: 'Vendas via equipe interna passaram de 10% para 90%; conversão de reuniões de 15% para 32%.' },
  { setor: 'Recursos Humanos', desafio: '4 vendedores sem processos e ICP mal definido (8% de conversão).', resultado: 'Crescimento de receita e conversão de reuniões de 8% para 15%, com 3 ICPs e playbook.' },
  { setor: 'Logística Especializada', desafio: 'Telemarketing receptivo, sem processo ativo para clientes perdidos.', resultado: 'Recuperação de clientes perdidos em 4 meses com a virada para Inside Sales.' },
]

export default function CasesPage() {
  return (
    <PageShell>
      <HeroInstitucional
        eyebrow="Cases"
        title="Empresas que trocaram o improviso pela arquitetura"
        subtitle="Negócios de diferentes setores que estruturaram a máquina de vendas com o método DREG do Sales Club e ganharam previsibilidade."
        primaryCta={{ label: 'Quero resultados assim', href: '/contato' }}
      />

      <Stats stats={getStats()} />

      <Section tone="card">
        <SectionHeading eyebrow="Histórias" title="Cases por setor" />
        <div className="grid gap-6 lg:grid-cols-3">
          {CASES.map((c) => (
            <Card key={c.setor} as="article" className="bg-ink">
              <h3 className="font-display text-heading text-paper-pure">{c.setor}</h3>
              <p className="mt-3 text-sm text-paper/60">
                <span className="font-medium text-paper/80">Desafio:</span> {c.desafio}
              </p>
              <p className="mt-2 text-sm text-paper/80">
                <span className="font-medium text-brand-vivid">Resultado:</span> {c.resultado}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <LogosProvaSocial logos={getClienteLogos()} />

      <Depoimentos depoimentos={getDepoimentos()} />

      <CTASection
        title="A próxima história de resultado pode ser a sua"
        description="Converse com um especialista e descubra como estruturar a sua máquina de vendas."
        primaryCta={{ label: 'Falar com especialista', href: '/contato' }}
      />
    </PageShell>
  )
}
