import { z } from 'zod'

/**
 * Schema de validação do lead (client + server). Campos de qualificação rica
 * inspirados em Full Sales / DNA (PRD §6.2). Usado por FormLead e /api/lead.
 */

export const CARGOS = [
  'Sócio/CEO',
  'Diretor/Head',
  'Gerente/Coordenador',
  'Vendedor/SDR/Closer',
  'Outro',
] as const

export const FAIXAS_VENDEDORES = ['1-5', '6-20', '21-50', '51-100', '100+'] as const

export const FAIXAS_FATURAMENTO = [
  'Até R$ 100k/mês',
  'R$ 100k–500k/mês',
  'R$ 500k–1M/mês',
  'R$ 1M–5M/mês',
  'Acima de R$ 5M/mês',
] as const

/** Origem da página — roteia o lead para o pipeline correto no Pipedrive. */
export const LEAD_SOURCES = [
  'imersoes',
  'servicos',
  'corporate',
  'elite',
  'sales-village',
  'materiais',
  'contato',
] as const

export type LeadSource = (typeof LEAD_SOURCES)[number]

export const leadSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome completo.'),
  email: z.string().email('E-mail inválido.'),
  whatsapp: z.string().min(10, 'Informe um WhatsApp válido com DDD.'),
  cargo: z.enum(CARGOS).optional(),
  empresa: z.string().optional(),
  vendedores: z.enum(FAIXAS_VENDEDORES).optional(),
  faturamento: z.enum(FAIXAS_FATURAMENTO).optional(),
  segmento: z.string().optional(),
  mensagem: z.string().max(2000).optional(),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: 'É necessário aceitar a política de privacidade.' }),
  }),
  source: z.enum(LEAD_SOURCES),
  produto: z.string().optional(), // ex.: slug da imersão / vertical
  // Honeypot anti-spam — deve vir vazio
  website: z.string().max(0).optional(),
  // Origem / atribuição (campos ocultos)
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
  page_url: z.string().optional(),
  referrer: z.string().optional(),
  // Token do Turnstile (validado no server)
  turnstileToken: z.string().optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
