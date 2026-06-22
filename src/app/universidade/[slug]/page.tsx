import type { Metadata } from 'next'
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
import { ParaQuem } from '@/components/blocks/ParaQuem'
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
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'P12M',
    },
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
          <p className="prose-sc mt-8">{c.descricao}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="brand">{c.duracao}</Badge>
            <Badge>{c.formato}</Badge>
            <Badge>{c.certificado}</Badge>
          </div>
        </div>
      </Section>

      {/* Conteúdo programático — 12 módulos */}
      <Section tone="card">
        <SectionHeading eyebrow="Conteúdo" title="Os 12 módulos da formação" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.modulos.map((m) => (
            <Card key={m.periodo} className="bg-ink">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-vivid">
                  {m.periodo}
                </span>
                <span className="text-xs text-mute">{m.eixo}</span>
              </div>
              <h3 className="mt-2 font-display text-base font-semibold text-paper-pure">{m.titulo}</h3>
            </Card>
          ))}
        </div>
      </Section>

      {/* Metodologia de cada módulo */}
      <Section>
        <SectionHeading eyebrow="Como você aprende" title="A estrutura de cada módulo" />
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

      <Mentores eyebrow="Quem ensina" title="Instrutores da formação" mentores={c.instrutores} />

      <ParaQuem title="Para quem é o Sales Pro" segmentos={c.paraQuem} />

      <Beneficios
        eyebrow="O que você ganha"
        title="O que muda na sua atuação"
        items={c.beneficios.map((b) => ({ titulo: b }))}
      />

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

      <Section id="cta">
        <SectionHeading eyebrow="Aplicação" title={c.ctaLabel} align="center" />
        <div className="mx-auto max-w-2xl">
          <FormLead source="universidade" produto={c.titulo} title="" ctaLabel={c.ctaLabel} />
        </div>
      </Section>
    </PageShell>
  )
}
