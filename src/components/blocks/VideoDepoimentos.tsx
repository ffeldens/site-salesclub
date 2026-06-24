'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Section, SectionHeading } from '@/components/ui/Section'
import type { VideoDepoimento } from '@/content/depoimentos-video'

export type VideoDepoimentosProps = {
  eyebrow?: string
  title?: string
  description?: string
  videos: VideoDepoimento[]
  tone?: 'base' | 'card'
  /** Cor do botão de play e do eyebrow (ex.: 'gold' na ELITE). */
  accent?: 'brand' | 'gold'
}

/**
 * Galeria de depoimentos em vídeo (YouTube). Usa "facade": carrega só a thumbnail
 * e troca pelo iframe ao clicar — evita dezenas de players pesando na página.
 */
export function VideoDepoimentos({
  eyebrow = 'Depoimentos',
  title = 'Quem viveu o Sales Strategy',
  description,
  videos,
  tone = 'base',
  accent = 'brand',
}: VideoDepoimentosProps) {
  const [playing, setPlaying] = useState<string | null>(null)
  const playBtnCls = accent === 'gold' ? 'bg-elite text-ink' : 'bg-brand text-paper-pure'

  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} accent={accent} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <figure
            key={v.videoId}
            className="overflow-hidden rounded-card border border-subtle bg-ink-card"
          >
            <div className="relative aspect-video bg-ink">
              {playing === v.videoId ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=1&rel=0`}
                  title={`Depoimento — ${v.empresa}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(v.videoId)}
                  className="group absolute inset-0 h-full w-full"
                  aria-label={`Assistir depoimento de ${v.empresa}`}
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`}
                    alt={`Depoimento de ${v.empresa} sobre o Sales Strategy`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-ink/40 transition group-hover:bg-ink/20">
                    <span className={`grid h-14 w-14 place-items-center rounded-full shadow-lg transition group-hover:scale-110 ${playBtnCls}`}>
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
            <figcaption className="px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-paper-pure">{v.empresa}</span>
                <span className="text-xs text-mute">{v.segmento}</span>
              </div>
              {v.quote && (
                <blockquote className="mt-3 border-t border-subtle pt-3 text-sm italic text-paper/80">
                  “{v.quote}”
                  {v.pessoa && (
                    <footer className="mt-1 text-xs not-italic text-mute">— {v.pessoa}</footer>
                  )}
                </blockquote>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
