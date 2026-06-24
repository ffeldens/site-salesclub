'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { RadarPilares } from '@/components/blocks/RadarPilares'
import { cn } from '@/lib/cn'
import { getStoredOrigin } from '@/lib/utm'
import { track } from '@/lib/analytics'
import { whatsappLink } from '@/lib/whatsapp'
import {
  sections,
  tamanhoOptions,
  faturamentoOptions,
  PUBLIC_DOMAINS,
  trilhaPorEtapa,
  formatPhone,
  getFeedbackType,
  getClassification,
  getScoreColor,
  type DregEtapa,
} from '@/content/diagnostico'

type UserData = { nome: string; empresa: string; email: string; telefone: string; tamanho: string; faturamento: string }
type Answers = Record<string, number>

const inputCls =
  'w-full rounded-md border border-subtle bg-ink px-3 py-2.5 text-sm text-paper placeholder:text-mute focus:border-brand focus:outline-none'

export function DiagnosticoTool() {
  const [step, setStep] = useState(0) // 0 = form; 1..N = seções; N+1 = resultado
  const [user, setUser] = useState<UserData>({ nome: '', empresa: '', email: '', telefone: '', tamanho: '', faturamento: '' })
  const [answers, setAnswers] = useState<Answers>({})
  const [erro, setErro] = useState<string | null>(null)

  const totalSecoes = sections.length
  const totalPerguntas = sections.reduce((a, s) => a + s.questions.length, 0)
  const finalStep = totalSecoes + 1

  function validarForm(): string | null {
    if (!user.nome.trim()) return 'Informe seu nome.'
    if (!user.empresa.trim()) return 'Informe o nome da empresa.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) return 'Insira um e-mail válido.'
    const dom = user.email.split('@')[1]?.toLowerCase()
    if (dom && PUBLIC_DOMAINS.includes(dom)) return 'Use um e-mail corporativo (ex.: nome@suaempresa.com.br).'
    if (user.telefone.replace(/\D/g, '').length < 10) return 'Insira um telefone válido com DDD.'
    if (!user.tamanho) return 'Selecione o número de vendedores.'
    if (!user.faturamento) return 'Selecione o faturamento anual.'
    return null
  }

  function avancar() {
    setErro(null)
    if (step === 0) {
      const e = validarForm()
      if (e) return setErro(e)
      track('form_start', { source: 'diagnostico' })
      setStep(1)
      return
    }
    const sec = sections[step - 1]
    if (!sec) return
    const respondidas = sec.questions.every((_, qi) => answers[`${sec.id}-${qi}`] !== undefined)
    if (!respondidas) return setErro('Responda todas as perguntas antes de avançar.')
    if (step === totalSecoes) {
      enviarLead()
      setStep(finalStep)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setStep(step + 1)
  }

  function voltar() {
    setErro(null)
    if (step > 0) setStep(step - 1)
  }

  // --- cálculo de scores ---
  const resultado = useMemo(() => {
    const porPilar = sections.map((s) => {
      const notas = s.questions.map((_, qi) => answers[`${s.id}-${qi}`] ?? 0)
      const score = Math.round((notas.reduce((a, b) => a + b, 0) / notas.length) * 10) / 10
      return { ...s, score }
    })
    const geral = porPilar.length
      ? Math.round((porPilar.reduce((a, b) => a + b.score, 0) / porPilar.length) * 10) / 10
      : 0
    // score por etapa DREG
    const etapas: DregEtapa[] = ['Desenhar', 'Recrutar', 'Educar', 'Gerenciar']
    const porEtapa = etapas
      .map((etapa) => {
        const membros = porPilar.filter((p) => p.dreg === etapa)
        if (!membros.length) return null
        const score = Math.round((membros.reduce((a, b) => a + b.score, 0) / membros.length) * 10) / 10
        return { etapa, score }
      })
      .filter((x): x is { etapa: DregEtapa; score: number } => x !== null)
    const maisFraca = [...porEtapa].sort((a, b) => a.score - b.score)[0]
    return { porPilar, geral, porEtapa, maisFraca }
  }, [answers])

  async function enviarLead() {
    const resumo = [
      `Diagnóstico Comercial — score geral ${resultado.geral.toFixed(1)}/10`,
      `Etapa DREG mais fraca: ${resultado.maisFraca?.etapa ?? '-'}`,
      'Scores por pilar: ' + resultado.porPilar.map((p) => `${p.name} ${p.score}`).join(' · '),
    ].join('\n')
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: user.nome,
          email: user.email,
          whatsapp: user.telefone,
          empresa: user.empresa,
          vendedores: user.tamanho || undefined,
          faturamento: user.faturamento || undefined,
          mensagem: resumo,
          consentimento: true,
          source: 'diagnostico',
          produto: `Diagnóstico Comercial (${resultado.geral.toFixed(1)}/10)`,
          ...getStoredOrigin(),
        }),
      })
      track('lead_submit', { source: 'diagnostico', score: resultado.geral })
    } catch {
      /* nunca bloqueia o resultado para o usuário */
    }
  }

  // ===== RESULTADO =====
  if (step === finalStep) {
    const c = getClassification(resultado.geral)
    return (
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#22C55E]/15 px-4 py-1.5 text-sm font-semibold text-[#22C55E] ring-1 ring-[#22C55E]/30">
            ✓ Diagnóstico concluído
          </span>
          <h2 className="mt-4 font-display text-display text-paper-pure">Resultado de {user.nome}</h2>
          <p className="font-semibold text-brand-vivid">{user.empresa}</p>
        </div>

        {/* Score geral + radar */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-center rounded-card border border-subtle bg-ink-card p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-mute">Score geral de maturidade</p>
            <p className="mt-3 font-display text-6xl font-extrabold" style={{ color: getScoreColor(resultado.geral) }}>
              {resultado.geral.toFixed(1)}
              <span className="text-2xl text-mute">/10</span>
            </p>
            <p className="mt-2 text-lg font-bold" style={{ color: c.cor }}>{c.label}</p>
            <p className="prose-sc mx-auto mt-2 text-sm">{c.desc}</p>
          </div>
          <div className="rounded-card border border-subtle bg-ink-card p-6">
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-mute">Visão por pilar</p>
            <RadarPilares data={resultado.porPilar.map((p) => ({ name: p.name, score: p.score }))} />
          </div>
        </div>

        {/* Leitura por DREG + trilha da etapa mais fraca */}
        {resultado.maisFraca && (
          <div className="mt-6 rounded-card border-l-4 border-brand bg-ink-card p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-vivid">Pelo método DREG</p>
            <p className="mt-2 text-paper/90">
              Sua etapa mais fraca é <strong className="text-paper">{resultado.maisFraca.etapa}</strong> ({resultado.maisFraca.score.toFixed(1)}/10).
              Comece por aqui:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {trilhaPorEtapa[resultado.maisFraca.etapa].map((t) => (
                <Link key={t.href} href={t.href} className="rounded-full bg-brand/15 px-3 py-1 text-sm font-medium text-brand-vivid hover:bg-brand/25">
                  {t.label} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Scores por pilar */}
        <h3 className="mt-10 font-display text-heading text-paper-pure">Scores por pilar</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {resultado.porPilar.map((s) => {
            const ft = getFeedbackType(s.score)
            const cor = getScoreColor(s.score)
            return (
              <div key={s.id} className="rounded-card border border-subtle bg-ink-card p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-paper">{s.icon} {s.name}</span>
                  <span className="rounded px-2 py-0.5 text-xs font-bold" style={{ color: cor, background: `${cor}22` }}>
                    {s.score.toFixed(1)}
                  </span>
                </div>
                <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-ink-line">
                  <div className="h-full rounded-full" style={{ width: `${(s.score / 10) * 100}%`, background: cor }} />
                </div>
                <p className="text-xs leading-relaxed text-paper/65">{s.sectionFeedback[ft]}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-card border border-subtle bg-ink-card p-8 text-center">
          <h3 className="font-display text-heading text-paper-pure">Quer transformar isso num plano de ação?</h3>
          <p className="prose-sc mx-auto mt-2 text-sm">
            Fale com um especialista do Sales Club e estruture sua operação para crescer com consistência.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contato" size="lg">Falar com um especialista</Button>
            <Button href={whatsappLink(`Olá! Fiz o diagnóstico (score ${resultado.geral.toFixed(1)}/10) e quero conversar.`)} variant="whatsapp" size="lg">
              WhatsApp
            </Button>
          </div>
          <button
            onClick={() => { setAnswers({}); setStep(0); setErro(null) }}
            className="mt-4 text-sm text-mute underline hover:text-paper"
          >
            Refazer o diagnóstico
          </button>
        </div>
      </div>
    )
  }

  // ===== FORM (step 0) =====
  const progresso = step === 0 ? 0 : Math.round((step / (totalSecoes + 1)) * 100)
  let offset = 0
  for (let i = 0; i < step - 1 && i < sections.length; i++) offset += sections[i]?.questions.length ?? 0

  return (
    <div className="mx-auto max-w-2xl rounded-card border border-subtle bg-ink-card p-6 sm:p-8">
      {/* Progresso */}
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-xs text-mute">
          <span>Passo {step + 1} de {totalSecoes + 1}</span>
          <span>{progresso}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-ink-line">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progresso}%` }} />
        </div>
      </div>

      {step === 0 ? (
        <div>
          <h3 className="font-display text-heading text-paper-pure">Vamos personalizar seu diagnóstico</h3>
          <p className="mt-1 text-sm text-paper/70">Leva ~5 minutos. Seus dados são usados apenas para gerar o relatório e o contato.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Seu nome*" className="sm:col-span-2"><input className={inputCls} value={user.nome} onChange={(e) => setUser({ ...user, nome: e.target.value })} /></Field>
            <Field label="Sua empresa*" className="sm:col-span-2"><input className={inputCls} value={user.empresa} onChange={(e) => setUser({ ...user, empresa: e.target.value })} /></Field>
            <Field label="E-mail corporativo*" className="sm:col-span-2"><input type="email" className={inputCls} placeholder="nome@suaempresa.com.br" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} /></Field>
            <Field label="Telefone / WhatsApp*"><input className={inputCls} placeholder="(11) 99999-9999" value={user.telefone} onChange={(e) => setUser({ ...user, telefone: formatPhone(e.target.value) })} /></Field>
            <Field label="Nº de vendedores*">
              <select className={inputCls} value={user.tamanho} onChange={(e) => setUser({ ...user, tamanho: e.target.value })}>
                <option value="" disabled>Selecione…</option>
                {tamanhoOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Faturamento anual*" className="sm:col-span-2">
              <select className={inputCls} value={user.faturamento} onChange={(e) => setUser({ ...user, faturamento: e.target.value })}>
                <option value="" disabled>Selecione…</option>
                {faturamentoOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          {erro && <p className="mt-3 text-sm text-brand-vivid">{erro}</p>}
          <p className="mt-3 text-xs text-mute">
            Ao continuar, você concorda com a <Link href="/politica-de-privacidade" className="underline hover:text-paper">Política de Privacidade</Link>.
          </p>
          <Button onClick={avancar} className="mt-5 w-full">Iniciar meu diagnóstico →</Button>
        </div>
      ) : (
        (() => {
          const sec = sections[step - 1]
          if (!sec) return null
          return (
            <div>
              <p className="text-sm font-bold text-brand-vivid">{sec.icon} {sec.name}</p>
              <p className="mt-1 text-xs text-mute">Pergunta {offset + 1}–{offset + sec.questions.length} de {totalPerguntas}</p>
              <div className="mt-6 space-y-8">
                {sec.questions.map((q, qi) => {
                  const key = `${sec.id}-${qi}`
                  const val = answers[key]
                  const ft = val !== undefined ? getFeedbackType(val) : null
                  return (
                    <div key={qi}>
                      <p className="mb-3 text-sm font-semibold text-paper">{q.text}</p>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {Array.from({ length: 11 }, (_, v) => (
                          <button
                            key={v}
                            onClick={() => { setErro(null); setAnswers((p) => ({ ...p, [key]: v })) }}
                            className={cn(
                              'h-10 min-w-[34px] rounded-md border text-sm font-semibold transition',
                              val === v
                                ? 'text-ink'
                                : 'border-subtle bg-ink text-mute hover:text-paper',
                            )}
                            style={val === v ? { background: getScoreColor(v), borderColor: getScoreColor(v) } : undefined}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                      {ft && <p className="mt-2 text-xs italic text-paper/55">{q.feedbacks[ft]}</p>}
                    </div>
                  )
                })}
              </div>
              {erro && <p className="mt-4 text-sm text-brand-vivid">{erro}</p>}
              <div className="mt-8 flex items-center justify-between">
                <button onClick={voltar} className="text-sm text-mute hover:text-paper">← Voltar</button>
                <Button onClick={avancar}>{step === totalSecoes ? 'Ver resultado →' : 'Próximo →'}</Button>
              </div>
            </div>
          )
        })()
      )}
    </div>
  )
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-paper/85">{label}</label>
      {children}
    </div>
  )
}
