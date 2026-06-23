import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { LogosProvaSocial } from '@/components/blocks/LogosProvaSocial'
import { Section, SectionHeading } from '@/components/ui/Section'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { FormLead } from '@/components/blocks/FormLead'
import { BadgeDREG } from '@/components/BadgeDREG'
import { CheckIcon } from '@/components/ui/icons'
import { getCorporateOfertas } from '@/content/corporate'
import { getClienteLogos } from '@/lib/content'

export const metadata: Metadata = buildMetadata({
  title: 'Treinamento de vendas corporativo e educação corporativa em vendas',
  description:
    'Programa de treinamento de vendas corporativo e educação corporativa em vendas para empresas B2B: capacitações in company, palestras, convenções, projetos especiais e mentoria executiva do Sales Club.',
  path: '/corporate',
})

export default function CorporatePage() {
  const ofertas = getCorporateOfertas()
  return (
    <PageShell whatsappMessage="Olá! Quero falar sobre uma solução corporativa do Sales Club.">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Corporate', url: `${siteConfig.url}/corporate` },
        ])}
      />

      <HeroInstitucional
        eyebrow="Corporate · Enterprise"
        title="Soluções comerciais para grandes contas"
        subtitle="Educação corporativa, palestras, convenções, projetos especiais e mentoria executiva — a metodologia do Sales Club dentro da sua organização."
        primaryCta={{ label: 'Solicitar proposta', href: '#proposta' }}
      />

      <Section>
        <div className="max-w-3xl">
          <div className="mb-6">
            <BadgeDREG etapa="Educar" />
          </div>
          <AnswerBlock>
            O Sales Club Corporate leva a metodologia comercial validada em +800 empresas para grandes
            organizações, por meio de capacitações in company, palestras, convenções, projetos especiais
            e mentoria executiva — com escopo desenhado caso a caso e medição de impacto.
          </AnswerBlock>
        </div>
      </Section>

      <LogosProvaSocial title="Já atendemos times comerciais de" logos={getClienteLogos()} />

      {/* Navegação por âncora entre as 5 frentes */}
      <Section tone="card">
        <SectionHeading eyebrow="O que oferecemos" title="Cinco frentes para o seu time comercial" />
        <nav className="flex flex-wrap gap-2" aria-label="Frentes Corporate">
          {ofertas.map((o) => (
            <a
              key={o.slug}
              href={`#${o.slug}`}
              className="rounded-full border border-subtle bg-ink px-4 py-2 text-sm text-paper/85 hover:border-brand hover:text-paper-pure"
            >
              {o.titulo}
            </a>
          ))}
        </nav>
      </Section>

      {/* Conteúdo das 5 frentes em seções ancoradas */}
      {ofertas.map((o, i) => (
        <Section key={o.slug} id={o.slug} tone={i % 2 === 0 ? 'base' : 'card'}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="font-display text-display text-paper-pure">{o.titulo}</h2>
              <p className="mt-3 text-lg text-paper/80">{o.headline}</p>
              <p className="prose-sc mt-4">{o.descricao}</p>
            </div>
            <ul className="grid content-start gap-3 sm:grid-cols-2">
              {o.itens.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-card border border-subtle bg-ink-card p-4 text-sm text-paper/85"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      {/* CTA único */}
      <Section id="proposta">
        <SectionHeading
          eyebrow="Próximo passo"
          title="Solicitar proposta"
          description="Conte o seu desafio comercial e o time enterprise do Sales Club retorna com uma proposta sob medida."
          align="center"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead source="corporate" produto="Corporate" title="" ctaLabel="Solicitar proposta" />
        </div>
      </Section>
    </PageShell>
  )
}
