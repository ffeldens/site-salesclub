import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Logo } from '@/components/ui/Logo'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { Modulos } from '@/components/blocks/Modulos'
import { ParaQuem } from '@/components/blocks/ParaQuem'
import { Stats } from '@/components/blocks/Stats'
import { FAQ } from '@/components/blocks/FAQ'
import { FormLead } from '@/components/blocks/FormLead'
import { CardConteudo, CardMaterial } from '@/components/blocks/Cards'
import { getFaqHome, getStats } from '@/lib/content'

// Página interna de referência — fora do índice de busca.
export const metadata: Metadata = buildMetadata({
  title: 'Styleguide',
  path: '/styleguide',
  noindex: true,
})

const SWATCHES = [
  { name: 'brand', cls: 'bg-brand', hex: '#AF0002' },
  { name: 'brand-vivid', cls: 'bg-brand-vivid', hex: '#FA0100' },
  { name: 'brand-hover', cls: 'bg-brand-hover', hex: '#BF2C2D' },
  { name: 'brand-wine', cls: 'bg-brand-wine', hex: '#350001' },
  { name: 'ink', cls: 'bg-ink border border-subtle', hex: '#0C0C0C' },
  { name: 'ink-card', cls: 'bg-ink-card', hex: '#121316' },
  { name: 'ink-line', cls: 'bg-ink-line', hex: '#1F2124' },
  { name: 'mute', cls: 'bg-mute', hex: '#54595F' },
  { name: 'paper', cls: 'bg-paper', hex: '#FAFAFA' },
  { name: 'teal', cls: 'bg-teal', hex: '#6AD1D2' },
]

export default function StyleguidePage() {
  return (
    <main className="py-12">
      <div className="container-content">
        <div className="mb-10 flex items-center justify-between">
          <Logo />
          <Badge tone="brand">Styleguide · Design System v0.1</Badge>
        </div>
        <h1 className="font-display text-display-lg text-paper-pure">Sales Club Design System</h1>
        <p className="prose-sc mt-4">
          Tokens, tipografia e biblioteca de blocos derivados do brand guide. Tema dark-first,
          premium/executivo. Esta página é a referência viva da Fase 1.
        </p>
      </div>

      {/* Cores */}
      <Section>
        <SectionHeading eyebrow="Tokens" title="Paleta de cores" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SWATCHES.map((s) => (
            <div key={s.name}>
              <div className={`h-20 rounded-card ${s.cls}`} />
              <p className="mt-2 text-sm font-medium text-paper">{s.name}</p>
              <p className="text-xs text-mute">{s.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tipografia */}
      <Section tone="card">
        <SectionHeading eyebrow="Tokens" title="Tipografia (Heebo)" />
        <div className="space-y-4">
          <p className="font-display text-display-lg text-paper-pure">Display LG — H1</p>
          <p className="font-display text-display text-paper">Display — H2 de seção</p>
          <p className="font-display text-heading text-paper">Heading — cards e módulos</p>
          <p className="text-base text-paper/85">Body — texto padrão em 16px / Heebo regular.</p>
          <p className="text-sm text-mute">Texto secundário — cinza médio (#54595F).</p>
        </div>
      </Section>

      {/* Botões */}
      <Section>
        <SectionHeading eyebrow="Componentes" title="Botões" />
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="whatsapp">WhatsApp</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      {/* Badges + Cards */}
      <Section tone="card">
        <SectionHeading eyebrow="Componentes" title="Badges, Cards e Answer-first" />
        <div className="mb-6 flex flex-wrap gap-3">
          <Badge>Presencial</Badge>
          <Badge tone="brand">Vagas abertas</Badge>
          <Badge>São Paulo · SP</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-display text-heading text-paper-pure">Card padrão</h3>
            <p className="mt-2 text-sm text-paper/70">
              Fundo #121316 com borda sutil e sombra. Base para todos os blocos.
            </p>
          </Card>
          <AnswerBlock>
            O Sales Club é o maior ecossistema de vendas do Brasil: imersões, serviços, comunidade e
            tecnologia para dar previsibilidade e escala à área comercial de empresas B2B. Bloco
            answer-first (40–60 palavras) usado no topo de páginas de conteúdo para GEO.
          </AnswerBlock>
        </div>
      </Section>

      {/* Blocos */}
      <Stats stats={getStats()} />

      <Modulos
        modulos={[
          { numero: 1, titulo: 'Diagnóstico e estratégia', descricao: 'Onde sua operação está e para onde vai.' },
          { numero: 2, titulo: 'Processo e funil', descricao: 'Etapas, cadências e playbooks.' },
          { numero: 3, titulo: 'Gestão e indicadores', descricao: 'OKRs, metas e rituais de gestão.' },
          { numero: 4, titulo: 'Pessoas e IA', descricao: 'Time de alta performance + IA aplicada.' },
        ]}
      />

      <ParaQuem
        segmentos={[
          'Sócios e CEOs de empresas B2B',
          'Diretores e Heads comerciais',
          'Gerentes e coordenadores de vendas',
          'Times de vendas de PMEs e scale-ups',
          'Líderes em transformação comercial',
          'Empresas em expansão e escala',
        ]}
      />

      {/* Cards de conteúdo/material */}
      <Section>
        <SectionHeading eyebrow="Componentes" title="Cards de conteúdo e materiais" />
        <div className="grid gap-6 md:grid-cols-3">
          <CardConteudo
            titulo="Como dar previsibilidade à área comercial"
            resumo="Os 4 pilares para transformar vendas no improviso em uma máquina previsível."
            href="#"
            categoria="Gestão Comercial"
            dataPublicacao="19 jun 2026"
          />
          <CardMaterial
            titulo="20 prompts para líderes comerciais"
            resumo="Guia prático de IA aplicada à liderança de vendas."
            href="#"
            formato="eBook gratuito"
          />
          <CardConteudo
            titulo="OKRs em vendas: por onde começar"
            resumo="Um framework para alinhar metas e execução comercial."
            href="#"
            categoria="OKRs"
            dataPublicacao="19 jun 2026"
          />
        </div>
      </Section>

      {/* FAQ + Form */}
      <FAQ items={getFaqHome()} />

      <Section tone="card">
        <SectionHeading eyebrow="Componentes" title="FormLead (qualificação rica → Pipedrive)" />
        <div className="mx-auto max-w-2xl">
          <FormLead source="contato" produto="Styleguide" title="Fale com um especialista" />
        </div>
      </Section>
    </main>
  )
}
