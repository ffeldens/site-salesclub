import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { siteConfig, solutionsMenu } from '@/lib/site'

/** Footer com navegação, dados legais (E-E-A-T/LGPD) e redes. */
export function Footer() {
  const year = 2026 // ano fixo — sem Date no server para builds determinísticos
  return (
    <footer className="border-t border-subtle bg-ink-card">
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
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              Instagram
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
