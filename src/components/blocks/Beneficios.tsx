import { Section, SectionHeading } from '@/components/ui/Section'
import { CheckIcon } from '@/components/ui/icons'

export type BeneficioItem = {
  titulo: string
  descricao?: string
}

export type BeneficiosProps = {
  eyebrow?: string
  title: string
  description?: string
  items: BeneficioItem[]
}

/** Lista "o que muda na sua operação" com check icons vermelhos. */
export function Beneficios({ eyebrow, title, description, items }: BeneficiosProps) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.titulo} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15">
              <CheckIcon className="h-4 w-4 text-brand-vivid" />
            </span>
            <div>
              <p className="font-medium text-paper">{item.titulo}</p>
              {item.descricao && <p className="mt-1 text-sm text-paper/65">{item.descricao}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
