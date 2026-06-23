import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Stats } from '@/components/blocks/Stats'
import { Modulos } from '@/components/blocks/Modulos'
import { Mentores } from '@/components/blocks/Mentores'
import { Beneficios } from '@/components/blocks/Beneficios'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { FormLead } from '@/components/blocks/FormLead'
import { CheckIcon } from '@/components/ui/icons'
import { BadgeDREG } from '@/components/BadgeDREG'
import { YoutubeEmbed } from '@/components/YoutubeEmbed'
import { getSalesClubPeloBrasil } from '@/content/eventos'

const ev = getSalesClubPeloBrasil()

export const metadata: Metadata = buildMetadata({
  title: 'Sales Club pelo Brasil — encontros executivos de 1 dia',
  description: ev.resumo,
  path: '/sales-club-pelo-brasil',
})

export default function SalesClubPeloBrasilPage() {
  const url = `${siteConfig.url}/sales-club-pelo-brasil`
  return (
    <PageShell whatsappMessage="Olá! Quero participar do Sales Club pelo Brasil.">
      {/* Um Event por edição (cidade/data) */}
      {ev.edicoes.map((e) => (
        <JsonLd
          key={`${e.cidade}-${e.data}`}
          data={{
            '@context': 'https://schema.org',
            '@type': 'BusinessEvent',
            name: `Sales Club pelo Brasil — ${e.cidade}/${e.uf}`,
            description: ev.resumo,
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: e.local ?? `${e.cidade}/${e.uf}`,
              address: `${e.cidade}, ${e.uf}, BR`,
            },
            organizer: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
            url,
          }}
        />
      ))}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Sales Club pelo Brasil', url },
        ])}
      />

      <HeroInstitucional
        eyebrow="Encontro executivo · 1 dia"
        title={ev.headline}
        subtitle={ev.subtitulo}
        primaryCta={{ label: ev.ctaLabel, href: '#cta' }}
        secondaryCta={{ label: 'Falar com um consultor', href: '/contato' }}
      />

      <Section>
        <div className="max-w-3xl">
          <div className="mb-6">
            <BadgeDREG etapa="Educar" />
          </div>
          <AnswerBlock>{ev.resumo}</AnswerBlock>
          <p className="prose-sc mt-8">{ev.descricao}</p>
        </div>
      </Section>

      {/* Próximas edições */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Agenda"
          title="Próximas edições"
          description="Uma vez por mês, em uma cidade diferente do Brasil. Vagas limitadas por edição."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ev.edicoes.map((e) => (
            <Card key={`${e.cidade}-${e.data}`} className="bg-ink">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-heading text-paper-pure">
                  {e.cidade} · {e.uf}
                </h3>
                {e.status && <Badge tone="brand">{e.status}</Badge>}
              </div>
              <p className="mt-2 text-sm text-paper/80">📅 {e.data}</p>
              {e.local && <p className="mt-1 text-sm text-mute">📍 {e.local}</p>}
            </Card>
          ))}
        </div>
      </Section>

      {/* Como foi: vídeo da edição de Garibaldi */}
      <Section>
        <SectionHeading
          eyebrow="Como foi"
          title="A edição de Garibaldi (RS)"
          description="Um dia intenso de estratégia, conexões e prática. Veja como foi o Sales Club pelo Brasil em Garibaldi."
        />
        <div className="mx-auto max-w-4xl">
          <YoutubeEmbed id="1nPs7Cuz7OI" title="Sales Club pelo Brasil — edição de Garibaldi (RS)" />
        </div>
      </Section>

      <Stats stats={ev.stats} />

      <Modulos eyebrow="Como funciona" title="O encontro em 4 etapas" modulos={ev.comoFunciona} />

      <Mentores eyebrow="Quem conduz" title="Quem conduz o encontro" mentores={ev.mentores} />

      <Beneficios
        eyebrow="O que você leva"
        title="O que você leva de volta"
        items={ev.beneficios}
      />

      {/* Para quem é / não é */}
      <Section tone="card">
        <SectionHeading eyebrow="Público" title="Para quem é este encontro" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-ink">
            <h3 className="font-display text-heading text-paper-pure">É para você</h3>
            <ul className="mt-4 space-y-2">
              {ev.paraQuem.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-paper/80">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
                  {p}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="bg-ink">
            <h3 className="font-display text-heading text-paper-pure">Não é para você</h3>
            <ul className="mt-4 space-y-2">
              {ev.naoEhParaVoce.map((p) => (
                <li key={p} className="text-sm text-mute">
                  — {p}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section id="cta">
        <SectionHeading
          eyebrow="Inscrição"
          title="Quero participar do encontro"
          description="Vagas limitadas por edição. Preencha os dados e o time do Sales Club retorna com a confirmação."
          align="center"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead source="eventos" produto="Sales Club pelo Brasil" title="" ctaLabel={ev.ctaLabel} />
        </div>
      </Section>
    </PageShell>
  )
}
