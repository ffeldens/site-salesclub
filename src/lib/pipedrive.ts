import type { LeadInput, LeadSource } from './lead-schema'

/**
 * Integração com o Pipedrive (API v2) — manual_integracao_pipedrive.
 * Cria Organização → Pessoa → Negócio (nessa ordem, encadeadas por id):
 *  - Organização e Pessoa são DEDUPLICADAS (reaproveitadas por nome/e-mail).
 *  - Negócio é SEMPRE novo (cada envio = nova oportunidade).
 * Campos personalizados (hashes) são preenchidos resolvendo, em runtime, o
 * rótulo do formulário → ID da opção (para campos enum/set), via definições de
 * campos do Pipedrive (cacheadas). Rótulos sem correspondência ficam vazios e
 * são reportados em `unmatched`. Mensagem + click ids (ttclid/msclkid) vão na nota.
 *
 * Sem PIPEDRIVE_API_TOKEN → modo mock. Com PIPEDRIVE_DRY_RUN=1 → resolve e retorna
 * os payloads (org/person/deal) SEM criar nada (para validação). Nunca lança.
 */

const COMPANY = process.env.PIPEDRIVE_BASE_URL ?? 'https://salesclub2.pipedrive.com'
const V1 = `${COMPANY}/api/v1`
const V2 = `${COMPANY}/api/v2`
const DRY_RUN = process.env.PIPEDRIVE_DRY_RUN === '1'

/** Chaves dos campos personalizados (do manual de integração). */
const FK = {
  org: {
    setor: 'fd7cba75f4b6d725b89b1df58ff6c2cf05d3e36e',
    faturamento: 'eb77601e1321b0f6228cb25cf4f3d2fd2a69684e',
    time: '954fa0c25c48c5a902293a3c29b6b6acbee63943',
  },
  person: {
    email: 'de738b4c3469718fa70ee8616d77e8b35d0f46c8',
    whatsapp: '0a0e14fe9e5f1989e9e70f6ff1d65bdd40feaaf4',
    lgpd: '3da1be56d6919675a82d254271f972e19f840625',
    cargo: 'b07afb055ffd3bf2984f419d1440f6ffe8b2feda',
  },
  deal: {
    dores: 'e81f6dae9364329d976e25b532e89f14011ff81a',
    page_url: 'e67e7901b9d972d1f79b51d8f90b574448eaa470',
    utm_source: '73b597af557d4e9273feee19d7764b1fd10a6b43',
    utm_medium: 'd2ec43ccb77317052b73cdc093f2356eee315a3c',
    utm_campaign: '2a664a8db87a90f4b4a1ce093db95d03fc652df6',
    utm_term: '6cff6516669d11fb923c877938f771b3d9d1b428',
    utm_content: '304dab72410c701c02dad5521b0071b7593870d4',
    gclid: '411299174987db6e8ffa5897a93684b0cc1a614f',
    fbclid: '5f5e7dbe5a225bb2fe86a1006409da361059f276',
  },
} as const

/** Funil (pipeline id) por origem — opcional; só aplica se a env estiver setada. */
const PIPELINE_ENV: Record<LeadSource, string | undefined> = {
  imersoes: process.env.PIPEDRIVE_PIPELINE_IMERSOES,
  servicos: process.env.PIPEDRIVE_PIPELINE_SERVICOS,
  corporate: process.env.PIPEDRIVE_PIPELINE_CORPORATE,
  elite: process.env.PIPEDRIVE_PIPELINE_ELITE,
  'sales-village': process.env.PIPEDRIVE_PIPELINE_VILLAGE,
  eventos: process.env.PIPEDRIVE_PIPELINE_EVENTOS,
  universidade: process.env.PIPEDRIVE_PIPELINE_UNIVERSIDADE,
  diagnostico: process.env.PIPEDRIVE_PIPELINE_DIAGNOSTICO ?? process.env.PIPEDRIVE_PIPELINE_MATERIAIS,
  materiais: process.env.PIPEDRIVE_PIPELINE_MATERIAIS,
  contato: process.env.PIPEDRIVE_PIPELINE_SERVICOS,
}

export type PipedriveResult =
  | {
      ok: true
      mocked: boolean
      dryRun?: boolean
      orgId?: number | null
      personId?: number | null
      dealId?: number | string
      payloads?: { organization?: Record<string, unknown>; person?: Record<string, unknown>; deal?: Record<string, unknown> }
      unmatched?: { entity: string; key: string; name?: string; value: unknown }[]
    }
  | { ok: false; error: string }

function isConfigured(): boolean {
  return Boolean(process.env.PIPEDRIVE_API_TOKEN)
}

/** Título do Deal: `[Produto] — [Nome] — [Empresa]`. */
function buildTitle(lead: LeadInput): string {
  const produto = lead.produto ?? lead.source
  const empresa = lead.empresa ? ` — ${lead.empresa}` : ''
  return `${produto} — ${lead.nome}${empresa}`
}

