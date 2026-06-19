import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/lib/site'

/**
 * Chrome do "LP mode": header com logo + 1 CTA (sem mega-menu) e footer enxuto
 * (só legal/privacidade) — foco total em conversão (PRD §7).
 */
export function LpHeader({ ctaLabel = 'Quero participar', ctaHref = '#form' }: { ctaLabel?: string; ctaHref?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-ink/90 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Logo />
        <Button href={ctaHref} size="sm">
          {ctaLabel}
        </Button>
      </div>
    </header>
  )
}

export function LpFooter() {
  const year = 2026
  return (
    <footer className="border-t border-subtle bg-ink-card">
      <div className="container-content flex flex-col items-center justify-between gap-3 py-8 text-xs text-mute sm:flex-row">
        <p>
          © {year} {siteConfig.name} · {siteConfig.cnpj}
        </p>
        <Link href="/politica-de-privacidade" className="hover:text-paper">
          Política de Privacidade
        </Link>
      </div>
    </footer>
  )
}
