import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { Logo } from '@/components/ui/Logo'
import { whatsappLink } from '@/lib/whatsapp'

export const metadata: Metadata = buildMetadata({
  title: 'Links',
  description: 'Acesse os principais conteúdos e ofertas do Sales Club.',
  path: '/links',
  noindex: true,
})

const LINKS = [
  { label: 'Imersões presenciais', href: '/imersoes' },
  { label: 'Diagnóstico Comercial gratuito', href: '/servicos/diagnostico-comercial' },
  { label: 'Máquina de Vendas', href: '/servicos/maquina-de-vendas' },
  { label: 'Comunidade ELITE', href: '/elite' },
  { label: 'Sales Village (eventos e podcast)', href: '/sales-village' },
  { label: 'Falar com especialista (WhatsApp)', href: whatsappLink(), external: true },
]

export default function LinksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-5 py-16">
      <Logo />
      <p className="mt-6 text-center text-sm text-paper/70">{siteConfig.tagline}</p>

      <div className="mt-10 flex w-full max-w-md flex-col gap-3">
        {LINKS.map((l) =>
          l.external ? (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-cta border border-subtle bg-ink-card px-5 py-4 text-center text-sm font-medium text-paper transition-colors hover:border-brand hover:text-paper-pure"
            >
              {l.label}
            </a>
          ) : (
            <Link
              key={l.label}
              href={l.href}
              className="rounded-cta border border-subtle bg-ink-card px-5 py-4 text-center text-sm font-medium text-paper transition-colors hover:border-brand hover:text-paper-pure"
            >
              {l.label}
            </Link>
          ),
        )}
      </div>

      <div className="mt-10 flex gap-5 text-sm text-mute">
        <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
          Instagram
        </a>
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
          LinkedIn
        </a>
        <a href={siteConfig.telecomUrl} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
          Sales Club Telecom
        </a>
      </div>
    </main>
  )
}
