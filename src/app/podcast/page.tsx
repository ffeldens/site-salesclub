import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { NewsletterForm } from '@/components/blocks/NewsletterForm'
import { YoutubeIcon, SpotifyIcon } from '@/components/ui/icons'

export const metadata: Metadata = buildMetadata({
  title: 'Podcast e canal do Sales Club',
  description:
    'Ouça o podcast do Sales Club no Spotify e assista aos conteúdos no YouTube: vendas, gestão comercial, liderança e previsibilidade.',
  path: '/podcast',
})

// Player embarcado do Spotify a partir da URL do show.
const spotifyEmbed = siteConfig.social.spotify.replace(
  'open.spotify.com/show',
  'open.spotify.com/embed/show',
)

export default function PodcastPage() {
  return (
    <PageShell>
      <HeroInstitucional
        eyebrow="Conteúdo · Podcast"
        title="Aprenda vendas com quem constrói máquinas comerciais"
        subtitle="Episódios e conteúdos sobre gestão comercial, liderança, previsibilidade e IA aplicada a vendas — no Spotify e no YouTube."
        primaryCta={{ label: 'Ouvir no Spotify', href: siteConfig.social.spotify }}
        secondaryCta={{ label: 'Assistir no YouTube', href: siteConfig.social.youtube }}
      />

      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>
            O podcast do Sales Club traz conversas práticas sobre como estruturar uma máquina de vendas
            previsível — processo, gestão, pessoas, tecnologia e liderança comercial. Disponível no
            Spotify e com conteúdos em vídeo no canal do YouTube do Sales Club.
          </AnswerBlock>
        </div>
      </Section>

      <Section tone="card">
        <SectionHeading eyebrow="Ouça agora" title="Últimos episódios no Spotify" />
        {siteConfig.social.spotify && (
          <iframe
            title="Podcast do Sales Club no Spotify"
            src={spotifyEmbed}
            width="100%"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="rounded-card border border-subtle"
          />
        )}
      </Section>

      <Section>
        <SectionHeading eyebrow="Assista" title="No YouTube" />
        <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15">
              <YoutubeIcon className="h-6 w-6 text-brand-vivid" />
            </span>
            <div>
              <h3 className="font-display text-heading text-paper-pure">Canal do Sales Club</h3>
              <p className="text-sm text-paper/70">Aulas, cortes e episódios em vídeo.</p>
            </div>
          </div>
          <Button href={siteConfig.social.youtube} size="md" className="shrink-0">
            <YoutubeIcon className="h-4 w-4" /> Inscrever-se
          </Button>
        </Card>
        <div className="mt-4">
          <Button href={siteConfig.social.spotify} variant="secondary" size="md">
            <SpotifyIcon className="h-4 w-4" /> Seguir no Spotify
          </Button>
        </div>
      </Section>

      <Section tone="card">
        <div className="mx-auto max-w-2xl">
          <NewsletterForm
            title="Não perca nenhum episódio"
            description="Receba os novos episódios e conteúdos de vendas direto no seu e-mail."
          />
        </div>
      </Section>
    </PageShell>
  )
}
