import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const DORES = [
  'Bate meta num mês, frustra no outro, e ninguém sabe explicar por quê.',
  'O crescimento ainda passa pela sua mesa: se você sai, as vendas caem.',
  'O CRM virou um cemitério de dados — decisão ainda é no achismo.',
  'Cada vendedor vende de um jeito; o bom resultado não se repete.',
]

/** Bloco de DOR logo abaixo do hero (P1.1) — gera necessidade e leva ao diagnóstico. */
export function Dor() {
  return (
    <Section tone="card">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-display text-paper-pure">
          Sua receita depende de pessoas — não de um sistema?
        </h2>
      </div>
      <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        {DORES.map((dor) => (
          <li
            key={dor}
            className="flex gap-3 rounded-card border border-subtle bg-ink p-5 text-sm text-paper/85"
          >
            <span aria-hidden className="mt-0.5 text-brand-vivid">
              ✕
            </span>
            {dor}
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <Button href="/servicos/diagnostico-comercial" size="lg">
          Descobrir meus gargalos no diagnóstico gratuito
        </Button>
      </div>
    </Section>
  )
}
