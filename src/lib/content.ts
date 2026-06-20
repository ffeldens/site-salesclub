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
  {
    nome: 'Luiz Paulo Teixeira',
    cargo: 'CEO do Sales Club',
    bio: '20+ anos em educação executiva e estratégia empresarial, com atuação na FGV.',
    foto: '/images/mentores/luiz-paulo-teixeira.webp',
  },
  {
    nome: 'Hélio Azevedo',
    cargo: 'CRO do Sales Club',
    bio: '30+ anos em IBM, Microsoft e SAP. Especialista em operações comerciais B2B complexas e IA aplicada à receita.',
    foto: '/images/mentores/helio-azevedo.webp',
  },
  {
    nome: 'Felipe Feldens',
    cargo: 'COO do Sales Club',
    bio: 'Especialista em estratégia, inovação e transformação organizacional; 18+ anos liderando mudanças em grandes empresas e scale-ups.',
    foto: '/images/mentores/felipe-feldens.webp',
  },
  {
    nome: 'Raphael Lassance',
    cargo: 'Sócio-mentor',
    bio: 'Fundador da primeira agência de growth hacking do Brasil; 25 anos em negócios digitais. Forbes Under 30.',
    foto: '/images/mentores/raphael-lassance.webp',
  },
  {
    nome: 'Guilherme Junqueira',
    cargo: 'CEO da Delta Academy',
    bio: 'Empreendedor e investidor; fundador da Gama Academy (vendida à Ânima Educação). Forbes Under 30.',
    foto: '/images/mentores/guilherme-junqueira.webp',
  },
]

const STATS: Stat[] = [
  { valor: '+500 mil', label: 'profissionais formados' },
  { valor: '+800', label: 'empresas atendidas' },
  { valor: '+10 anos', label: 'de ecossistema comercial' },
  { valor: '1', label: 'Sales Village próprio em SP' },
]

const DEPOIMENTOS: Depoimento[] = [
  {
    quote:
      'A imersão foi fundamental na minha jornada profissional. Abriu minha mente para uma visão diferente de como lidar com vendas, pessoas, processo e liderança.',
    nome: 'Participante',
    empresa: 'Sales Strategy',
  },
  {
    quote:
      'Conteúdo riquíssimo, experiência excepcional, mentores que dominam as técnicas abordadas. O que vimos aqui não veremos em nenhum outro lugar.',
    nome: 'Participante',
    empresa: 'Sales Strategy',
  },
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

export type ClienteLogo = { nome: string; src?: string }

const LOGOS: ClienteLogo[] = [
  { nome: 'Google', src: '/images/clientes/google.svg' },
  { nome: 'Coca-Cola', src: '/images/clientes/coca-cola.svg' },
  { nome: 'Disney', src: '/images/clientes/disney.svg' },
  { nome: 'Subway', src: '/images/clientes/subway.svg' },
  { nome: 'iFood', src: '/images/clientes/ifood.svg' },
  { nome: 'Walmart', src: '/images/clientes/walmart.svg' },
  { nome: 'Mobil', src: '/images/clientes/mobil.svg' },
  { nome: 'Bayer', src: '/images/clientes/bayer.svg' },
  { nome: 'LEGO', src: '/images/clientes/lego.svg' },
]

/** Fotos do Sales Village (galeria real). */
export type VillageFoto = { src: string; alt: string }
const VILLAGE_FOTOS: VillageFoto[] = [
  { src: '/images/sales-village/auditorio-led.webp', alt: 'Auditório do Sales Village com painel de LED do Sales Club' },
  { src: '/images/sales-village/roundtable.webp', alt: 'Mentoria em formato roundtable no Sales Village' },
  { src: '/images/sales-village/palestra.webp', alt: 'Palestra para empresários no Sales Village' },
  { src: '/images/sales-village/sala-1.webp', alt: 'Sala de imersão do Sales Village' },
  { src: '/images/sales-village/sala-2.webp', alt: 'Espaço de eventos do Sales Village' },
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

export function getClienteLogos(): ClienteLogo[] {
  return LOGOS
}

export function getSalesVillageFotos(): VillageFoto[] {
  return VILLAGE_FOTOS
}
