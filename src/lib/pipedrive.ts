import type { LeadInput, LeadSource } from './lead-schema'

/**
 * Integração com o Pipedrive (CLAUDE.md §6). Sem PIPEDRIVE_API_TOKEN, opera em
 * modo mock (loga e retorna sucesso) para dev/preview. Com token, cria/atualiza
 * Person (idempotente por e-mail) + Deal no funil da origem, com a qualificação
 * e os UTMs registrados numa nota. Nunca lança: em falha, registra o lead para
 * recuperação e retorna { ok:false } para o fallback do /api/lead.
 */

const BASE_URL = process.env.PIPEDRIVE_BASE_URL ?? 'https://api.pipedrive.com/v1'

/** Funil (pipeline id) por origem da página. */
const PIPELINE_ENV: Record<LeadSource, string | undefined> = {
  imersoes: process.env.PIPEDRIVE_PIPELINE_IMERSOES,
  servicos: process.env.PIPEDRIVE_PIPELINE_SERVICOS,
  corporate: process.env.PIPEDRIVE_PIPELINE_CORPORATE,
  elite: process.env.PIPEDRIVE_PIPELINE_ELITE,
  'sales-village': process.env.PIPEDRIVE_PIPELINE_VILLAGE,
  eventos: process.env.PIPEDRIVE_PIPELINE_EVENTOS,
  universidade: process.env.PIPEDRIVE_PIPELINE_UNIVERSIDADE,
  materiais: process.env.PIPEDRIVE_PIPELINE_MATERIAIS,
  contato: process.env.PIPEDRIVE_PIPELINE_SERVICOS,
}

export type PipedriveResult =
  | { ok: true; personId: number | string; dealId: number | string; mocked: boolean }
  | { ok: false; error: string }

function isConfigured(): boolean {
  return Boolean(process.env.PIPEDRIVE_API_TOKEN)
}

/** Título do Deal: `[Produto] — [Nome] — [Empresa]` (PRD §6.3). */
function buildTitle(lead: LeadInput): string {
  const produto = lead.produto ?? lead.source
  const empresa = lead.empresa ? ` — ${lead.empresa}` : ''
  return `${produto} — ${lead.nome}${empresa}`
}

/** Resumo de qualificação + atribuição para a nota do negócio. */
function buildNote(lead: LeadInput): string {
  const linhas = [
    `<b>Origem:</b> ${lead.source}${lead.produto ? ` (${lead.produto})` : ''}`,
    lead.cargo && `<b>Cargo:</b> ${lead.cargo}`,
    lead.vendedores && `<b>Nº de vendedores:</b> ${lead.vendedores}`,
    lead.faturamento && `<b>Faturamento:</b> ${lead.faturamento}`,
    lead.segmento && `<b>Segmento:</b> ${lead.segmento}`,
    lead.mensagem && `<b>Mensagem:</b> ${lead.mensagem}`,
    '',
    `<b>Página:</b> ${lead.page_url ?? '-'}`,
    `<b>UTM source/medium/campaign:</b> ${lead.utm_source ?? '-'} / ${lead.utm_medium ?? '-'} / ${lead.utm_campaign ?? '-'}`,
    (lead.utm_content || lead.utm_term) && `<b>UTM content/term:</b> ${lead.utm_content ?? '-'} / ${lead.utm_term ?? '-'}`,
    lead.gclid && `<b>gclid:</b> ${lead.gclid}`,
    lead.fbclid && `<b>fbclid:</b> ${lead.fbclid}`,
    lead.referrer && `<b>Referrer:</b> ${lead.referrer}`,
  ].filter(Boolean)
  return linhas.join('<br>')
}

async function pd<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const token = process.env.PIPEDRIVE_API_TOKEN as string
  const sep = path.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${path}${sep}api_token=${encodeURIComponent(token)}`
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    signal: AbortSignal.timeout(8000),
  })
  const json = (await res.json().catch(() => ({}))) as { success?: boolean; data?: T; error?: string }
  if (!res.ok || json.success === false) {
    throw new Error(`Pipedrive ${path} → ${res.status} ${json.error ?? ''}`)
  }
  return json.data as T
}

async function findOrCreatePerson(lead: LeadInput): Promise<number> {
  // Idempotente por e-mail
  const search = await pd<{ items?: { item: { id: number } }[] }>(
    `/persons/search?term=${encodeURIComponent(lead.email)}&fields=email&exact_match=true&limit=1`,
  )
  const existing = search?.items?.[0]?.item?.id
  if (existing) return existing

  const created = await pd<{ id: number }>('/persons', {
    method: 'POST',
    body: JSON.stringify({
      name: lead.nome,
      email: [{ value: lead.email, primary: true, label: 'work' }],
      phone: lead.whatsapp ? [{ value: lead.whatsapp, primary: true, label: 'work' }] : undefined,
    }),
  })
  return created.id
}

export async function createPersonAndLead(lead: LeadInput): Promise<PipedriveResult> {
  const pipelineRaw = PIPELINE_ENV[lead.source]
  const pipelineId = pipelineRaw ? Number(pipelineRaw) : undefined

  if (!isConfigured()) {
    // eslint-disable-next-line no-console
    console.info('[pipedrive:mock] lead recebido', {
      title: buildTitle(lead),
      source: lead.source,
      pipeline: pipelineRaw ?? '(funil padrão)',
      email: lead.email,
    })
    return { ok: true, personId: 'mock-person', dealId: 'mock-deal', mocked: true }
  }

  try {
    const personId = await findOrCreatePerson(lead)
    const deal = await pd<{ id: number }>('/deals', {
      method: 'POST',
      body: JSON.stringify({
        title: buildTitle(lead),
        person_id: personId,
        ...(pipelineId && !Number.isNaN(pipelineId) ? { pipeline_id: pipelineId } : {}),
      }),
    })
    // Qualificação + UTMs na nota (sem depender de custom fields nesta v1)
    await pd('/notes', {
      method: 'POST',
      body: JSON.stringify({ content: buildNote(lead), deal_id: deal.id, person_id: personId }),
    }).catch(() => {
      /* nota é best-effort; não derruba o lead */
    })
    return { ok: true, personId, dealId: deal.id, mocked: false }
  } catch (err) {
    // Nunca perder o lead: registra o payload completo para recuperação manual.
    console.error('[pipedrive] falha ao criar lead — payload para recuperação:', JSON.stringify(lead))
    return { ok: false, error: err instanceof Error ? err.message : 'pipedrive_error' }
  }
}
