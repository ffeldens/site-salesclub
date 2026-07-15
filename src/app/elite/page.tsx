import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/seo'
import { PageShell } from '@/components/PageShell'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { VideoDepoimentos } from '@/components/blocks/VideoDepoimentos'
import { FormLead } from '@/components/blocks/FormLead'
import { MaterialGate } from '@/components/blocks/MaterialGate'
import { YoutubeEmbed } from '@/components/YoutubeEmbed'
import { CheckIcon, YoutubeIcon } from '@/components/ui/icons'
import { getEmpresasElite } from '@/content/elite'
import { getResultadosElite, getDepoimentosVideoElite } from '@/content/elite-membros'
import { siteConfig } from '@/lib/site'

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

      {/* Empresas que confiam no ELITE */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Comunidade"
          title="Empresas que confiam no ELITE"
          accent="gold"
        />
        <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {getEmpresasElite().map((e) => (
            <div key={e.src} className="flex h-24 items-center justify-center rounded-card bg-white p-5">
              <Image
                src={e.src}
                alt={e.nome}
                width={200}
                height={80}
                className="max-h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Sales Club na Estrada — entrega de comunidade */}
      <Section>
        <SectionHeading
          eyebrow="Comunidade"
          title="Sales Club na Estrada"
          accent="gold"
          description="Uma das entregas mais marcantes do ELITE: encontros itinerantes que levam os membros para vivências, troca e networking pelo Brasil. Veja a edição de Santa Catarina (2025)."
        />
        <div className="mx-auto max-w-4xl">
          <YoutubeEmbed id="G60tyr6d6Qs" title="Sales Club na Estrada — Santa Catarina 2025" />
        </div>
      </Section>

      {/* Resultados reais dos membros */}
      <Section>
        <SectionHeading
          eyebrow="Resultados"
          title="O que muda para quem entra na ELITE"
          accent="gold"
          description="Crescimento real informado por membros da comunidade."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {getResultadosElite().map((r) => (
            <Card key={r.empresa} as="article" className="bg-ink ring-1 ring-elite/10">
              <p className="font-display text-display text-elite">{r.destaque}</p>
              <p className="mt-1 text-sm text-paper/70">{r.contexto}</p>
              <p className="mt-4 font-medium text-paper-pure">{r.empresa}</p>
              {r.segmento && <p className="text-xs text-mute">{r.segmento}</p>}
            </Card>
          ))}
        </div>
      </Section>

      {/* Depoimentos em vídeo dos membros */}
      <VideoDepoimentos
        eyebrow="Na voz dos membros"
        title="Depoimentos da comunidade"
        videos={getDepoimentosVideoElite()}
        accent="gold"
      />

      {/* Podcast ELITE */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Conteúdo"
          title="Podcast ELITE"
          accent="gold"
          description="Conversas com empresários e especialistas da comunidade. 1ª temporada: 9 episódios · 2ª temporada: 10 episódios lançados."
        />
        {/* TODO(podcast): trocar pelo link da playlist específica do Podcast ELITE no YouTube. */}
        <Button href={siteConfig.social.youtube} variant="gold" size="lg">
          <YoutubeIcon className="h-5 w-5" /> Assistir aos episódios no YouTube
        </Button>
      </Section>

      {/* Material de apoio da mentoria */}
      <Section>
        <SectionHeading
          eyebrow="Material"
          title="Guia da mentoria: “Não implemente IA na sua empresa”"
          accent="gold"
          description="Material de apoio da sessão de 16 de julho, com Felipe Feldens (COO do Sales Club): a IA não corrige nada — ela amplifica o que já está lá. Os pré-requisitos que decidem se você vai extrair valor ou apenas queimar orçamento."
        />
        <MaterialGate
          fileUrl="/materiais/guia-mentoria-elite-nao-implemente-ia.pdf"
          produto="Guia — Não implemente IA na sua empresa (Mentoria ELITE)"
          ctaLabel="Baixar o guia (PDF)"
          accent="gold"
        />
      </Section>

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
            mensagem={{ label: 'Sobre você e sua empresa', placeholder: 'Conte um pouco da sua trajetória e por que quer entrar para a comunidade.' }}
          />
        </div>
      </Section>
    </PageShell>
  )
}
