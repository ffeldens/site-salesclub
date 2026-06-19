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
  }
}

export function track(event: AnalyticsEvent, payload: DataLayerObject = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...payload })
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
