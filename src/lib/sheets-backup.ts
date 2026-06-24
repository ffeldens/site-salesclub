import type { LeadInput } from './lead-schema'

/**
 * Redundância dos leads numa planilha (Google Sheets via Apps Script Web App).
 * Grava TODO lead, em paralelo ao Pipedrive, para nunca perder um envio mesmo
 * que o CRM esteja fora do ar. Best-effort: nunca lança e nunca bloqueia a
 * resposta além do timeout. No-op se SHEETS_WEBHOOK_URL não estiver configurada.
 *
 * Setup: criar um Apps Script Web App (doPost) que faz appendRow na planilha e
 * publicar como "Qualquer pessoa". Colar a URL em SHEETS_WEBHOOK_URL (Vercel).
 */
export async function logLeadToSheets(lead: LeadInput): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL
  if (!url) return

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Chaves = nomes das colunas esperados pelo Apps Script (ver HEADERS lá).
      body: JSON.stringify({
        'Data e horário': new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        'Nome completo': lead.nome,
        'Email': lead.email,
        'WhatsApp': lead.whatsapp,
        'Empresa': lead.empresa ?? '',
        'Cargo': lead.cargo ?? '',
        'Setor': lead.setor ?? '',
        'Faturamento anual': lead.faturamento ?? '',
        'Tamanho do time comercial': lead.vendedores ?? '',
        'Principal desafio comercial atual': (lead.dores ?? []).join(', '),
        'Mensagem': lead.mensagem ?? '',
        'Aceite LGPD': lead.consentimento ? 'Sim' : 'Não',
        'origem': `${lead.source}${lead.produto ? ` (${lead.produto})` : ''}`,
        'page_url': lead.page_url ?? '',
        'utm_source': lead.utm_source ?? '',
        'utm_medium': lead.utm_medium ?? '',
        'utm_campaign': lead.utm_campaign ?? '',
        'utm_term': lead.utm_term ?? '',
        'utm_content': lead.utm_content ?? '',
        'gclid': lead.gclid ?? '',
        'fbclid': lead.fbclid ?? '',
        'ttclid': lead.ttclid ?? '',
        'msclkid': lead.msclkid ?? '',
      }),
      signal: AbortSignal.timeout(8000),
    })
  } catch (err) {
    // Backup é best-effort; o lead segue para o Pipedrive normalmente.
    console.error('[sheets-backup] falha ao gravar na planilha:', err instanceof Error ? err.message : err)
  }
}
