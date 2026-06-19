import type { NewsletterInput } from './newsletter-schema'

/**
 * Abstração do provedor de e-mail marketing (ESP) da newsletter. MOCKADA até
 * a definição da ferramenta (RD Station / Mailchimp / etc.).
 *
 * TODO(newsletter): implementar `subscribe` chamando a API do ESP server-side
 * (inserir contato em lista/tag) sem mudar a assinatura.
 */

export type SubscribeResult =
  | { ok: true; mocked: boolean }
  | { ok: false; error: string }

function isConfigured(): boolean {
  return Boolean(process.env.NEWSLETTER_API_TOKEN)
}

export async function subscribe(input: NewsletterInput): Promise<SubscribeResult> {
  if (!isConfigured()) {
    // eslint-disable-next-line no-console
    console.info('[newsletter:mock] inscrição', {
      email: input.email,
      utm_source: input.utm_source,
      page_url: input.page_url,
    })
    return { ok: true, mocked: true }
  }
  // TODO(newsletter): POST para a API do ESP (lista/tag), idempotente por e-mail.
  throw new Error('Integração real da newsletter ainda não implementada.')
}
