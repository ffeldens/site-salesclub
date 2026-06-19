import type { LeadInput, LeadSource } from './lead-schema'

/**
 * Abstração do Pipedrive (CLAUDE.md §6, §13). MOCKADA até as credenciais
 * chegarem: API token, IDs de pipelines/stages e custom fields, Lead vs Deal.
 *
 * Quando o token existir, implementar `createPersonAndLead` chamando a API
 * do Pipedrive server-side. A assinatura tipada NÃO deve mudar — só o corpo.
 *
 * TODO(pipedrive): preencher PIPEDRIVE_* no .env e trocar o mock pela chamada real.
 */

/** Mapeia a origem da página para a env var do pipeline correspondente. */
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
  | { ok: true; personId: number | string; leadId: number | string; mocked: boolean }
  | { ok: false; error: string }

function isConfigured(): boolean {
  return Boolean(process.env.PIPEDRIVE_API_TOKEN)
}

/** Título do Deal/Lead: `[Produto] — [Nome] — [Empresa]` (PRD §6.3). */
function buildTitle(lead: LeadInput): string {
  const produto = lead.produto ?? lead.source
  const empresa = lead.empresa ? ` — ${lead.empresa}` : ''
  return `${produto} — ${lead.nome}${empresa}`
}

/**
 * Cria/atualiza Person (idempotente por e-mail) + Lead no pipeline da origem.
 * Enquanto não há credenciais, apenas loga e retorna sucesso mockado para que
 * o fluxo de UI possa ser testado ponta-a-ponta.
 */
export async function createPersonAndLead(lead: LeadInput): Promise<PipedriveResult> {
  const pipeline = PIPELINE_ENV[lead.source]

  if (!isConfigured()) {
    // eslint-disable-next-line no-console
    console.info('[pipedrive:mock] lead recebido', {
      title: buildTitle(lead),
      source: lead.source,
      pipeline: pipeline ?? '(não configurado)',
      email: lead.email,
      utm: {
        source: lead.utm_source,
        medium: lead.utm_medium,
        campaign: lead.utm_campaign,
      },
    })
    return { ok: true, personId: 'mock-person', leadId: 'mock-lead', mocked: true }
  }

  // TODO(pipedrive): implementação real
  // 1) POST/SEARCH /persons (idempotente por e-mail)
  // 2) POST /leads (ou /deals) com title=buildTitle(lead), pipeline, custom fields
  //    (cargo, vendedores, faturamento, segmento, page_url, UTMs, gclid)
  // 3) mapear source/channel a partir de utm_source/medium
  throw new Error('Integração real do Pipedrive ainda não implementada (aguardando credenciais).')
}
