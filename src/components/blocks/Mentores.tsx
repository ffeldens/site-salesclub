import Image from 'next/image'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import type { Mentor } from '@/lib/content'

export type MentoresProps = {
  eyebrow?: string
  title?: string
  mentores: Mentor[]
}

/** Cards de mentores: retrato em destaque quando há foto; iniciais como fallback. */
export function Mentores({ eyebrow = 'Quem ensina', title = 'Mentores na mesa com você', mentores }: MentoresProps) {
  return (
    <Section tone="card">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description="Executivos que constroem operações de verdade — sentam à mesa com você para discutir o caso real da sua empresa, não no palco."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mentores.map((m) => (
          <Card key={m.nome} as="article" className="bg-ink">
            {m.foto ? (
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-b from-ink-line to-ink">
                <Image
                  src={m.foto}
                  alt={m.nome}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ) : (
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 font-display text-xl font-bold text-brand-vivid">
                {m.nome
                  .split(' ')
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join('')}
              </div>
            )}
            <h3 className="font-display text-heading text-paper-pure">{m.nome}</h3>
            <p className="mt-1 text-sm font-medium text-brand-vivid">{m.cargo}</p>
            <p className="mt-3 text-sm text-paper/70">{m.bio}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
