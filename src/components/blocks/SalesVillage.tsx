import Image from 'next/image'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { getSalesVillageFotos, type VillageFoto } from '@/lib/content'

export type SalesVillageProps = {
  title?: string
  description?: string
  fotos?: VillageFoto[]
}

/** Bloco do Sales Village: ativo de marca + produto de locação (10–150 pessoas). */
export function SalesVillage({
  title = 'Sales Village',
  description = 'Nossa sede própria em São Paulo — também disponível para locação de eventos corporativos e gravação de podcast, com serviço completo para 10 a 150 pessoas.',
  fotos = getSalesVillageFotos(),
}: SalesVillageProps) {
  return (
    <Section tone="card">
      <SectionHeading eyebrow="Espaço" title={title} description={description} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fotos.slice(0, 3).map((foto) => (
          <div key={foto.src} className="relative aspect-[4/3] overflow-hidden rounded-card border border-subtle">
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Button href="/sales-village" size="lg">
          Reservar / Orçar evento
        </Button>
      </div>
    </Section>
  )
}
