export type AnswerBlockProps = {
  /** Resposta direta de 40–60 palavras (GEO §8B.3 — "quick answer" extraível). */
  children: React.ReactNode
}

/**
 * Bloco "answer-first" no topo de páginas editoriais e de serviço.
 * Responde à pergunta-alvo de forma extraível por motores generativos.
 */
export function AnswerBlock({ children }: AnswerBlockProps) {
  return (
    <div className="rounded-card border-l-4 border-brand bg-ink-card p-5 text-paper/90">
      <p className="text-base leading-relaxed">{children}</p>
    </div>
  )
}
