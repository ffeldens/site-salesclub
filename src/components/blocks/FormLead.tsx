'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  leadSchema,
  CARGOS,
  SETORES,
  FAIXAS_VENDEDORES,
  FAIXAS_FATURAMENTO,
  DORES,
  type LeadSource,
} from '@/lib/lead-schema'
import { getStoredOrigin } from '@/lib/utm'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

/** Campo extra específico do contexto (ex.: data do evento). Vai para a nota. */
export type ExtraField = {
  name: string
  label: string
  type?: 'text' | 'date' | 'number' | 'select'
  options?: readonly string[]
  placeholder?: string
  /** ocupa as 2 colunas */
  full?: boolean
}

export type FormLeadProps = {
  /** Roteia o lead para o pipeline correto no Pipedrive. */
  source: LeadSource
  produto?: string
  title?: string
  description?: string
  ctaLabel?: string
  /** Cargo + Empresa (default: true). */
  perfil?: boolean
  /** Qualificação comercial: setor, tamanho do time, faturamento e dores (default: true). */
  comercial?: boolean
  /** Textarea de mensagem livre. Passe um objeto para customizar label/placeholder. */
  mensagem?: boolean | { label?: string; placeholder?: string }
  /** Campos extras do contexto (ex.: data/participantes do evento). Concatenados na nota. */
  extras?: ExtraField[]
  /** @deprecated Atalho usado pelas LPs — equivale a perfil+comercial juntos. */
  rich?: boolean
  /** Variante do botão de envio (ex.: 'gold' na página ELITE). */
  ctaVariant?: 'primary' | 'gold'
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputCls =
  'w-full rounded-md border border-subtle bg-ink px-3 py-2.5 text-sm text-paper placeholder:text-mute focus:border-brand focus:outline-none'
const labelCls = 'mb-1.5 block text-sm font-medium text-paper/85'

export function FormLead({
  source,
  produto,
  title = 'Fale com um especialista',
  description,
  ctaLabel = 'Enviar',
  perfil,
  comercial,
  mensagem = false,
  extras = [],
  rich,
  ctaVariant = 'primary',
}: FormLeadProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [started, setStarted] = useState(false)

  // Defaults preservam o comportamento atual; `rich` é o atalho legado das LPs.
  const showPerfil = perfil ?? rich ?? true
  const showComercial = comercial ?? rich ?? true
  const showMensagem = Boolean(mensagem)
  const msgLabel = (typeof mensagem === 'object' && mensagem.label) || 'Mensagem'
  const msgPlaceholder = typeof mensagem === 'object' ? mensagem.placeholder : undefined

  function onFirstInteraction() {
    if (!started) {
      setStarted(true)
      track('form_start', { source, produto })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrors({})

    const form = new FormData(e.currentTarget)

    // Campos extras do contexto + mensagem livre são concatenados na nota.
    const extraLinhas = extras
      .map((f) => {
        const v = String(form.get(f.name) ?? '').trim()
        return v ? `${f.label}: ${v}` : null
      })
      .filter(Boolean) as string[]
    const msgLivre = String(form.get('mensagem') ?? '').trim()
    const mensagemFinal = [...extraLinhas, ...(msgLivre ? [msgLivre] : [])].join('\n') || undefined

    const payload = {
      nome: String(form.get('nome') ?? ''),
      email: String(form.get('email') ?? ''),
      whatsapp: String(form.get('whatsapp') ?? ''),
      cargo: (form.get('cargo') as string) || undefined,
      empresa: (form.get('empresa') as string) || undefined,
      vendedores: (form.get('vendedores') as string) || undefined,
      faturamento: (form.get('faturamento') as string) || undefined,
      setor: (form.get('setor') as string) || undefined,
      dores: (form.getAll('dores') as string[]).filter(Boolean),
      mensagem: mensagemFinal,
      consentimento: form.get('consentimento') === 'on',
      website: String(form.get('website') ?? ''), // honeypot
      source,
      produto,
      ...getStoredOrigin(),
    }

    const parsed = leadSchema.safeParse(payload)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string' && !fieldErrors[key]) fieldErrors[key] = issue.message
      }
      setErrors(fieldErrors)
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      })
      if (!res.ok) throw new Error('request failed')
      track('lead_submit', { source, produto })
      setStatus('success')
    } catch {
      setStatus('error')
      setErrors({ form: 'Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.' })
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-card border border-subtle bg-ink-card p-8 text-center">
        <h3 className="font-display text-heading text-paper-pure">Recebemos seu contato! 🎉</h3>
        <p className="prose-sc mx-auto mt-2">
          Em breve um especialista do Sales Club vai falar com você.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={onFirstInteraction}
      className="rounded-card border border-subtle bg-ink-card p-6 sm:p-8"
      noValidate
    >
      {title && <h3 className="font-display text-heading text-paper-pure">{title}</h3>}
      {description && <p className="prose-sc mt-2 text-sm">{description}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Nome completo*" error={errors.nome} className="sm:col-span-2">
          <input name="nome" className={inputCls} autoComplete="name" />
        </Field>
        <Field label="E-mail*" error={errors.email}>
          <input name="email" type="email" className={inputCls} autoComplete="email" />
        </Field>
        <Field label="WhatsApp*" error={errors.whatsapp}>
          <input name="whatsapp" className={inputCls} autoComplete="tel" placeholder="(11) 99999-9999" />
        </Field>

        {showPerfil && (
          <>
            <Field label="Cargo" error={errors.cargo}>
              <select name="cargo" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                {CARGOS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Empresa" error={errors.empresa}>
              <input name="empresa" className={inputCls} autoComplete="organization" />
            </Field>
          </>
        )}

        {showComercial && (
          <>
            <Field label="Setor" error={errors.setor}>
              <select name="setor" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                {SETORES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tamanho do time comercial" error={errors.vendedores}>
              <select name="vendedores" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                {FAIXAS_VENDEDORES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Faturamento anual" error={errors.faturamento} className="sm:col-span-2">
              <select name="faturamento" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                {FAIXAS_FATURAMENTO.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </Field>
            <fieldset className="sm:col-span-2">
              <legend className={labelCls}>Principal desafio comercial (pode marcar mais de um)</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {DORES.map((d) => (
                  <label
                    key={d}
                    className="flex items-start gap-2 rounded-md border border-subtle bg-ink px-3 py-2 text-sm text-paper/85"
                  >
                    <input type="checkbox" name="dores" value={d} className="mt-1" />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {extras.map((f) => (
          <Field
            key={f.name}
            label={f.label}
            error={errors[f.name]}
            className={f.full ? 'sm:col-span-2' : undefined}
          >
            {f.type === 'select' ? (
              <select name={f.name} className={inputCls} defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                {(f.options ?? []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={f.name}
                type={f.type === 'date' || f.type === 'number' ? f.type : 'text'}
                className={inputCls}
                placeholder={f.placeholder}
              />
            )}
          </Field>
        ))}

        {showMensagem && (
          <Field label={msgLabel} error={errors.mensagem} className="sm:col-span-2">
            <textarea name="mensagem" rows={4} className={inputCls} placeholder={msgPlaceholder} />
          </Field>
        )}
      </div>

      {/* Honeypot — escondido de humanos */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label>
          Não preencha este campo
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-2 text-sm text-paper/75">
        <input name="consentimento" type="checkbox" className="mt-1" />
        <span>
          Concordo com a{' '}
          <a href="/politica-de-privacidade" className="text-brand-vivid underline">
            política de privacidade
          </a>{' '}
          e em ser contatado pelo Sales Club.*
        </span>
      </label>
      {errors.consentimento && <p className="mt-1 text-sm text-brand-vivid">{errors.consentimento}</p>}

      {errors.form && <p className="mt-4 text-sm text-brand-vivid">{errors.form}</p>}

      <Button
        type="submit"
        variant={ctaVariant}
        className="mt-6 w-full"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Enviando…' : ctaLabel}
      </Button>
    </form>
  )
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn(className)}>
      <label className={labelCls}>{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-brand-vivid">{error}</p>}
    </div>
  )
}
