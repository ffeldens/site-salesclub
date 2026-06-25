/**
 * Camada de analytics (CLAUDE.md §9). Empurra eventos para o dataLayer do GTM.
 * GA4/GTM/Meta Pixel são plugados via NEXT_PUBLIC_GTM_ID / NEXT_PUBLIC_META_PIXEL_ID.
 * Sem IDs configurados, vira no-op silencioso (seguro em dev).
 */

export type AnalyticsEvent =
  | 'view_lp'
  | 'form_start'
  | 'lead_submit'
  | 'whatsapp_click'
  | 'material_download'
  | 'cta_click'

type DataLayerObject = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: DataLayerObject[]
    fbq?: (...args: unknown[]) => void
  }
}

/** Eventos mapeados para eventos padrão do Meta Pixel. */
const FB_STANDARD: Partial<Record<AnalyticsEvent, string>> = {
  lead_submit: 'Lead',
  whatsapp_click: 'Contact',
}

export function track(event: AnalyticsEvent, payload: DataLayerObject = {}): void {
  if (typeof window === 'undefined') return
  // GTM / GA4
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...payload })
  // Meta Pixel (quando carregado): conversões nos eventos padrão, resto custom
  if (typeof window.fbq === 'function') {
    const standard = FB_STANDARD[event]
    if (standard) window.fbq('track', standard, payload)
    else window.fbq('trackCustom', event, payload)
  }
}

// IDs públicos (expostos no client de qualquer forma). Fallback para os do Sales Club.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-K5CH642X'
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '3787907997992821'
