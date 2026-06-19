import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

/** Casca padrão das páginas: Header + main + Footer + WhatsApp flutuante. */
export function PageShell({
  children,
  whatsappMessage,
}: {
  children: React.ReactNode
  whatsappMessage?: string
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat message={whatsappMessage} />
    </>
  )
}
