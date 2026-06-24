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
      // Ordem dos campos = ordem das colunas esperada pelo Apps Script.
      body: JSON.stringify({
        data: new Date().toISOString(),
        source: lead.source,
        produto: lead.produto ?? '',
        nome: lead.nome,
        email: lead.email,
        whatsapp: lead.whatsapp,
        cargo: lead.cargo ?? '',
        empresa: lead.empresa ?? '',
        vendedores: lead.vendedores ?? '',
        faturamento: lead.faturamento ?? '',
        segmento: lead.segmento ?? '',
        mensagem: lead.mensagem ?? '',
        utm_source: lead.utm_source ?? '',
        utm_medium: lead.utm_medium ?? '',
        utm_campaign: lead.utm_campaign ?? '',
        utm_content: lead.utm_content ?? '',
        utm_term: lead.utm_term ?? '',
        gclid: lead.gclid ?? '',
        fbclid: lead.fbclid ?? '',
        page_url: lead.page_url ?? '',
        referrer: lead.referrer ?? '',
      }),
      signal: AbortSignal.timeout(8000),
    })
  } catch (err) {
    // Backup é best-effort; o lead segue para o Pipedrive normalmente.
    console.error('[sheets-backup] falha ao gravar na planilha:', err instanceof Error ? err.message : err)
  }
}
