import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/cn'

/**
 * Logo oficial do Sales Club (assets em /public/brand, fornecidos pela marca).
 * - `full`   → símbolo + wordmark "SALES CLUB" (branco, para o tema dark).
 * - `symbol` → apenas o símbolo (usos compactos).
 */
export function Logo({
  className,
  variant = 'full',
}: {
  className?: string
  variant?: 'full' | 'symbol'
}) {
  const isFull = variant === 'full'
  return (
    <Link
      href="/"
      aria-label="Sales Club — página inicial"
      className={cn('inline-flex items-center', className)}
    >
      <Image
        src={isFull ? '/brand/salesclub-logo-white.svg' : '/brand/salesclub-symbol.svg'}
        alt="Sales Club"
        width={isFull ? 150 : 34}
        height={isFull ? 34 : 34}
        priority
        className={isFull ? 'h-8 w-auto' : 'h-8 w-8'}
      />
    </Link>
  )
}
