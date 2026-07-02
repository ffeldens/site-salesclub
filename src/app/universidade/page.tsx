import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Stats } from '@/components/blocks/Stats'
import { Beneficios } from '@/components/blocks/Beneficios'
import { Mentores } from '@/components/blocks/Mentores'
import { FAQ } from '@/components/blocks/FAQ'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { FormLead } from '@/components/blocks/FormLead'
import { VideoDepoimentos } from '@/components/blocks/VideoDepoimentos'
import { CheckIcon } from '@/components/ui/icons'
import { getUniversidadeSC } from '@/content/universidade-sc'
import { getCurso, getDepoimentosVideoSalesPro } from '@/content/universidade'

const u = getUniversidadeSC()

export const metadata: Metadata = buildMetadata({
  title: 'Universidade Sales Club — treinamento de vendas para empresas e Formação Sales Pro',
  description:
    'A Universidade Sales Club é a plataforma de treinamento de vendas para empresas (white-label) e a casa dos programas de formação — como a Formação Sales Pro, curso online de 12 meses para profissionais de vendas.',
  path: '/universidade',
})

const TRIMESTRES = [
  { label: '1º trimestre', meses: ['Jan', 'Fev', 'Mar'] },
  { label: '2º trimestre', meses: ['Abr', 'Mai', 'Jun'] },
  { label: '3º trimestre', meses: ['Jul', 'Ago', 'Set'] },
  { label: '4º trimestre', meses: ['Out', 'Nov', 'Dez'] },
]

