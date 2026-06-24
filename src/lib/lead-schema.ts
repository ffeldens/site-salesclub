import { z } from 'zod'

/**
 * Schema de validação do lead (client + server). Campos de qualificação rica
 * inspirados em Full Sales / DNA (PRD §6.2). Usado por FormLead e /api/lead.
 */

export const CARGOS = [
  'C-Level',
  'CEO',
  'Coordenador',
  'Diretor',
  'Executivo de Vendas',
  'Fundador',
  'Gerente',
  'Head de Vendas',
  'Líder',
  'Presidente',
  'Sócio',
  'Supervisor',
  'Vendedor',
  'Vice-Presidente',
] as const

export const SETORES = [
  'Agronegócio',
  'Comércio',
  'Distribuidoras',
  'Educação',
  'Franquias',
  'Imobiliário',
  'Indústria',
  'Serviços',
  'Tecnologia',
  'Telecomunicações',
] as const

export const FAIXAS_VENDEDORES = ['1-5', '6-10', '11-20', '21-30', '31-40', '41-50', '50+'] as const

export const FAIXAS_FATURAMENTO = [
  'Até R$ 500 mil',
  'R$ 500 mil a R$ 1 milhão',
  'R$ 1 milhão a R$ 5 milhões',
  'R$ 5 milhões a R$ 10 milhões',
  'R$ 10 milhões a R$ 50 milhões',
  'R$ 50 milhões a R$ 100 milhões',
  'Acima de R$ 100 milhões',
] as const

/** Dores / principal desafio comercial (o lead pode marcar mais de uma). */
export const DORES = [
  'Previsibilidade / Pipeline / Funil',
  'Conversão baixa / Ciclo de venda longo',
  'Gestão do time de vendas',
  'Prospecção / Geração de leads',
] as const

/** Origem da página — roteia o lead para o pipeline correto no Pipedrive. */
export const LEAD_SOURCES = [
  'imersoes',
  'servicos',
  'corporate',
  'elite',
  'sales-village',
  'eventos',
  'universidade',
  'diagnostico',
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
  setor: z.enum(SETORES).optional(),
  dores: z.array(z.enum(DORES)).optional(),
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
  ttclid: z.string().optional(),
  msclkid: z.string().optional(),
  page_url: z.string().optional(),
  referrer: z.string().optional(),
  // Token do Turnstile (validado no server)
  turnstileToken: z.string().optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
