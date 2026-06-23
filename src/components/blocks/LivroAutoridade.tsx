import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { dregLivro } from '@/content/metodo'

/**
 * Bloco de autoridade do livro (P3.3) — método DREG vem do livro do CRO.
 * Capa e link pendentes (Pendência #4): placeholder até os ativos chegarem.
 */
export function LivroAutoridade({ tone = 'card' }: { tone?: 'base' | 'card' }) {
  return (
    <Section tone={tone}>
      <div className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
        {/* Capa do livro (placeholder até o ativo — Pendência #4) */}
        {dregLivro.capa ? (
          <Image
            src={dregLivro.capa}
            alt={`Capa do livro ${dregLivro.titulo}`}
            width={586}
            height={800}
            className="h-auto w-44 rounded-lg border border-subtle shadow-card"
          />
        ) : (
          <div className="flex h-[260px] w-[180px] flex-col justify-between rounded-lg border border-subtle bg-gradient-to-br from-ink-line to-ink p-5 shadow-card">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-vivid">
              Método DREG
            </span>
            <span className="font-display text-lg font-bold leading-tight text-paper-pure">
              Arquitetura de Vendas de Alta Performance
            </span>
            <span className="text-xs text-mute">Hélio Azevedo · Gustavo Pagotto</span>
          </div>
        )}

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-vivid">
            O método vem de um livro
          </p>
          <h2 className="mt-2 font-display text-display text-paper-pure">
            Vender não é talento. É arquitetura.
          </h2>
          <p className="prose-sc mt-4">
            O método DREG (Desenhar · Recrutar · Educar · Gerenciar) é o coração do livro{' '}
            <strong className="text-paper">{dregLivro.titulo}</strong>, de {dregLivro.autores} — a base
            que estrutura cada solução do Sales Club.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {dregLivro.link ? (
              <Button href={dregLivro.link} size="lg">
                Conhecer o livro
              </Button>
            ) : (
              // TODO(livro): habilitar quando o link de compra/landing existir (Pendência #4)
              <Button href="/metodo" size="lg">
                Conhecer o método DREG
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
