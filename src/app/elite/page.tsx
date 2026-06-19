import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Depoimentos } from '@/components/blocks/Depoimentos'
import { FormLead } from '@/components/blocks/FormLead'
import { CheckIcon } from '@/components/ui/icons'
import { getDepoimentos } from '@/lib/content'

// TODO(conteúdo): validar pilares, benefícios e depoimentos de membros da ELITE.
export const metadata: Metadata = buildMetadata({
  title: 'ELITE — a comunidade de empresários do Sales Club',
  description:
    'ELITE é a comunidade premium de empresários do Sales Club: capacitação, Máquina de Vendas, mentoria e networking qualificado em um só lugar.',
  path: '/elite',
})

const PILARES = [
  { titulo: 'Capacitação contínua', descricao: 'Acesso a imersões, conteúdos e trilhas do ecossistema.' },
  { titulo: 'Máquina de Vendas', descricao: 'A metodologia de previsibilidade aplicada ao seu negócio.' },
  { titulo: 'Mentoria', descricao: 'Acompanhamento com os sócios e mentores de marca.' },
  { titulo: 'Networking qualificado', descricao: 'Relacionamento entre empresários que vivem os mesmos desafios.' },
]

export default function ElitePage() {
  return (
    <PageShell whatsappMessage="Olá! Quero aplicar para a comunidade ELITE do Sales Club.">
      {/* Hero ELITE — identidade dourada */}
      <section className="relative overflow-hidden border-b border-elite/20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-elite/15 blur-[120px]"
        />
        <div className="container-content relative py-20 sm:py-28 lg:py-32">
          <Image
            src="/brand/salesclub-elite-logo-gold.svg"
            alt="Sales Club ELITE"
            width={220}
            height={50}
            priority
            className="h-11 w-auto"
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-elite">
            Comunidade · Membership
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-display-lg text-paper-pure">
            A comunidade de empresários do Sales Club
          </h1>
          <p className="prose-sc mt-6 max-w-2xl text-lg">
            A expressão do conceito clube: capacitação contínua, Máquina de Vendas, mentoria e
            networking qualificado entre empresários que vivem os mesmos desafios comerciais.
          </p>
          <div className="mt-9">
            <Button href="#cta" variant="gold" size="lg">
              Aplicar para a comunidade
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="max-w-3xl">
          {/* Answer-first com borda dourada */}
          <div className="rounded-card border-l-4 border-elite bg-ink-card p-5 text-paper/90">
            <p className="text-base leading-relaxed">
              A ELITE é a comunidade de empresários do Sales Club — o coração do conceito clube.
              Combina quatro pilares: capacitação contínua, a metodologia Máquina de Vendas, mentoria
              com os sócios e mentores de marca, e networking qualificado entre empresários B2B. O
              acesso é por aplicação, para preservar a qualidade do grupo.
            </p>
          </div>
        </div>
      </Section>

      {/* Pilares com acento dourado */}
      <Section tone="card">
        <SectionHeading eyebrow="Os pilares" title="O que você encontra na ELITE" accent="gold" />
        <div className="grid gap-6 sm:grid-cols-2">
          {PILARES.map((p) => (
            <Card key={p.titulo} className="flex gap-4 bg-ink ring-1 ring-elite/10">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-elite/15">
                <CheckIcon className="h-4 w-4 text-elite" />
              </span>
              <div>
                <h3 className="font-display text-heading text-paper-pure">{p.titulo}</h3>
                <p className="mt-1 text-sm text-paper/70">{p.descricao}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Depoimentos title="O que dizem os membros" depoimentos={getDepoimentos()} />

      {/* CTA dourado */}
      <Section id="cta">
        <SectionHeading
          eyebrow="Aplicação"
          title="Aplicar para a comunidade"
          description="O acesso à ELITE é por aplicação. Conte um pouco sobre você e sua empresa — avaliamos o perfil e retornamos."
          align="center"
          accent="gold"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead
            source="elite"
            produto="ELITE"
            title=""
            ctaLabel="Aplicar para a comunidade"
            ctaVariant="gold"
          />
        </div>
      </Section>
    </PageShell>
  )
}
