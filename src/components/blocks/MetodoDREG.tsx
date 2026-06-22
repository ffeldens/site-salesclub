import { Section, SectionHeading } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { DregDiagrama } from '@/components/blocks/DregDiagrama'
import { dregEtapas } from '@/content/metodo'

/** Bloco "Nosso método" na Home (P2.2). */
export function MetodoDREG() {
  return (
    <Section tone="card">
      <SectionHeading
        eyebrow="Nosso método"
        title="Vender não é talento. É arquitetura."
        description="Toda equipe de vendas de alta performance se constrói como uma casa: com planta antes do primeiro tijolo. É o método DREG, criado pelo nosso CRO, Hélio Azevedo, no livro Arquitetura de Vendas de Alta Performance."
      />

      <DregDiagrama />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dregEtapas.map((e) => (
          <div key={e.nome}>
            <p className="font-display text-heading text-paper-pure">{e.nome}</p>
            <p className="mt-1 text-sm text-paper/70">{e.descricao}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-paper/80">
        Simples — mas nada fácil. Cada solução do Sales Club fortalece uma dessas etapas no seu
        negócio, e a <strong className="text-paper">Máquina de Vendas</strong> é o modelo prático que
        implementa e evolui o DREG inteiro na sua operação.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/servicos/diagnostico-comercial" size="lg">
          Descubra sua etapa mais fraca no diagnóstico gratuito
        </Button>
        <Button href="/metodo" variant="secondary" size="lg">
          Conhecer o método DREG
        </Button>
      </div>
    </Section>
  )
}