/** Nota humana com tudo (inclui Mensagem e click ids que não têm campo). */
function buildNote(lead: LeadInput): string {
  const dores = lead.dores && lead.dores.length > 0 ? lead.dores.join(', ') : ''
  const dataHora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  const linhas = [
    `<b>Recebido em:</b> ${dataHora}`,
    `<b>Origem:</b> ${lead.source}${lead.produto ? ` (${lead.produto})` : ''}`,
    lead.cargo && `<b>Cargo:</b> ${lead.cargo}`,
    lead.setor && `<b>Setor:</b> ${lead.setor}`,
    lead.vendedores && `<b>Tamanho do time comercial:</b> ${lead.vendedores}`,
    lead.faturamento && `<b>Faturamento anual:</b> ${lead.faturamento}`,
    dores && `<b>Principal desafio comercial:</b> ${dores}`,
    lead.mensagem && `<b>Mensagem:</b><br>${lead.mensagem.replace(/\n/g, '<br>')}`,
    `<b>Aceite LGPD:</b> ${lead.consentimento ? 'Sim' : 'Não'}`,
    '',
    `<b>Página:</b> ${lead.page_url ?? '-'}`,
    `<b>UTM source/medium/campaign:</b> ${lead.utm_source ?? '-'} / ${lead.utm_medium ?? '-'} / ${lead.utm_campaign ?? '-'}`,
    (lead.utm_content || lead.utm_term) && `<b>UTM content/term:</b> ${lead.utm_content ?? '-'} / ${lead.utm_term ?? '-'}`,
    lead.gclid && `<b>gclid:</b> ${lead.gclid}`,
    lead.fbclid && `<b>fbclid:</b> ${lead.fbclid}`,
    lead.ttclid && `<b>ttclid:</b> ${lead.ttclid}`,
    lead.msclkid && `<b>msclkid:</b> ${lead.msclkid}`,
    lead.referrer && `<b>Referrer:</b> ${lead.referrer}`,
  ].filter(Boolean)
  return linhas.join('<br>')
}

type FieldOption = { id: number; label: string }
type FieldDef = { key: string; name?: string; field_type?: string; options?: FieldOption[] }

async function pd<T = unknown>(method: string, base: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-token': process.env.PIPEDRIVE_API_TOKEN as string,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(8000),
  })
  const json = (await res.json().catch(() => ({}))) as { success?: boolean; data?: T; error?: string }
  if (!res.ok || json.success === false) {
    throw new Error(`Pipedrive ${path} → ${res.status} ${json.error ?? ''}`)
  }
  return json.data as T
}

// Cache das definições de campos (warm reuse entre invocações).
let fieldCache: Record<string, FieldDef> | null = null
async function loadFields(): Promise<Record<string, FieldDef>> {
  if (fieldCache) return fieldCache
  const cache: Record<string, FieldDef> = {}
  for (const ent of ['organizationFields', 'personFields', 'dealFields'] as const) {
    const data = await pd<FieldDef[]>('GET', V1, `/${ent}`)
    for (const f of data ?? []) cache[f.key] = f
  }
  fieldCache = cache
  return cache
}

const norm = (s: unknown) =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '') // remove acentos
    .replace(/r\$/g, '')
    .replace(/\s+/g, '')
    .trim()

function resolveOptionId(def: FieldDef, label: string): number | null {
  const n = norm(label)
  const m = def.options?.find((o) => norm(o.label) === n)
  return m ? m.id : null
}

