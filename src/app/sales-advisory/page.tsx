import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { BadgeDREG } from '@/components/BadgeDREG'

export const metadata: Metadata = buildMetadata({
  title: 'ELITE Advisor — um conselheiro dedicado para o seu negócio',
  description:
    'O ELITE Advisor é o programa de conselho do Sales Club: um conselheiro fixo por 12 meses (12 sessões individuais), 6 mentorias com especialistas e conexões de alto valor — o ângulo que você não tem sozinho.',
  path: '/sales-advisory',
})

const PILARES = [
  { tag: 'Pilar 1', titulo: 'Mentor conselheiro fixo', descricao: 'Um único conselheiro te acompanha em 12 sessões individuais, construindo contexto real sobre o seu negócio mês a mês.' },
  { tag: 'Pilar 2', titulo: 'Mentorias individuais', descricao: '6 sessões com especialistas indicados pelo seu conselheiro, acionadas no momento exato em que o gargalo aparecer.' },
  { tag: 'Pilar 3', titulo: 'Conexões de alto valor', descricao: 'Acesso a uma rede que abre portas conforme a sua jornada avança, não porque está marcado na agenda.' },
]

const ADVISORS = [
  { nome: 'Cleber Voelzke', role: 'Conselheiro certificado · Ex-Walmart, Salesforce', tag: 'PROVOCA', foto: '/images/mentores/cleber-voelzke.jpg', desc: 'Pra quem precisa de alguém que já sentou em um conselho de verdade e vai confrontar a decisão que você está adiando.' },
  { nome: 'Luiz Paulo Teixeira', role: 'CEO Sales Club · Ex-FGV', tag: 'ESTRUTURA', foto: '/images/mentores/luiz-paulo-teixeira.webp', desc: 'Visão sistêmica de cultura, governança e execução: o olhar de quem constrói empresas que sustentam crescimento.' },
  { nome: 'Hélio Azevedo', role: 'CRO Sales Club · Ex-IBM, Microsoft, SAP', tag: 'ESTRUTURA', foto: '/images/mentores/helio-azevedo.webp', desc: 'Pra destravar a máquina comercial: arquitetura de vendas, estratégia e IA aplicada a receita.' },
  { nome: 'Felipe Feldens', role: 'COO Sales Club · Ex-Sicredi, Renner', tag: 'ESTRUTURA', foto: '/images/mentores/felipe-feldens.webp', desc: 'Transformação com método: gestão, dados e mudança cultural, de quem liderou viradas em grandes operações.' },
  { nome: 'Denis Tassitano', role: 'CRO SAP Concur LATAM · Autor de PowerHub', tag: 'CONECTA', foto: '/images/mentores/denis-tassitano.jpg', desc: 'Pra quem precisa abrir portas: networking estratégico e acesso, de quem literalmente escreveu o livro sobre conexões.' },
  { nome: 'Raphael Lassance', role: 'CEO Growth Team · Co-fundador Sales Club', tag: 'PROTOTIPA', foto: '/images/mentores/raphael-lassance.webp', desc: 'Pra quem precisa de suporte para encontrar alavancas de geração de leads e escalar a receita com eficiência.' },
]

const MESES = Array.from({ length: 12 }, (_, i) => `M${i + 1}`)

