import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { referenciasMetodo } from '@/content/metodo'

/**
 * Bloco de autoridade editorial (P3.3): o método DREG se pratica na metodologia Máquina
 * de Vendas (livro em breve) e o ecossistema tem o livro Queime o Plano, de Felipe Feldens.
 * Sem capa por enquanto: entra quando os ativos do Queime o Plano estiverem disponíveis.
 */
export function LivroAutoridade({ tone = 'card' }: { tone?: 'base' | 'card' }) {
  const { metodologia, livro } = referenciasMetodo
  return (
    <Section tone={tone}>
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-vivid">
          Método e metodologia
        </p>
        <h2 className="mt-2 font-display text-display text-paper-pure">
          Vender não é talento. É arquitetura.
        </h2>
        <p className="prose-sc mt-4">
          O método DREG (Desenhar · Recrutar · Educar · Gerenciar) é a base que estrutura cada solução
          do Sales Club e ganha forma prática na{' '}
          <strong className="text-paper">{metodologia.rotulo}</strong>. Para o lado das pessoas e da
          cultura, leia o livro <strong className="text-paper">{livro.titulo}</strong>, de{' '}
          {livro.autor}.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/metodo" size="lg">
            Conhecer o método DREG
          </Button>
          <Button href={metodologia.href} variant="secondary" size="lg">
            Conhecer a Máquina de Vendas
          </Button>
        </div>
      </div>
    </Section>
  )
}
