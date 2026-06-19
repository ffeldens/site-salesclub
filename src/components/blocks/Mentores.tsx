import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import type { Mentor } from '@/lib/content'

export type MentoresProps = {
  eyebrow?: string
  title?: string
  mentores: Mentor[]
}

/** Cards de mentores (foto, nome, cargo, bio). Schema Person fica na página. */
export function Mentores({ eyebrow = 'Quem ensina', title = 'Mentores de marca', mentores }: MentoresProps) {
  return (
    <Section tone="card">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mentores.map((m) => (
          <Card key={m.nome} as="article" className="bg-ink">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand/15 font-display text-xl font-bold text-brand-vivid">
              {m.nome
                .split(' ')
                .map((p) => p[0])
                .slice(0, 2)
                .join('')}
            </div>
            <h3 className="font-display text-heading text-paper-pure">{m.nome}</h3>
            <p className="mt-1 text-sm font-medium text-brand-vivid">{m.cargo}</p>
            <p className="mt-3 text-sm text-paper/70">{m.bio}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
