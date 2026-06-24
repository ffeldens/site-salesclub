import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { HeroImersao } from '@/components/blocks/HeroImersao'
import { Modulos } from '@/components/blocks/Modulos'
import { Mentores } from '@/components/blocks/Mentores'
import { Beneficios } from '@/components/blocks/Beneficios'
import { ParaQuem } from '@/components/blocks/ParaQuem'
import { FAQ } from '@/components/blocks/FAQ'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { Section, SectionHeading } from '@/components/ui/Section'
import { FormLead } from '@/components/blocks/FormLead'
import { VideoDepoimentos } from '@/components/blocks/VideoDepoimentos'
import { BadgeDREG } from '@/components/BadgeDREG'
import { whatsappLink } from '@/lib/whatsapp'
import { getImersao, getImersoes } from '@/content/imersoes'
import { getVideoDepoimentosFeatured } from '@/content/depoimentos-video'

export function generateStaticParams() {
  return getImersoes().map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const im = getImersao(slug)
  if (!im) return buildMetadata({ title: 'Imersão não encontrada', noindex: true })
  return buildMetadata({
    title: im.titulo,
    description: im.resumo,
    path: `/imersoes/${im.slug}`,
  })
}

export default async function ImersaoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const im = getImersao(slug)
  if (!im) notFound()

  const url = `${siteConfig.url}/imersoes/${im.slug}`
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: im.titulo,
    description: im.resumo,
    provider: { '@type': 'Organization', name: siteConfig.name, sameAs: siteConfig.url },
    url,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Presencial',
      location: { '@type': 'Place', name: 'Sales Village', address: im.local },
    },
  }

  return (
    <PageShell whatsappMessage={`Olá! Quero saber mais sobre a imersão ${im.titulo}.`}>
      <JsonLd data={courseJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Imersões', url: `${siteConfig.url}/imersoes` },
          { name: im.titulo, url },
        ])}
      />

      <HeroImersao
        title={im.headline}
        subtitle={im.subtitulo}
        data={im.data}
        local="Sales Village · São Paulo"
        formato={im.formato}
        applyHref="#aplicar"
        whatsappHref={whatsappLink(`Olá! Quero aplicar para a imersão ${im.titulo}.`)}
        imagem={im.heroImagem}
        imagemModo={im.heroModo}
      />

      <Section>
        <div className="max-w-3xl">
          {im.dreg && (
            <div className="mb-6">
              <BadgeDREG etapa={im.dreg} />
            </div>
          )}
          <AnswerBlock>{im.resumo}</AnswerBlock>
          <p className="prose-sc mt-8">{im.descricao}</p>
        </div>
      </Section>

      <Modulos modulos={im.modulos} />

      <Mentores eyebrow="Quem ensina" title="Mentores da imersão" mentores={im.mentores} />

      <Beneficios
        eyebrow="O que você leva"
        title="O que muda na sua operação"
        items={im.beneficios.map((b) => ({ titulo: b }))}
      />

      <ParaQuem title="Para quem é esta imersão" segmentos={im.paraQuem} />

      {im.slug === 'sales-strategy' && (
        <VideoDepoimentos
          eyebrow="Na voz de quem viveu"
          title="Depoimentos de quem fez o Sales Strategy"
          description="Veja mais histórias na página de cases."
          videos={getVideoDepoimentosFeatured()}
          tone="card"
        />
      )}

      <FAQ items={im.faq} />

      <Section id="aplicar" tone="card">
        <SectionHeading
          eyebrow="Inscrição"
          title="Aplicar para a turma"
          description="Preencha os dados abaixo. O time do Sales Club avalia a aderência e retorna com a confirmação de vaga."
          align="center"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead
            source="imersoes"
            produto={im.titulo}
            title=""
            ctaLabel={im.ctaLabel}
            mensagem={{ label: 'Mensagem (opcional)', placeholder: 'Conte o seu objetivo com a imersão.' }}
          />
        </div>
      </Section>
    </PageShell>
  )
}
