import Image from 'next/image'
import type { ClienteLogo } from '@/lib/content'

export type LogosProvaSocialProps = {
  title?: string
  logos: ClienteLogo[]
}

/**
 * Grid de logos de clientes (prova social). Logos em SVG branco (monocromático)
 * sobre o fundo escuro; cai para texto se algum logo não tiver `src`.
 */
export function LogosProvaSocial({
  title = 'Empresas que confiam no Sales Club',
  logos,
}: LogosProvaSocialProps) {
  return (
    <section className="border-y border-subtle bg-ink-card py-12">
      <div className="container-content">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-mute">
          {title}
        </p>
        <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo) =>
            logo.src ? (
              <div key={logo.nome} className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.nome}
                  width={120}
                  height={40}
                  className="h-7 w-auto object-contain opacity-60 transition-opacity hover:opacity-100"
                />
              </div>
            ) : (
              <span
                key={logo.nome}
                className="text-center font-display text-lg font-semibold text-paper/50"
              >
                {logo.nome}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
