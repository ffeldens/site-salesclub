import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Beneficios } from '@/components/blocks/Beneficios'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { FormLead } from '@/components/blocks/FormLead'
import { getCorporateOferta, getCorporateOfertas } from '@/content/corporate'

export function generateStaticParams() {
  return getCorporateOfertas().map((o) => ({ slug: o.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const o = getCorporateOferta(slug)
  if (!o) return buildMetadata({ title: 'Página não encontrada', noindex: true })
  return buildMetadata({ title: `${o.titulo} · Corporate`, description: o.resumo, path: `/corporate/${o.slug}` })
}

export default async function CorporateOfertaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const o = getCorporateOferta(slug)
  if (!o) notFound()

  const url = `${siteConfig.url}/corporate/${o.slug}`
  return (
    <PageShell whatsappMessage={`Olá! Quero saber mais sobre ${o.titulo} (Corporate).`}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${o.titulo} — Sales Club Corporate`,
          description: o.resumo,
          provider: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url },
          areaServed: 'BR',
          url,
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Corporate', url: `${siteConfig.url}/corporate` },
          { name: o.titulo, url },
        ])}
      />

      <HeroInstitucional
        eyebrow="Corporate · Enterprise"
        title={o.headline}
        subtitle={o.descricao}
        primaryCta={{ label: 'Solicitar proposta', href: '#cta' }}
      />

      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>{o.resumo}</AnswerBlock>
        </div>
      </Section>

      <Beneficios
        eyebrow="O que inclui"
        title={`O que está incluído em ${o.titulo}`}
        items={o.itens.map((i) => ({ titulo: i }))}
      />

      <Section id="cta" tone="card">
        <SectionHeading eyebrow="Próximo passo" title="Solicitar proposta" align="center" />
        <div className="mx-auto max-w-2xl">
          <FormLead source="corporate" produto={`Corporate — ${o.titulo}`} title="" ctaLabel="Solicitar proposta" />
        </div>
      </Section>
    </PageShell>
  )
}
