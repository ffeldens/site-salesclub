import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'gold'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-cta font-semibold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-paper-pure hover:bg-brand-hover',
  secondary: 'border border-subtle bg-ink-card text-paper hover:border-brand hover:text-paper-pure',
  ghost: 'text-paper hover:text-brand-vivid',
  whatsapp: 'bg-[#25D366] text-[#0C0C0C] hover:brightness-95',
  gold: 'bg-elite text-ink hover:bg-elite-dark',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = 'primary', size = 'md', className, children, ...props }, ref) {
    const classes = cn(base, variants[variant], sizes[size], className)

    if ('href' in props && props.href !== undefined) {
      const { href, ...rest } = props as ButtonAsLink
      const isExternal = href.startsWith('http') || href.startsWith('https')
      const isHash = href.startsWith('#')
      // Externo: nova aba. Hash (#secao): âncora nativa — o navegador rola sozinho
      // (next/link não rola de forma confiável em hash da mesma página).
      if (isExternal || isHash) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...rest}
          >
            {children}
          </a>
        )
      }
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} {...rest}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(props as ButtonAsButton)}>
        {children}
      </button>
    )
  },
)
