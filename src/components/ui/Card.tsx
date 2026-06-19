import { cn } from '@/lib/cn'

type CardProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'article'
}

/** Card escuro padrão do brand guide (fundo #121316 + borda sutil). */
export function Card({ children, className, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-card border border-subtle bg-ink-card p-6 shadow-card',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
