import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo'
import { LpHeader, LpFooter } from '@/components/lp/LpChrome'
import { LpRenderer } from '@/components/lp/LpRenderer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { getCampanha, getCampanhas } from '@/content/campanhas'

export function generateStaticParams() {
  return getCampanhas().map((c) => ({ campanha: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ campanha: string }>
}): Promise<Metadata> {
  const { campanha } = await params
  const c = getCampanha(campanha)
  if (!c) return buildMetadata({ title: 'Campanha não encontrada', noindex: true })
  return buildMetadata({
    title: c.meta.title,
    description: c.meta.description,
    path: `/lp/${c.slug}`,
    noindex: c.noindex,
  })
}

export default async function LpPage({ params }: { params: Promise<{ campanha: string }> }) {
  const { campanha } = await params
  const c = getCampanha(campanha)
  if (!c) notFound()

  return (
    <>
      <LpHeader ctaLabel={c.logoCtaLabel} ctaHref={c.logoCtaHref} />
      <main>
        <LpRenderer blocos={c.blocos} />
      </main>
      <LpFooter />
      <WhatsAppFloat />
    </>
  )
}
