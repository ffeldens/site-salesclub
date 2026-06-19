export type LogosProvaSocialProps = {
  title?: string
  logos: string[]
}

/**
 * Grid de logos de clientes (prova social). Por ora renderiza os nomes em
 * texto; trocar por <Image> dos SVGs quando os assets estiverem em /public/brand.
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
        <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
          {logos.map((logo) => (
            <span
              key={logo}
              className="text-center font-display text-lg font-semibold text-paper/50 grayscale transition hover:text-paper hover:grayscale-0"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