export default function UniversidadePage() {
  const salesPro = getCurso('sales-pro')
  const videos = getDepoimentosVideoSalesPro()

  return (
    <PageShell whatsappMessage="Olá! Quero saber mais sobre a Universidade Sales Club.">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Universidade Sales Club', url: `${siteConfig.url}/universidade` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Universidade Sales Club',
          serviceType: 'Plataforma de treinamento de vendas corporativo (white-label)',
          description: u.resumo,
          url: `${siteConfig.url}/universidade`,
          provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
          areaServed: 'BR',
          audience: { '@type': 'BusinessAudience', name: 'Empresas B2B com operação comercial' },
        }}
      />
      {salesPro && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: salesPro.titulo,
            description: salesPro.resumo,
            provider: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url },
            url: `${siteConfig.url}/universidade#sales-pro`,
            hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'P12M' },
          }}
        />
      )}

      <HeroInstitucional
        eyebrow={u.hero.eyebrow}
        title={u.hero.title}
        subtitle={u.hero.subtitle}
        primaryCta={{ label: 'Estruturar minha universidade', href: '#cta' }}
        secondaryCta={{ label: 'Conhecer a Formação Sales Pro', href: '#sales-pro' }}
        loginCta={{ label: 'Já sou aluno? Acessar a plataforma', href: 'https://salesclube.edusense.app/#/' }}
      />

      {/* Answer-first + propósito */}
      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>
            {u.resumo} A Universidade também é a casa dos programas de formação do Sales Club — como a
            Formação Sales Pro, curso online de 12 meses para profissionais de vendas.
          </AnswerBlock>
          <p className="prose-sc mt-8">{u.proposito.intro}</p>
          <ul className="mt-4 grid gap-2 text-sm text-paper/80">
            {u.proposito.itens.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-medium text-paper">{u.proposito.fecho}</p>
        </div>
      </Section>

      <Stats stats={u.stats} tone="card" />

      {/* 3 pilares da plataforma */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Como funciona"
          title="Um programa baseado em 3 pilares"
          description="Os pilares responsáveis por colocar mais dinheiro dentro da sua operação comercial."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {u.pilares.map((p) => (
            <Card key={p.numero} as="article" className="flex flex-col">
              <span className="font-display text-display text-brand-vivid">{p.numero}</span>
              <h3 className="mt-2 font-display text-heading text-paper-pure">{p.titulo}</h3>
              <span className="mt-1 text-xs uppercase tracking-wide text-mute">{p.nivel}</span>
              <ul className="mt-4 grid gap-2 text-sm text-paper/80">
                {p.itens.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Beneficios eyebrow="A plataforma" title="O que você terá na Universidade" items={u.recursos} />

      {/* Para quem */}
      <Section tone="card">
        <SectionHeading eyebrow="Públicos" title="Para quem é a plataforma" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {u.paraQuem.map((perfil) => (
            <Card key={perfil.titulo} as="article">
              <h3 className="font-display text-lg text-paper-pure">{perfil.titulo}</h3>
              <p className="mt-2 text-sm text-paper/70">{perfil.descricao}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ================= PROGRAMA: FORMAÇÃO SALES PRO ================= */}
      {salesPro && (
        <>
          <Section id="sales-pro">
            <SectionHeading
              eyebrow="Programas da Universidade"
              title={`Formação Sales Pro: ${salesPro.headline}`}
              description={salesPro.tagline}
            />
            <div className="max-w-3xl">
              <AnswerBlock>{salesPro.resumo}</AnswerBlock>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge tone="brand">{salesPro.duracao}</Badge>
                <Badge>{salesPro.formato}</Badge>
                <Badge>{salesPro.certificacao.titulo}</Badge>
              </div>
            </div>
          </Section>

          <Beneficios
            eyebrow="Por que Sales Pro"
            title="Arquitetura de aplicação imediata"
            items={salesPro.beneficios}
          />

          {/* Conteúdo programático — 12 módulos por trimestre */}
          <Section tone="card">
            <SectionHeading
              eyebrow="Conteúdo"
              title="Arquitetura de formação anual"
              description="O programa respeita a curva de aprendizado: começamos pela fundação e avançamos até a alta complexidade. Cada módulo prepara o próximo."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TRIMESTRES.map((tri) => (
                <div key={tri.label}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-vivid">
                    {tri.label}
                  </p>
                  <ul className="space-y-3">
                    {salesPro.modulos
                      .filter((m) => tri.meses.includes(m.periodo))
                      .map((m) => (
                        <li key={m.periodo} className="rounded-card border border-subtle bg-ink p-3">
                          <span className="text-xs text-mute">
                            {m.periodo} · {m.eixo}
                          </span>
                          <span className="block font-medium text-paper">{m.titulo}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Metodologia */}
          <Section>
            <SectionHeading
              eyebrow="Na prática"
              title="Aprendizado que entra na rotina"
              description="Princípios de neurociência (repetição espaçada) e andragogia para que o conteúdo não seja apenas assistido, mas retido e aplicado."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {salesPro.metodologia.map((m, i) => (
                <Card key={m.titulo}>
                  <span className="font-display text-4xl font-extrabold text-brand/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-display text-heading text-paper-pure">{m.titulo}</h3>
                  <p className="mt-1 text-sm text-paper/70">{m.descricao}</p>
                </Card>
              ))}
            </div>
          </Section>

          {/* Certificação */}
          <Section tone="card">
            <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
              {salesPro.certificacao.img && (
                <Image
                  src={salesPro.certificacao.img}
                  alt={salesPro.certificacao.titulo}
                  width={220}
                  height={220}
                  className="mx-auto h-auto w-44"
                />
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-vivid">
                  Certificação
                </p>
                <h2 className="mt-2 font-display text-display text-paper-pure">
                  {salesPro.certificacao.titulo}
                </h2>
                <p className="prose-sc mt-3">{salesPro.certificacao.descricao}</p>
                <ul className="mt-4 space-y-2">
                  {salesPro.certificacao.requisitos.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-paper/85">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Mentores
            eyebrow="Quem ensina"
            title="Condução pedagógica e mentoria de elite"
            mentores={salesPro.instrutores}
          />

          {/* Depoimentos em vídeo de alunos do Sales Pro */}
          {videos.length > 0 && (
            <VideoDepoimentos
              eyebrow="Na voz dos alunos"
              title="Quem vive a Formação Sales Pro"
              description="Depoimentos de alunos sobre a experiência e os resultados da formação."
              videos={videos}
              tone="card"
            />
          )}
        </>
      )}

      {/* ================= PLATAFORMA (continuação) ================= */}

      {/* Alinhamento de expectativa */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-card border border-subtle bg-ink-card p-8">
          <SectionHeading eyebrow="Transparência" title="Alinhamento de expectativa" />
          <p className="prose-sc">{u.alinhamento.intro}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {u.alinhamento.itens.map((item) => (
              <li
                key={item}
                className="rounded-card border border-subtle bg-ink px-4 py-3 text-sm font-medium text-paper/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Implementação */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Onboarding"
          title="Implementação da plataforma"
          description={u.implementacaoNota}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {u.implementacao.map((passo) => (
            <div key={passo.numero} className="rounded-card border border-subtle bg-ink p-6">
              <span className="font-display text-2xl text-brand-vivid">{passo.numero}</span>
              <h3 className="mt-2 font-display text-lg text-paper-pure">{passo.titulo}</h3>
              <p className="mt-2 text-sm text-paper/70">{passo.descricao}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Planos */}
      <Section id="planos">
        <SectionHeading
          eyebrow="Investimento"
          title="Escolha o plano ideal para o tamanho da sua operação"
          description="Investimento mensal sob medida, conforme o número de acessos."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {u.planos.map((plano) => (
            <Card key={plano.nome} as="article" className="flex flex-col text-center">
              <h3 className="font-display text-heading text-paper-pure">{plano.nome}</h3>
              <p className="mt-2 text-sm text-paper/70">{plano.faixa}</p>
              <p className="mt-4 font-display text-xl text-brand-vivid">{plano.preco}</p>
              <p className="text-xs text-mute">mensal</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ROI */}
      <Section tone="card">
        <SectionHeading eyebrow="Resultado" title="Se executar, tem como não ser ROI?" align="center" />
        <div className="grid gap-6 md:grid-cols-3">
          {u.roi.fatores.map((f, i) => (
            <Card key={f.titulo} as="article">
              <span className="font-display text-display text-brand-vivid">{i + 1}</span>
              <h3 className="mt-2 font-display text-lg text-paper-pure">{f.titulo}</h3>
              <p className="mt-2 text-sm text-paper/70">{f.descricao}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Stats stats={u.roi.metricas} tone="card" />

      {/* FAQ combinado (plataforma + Sales Pro) */}
      <FAQ
        eyebrow="Perguntas frequentes"
        title="Universidade Sales Club: dúvidas comuns"
        items={[...u.faq, ...(salesPro?.faq ?? [])]}
      />

      <Section id="cta">
        <SectionHeading
          eyebrow="Próximo passo"
          title="Pronto para desenvolver o seu time de vendas?"
          description="Conte sobre a sua operação (ou o seu objetivo com a Formação Sales Pro) e o time retorna com o melhor caminho."
          align="center"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead
            source="universidade"
            produto="Universidade Sales Club"
            title=""
            ctaLabel="Falar com o time da Universidade"
            mensagem={{
              label: 'Sobre a sua operação ou objetivo',
              placeholder: 'Quer a plataforma para o seu time ou a Formação Sales Pro para você?',
            }}
          />
        </div>
      </Section>
    </PageShell>
  )
}
