import { dregEtapas } from '@/content/metodo'

/** Diagrama linear D→R→E→G sobre a base "Pessoas + Processos + Tecnologia". */
export function DregDiagrama() {
  return (
    <div className="rounded-card border border-subtle bg-ink-card p-6 sm:p-8">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {dregEtapas.map((e, i) => (
          <div key={e.nome} className="flex flex-1 items-center gap-3">
            <div className="flex-1 rounded-lg border border-brand/30 bg-brand/10 px-4 py-3 text-center">
              <span className="font-display text-2xl font-extrabold text-brand-vivid">{e.letra}</span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-paper/90">
                {e.nome}
              </span>
            </div>
            {i < dregEtapas.length - 1 && (
              <span aria-hidden className="hidden text-brand-vivid sm:inline">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-subtle pt-4 text-center text-sm font-medium text-paper/70">
        Pessoas + Processos + Tecnologia
      </p>
    </div>
  )
}
