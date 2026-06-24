/**
 * Captura e persistência de UTMs / parâmetros de origem para atribuição
 * multi-página até o submit do lead (CLAUDE.md §6, §9). Persistido em
 * localStorage no primeiro acesso e anexado ao payload do form.
 */

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'ttclid',
  'msclkid',
] as const

export type UtmKey = (typeof UTM_KEYS)[number]

export type LeadOrigin = Partial<Record<UtmKey, string>> & {
  page_url?: string
  referrer?: string
}

const STORAGE_KEY = 'sc_lead_origin'

/** Lê os UTMs da URL atual + page_url/referrer. Client-only. */
export function readUtmsFromUrl(): LeadOrigin {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const origin: LeadOrigin = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) origin[key] = value
  }
  origin.page_url = window.location.href
  origin.referrer = document.referrer || undefined
  return origin
}

/**
 * Persiste a origem na primeira visita (first-touch). Chamado no client
 * (ex.: num provider no layout). Não sobrescreve UTMs já capturados.
 */
export function persistOrigin(): LeadOrigin {
  if (typeof window === 'undefined') return {}
  const fresh = readUtmsFromUrl()
  const stored = getStoredOrigin()
  const hasFreshUtms = UTM_KEYS.some((k) => fresh[k])
  const merged: LeadOrigin = hasFreshUtms ? { ...stored, ...fresh } : { ...fresh, ...stored }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch {
    // localStorage indisponível — segue sem persistir
  }
  return merged
}

export function getStoredOrigin(): LeadOrigin {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as LeadOrigin) : {}
  } catch {
    return {}
  }
}
