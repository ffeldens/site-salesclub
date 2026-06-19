import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

export type SalesVillageProps = {
  title?: string
  description?: string
  /** Placeholder de galeria — trocar por <Image> quando os assets chegarem. */
  imagens?: string[]
}

/** Bloco do Sales Village: ativo de marca + produto de locação (10–150 pessoas). */
export function SalesVillage({
  title = 'Sales Village',
  description = 'Nossa sede própria em São Paulo — também disponível para locação de eventos corporativos e gravação de podcast, com serviço completo para 10 a 150 pessoas.',
  imagens = ['Auditório', 'Estúdio de podcast', 'Lounge', 'Sala de reunião'],
}: SalesVillageProps) {
  return (
    <Section tone="card">
      <SectionHeading eyebrow="Espaço" title={title} description={description} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {imagens.map((label) => (
          <div
            key={label}
            className="flex aspect-[4/3] items-center justify-center rounded-card border border-subtle bg-ink text-sm text-mute"
          >
            {label}
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
