import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Mentores } from '@/components/blocks/Mentores'
import { Beneficios } from '@/components/blocks/Beneficios'
import { ParaQuem } from '@/components/blocks/ParaQuem'
import { FAQ } from '@/components/blocks/FAQ'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { FormLead } from '@/components/blocks/FormLead'
import { BadgeDREG } from '@/components/BadgeDREG'
import { ResultadoDREG } from '@/components/blocks/ResultadoDREG'
import { getServico, getServicos } from '@/content/servicos'

export function generateStaticParams() {
  return getServicos().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = getServico(slug)
  if (!s) return buildMetadata({ title: 'Serviço não encontrado', noindex: true })
  return buildMetadata({ title: s.titulo, description: s.resumo, path: `/servicos/${s.slug}` })
}

export default async function ServicoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = getServico(slug)
  if (!s) notFound()

  const url = `${siteConfig.url}/servicos/${s.slug}`
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.titulo,
    description: s.resumo,
    provider: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url },
    areaServed: 'BR',
    url,
  }
  const isImplementacao = s.tipo === 'implementacao'

  return (
    <PageShell whatsappMessage={`Olá! Quero saber mais sobre o serviço ${s.titulo}.`}>
      <JsonLd data={serviceJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Serviços', url: `${siteConfig.url}/servicos` },
          { name: s.titulo, url },
        ])}
      />

      <HeroInstitucional
        eyebrow={isImplementacao ? 'Serviço de implementação' : 'Ferramenta gratuita'}
        title={s.headline}
        subtitle={s.subtitulo}
        primaryCta={{ label: s.ctaLabel, href: '#cta' }}
      />

      <Section>
        <div className="max-w-3xl">
          {s.dreg && (
            <div className="mb-6">
              <BadgeDREG etapa={s.dreg === 'ciclo' ? undefined : s.dreg} ciclo={s.dreg === 'ciclo'} />
            </div>
          )}
          <AnswerBlock>{s.resumo}</AnswerBlock>
          <p className="prose-sc mt-8">{s.descricao}</p>
        </div>
      </Section>

      {s.componentes && (
        <Section tone="card">
          <SectionHeading
            eyebrow={isImplementacao ? 'O modelo' : 'O que avaliamos'}
            title={isImplementacao ? 'Os componentes da sua máquina de vendas' : 'Os 10 pilares do processo comercial'}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.componentes.map((c) => (
              <Card key={c.titulo} className="bg-ink">
                <h3 className="font-display text-heading text-paper-pure">{c.titulo}</h3>
                <p className="mt-2 text-sm text-paper/70">{c.descricao}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {s.slug === 'diagnostico-comercial' && <ResultadoDREG />}

      {s.fases && (
        <Section>
          <SectionHeading
            eyebrow="Como funciona"
            title={isImplementacao ? 'Da análise à operação assistida' : 'Em 3 passos simples'}
          />
          <div className="space-y-5">
            {s.fases.map((f) => (
              <Card key={f.numero} className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <span className="font-display text-5xl font-extrabold text-brand/40">
                  {String(f.numero).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-heading text-paper-pure">{f.titulo}</h3>
                  <p className="mt-2 text-sm text-paper/70">{f.descricao}</p>
                  {f.entregas && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {f.entregas.map((e) => (
                        <li key={e} className="rounded-full bg-paper/5 px-3 py-1 text-xs text-paper/75 ring-1 ring-subtle">
                          {e}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {s.squad && <Mentores eyebrow="Quem executa" title="O squad dedicado" mentores={s.squad} />}

      <Beneficios
        eyebrow="Resultados"
        title="O que você ganha"
        items={s.beneficios.map((b) => ({ titulo: b }))}
      />

      <Section tone="card">
        <SectionHeading eyebrow="Diferenciais" title="Por que o Sales Club" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {s.diferenciais.map((d) => (
            <li key={d} className="rounded-card border border-subtle bg-ink p-4 text-sm text-paper/85">
              {d}
            </li>
          ))}
        </ul>
      </Section>

      <ParaQuem title="Para quem é" segmentos={s.paraQuem} />

      <FAQ items={s.faq} />

      <Section id="cta">
        <SectionHeading
          eyebrow={isImplementacao ? 'Próximo passo' : 'Comece agora'}
          title={s.ctaLabel}
          align="center"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead source="servicos" produto={s.titulo} title="" ctaLabel={s.ctaLabel} />
        </div>
      </Section>
    </PageShell>
  )
}
