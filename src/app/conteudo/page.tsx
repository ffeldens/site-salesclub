import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { CardConteudo } from '@/components/blocks/Cards'
import { NewsletterForm } from '@/components/blocks/NewsletterForm'
import { formatDate } from '@/lib/format'
import { getPosts } from '@/content/conteudo'

export const metadata: Metadata = buildMetadata({
  title: 'Conteúdo — blog de gestão comercial',
  description:
    'Artigos do Sales Club sobre gestão comercial, previsibilidade, liderança de vendas, máquina de vendas e OKRs.',
  path: '/conteudo',
})

export default function ConteudoPage() {
  const posts = getPosts()
  return (
    <PageShell>
      <HeroInstitucional
        eyebrow="Conteúdo"
        title="Insights para construir uma máquina de vendas previsível"
        subtitle="Artigos práticos sobre gestão comercial, liderança, processo e tecnologia — direto de quem já estruturou +800 operações."
      />

      <Section>
        <SectionHeading eyebrow="Artigos" title="Últimas publicações" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <CardConteudo
              key={p.slug}
              titulo={p.titulo}
              resumo={p.resumo}
              href={`/conteudo/${p.slug}`}
              categoria={p.categoria}
              dataPublicacao={formatDate(p.dataPublicacao)}
            />
          ))}
        </div>
      </Section>

      <Section tone="card">
        <div className="mx-auto max-w-2xl">
          <NewsletterForm />
        </div>
      </Section>
    </PageShell>
  )
}
