import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Stats } from '@/components/blocks/Stats'
import { Mentores } from '@/components/blocks/Mentores'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { FormLead } from '@/components/blocks/FormLead'
import { CheckIcon } from '@/components/ui/icons'

export const metadata: Metadata = buildMetadata({
  title: 'Destino Futuro 2027 — comitiva executiva para o SXSW (Austin)',
  description:
    'Missão Destino Futuro 2027: a comitiva executiva Sales Club × Tangerine para o SXSW em Austin (13 a 22 de março). Curadoria e mentoria de Adri Gomes e Felipe Feldens, ingresso Platinum, roteiro completo e o relatório Download pós-evento.',
  path: '/destino-futuro',
})

const PILARES = [
  { titulo: 'Curadoria inteligente', descricao: 'Executivos de renome desenham roteiros sob medida para cada participante, com retorno direto para o negócio.' },
  { titulo: 'Antecipar o futuro', descricao: 'A mentoria transforma visões de futuro em decisões práticas e vantagem competitiva imediata.' },
  { titulo: 'Networking qualificado', descricao: 'Oportunidades reais de gerar negócio, encontrar parceiros e fortalecer sua marca pessoal e institucional.' },
  { titulo: 'Personalidades influentes', descricao: 'Ouvir de perto quem está moldando o futuro eleva o padrão de gestão do executivo.' },
]

const ROTEIRO = [
  { data: '13/03', atividade: 'Partida de São Paulo' },
  { data: '14/03', atividade: 'Chegada a Austin + City Tour' },
  { data: '15/03', atividade: 'Início do Festival' },
  { data: '16/03', atividade: 'Conferência + Experiências' },
  { data: '17/03', atividade: 'Conferência + Experiências' },
  { data: '18/03', atividade: 'Conferência + Experiências' },
  { data: '19/03', atividade: 'Conferência + Visita a empresa' },
  { data: '20/03', atividade: 'Conferência + Visita a empresa' },
  { data: '21/03', atividade: 'Partida de Austin' },
  { data: '22/03', atividade: 'Chegada a São Paulo' },
]

const INCLUSO = [
  { titulo: 'Hotel + passagem + transfer', descricao: 'Do embarque em São Paulo ao retorno, tudo coordenado.' },
  { titulo: 'Ingresso Platinum + curadoria & mentoria', descricao: 'Acesso pleno ao SXSW, com Adri Gomes e Felipe Feldens no roteiro.' },
  { titulo: 'Programação otimizada', descricao: 'Roteiro pronto entre conferência, experiências e visitas a empresas.' },
  { titulo: 'Adicionais', descricao: 'Reunião preliminar, kit viagem, welcome dinner, happy hour, Download e relatórios finais.' },
]

const MENTORES_MISSAO = [
  {
    nome: 'Adri Gomes',
    cargo: 'Conselheira Independente · Tangerine',
    bio: '25 anos em cargos de primeira liderança (Banco BV, Uber, Latam, Liberty Seguros). Hoje atua como Conselheira Independente, coach de executivos e palestrante.',
    foto: '/images/mentores/adriana-gomes.webp',
  },
  {
    nome: 'Felipe Feldens',
    cargo: 'Diretor Executivo · Sales Club',
    bio: 'Passou por altas posições em Sicredi, Lojas Renner, 99 e SKY. Engenharia pela UFRGS, Administração pela PUC-RS e educação executiva em Kellogg.',
    foto: '/images/mentores/felipe-feldens.webp',
  },
]

