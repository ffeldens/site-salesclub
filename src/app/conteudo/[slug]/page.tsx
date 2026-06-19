import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { Section } from '@/components/ui/Section'
import { Badge } from '@/components/ui/Badge'
import { FAQ } from '@/components/blocks/FAQ'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { NewsletterForm } from '@/components/blocks/NewsletterForm'
import { PortableBody } from '@/components/PortableBody'
import { formatDate } from '@/lib/format'
import { getPost, getPosts } from '@/content/conteudo'

export const revalidate = 60

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) return buildMetadata({ title: 'Artigo não encontrado', noindex: true })
  return buildMetadata({ title: p.titulo, description: p.resumo, path: `/conteudo/${p.slug}` })
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getPost(slug)
  if (!p) notFound()

  const url = `${siteConfig.url}/conteudo/${p.slug}`
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.titulo,
    description: p.resumo,
    datePublished: p.dataPublicacao,
    dateModified: p.dataAtualizacao,
    author: { '@type': 'Organization', name: p.autor },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: url,
    url,
  }

  return (
    <PageShell>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Conteúdo', url: `${siteConfig.url}/conteudo` },
          { name: p.titulo, url },
        ])}
      />

      <Section>
        <article className="mx-auto max-w-prose">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge tone="brand">{p.categoria}</Badge>
            {/* Frescor (GEO): data visível + schema */}
            <time className="text-xs text-mute" dateTime={p.dataAtualizacao}>
              Atualizado em {formatDate(p.dataAtualizacao)}
            </time>
          </div>
          <h1 className="font-display text-display text-paper-pure">{p.titulo}</h1>
          <p className="mt-2 text-sm text-mute">Por {p.autor}</p>

          <div className="mt-8">
            <AnswerBlock>{p.resumo}</AnswerBlock>
          </div>

          <div className="prose-sc mt-8 space-y-5">
            {p.body && p.body.length > 0 ? (
              <PortableBody value={p.body} />
            ) : (
              p.corpo?.map((bloco, i) => {
                if (bloco.tipo === 'h2')
                  return (
                    <h2 key={i} className="font-display text-heading text-paper-pure">
                      {bloco.texto}
                    </h2>
                  )
                if (bloco.tipo === 'ul')
                  return (
                    <ul key={i} className="list-disc space-y-1 pl-5">
                      {bloco.itens.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  )
                return <p key={i}>{bloco.texto}</p>
              })
            )}
          </div>
        </article>
      </Section>

      {p.faq && p.faq.length > 0 && <FAQ items={p.faq} />}

      <Section tone="card">
        <div className="mx-auto max-w-2xl">
          <NewsletterForm />
        </div>
        <p className="mt-8 text-center text-sm text-mute">
          <Link href="/conteudo" className="hover:text-paper">
            ← Voltar para o blog
          </Link>
        </p>
      </Section>
    </PageShell>
  )
}
