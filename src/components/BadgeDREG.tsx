import Link from 'next/link'

/**
 * Selo "Etapa DREG" no topo das páginas de solução, linkando para /metodo.
 * `ciclo` indica que a solução percorre o ciclo completo (ex.: Máquina de Vendas).
 */
export function BadgeDREG({ etapa, ciclo = false }: { etapa?: string; ciclo?: boolean }) {
  const label = ciclo ? 'Método DREG · ciclo completo (D·R·E·G)' : `Etapa DREG · ${etapa}`
  return (
    <Link
      href="/metodo"
      className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-vivid hover:bg-brand/20"
    >
      <span aria-hidden className="font-display">▲</span>
      {label}
    </Link>
  )
}
