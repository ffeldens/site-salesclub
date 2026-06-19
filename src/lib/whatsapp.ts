import { siteConfig } from './site'

/** Monta o deep link do WhatsApp com mensagem parametrizável por página. */
export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.whatsapp.defaultMessage)
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${text}`
}
