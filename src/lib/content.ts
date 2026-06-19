/**
 * Abstração de conteúdo (CMS). MOCKADA com dados tipados em arquivos
 * (CLAUDE.md §13 / decisão: "mockar agora, plugar Sanity depois").
 *
 * Na Fase 4, substituir os corpos destas funções por queries GROQ ao Sanity —
 * SEM mudar as assinaturas, para que as páginas não precisem ser reescritas.
 */

export type Mentor = {
  nome: string
  cargo: string
  bio: string
  foto?: string
}

export type Stat = {
  valor: string
  label: string
}

export type Depoimento = {
  quote: string
  nome: string
  empresa: string
  foto?: string
}

export type Faq = {
  pergunta: string
  resposta: string
}

// --- Seed data (provisório; migrar do site atual / Sanity) ---

const MENTORES: Mentor[] = [
  { nome: 'Thiago Concer', cargo: 'Especialista em Vendas', bio: 'Referência nacional em treinamento de equipes comerciais.' },
  { nome: 'Raphael Lassance', cargo: 'Sales & Marketing', bio: 'Estrategista de aceleração comercial e marketing B2B.' },
  { nome: 'Hélio Azevedo', cargo: 'Gestão Comercial', bio: 'Especialista em previsibilidade e governança de vendas.' },
  { nome: 'Luiz Paulo Teixeira', cargo: 'Liderança Comercial', bio: 'Mentor de líderes e diretores comerciais.' },
]

const STATS: Stat[] = [
  { valor: '+5.000', label: 'empresários formados' },
  { valor: '9,7', label: 'nota de satisfação' },
  { valor: '+30%', label: 'crescimento médio em vendas' },
  { valor: '1', label: 'Sales Village próprio em SP' },
]

const DEPOIMENTOS: Depoimento[] = [
  { quote: 'Saímos de uma operação no improviso para uma máquina de vendas previsível.', nome: 'CEO', empresa: 'Indústria nacional' },
  { quote: 'O nível dos mentores e do networking não existe em nenhum outro lugar.', nome: 'Diretor Comercial', empresa: 'Scale-up de tecnologia' },
]

const FAQ_HOME: Faq[] = [
  {
    pergunta: 'O que é o Sales Club?',
    resposta:
      'O Sales Club é o maior ecossistema de vendas do Brasil: reúne imersões presenciais, serviços de consultoria, uma comunidade de empresários (ELITE), conselho consultivo (Sales Board) e tecnologia (app de OKRs e Sales AI) para dar previsibilidade e escala à área comercial.',
  },
  {
    pergunta: 'Para quem são as imersões?',
    resposta:
      'Para sócios, CEOs, diretores e líderes comerciais de empresas B2B que querem estruturar uma operação de vendas previsível, com processo, gestão e tecnologia.',
  },
  {
    pergunta: 'O que é o Sales Village?',
    resposta:
      'É a sede própria do Sales Club em São Paulo — também disponível para locação de eventos corporativos e gravação de podcast, com serviço completo para 10 a 150 pessoas.',
  },
]

const LOGOS: string[] = [
  'Google',
  'Coca-Cola',
  'Disney',
  'Bayer',
  'Subway',
  'iFood',
  'Walmart',
  'Lego',
]

export function getMentores(): Mentor[] {
  return MENTORES
}

export function getStats(): Stat[] {
  return STATS
}

export function getDepoimentos(): Depoimento[] {
  return DEPOIMENTOS
}

export function getFaqHome(): Faq[] {
  return FAQ_HOME
}

export function getClienteLogos(): string[] {
  return LOGOS
}