export default function DestinoFuturoPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Destino Futuro 2027', url: `${siteConfig.url}/destino-futuro` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: 'Destino Futuro 2027 — comitiva executiva Sales Club × Tangerine para o SXSW',
          description:
            'Comitiva executiva para o SXSW em Austin com curadoria e mentoria: viagem completa de 13 a 22 de março de 2027 (conferência oficial de 15 a 21).',
          startDate: '2027-03-13',
          endDate: '2027-03-22',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: { '@type': 'Place', name: 'Austin, Texas', address: 'Austin, TX, US' },
          organizer: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
          offers: {
            '@type': 'Offer',
            price: '7800',
            priceCurrency: 'USD',
            description: 'Por pessoa, em quarto duplo, em até 10x — hotel, passagem, transfer, ingresso Platinum, curadoria e mentoria inclusos.',
            url: `${siteConfig.url}/destino-futuro`,
          },
          url: `${siteConfig.url}/destino-futuro`,
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-subtle">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
        />
        <div className="container-content relative py-20 sm:py-28">
          <div className="flex flex-wrap gap-2">
            <Badge tone="brand">Missão internacional · Turma 2027</Badge>
            <Badge>Sales Club × Tangerine</Badge>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-display-lg text-paper-pure">
            Destino Futuro 2027: a comitiva executiva para o <span className="text-brand-vivid">SXSW</span>
          </h1>
          <p className="prose-sc mt-6 max-w-2xl text-lg">
            Austin, Texas — <strong className="text-paper-pure">13 a 22 de março de 2027</strong>{' '}
            (conferência oficial do SXSW: 15 a 21 de março). Curadoria, mentoria e networking para
            transformar o maior festival de inovação do mundo em retorno para o seu negócio.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#cta" size="lg">
              Quero garantir minha vaga
            </Button>
            <Button href="#roteiro" variant="secondary" size="lg">
              Ver o roteiro
            </Button>
          </div>
        </div>
      </section>

      {/* Answer-first (GEO) */}
      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>
            O Destino Futuro 2027 é a comitiva executiva do Sales Club com a Tangerine para o SXSW, em
            Austin: viagem completa de 13 a 22 de março de 2027, com ingresso Platinum, roteiro
            curado, mentoria de Adri Gomes e Felipe Feldens, visitas a empresas e o relatório Download
            pós-evento — USD 7.800 por pessoa (quarto duplo), em até 10x.
          </AnswerBlock>
        </div>
      </Section>

      {/* O ponto de partida */}
      <Section tone="card">
        <SectionHeading
          eyebrow="O ponto de partida"
          title="O SXSW ficou grande demais para se navegar sozinho"
          description="O erro caro não é a passagem — é escolher onde estar. Sem roteiro, o resultado é o FOMO: o medo de perder algo relevante em meio a mil escolhas acontecendo ao mesmo tempo, em prédios diferentes da cidade."
        />
        <Stats
          stats={[
            { valor: '300 mil', label: 'participantes, de mais de 90 países' },
            { valor: '+1.000', label: 'eventos paralelos em apenas 7 dias' },
            { valor: 'Brasil', label: 'já é a maior delegação internacional' },
            { valor: 'Espalhado', label: 'em vários prédios pela cidade' },
          ]}
        />
      </Section>

      {/* A resposta */}
      <Section>
        <SectionHeading
          eyebrow="A resposta"
          title="Curadoria e mentoria transformam +1.000 eventos em um roteiro com retorno"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILARES.map((p) => (
            <Card key={p.titulo} as="article">
              <h3 className="font-display text-heading text-paper-pure">{p.titulo}</h3>
              <p className="mt-2 text-sm text-paper/70">{p.descricao}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* O diferencial — Download */}
      <Section tone="card">
        <SectionHeading
          eyebrow="O diferencial"
          title="O valor não acaba quando o avião pousa: o Download traduz o SXSW para a sua agenda"
        />
        <ul className="grid max-w-3xl gap-3">
          {[
            'Um relatório com os sinais e tendências que realmente importam para o seu negócio — não um resumo de palestras.',
            'Modelo de tradução de tendências testado com GPTW e Ipsos, agora para a turma 2027.',
            'Assinado por Adri Gomes e Felipe Feldens — os mesmos mentores que vão com você para Austin.',
          ].map((item) => (
            <li key={item} className="flex gap-3 rounded-card border border-subtle bg-ink p-4 text-sm text-paper/85">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Quem conduz */}
      <Mentores
        eyebrow="Quem conduz"
        title="Modelo testado com C-level de Uber, Latam, Sicredi e Renner"
        mentores={MENTORES_MISSAO}
      />

      {/* Roteiro */}
      <Section id="roteiro" tone="card">
        <SectionHeading
          eyebrow="Como funciona"
          title="Dez dias em Austin: do city tour à visita a empresas"
          description="A viagem completa (13 a 22/03) inclui deslocamento e city tour; o festival do SXSW roda de 15 a 21/03 — as duas datas convivem no mesmo roteiro."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ROTEIRO.map((dia) => (
            <div key={dia.data} className="rounded-card border border-subtle bg-ink p-4">
              <p className="font-display text-lg font-bold text-brand-vivid">{dia.data}</p>
              <p className="mt-1 text-sm text-paper/80">{dia.atividade}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Investimento */}
      <Section>
        <SectionHeading eyebrow="O investimento" title="Tudo incluso, do embarque ao retorno" />
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Card className="bg-ink-card text-center ring-1 ring-brand/20">
            <p className="text-xs font-semibold uppercase tracking-widest text-mute">USD</p>
            <p className="font-display text-6xl font-extrabold text-paper-pure">7.800</p>
            <p className="mt-2 text-sm font-medium text-brand-vivid">em até 10x · quarto duplo*</p>
            <p className="mt-3 text-xs text-mute">
              *valor por pessoa, em quarto duplo. Consulte condições para quarto individual.
            </p>
            <Button href="#cta" size="lg" className="mt-6 w-full">
              Garantir minha vaga
            </Button>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {INCLUSO.map((i) => (
              <Card key={i.titulo} as="article" className="bg-ink">
                <h3 className="font-display text-lg text-paper-pure">{i.titulo}</h3>
                <p className="mt-2 text-sm text-paper/70">{i.descricao}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Captura */}
      <Section id="cta" tone="card">
        <SectionHeading
          eyebrow="Vagas limitadas"
          title="Garanta sua vaga na turma 2027"
          description="Deixe seus dados e o time do Sales Club entra em contato para apresentar as condições e reservar a sua vaga."
          align="center"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead
            source="eventos"
            produto="Destino Futuro 2027 (SXSW)"
            title=""
            ctaLabel="Quero garantir minha vaga"
            comercial={false}
            mensagem={{
              label: 'Mensagem (opcional)',
              placeholder: 'Quantas pessoas da sua empresa iriam? Alguma dúvida sobre o roteiro?',
            }}
          />
        </div>
      </Section>
    </PageShell>
  )
}