export async function createPersonAndLead(lead: LeadInput): Promise<PipedriveResult> {
  const pipelineRaw = PIPELINE_ENV[lead.source]
  const pipelineId = pipelineRaw ? Number(pipelineRaw) : undefined

  if (!isConfigured()) {
    // eslint-disable-next-line no-console
    console.info('[pipedrive:mock] lead recebido', { title: buildTitle(lead), source: lead.source, email: lead.email })
    return { ok: true, mocked: true, dealId: 'mock-deal' }
  }

  try {
    let fields: Record<string, FieldDef> = {}
    try {
      fields = await loadFields()
    } catch {
      // Sem definições, segue só com campos nativos + nota.
    }

    const unmatched: { entity: string; key: string; name?: string; value: unknown }[] = []
    // Na API v2 os campos personalizados vão aninhados em `custom_fields`.
    const addCustom = (
      target: Record<string, unknown>,
      entity: string,
      key: string,
      value: unknown,
    ) => {
      if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return
      const def = fields[key]
      let resolved: unknown
      if (!def) {
        resolved = Array.isArray(value) ? value.join(', ') : value
      } else if (def.field_type === 'enum') {
        const id = resolveOptionId(def, String(value))
        if (id == null) return void unmatched.push({ entity, key, name: def.name, value })
        resolved = id
      } else if (def.field_type === 'set') {
        const arr = (Array.isArray(value) ? value : [value])
          .map((v) => resolveOptionId(def, String(v)))
          .filter((x): x is number => x != null)
        if (!arr.length) return void unmatched.push({ entity, key, name: def.name, value })
        resolved = arr
      } else {
        resolved = Array.isArray(value) ? value.join(', ') : value
      }
      const cf = (target.custom_fields ??= {}) as Record<string, unknown>
      cf[key] = resolved
    }

    // ---- monta os payloads ----
    const orgBody: Record<string, unknown> = { name: lead.empresa || lead.nome }
    addCustom(orgBody, 'organization', FK.org.setor, lead.setor)
    addCustom(orgBody, 'organization', FK.org.faturamento, lead.faturamento)
    addCustom(orgBody, 'organization', FK.org.time, lead.vendedores)

    const personBody: Record<string, unknown> = {
      name: lead.nome,
      emails: [{ value: lead.email, primary: true, label: 'work' }],
      ...(lead.whatsapp ? { phones: [{ value: lead.whatsapp, primary: true, label: 'work' }] } : {}),
    }
    addCustom(personBody, 'person', FK.person.email, lead.email)
    addCustom(personBody, 'person', FK.person.whatsapp, lead.whatsapp)
    addCustom(personBody, 'person', FK.person.cargo, lead.cargo)
    addCustom(personBody, 'person', FK.person.lgpd, lead.consentimento ? 'Sim' : 'Não')

    const dealBody: Record<string, unknown> = {
      title: buildTitle(lead),
      ...(pipelineId && !Number.isNaN(pipelineId) ? { pipeline_id: pipelineId } : {}),
    }
    addCustom(dealBody, 'deal', FK.deal.dores, lead.dores)
    addCustom(dealBody, 'deal', FK.deal.page_url, lead.page_url)
    addCustom(dealBody, 'deal', FK.deal.utm_source, lead.utm_source)
    addCustom(dealBody, 'deal', FK.deal.utm_medium, lead.utm_medium)
    addCustom(dealBody, 'deal', FK.deal.utm_campaign, lead.utm_campaign)
    addCustom(dealBody, 'deal', FK.deal.utm_term, lead.utm_term)
    addCustom(dealBody, 'deal', FK.deal.utm_content, lead.utm_content)
    addCustom(dealBody, 'deal', FK.deal.gclid, lead.gclid)
    addCustom(dealBody, 'deal', FK.deal.fbclid, lead.fbclid)

    if (DRY_RUN) {
      return {
        ok: true,
        mocked: true,
        dryRun: true,
        payloads: { organization: orgBody, person: personBody, deal: dealBody },
        unmatched,
      }
    }

    // ---- 1) Organização (dedup por nome) ----
    let orgId: number | null = null
    if (lead.empresa) {
      const search = await pd<{ items?: { item: { id: number } }[] }>(
        'GET',
        V1,
        `/organizations/search?term=${encodeURIComponent(lead.empresa)}&fields=name&exact_match=true&limit=1`,
      ).catch(() => null)
      orgId = search?.items?.[0]?.item?.id ?? null
      if (!orgId) {
        const org = await pd<{ id: number }>('POST', V2, '/organizations', orgBody)
        orgId = org.id
      }
    }

    // ---- 2) Pessoa (dedup por e-mail) ----
    const psearch = await pd<{ items?: { item: { id: number } }[] }>(
      'GET',
      V1,
      `/persons/search?term=${encodeURIComponent(lead.email)}&fields=email&exact_match=true&limit=1`,
    ).catch(() => null)
    let personId: number | null = psearch?.items?.[0]?.item?.id ?? null
    if (!personId) {
      if (orgId) personBody.org_id = orgId
      const person = await pd<{ id: number }>('POST', V2, '/persons', personBody)
      personId = person.id
    }

    // ---- 3) Negócio (sempre novo) ----
    if (orgId) dealBody.org_id = orgId
    if (personId) dealBody.person_id = personId
    const deal = await pd<{ id: number }>('POST', V2, '/deals', dealBody)

    // ---- Nota (best-effort) ----
    await pd('POST', V1, '/notes', {
      content: buildNote(lead),
      deal_id: deal.id,
      person_id: personId ?? undefined,
      org_id: orgId ?? undefined,
    }).catch(() => {})

    if (unmatched.length) {
      console.warn('[pipedrive] rótulos sem opção correspondente:', JSON.stringify(unmatched))
    }
    return { ok: true, mocked: false, orgId, personId, dealId: deal.id, unmatched }
  } catch (err) {
    // Nunca perder o lead: registra o payload completo para recuperação manual.
    console.error('[pipedrive] falha ao criar lead — payload:', JSON.stringify(lead))
    return { ok: false, error: err instanceof Error ? err.message : 'pipedrive_error' }
  }
}
