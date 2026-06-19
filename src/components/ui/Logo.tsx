import Link from 'next/link'
import { cn } from '@/lib/cn'

/**
 * Logo do Sales Club: ícone de chama (vermelho) + "SALES" regular + "CLUB" bold.
 * Versão tipográfica enquanto o SVG oficial não é disponibilizado em /public/brand.
 * TODO(brand): trocar o ícone pelo símbolo oficial (chama/S estilizado).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Sales Club — página inicial"
      className={cn('inline-flex items-center gap-2', className)}
    >
      <FlameIcon className="h-7 w-7 text-brand-vivid" />
      <span className="font-display text-xl tracking-tight text-paper-pure">
        <span className="font-normal">SALES</span>
        <span className="font-extrabold">CLUB</span>
      </span>
    </Link>
  )
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2c.4 3-1.6 4.6-3 6.2C7.4 10 6 11.8 6 14.4 6 18 8.7 21 12 21s6-3 6-6.6c0-2.2-1-4-2.2-5.6C16.8 11 15.4 12 14 12c1.2-3 0-7-2-10Z" />
    </svg>
  )
}