export default function EliteAdvisorPage() {
  return (
    <PageShell whatsappMessage="Olá! Quero saber mais sobre o ELITE Advisor.">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'ELITE Advisor', url: `${siteConfig.url}/sales-advisory` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'ELITE Advisor',
          serviceType: 'Programa de conselho empresarial (advisory)',
          description:
            'Conselheiro dedicado por 12 meses: 12 sessões individuais mensais, 6 mentorias com especialistas e conexões de alto valor.',
          url: `${siteConfig.url}/sales-advisory`,
          provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
          areaServed: 'BR',
        }}
      />

      {/* Hero — proposta de valor */}
      <section className="relative overflow-hidden border-b border-elite/20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/4 h-96 w-[700px] -translate-x-1/2 rounded-full bg-elite/15 blur-[120px]"
        />
        <div className="container-content relative py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-elite">Conselho · Membership</p>
          <h1 className="mt-3 max-w-4xl font-display text-display-lg text-paper-pure">
            Um conselheiro para dar clareza das soluções e alavancas{' '}
            <span className="text-elite">que você não enxerga sozinho</span>
          </h1>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="prose-sc text-lg">
                Quem está dentro do negócio tem o maior conhecimento e o menor ângulo de visão. As
                maiores alavancas de crescimento raramente são visíveis para quem está operando.{' '}
                <strong className="text-paper-pure">
                  Os melhores líderes do mundo têm conselheiros, não porque são fracos, mas porque são
                  inteligentes o suficiente para saber o que não enxergam.
                </strong>
              </p>
              <p className="mt-6 text-lg font-bold text-elite">
                O ELITE Advisor é o ângulo que você não tem sozinho.
              </p>
              <div className="mt-8">
                <Button href="#cta" variant="gold" size="lg">
                  Quero um conselheiro
                </Button>
              </div>
            </div>
            <ul className="flex flex-col gap-5 self-start">
              {[
                'Vieses que bloqueiam decisões sem que você perceba',
                'Pontos cegos que só aparecem de fora',
                'O custo de não ter uma segunda opinião qualificada',
              ].map((item) => (
                <li key={item} className="flex gap-4 border-l-2 border-elite pl-4 font-semibold text-paper">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Answer-first (GEO) */}
      <Section>
        <div className="max-w-3xl">
          <div className="mb-6">
            <BadgeDREG etapa="Gerenciar" />
          </div>
          <AnswerBlock>
            O ELITE Advisor é o programa de conselho do Sales Club: um conselheiro dedicado acompanha o
            empresário por 12 meses, em 12 sessões individuais mensais, complementadas por 6 mentorias
            com especialistas e conexões de alto valor — continuidade, profundidade e progresso visível
            para quem toma decisões de alto risco.
          </AnswerBlock>
        </div>
      </Section>

      {/* O Programa — 3 pilares */}
      <Section tone="card">
        <SectionHeading
          eyebrow="O Programa"
          title="Um conselheiro dedicado. Uma evolução documentada."
          accent="gold"
          description="Para quem toma decisões de alto risco e não tem com quem dividir o peso, o ELITE Advisor entrega continuidade, profundidade e progresso visível ao longo de 12 meses."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {PILARES.map((p) => (
            <Card key={p.tag} as="article" className="bg-ink ring-1 ring-elite/10">
              <p className="text-xs font-bold uppercase tracking-widest text-elite">{p.tag}</p>
              <h3 className="mt-3 font-display text-heading text-paper-pure">{p.titulo}</h3>
              <p className="mt-3 text-sm text-paper/70">{p.descricao}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* A Jornada — 12 meses */}
      <Section>
        <SectionHeading
          eyebrow="A Jornada"
          title="12 meses, ritmo definido"
          accent="gold"
          description="Seu ritmo já está desenhado: 12 sessões mensais com o conselheiro, pré-agendadas desde o primeiro dia, e 6 mentorias individuais encaixadas a cada dois meses, quando fizer sentido pra você."
        />
        <div className="overflow-x-auto rounded-card border border-subtle bg-ink-card p-6 sm:p-8">
          <div className="grid min-w-[760px] grid-cols-[180px_repeat(12,1fr)] items-center gap-2">
            <div />
            {MESES.map((m) => (
              <div key={m} className="text-center text-xs font-bold tracking-wide text-elite">
                {m}
              </div>
            ))}

            <div className="text-sm font-semibold text-paper">
              Sessões de conselho
              <span className="block text-xs font-normal text-mute">1 por mês · pré-agendadas</span>
            </div>
            {MESES.map((m) => (
              <div
                key={`c-${m}`}
                className="flex h-9 items-center justify-center rounded-md border border-elite/40 bg-elite/10"
              >
                <span className="h-2 w-2 rounded-full bg-elite" />
              </div>
            ))}

            <div className="text-sm font-semibold text-paper">
              Mentorias individuais
              <span className="block text-xs font-normal text-mute">6 janelas · conforme gargalo</span>
            </div>
            {MESES.map((m, i) => (
              <div
                key={`m-${m}`}
                className={
                  i % 2 === 1
                    ? 'flex h-9 items-center justify-center rounded-md border border-brand/40 bg-brand/10'
                    : 'h-9 rounded-md border border-subtle'
                }
              >
                {i % 2 === 1 && <span className="h-2 w-2 rounded-sm bg-brand-vivid" />}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-8 text-sm text-paper/70">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-elite" /> Sessão com seu conselheiro fixo
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-brand-vivid" /> Janela sugerida de mentoria — o ritmo
              real segue a sua necessidade
            </span>
          </div>
        </div>
      </Section>

      {/* Os conselheiros */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Seu Conselho"
          title="Os conselheiros"
          accent="gold"
          description="Ao final da primeira reunião, indicamos o conselheiro com melhor encaixe pro seu momento. A decisão final, porém, é sempre sua."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVISORS.map((a) => (
            <Card key={a.nome} as="article" className="bg-ink ring-1 ring-elite/10">
              {a.foto ? (
                <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-elite/50">
                  <Image src={a.foto} alt={a.nome} fill className="object-cover object-top" sizes="64px" />
                </div>
              ) : (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-elite/50 bg-elite/10 font-display text-lg font-bold text-elite">
                  {a.nome.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
              )}
              <h3 className="font-display text-heading text-paper-pure">{a.nome}</h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-mute">{a.role}</p>
              <span className="mt-3 inline-block rounded-full border border-elite/50 px-3 py-1 text-[10px] font-bold tracking-widest text-elite">
                {a.tag}
              </span>
              <p className="mt-3 text-sm text-paper/70">{a.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Expectativas claras */}
      <Section>
        <SectionHeading eyebrow="Expectativas Claras" title="O que o ELITE Advisor é, e o que não é" accent="gold" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-ink-card">
            <p className="text-xs font-bold uppercase tracking-widest text-elite">É</p>
            <ul className="mt-4 divide-y divide-subtle">
              {[
                'Espaço estratégico pra decisões difíceis',
                'Relação contínua com um conselheiro fixo',
                'Registro cumulativo da sua evolução, mês após mês',
              ].map((item) => (
                <li key={item} className="flex gap-3 py-3 text-sm text-paper/80">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-elite" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-ink-card">
            <p className="text-xs font-bold uppercase tracking-widest text-mute">NÃO É</p>
            <ul className="mt-4 divide-y divide-subtle">
              {[
                'Consultoria de execução: o conselheiro orienta, não executa por você',
                'Mentoria pontual, sem continuidade',
                'Suporte 24/7: o contato tem limites combinados com o conselheiro',
              ].map((item) => (
                <li key={item} className="flex gap-3 py-3 text-sm text-paper/70">
                  <span className="shrink-0 text-mute">–</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta" tone="card">
        <SectionHeading
          eyebrow="Próximo passo"
          title="Converse com o time e encontre o seu conselheiro"
          description="Na primeira reunião entendemos o seu momento e indicamos o conselheiro com melhor encaixe — a decisão final é sempre sua."
          align="center"
          accent="gold"
        />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/contato" variant="gold" size="lg">
            Quero um conselheiro
          </Button>
          <Button href="/elite" variant="secondary" size="lg">
            Conhecer a comunidade ELITE
          </Button>
        </div>
      </Section>
    </PageShell>
  )
}
