import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export type Modulo = {
  numero: number
  titulo: string
  descricao: string
}

export type ModulosProps = {
  eyebrow?: string
  title?: string
  modulos: Modulo[]
}

/** Cards de módulos 1–4 das imersões. */
export function Modulos({ eyebrow = 'Conteúdo', title = 'Módulos do programa', modulos }: ModulosProps) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="grid gap-6 sm:grid-cols-2">
        {modulos.map((m) => (
          <Card key={m.numero}>
            <span className="font-display text-5xl font-extrabold text-brand/40">
              {String(m.numero).padStart(2, '0')}
            </span>
            <h3 className="mt-2 font-display text-heading text-paper-pure">{m.titulo}</h3>
            <p className="mt-2 text-sm text-paper/70">{m.descricao}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
