'use client'

import { useState } from 'react'
import { leadSchema } from '@/lib/lead-schema'
import { getStoredOrigin } from '@/lib/utm'
import { track } from '@/lib/analytics'
import { formatPhone } from '@/content/diagnostico'
import { cn } from '@/lib/cn'

export type MaterialGateProps = {
  /** URL do arquivo (em /public) liberado após o cadastro. */
  fileUrl: string
  /** Nome do material — vira o `produto` do lead no Pipedrive. */
  produto: string
  ctaLabel?: string
  accent?: 'brand' | 'gold'
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputCls =
  'w-full rounded-md border border-subtle bg-ink px-3 py-2.5 text-sm text-paper placeholder:text-mute focus:border-brand focus:outline-none'

/**
 * Lead magnet: pede nome, e-mail e WhatsApp antes de liberar o download.
 * Envia ao /api/lead (source 'materiais') e dispara o download em seguida —
 * o envio nunca bloqueia o acesso ao material em caso de falha do CRM.
 */
export function MaterialGate({ fileUrl, produto, ctaLabel = 'Baixar o material', accent = 'brand' }: MaterialGateProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [erro, setErro] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  const btnCls =
    accent === 'gold'
      ? 'bg-elite text-ink hover:bg-elite-dark'
      : 'bg-brand text-paper-pure hover:bg-brand-hover'

  function startDownload() {
    const a = document.createElement('a')
    a.href = fileUrl
    a.download = ''
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro(null)
    const form = new FormData(e.currentTarget)
    const payload = {
      nome: String(form.get('nome') ?? ''),
      email: String(form.get('email') ?? ''),
      whatsapp: String(form.get('whatsapp') ?? ''),
      consentimento: form.get('consentimento') === 'on',
      website: String(form.get('website') ?? ''), // honeypot
      source: 'materiais' as const,
      produto,
      mensagem: `Download do material: ${produto}`,
      ...getStoredOrigin(),
    }
    const parsed = leadSchema.safeParse(payload)
    if (!parsed.success) {
      const first = parsed.error.issues[0]
      setErro(first?.message ?? 'Confira os campos e tente novamente.')
      return
    }
    setStatus('submitting')
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      track('lead_submit', { source: 'materiais', produto })
    } catch {
      /* best-effort: o download nunca fica refém do CRM */
    }
    track('material_download', { produto })
    setStatus('success')
    startDownload()
  }

  if (status === 'success') {
    return (
      <div className="max-w-xl rounded-card border border-subtle bg-ink-card p-6 text-center">
        <p className="font-display text-heading text-paper-pure">Download iniciado! 🎉</p>
        <p className="mt-2 text-sm text-paper/75">
          Se o download não começar automaticamente,{' '}
          <a href={fileUrl} download className={accent === 'gold' ? 'font-semibold text-elite underline' : 'font-semibold text-brand-vivid underline'}>
            clique aqui para baixar
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => {
        if (!started) {
          setStarted(true)
          track('form_start', { source: 'materiais', produto })
        }
      }}
      className="max-w-xl rounded-card border border-subtle bg-ink-card p-6"
      noValidate
    >
      <p className="text-sm font-medium text-paper/85">
        Preencha para receber o material gratuitamente:
      </p>
      <div className="mt-4 grid gap-3">
        <input name="nome" className={inputCls} placeholder="Nome completo*" autoComplete="name" />
        <input name="email" type="email" className={inputCls} placeholder="E-mail*" autoComplete="email" />
        <input
          name="whatsapp"
          className={inputCls}
          placeholder="Telefone / WhatsApp*"
          autoComplete="tel"
          onChange={(e) => {
            e.currentTarget.value = formatPhone(e.currentTarget.value)
          }}
        />
      </div>

      {/* Honeypot anti-spam */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label>
          Não preencha este campo
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-4 flex items-start gap-2 text-xs text-paper/70">
        <input name="consentimento" type="checkbox" className="mt-0.5" />
        <span>
          Concordo com a{' '}
          <a href="/politica-de-privacidade" className="underline">
            política de privacidade
          </a>{' '}
          e em ser contatado pelo Sales Club.*
        </span>
      </label>

      {erro && <p className="mt-3 text-sm text-brand-vivid">{erro}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-cta px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60',
          btnCls,
        )}
      >
        {status === 'submitting' ? 'Enviando…' : `⬇ ${ctaLabel}`}
      </button>
    </form>
  )
}
