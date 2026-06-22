import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

const PILARES = [
  {
    titulo: 'Educação, não palestrinha',
    descricao: 'Formação séria que muda comportamento e fica depois que o evento acaba.',
  },
  {
    titulo: 'Execução, não teoria',
    descricao: 'Você sai com método, playbook e um roteiro de 90 dias — e a gente acompanha a implementação.',
  },
  {
    titulo: 'Proximidade, não endeusamento',
    descricao: 'Mentores na mesa com você, não no palco. Um clube de pares que vivem os mesmos desafios.',
  },
  {
    titulo: 'Vender mais — e melhor organizado',
    descricao: 'Crescer com previsibilidade, processo e gestão. Não é só vender mais; é parar de depender da sorte.',
  },
]

/** Manifesto "Como pensamos" (P2.1) — voz da marca. */
export function ComoPensamos() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Como pensamos"
        title="Não é palestra motivacional. É a sua operação mudando."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PILARES.map((p) => (
          <Card key={p.titulo}>
            <h3 className="font-display text-heading text-paper-pure">{p.titulo}</h3>
            <p className="mt-2 text-sm text-paper/70">{p.descricao}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
