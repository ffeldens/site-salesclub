import { z } from 'zod'

/** Validação da inscrição na newsletter (client + server). */
export const newsletterSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  // Honeypot anti-spam — deve vir vazio
  website: z.string().max(0).optional(),
  // Origem / atribuição (opcional)
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  page_url: z.string().optional(),
  referrer: z.string().optional(),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>
