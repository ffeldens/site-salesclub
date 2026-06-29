import { NextRequest, NextResponse } from 'next/server'
import { leadSchema } from '@/lib/lead-schema'
import { createPersonAndLead } from '@/lib/pipedrive'
import { logLeadToSheets } from '@/lib/sheets-backup'

/**
 * Endpoint de captura de leads (CLAUDE.md §6). Valida server-side com zod,
 * checa honeypot e encaminha ao Pipedrive (mockado até as credenciais).
 *
 * TODO(Fase 2): adicionar rate limiting por IP + verificação do Turnstile +
 * fallback (log/e-mail) em caso de falha do Pipedrive para nunca perder lead.
 */
export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', issues: parsed.error.flatten() },
      { status: 422 },
    )
  }

  const lead = parsed.data

  // Honeypot preenchido => bot. Responde 200 para não sinalizar a detecção.
  if (lead.website && lead.website.length > 0) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  // Redundância: grava TODO lead na planilha em paralelo ao Pipedrive. Iniciada
  // antes de aguardar o CRM, captura o lead mesmo se o Pipedrive falhar/cair.
  const backup = logLeadToSheets(lead) // never rejects

  try {
    const result = await createPersonAndLead(lead)
    await backup
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 })
    }
    // Em dry-run, devolve os payloads resolvidos (e rótulos sem opção) p/ validação.
    return NextResponse.json({
      ok: true,
      mocked: result.mocked,
      ...(result.dryRun ? { dryRun: true, payloads: result.payloads, unmatched: result.unmatched } : {}),
    })
  } catch (err) {
    await backup // garante a gravação no backup mesmo em erro inesperado
    console.error('[api/lead] erro ao processar lead', err)
    return NextResponse.json({ ok: false, error: 'internal' }, { status: 500 })
  }
}
