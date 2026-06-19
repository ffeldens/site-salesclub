/** Formata uma data ISO (YYYY-MM-DD) para exibição em pt-BR (ex.: 19 jun 2026). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
  return `${String(d).padStart(2, '0')} ${meses[m - 1]} ${y}`
}
