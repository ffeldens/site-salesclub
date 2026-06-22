import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { DregDiagrama } from '@/components/blocks/DregDiagrama'
import { FAQ } from '@/components/blocks/FAQ'
import { dregEtapas, dregMapa, dregLivro } from '@/content/metodo'

export const metadata: Metadata = buildMetadata({
  title: 'Método DREG — a arquitetura de vendas de alta performance',
  description:
    'DREG (Desenhar, Recrutar, Educar, Gerenciar) é o método do Sales Club para construir uma máquina de vendas previsível. A teoria do livro de Hélio Azevedo e o modelo prático da Máquina de Vendas.',
  path: '/metodo',
})

export default function MetodoPage() {
  const url = `${siteConfig.url}/metodo`
  return (
    <PageShell whatsappMessage="Olá! Quero entender como aplicar o método DREG na minha empresa.">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Método DREG', url },
        ])}
      />

      <HeroInstitucional
        eyebrow="Nosso método"
        title="Vender não é talento. É arquitetura."
        subtitle="O método DREG — Desenhar, Recrutar, Educar e Gerenciar — é a forma do Sales Club de construir uma área comercial de alta performance: com planta antes do primeiro tijolo."
        primaryCta={{ label: 'Descobrir minha etapa mais fraca', href: '/servicos/diagnostico-comercial' }}
        secondaryCta={{ label: 'Conhecer a Máquina de Vendas', href: '/servicos/maquina-de-vendas' }}
      />

      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>
            DREG é o método proprietário do Sales Club para construir uma máquina de vendas previsível,
            em quatro etapas: Desenhar a arquitetura comercial, Recrutar as pessoas certas, Educar de
            forma contínua e Gerenciar para sustentar resultados. É a teoria do livro Arquitetura de
            Vendas de Alta Performance — e a Máquina de Vendas é o modelo que a coloca em prática.
          </AnswerBlock>
        </div>
      </Section>

      {/* A teoria: as 4 etapas */}
      <Section tone="card">
        <SectionHeading eyebrow="A teoria" title="As quatro etapas do DREG" />
        <div className="mb-8">
          <DregDiagrama />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dregEtapas.map((e) => (
            <Card key={e.nome} className="bg-ink">
              <span className="font-display text-4xl font-extrabold text-brand/40">{e.letra}</span>
              <h3 className="mt-2 font-display text-heading text-paper-pure">{e.nome}</h3>
              <p className="mt-2 text-sm text-paper/70">{e.descricao}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Da teoria à prática: a Máquina de Vendas */}
      <Section>
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Da teoria à prática"
            title="A Máquina de Vendas implementa o DREG"
          />
          <p className="prose-sc">
            Se o DREG é a planta, a <strong className="text-paper">Máquina de Vendas</strong> é a
            construção: o serviço em que um squad de especialistas percorre as quatro etapas dentro da
            sua operação — do desenho da arquitetura à governança que sustenta a previsibilidade — em
            três fases (diagnóstico, implementação e operação assistida). É o modelo prático de
            implementação e evolução do método.
          </p>
          <div className="mt-6">
            <Button href="/servicos/maquina-de-vendas" size="lg">
              Ver a Máquina de Vendas
            </Button>
          </div>
        </div>
      </Section>

      {/* Mapa solução × etapa */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Mapa"
          title="Qual solução fortalece cada etapa"
          description="Cada produto do ecossistema reforça uma ou mais etapas do DREG no seu negócio."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dregMapa.map((col) => (
            <Card key={col.etapa} className="bg-ink">
              <h3 className="font-display text-heading text-brand-vivid">{col.etapa}</h3>
              <ul className="mt-3 space-y-2 border-t border-subtle pt-3">
                {col.solucoes.map((s) => (
                  <li key={s.label}>
                    <Link href={s.href} className="text-sm text-paper/85 hover:text-brand-vivid">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Autoria / livro */}
      <Section>
        <Card className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-vivid">Autoria</p>
            <h3 className="mt-2 font-display text-heading text-paper-pure">{dregLivro.titulo}</h3>
            <p className="mt-1 text-sm text-paper/70">Por {dregLivro.autores}.</p>
          </div>
          {/* TODO(livro): capa em alta + link de compra (Pendência #4). */}
          {dregLivro.link && (
            <Button href={dregLivro.link} size="md">
              Conhecer o livro
            </Button>
          )}
        </Card>
      </Section>

      <FAQ
        items={[
          { pergunta: 'O que significa DREG?', resposta: 'DREG é o acrônimo das quatro etapas do método: Desenhar, Recrutar, Educar e Gerenciar. Juntas, elas constroem uma área comercial de alta performance e previsível.' },
          { pergunta: 'Qual a diferença entre DREG e a Máquina de Vendas?', resposta: 'DREG é o método (a teoria/arquitetura). A Máquina de Vendas é o serviço que implementa esse método na sua operação, com um squad dedicado, em três fases.' },
          { pergunta: 'Por onde eu começo?', resposta: 'Pelo Diagnóstico Comercial gratuito: ele mostra qual etapa do DREG está mais fraca na sua operação e recomenda a trilha para fortalecê-la.' },
        ]}
      />

      <Section tone="card">
        <SectionHeading
          eyebrow="Comece agora"
          title="Descubra sua etapa mais fraca"
          description="O Diagnóstico Comercial gratuito aponta onde o DREG está frágil na sua operação."
          align="center"
        />
        <div className="text-center">
          <Button href="/servicos/diagnostico-comercial" size="lg">
            Fazer diagnóstico gratuito (5 min)
          </Button>
        </div>
      </Section>
    </PageShell>
  )
}
