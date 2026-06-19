import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { siteConfig, solutionsMenu, getSocialLinks, type SocialKey } from '@/lib/site'
import { YoutubeIcon, SpotifyIcon } from '@/components/ui/icons'
import { NewsletterForm } from '@/components/blocks/NewsletterForm'

const SOCIAL_ICONS: Partial<Record<SocialKey, (p: { className?: string }) => React.ReactNode>> = {
  youtube: YoutubeIcon,
  spotify: SpotifyIcon,
}

/** Footer com navegação, dados legais (E-E-A-T/LGPD) e redes. */
export function Footer() {
  const year = 2026 // ano fixo — sem Date no server para builds determinísticos
  return (
    <footer className="border-t border-subtle bg-ink-card">
      {/* Inscrição na newsletter (site-wide) */}
      <div className="border-b border-subtle">
        <div className="container-content flex flex-col items-start justify-between gap-6 py-10 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <p className="font-display text-heading text-paper-pure">
              Conteúdos de vendas no seu e-mail
            </p>
            <p className="mt-1 text-sm text-paper/70">
              Insights de gestão comercial e previsibilidade. Sem spam.
            </p>
          </div>
          <div className="w-full max-w-md">
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </div>

      <div className="container-content grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="prose-sc mt-4 text-sm">{siteConfig.tagline}.</p>
          <p className="mt-4 text-xs text-mute">{siteConfig.address}</p>
          <p className="text-xs text-mute">{siteConfig.cnpj}</p>
        </div>

        {solutionsMenu.slice(0, 3).map((group) => (
          <div key={group.label}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-paper/70">
              {group.label}
            </p>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-mute hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-subtle">
        <div className="container-content flex flex-col items-center justify-between gap-4 py-6 text-xs text-mute sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/politica-de-privacidade" className="hover:text-paper">
              Política de Privacidade
            </Link>
            {getSocialLinks().map((s) => {
              const Icon = SOCIAL_ICONS[s.key]
              return (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center gap-1.5 hover:text-paper"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {s.label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
