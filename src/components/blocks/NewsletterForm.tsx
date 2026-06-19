'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { newsletterSchema } from '@/lib/newsletter-schema'
import { getStoredOrigin } from '@/lib/utm'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export type NewsletterFormProps = {
  /** 'inline' (linha compacta, ex.: footer) ou 'card' (boxed com título). */
  variant?: 'inline' | 'card'
  title?: string
  description?: string
}

export function NewsletterForm({
  variant = 'card',
  title = 'Receba conteúdos de vendas no seu e-mail',
  description = 'Insights de gestão comercial, previsibilidade e liderança. Sem spam.',
}: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = new FormData(e.currentTarget)
    const payload = {
      email: String(form.get('email') ?? ''),
      website: String(form.get('website') ?? ''),
      ...getStoredOrigin(),
    }

    const parsed = newsletterSchema.safeParse(payload)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Verifique o e-mail.')
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      if (!res.ok) throw new Error('failed')
      track('lead_submit', { source: 'newsletter' })
      setStatus('success')
    } catch {
      setError('Não foi possível inscrever agora. Tente novamente.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn(variant === 'card' && 'rounded-card border border-subtle bg-ink-card p-6 text-center')}>
        <p className="font-medium text-paper-pure">Inscrição confirmada! 🎉</p>
        <p className="mt-1 text-sm text-paper/70">Em breve você recebe nossos conteúdos.</p>
      </div>
    )
  }

  const inputCls =
    'w-full rounded-md border border-subtle bg-ink px-3 py-2.5 text-sm text-paper placeholder:text-mute focus:border-brand focus:outline-none'

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(variant === 'card' && 'rounded-card border border-subtle bg-ink-card p-6 sm:p-8')}
    >
      {variant === 'card' && (
        <>
          <h3 className="font-display text-heading text-paper-pure">{title}</h3>
          {description && <p className="prose-sc mt-2 text-sm">{description}</p>}
        </>
      )}
      <div className={cn('flex gap-2', variant === 'card' && 'mt-4', variant === 'inline' && 'flex-col sm:flex-row')}>
        <label className="sr-only" htmlFor={`nl-email-${variant}`}>
          E-mail
        </label>
        <input
          id={`nl-email-${variant}`}
          name="email"
          type="email"
          required
          placeholder="seu@email.com"
          className={cn(inputCls, 'flex-1')}
          autoComplete="email"
        />
        {/* Honeypot */}
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <Button type="submit" disabled={status === 'submitting'} className="shrink-0">
          {status === 'submitting' ? 'Enviando…' : 'Inscrever'}
        </Button>
      </div>
      {error && <p className="mt-2 text-sm text-brand-vivid">{error}</p>}
      <p className="mt-2 text-xs text-mute">
        Ao inscrever, você concorda com a{' '}
        <a href="/politica-de-privacidade" className="underline hover:text-paper">
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  )
}
