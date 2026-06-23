import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Mentores } from '@/components/blocks/Mentores'
import { Beneficios } from '@/components/blocks/Beneficios'
import { FAQ } from '@/components/blocks/FAQ'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { FormLead } from '@/components/blocks/FormLead'
import { CheckIcon } from '@/components/ui/icons'
import { BadgeDREG } from '@/components/BadgeDREG'
import { getCurso, getCursos } from '@/content/universidade'

export function generateStaticParams() {
  return getCursos().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = getCurso(slug)
  if (!c) return buildMetadata({ title: 'Curso não encontrado', noindex: true })
  return buildMetadata({ title: c.titulo, description: c.resumo, path: `/universidade/${c.slug}` })
}

const CROSS_SELL = [
  { titulo: 'Sales AI', desc: 'IA sob comando da liderança comercial', href: '/imersoes/sales-ai' },
  { titulo: 'Sales Strategy', desc: 'Máquina de vendas com governança para a alta liderança', href: '/imersoes/sales-strategy' },
  { titulo: 'Sales Leadership', desc: 'Formando líderes comerciais de alta performance', href: '/imersoes/sales-leadership' },
]

const TRIMESTRES = [
  { label: '1º trimestre', meses: ['Jan', 'Fev', 'Mar'] },
  { label: '2º trimestre', meses: ['Abr', 'Mai', 'Jun'] },
  { label: '3º trimestre', meses: ['Jul', 'Ago', 'Set'] },
  { label: '4º trimestre', meses: ['Out', 'Nov', 'Dez'] },
]

export default async function CursoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = getCurso(slug)
  if (!c) notFound()

  const url = `${siteConfig.url}/universidade/${c.slug}`
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.titulo,
    description: c.resumo,
    provider: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url },
    url,
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'P12M' },
  }

  return (
    <PageShell whatsappMessage={`Olá! Quero saber mais sobre a ${c.titulo}.`}>
      <JsonLd data={courseJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Universidade', url: `${siteConfig.url}/universidade` },
          { name: c.titulo, url },
        ])}
      />

      <HeroInstitucional
        eyebrow="Universidade · Formação online"
        title={c.headline}
        subtitle={c.subtitulo}
        primaryCta={{ label: c.ctaLabel, href: '#cta' }}
      />

      <Section>
        <div className="max-w-3xl">
          <div className="mb-6">
            <BadgeDREG etapa="Educar" />
          </div>
          <AnswerBlock>{c.resumo}</AnswerBlock>
          {c.tagline && <p className="prose-sc mt-6">{c.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="brand">{c.duracao}</Badge>
            <Badge>{c.formato}</Badge>
            <Badge>{c.certificacao.titulo}</Badge>
          </div>
        </div>
      </Section>

      {/* Benefícios — arquitetura de aplicação imediata */}
      <Beneficios
        eyebrow="Por que Sales Pro"
        title="Arquitetura de aplicação imediata"
        items={c.beneficios}
      />

      {/* Pilares */}
      <Section tone="card">
        <SectionHeading
          eyebrow="O método"
          title="Onde a técnica encontra a consistência"
          description="Vender bem todos os meses é método. O Sales Pro integra direção, técnica e prática à sua rotina para que a performance seja uma escolha, não um acaso."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {c.pilares.map((p) => (
            <Card key={p.titulo} className="bg-ink">
              <h3 className="font-display text-heading text-paper-pure">{p.titulo}</h3>
              <p className="mt-2 text-sm text-paper/70">{p.descricao}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Manifesto */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-vivid">
            Um sistema operacional de vendas
          </p>
          <p className="mt-4 text-lg text-paper/85">{c.manifesto.texto}</p>
          <p className="mt-6 font-display text-display text-paper-pure">{c.manifesto.destaque}</p>
        </div>
      </Section>

      <Mentores eyebrow="Quem ensina" title="Condução pedagógica e mentoria de elite" mentores={c.instrutores} />

      {/* Conteúdo programático — 12 módulos por trimestre */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Arquitetura de formação anual"
          description="O programa respeita a curva de aprendizado: começamos pela fundação e avançamos até a alta complexidade. Nada é aleatório — cada módulo prepara o próximo."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRIMESTRES.map((tri) => (
            <div key={tri.label}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-vivid">
                {tri.label}
              </p>
              <ul className="space-y-3">
                {c.modulos
                  .filter((m) => tri.meses.includes(m.periodo))
                  .map((m) => (
                    <li key={m.periodo} className="rounded-card border border-subtle bg-ink p-3">
                      <span className="text-xs text-mute">{m.periodo} · {m.eixo}</span>
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
          {c.metodologia.map((m, i) => (
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

      {/* Certificação Master 360° */}
      <Section tone="card">
        <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
          {c.certificacao.img && (
            <Image
              src={c.certificacao.img}
              alt={c.certificacao.titulo}
              width={220}
              height={220}
              className="mx-auto h-auto w-44"
            />
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-vivid">Certificação</p>
            <h2 className="mt-2 font-display text-display text-paper-pure">{c.certificacao.titulo}</h2>
            <p className="prose-sc mt-3">{c.certificacao.descricao}</p>
            <ul className="mt-4 space-y-2">
              {c.certificacao.requisitos.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-paper/85">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Para quem */}
      <Section>
        <SectionHeading eyebrow="Para quem é" title="Quem deve estar nesta sala?" />
        <div className="grid gap-6 lg:grid-cols-3">
          {c.paraQuem.map((p) => (
            <Card key={p.titulo}>
              <h3 className="font-display text-heading text-paper-pure">{p.titulo}</h3>
              <p className="mt-2 text-sm text-paper/70">{p.descricao}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* O que está incluído */}
      <Section tone="card">
        <SectionHeading eyebrow="Incluído" title="O que está incluído" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {c.incluido.map((item) => (
            <li key={item} className="flex gap-3 rounded-card border border-subtle bg-ink p-4 text-sm text-paper/85">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <FAQ items={c.faq} />

      {/* Cross-sell de programas */}
      <Section>
        <SectionHeading eyebrow="Continue evoluindo" title="Outros programas do Sales Club" />
        <div className="grid gap-6 lg:grid-cols-3">
          {CROSS_SELL.map((p) => (
            <Card key={p.href} className="flex flex-col">
              <h3 className="font-display text-heading text-paper-pure">{p.titulo}</h3>
              <p className="mt-2 flex-1 text-sm text-paper/70">{p.desc}</p>
              <Link href={p.href} className="mt-4 text-sm font-semibold text-brand-vivid hover:underline">
                Quero saber mais →
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="cta" tone="card">
        <SectionHeading eyebrow="Aplicação" title={c.ctaLabel} align="center" />
        <div className="mx-auto max-w-2xl">
          <FormLead source="universidade" produto={c.titulo} title="" ctaLabel={c.ctaLabel} />
        </div>
      </Section>
    </PageShell>
  )
}
