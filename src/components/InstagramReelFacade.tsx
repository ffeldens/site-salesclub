import { InstagramIcon } from '@/components/ui/icons'

/**
 * Facade leve para um reel do Instagram: card com play estilizado (sem thumbnail
 * remota nem script de embed) que abre o reel no Instagram em nova aba ao clicar.
 * O embed oficial do Instagram carrega script pesado no client — este componente
 * não carrega nenhum JS extra, só um link estilizado. Sem 'use client'.
 */
export function InstagramReelFacade({
  url,
  label,
  caption,
}: {
  url: string
  /** Rótulo curto exibido sobre o botão de play (ex.: "Teresina e São Luís"). */
  label: string
  caption?: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mx-auto flex aspect-[9/16] w-full max-w-xs flex-col justify-end overflow-hidden rounded-card border border-subtle bg-gradient-to-br from-ink-card via-ink to-ink-card p-5 transition hover:border-brand-vivid/60"
      aria-label={`Assistir no Instagram: ${label}`}
    >
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-paper-pure shadow-lg transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <div className="relative">
        <div className="flex items-center gap-2 text-sm font-medium text-paper-pure">
          <InstagramIcon className="h-5 w-5" />
          Assistir no Instagram
        </div>
        <p className="mt-1 text-xs text-mute">{label}</p>
        {caption && <p className="mt-2 text-xs text-paper/70">{caption}</p>}
      </div>
    </a>
  )
}
