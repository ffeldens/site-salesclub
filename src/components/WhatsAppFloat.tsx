'use client'

import { WhatsAppIcon } from '@/components/ui/icons'
import { whatsappLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

/** Botão flutuante de WhatsApp com mensagem parametrizável por página. */
export function WhatsAppFloat({ message }: { message?: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('whatsapp_click', { source: 'float' })}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
