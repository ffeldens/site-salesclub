/** Variáveis de ambiente do Sanity. Valores públicos (project id/dataset). */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-01-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '3vneeegd'

/** True quando há projeto configurado (sempre, com o fallback acima). */
export const sanityConfigured = Boolean(projectId)
