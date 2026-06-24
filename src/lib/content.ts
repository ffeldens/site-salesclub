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
  cargo?: string
  empresa: string
  /** Número de resultado (ex.: "+32% de conversão"). Reforça prova. */
  resultado?: string
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
    bio: 'Fundador da primeira agência de growth hacking do Brasil; 25 anos construindo operações de receita.',
    foto: '/images/mentores/raphael-lassance.webp',
  },
  {
    nome: 'Guilherme Junqueira',
    cargo: 'Empreendedor e investidor',
    bio: 'Fundou e escalou negócios de educação e tecnologia; senta com os membros para discutir o caso real de cada um.',
    foto: '/images/mentores/guilherme-junqueira.webp',
  },
  {
    nome: 'Viviane Machado',
    cargo: 'Especialista em Enablement',
    bio: '10+ anos em Treinamento & Desenvolvimento, com passagem estratégica pela Proteste e background em consultoria de Máquina de Vendas.',
    foto: '/images/mentores/viviane-machado.webp',
  },
  {
    nome: 'Adriana Gomes',
    cargo: 'Liderança e governança',
    bio: 'Especialista em desenvolvimento de lideranças, governança corporativa, diversidade e inclusão.',
    foto: '/images/mentores/adriana-gomes.webp',
  },
  {
    nome: 'Gustavo Malavota',
    cargo: 'Vendas e treinamento',
    bio: 'Capacitou +180 mil vendedores e líderes em 15 anos. Fundador da Mola Educação; autor de "52 Semanas em Ações de Vendas".',
    foto: '/images/mentores/gustavo-malavota.webp',
  },
  {
    nome: 'Thiago Bezerra',
    cargo: 'Head Comercial e de Serviços',
    bio: '15 anos na área comercial, da operação à liderança; responde por crescimento de receita e execução estratégica.',
    foto: '/images/mentores/thiago-bezerra.webp',
  },
  {
    nome: 'Luiz Ambrósio',
    cargo: 'Fundador e COO da Vinci Society',
    bio: 'Growth e Vendas; ex-Growth Lead no G4 Educação, Liv Up e Raccoon.',
    foto: '/images/mentores/luiz-ambrosio.webp',
  },
]

const STATS: Stat[] = [
  { valor: '+500 mil', label: 'profissionais formados' },
  { valor: '+800', label: 'empresas atendidas' },
  { valor: '+10 anos', label: 'de ecossistema comercial' },
]

// TODO(depoimentos): substituir por depoimentos reais com nome, cargo, empresa e
// número de resultado (Pendência #3 do brief V1.1). Não inventar nomes/empresas.
const DEPOIMENTOS: Depoimento[] = [
  {
    quote:
      'Saímos de uma operação no improviso para uma máquina de vendas previsível: hoje a receita não depende mais da minha agenda.',
    nome: 'A confirmar',
    cargo: 'Sócio',
    empresa: 'Imersão Sales Strategy',
    resultado: 'Resultado a confirmar',
  },
  {
    quote:
      'A imersão mudou como eu lidero o comercial: rotina de gestão, indicadores e um time que executa com método.',
    nome: 'A confirmar',
    cargo: 'Diretor Comercial',
    empresa: 'Imersão Sales Leadership',
    resultado: 'Resultado a confirmar',
  },
  {
    quote:
      'Mentores na mesa com a gente, discutindo o caso real da minha empresa. Saí com um plano de 90 dias para executar.',
    nome: 'A confirmar',
    cargo: 'CEO',
    empresa: 'Comunidade ELITE',
    resultado: 'Resultado a confirmar',
  },
]

const FAQ_HOME: Faq[] = [
  {
    pergunta: 'O que é o Sales Club?',
    resposta:
      'O Sales Club é o maior ecossistema de vendas do Brasil: reúne imersões presenciais, serviços de consultoria, uma comunidade de empresários (ELITE), conselho consultivo (Sales Advisory) e tecnologia (Sales AI) para dar previsibilidade e escala à área comercial.',
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
  { src: '/images/sales-village/auditorio-led-frontal.jpg', alt: 'Auditório do Sales Village com painel de LED gigante exibindo a marca Sales Village' },
  { src: '/images/sales-village/auditorio-led-lateral.jpg', alt: 'Vista lateral do auditório do Sales Village montado para evento corporativo' },
  { src: '/images/sales-village/auditorio-experience.jpg', alt: 'Auditório do Sales Village montado para o Sales Club Experience, com telão de LED' },
  { src: '/images/sales-village/palestra-plateia.jpg', alt: 'Palestra para empresários no auditório do Sales Village, com plateia' },
  { src: '/images/sales-village/plateia-teloes.jpg', alt: 'Plateia acompanhando apresentação nos telões de LED do Sales Village' },
  { src: '/images/sales-village/lounge-vista.jpg', alt: 'Lounge do Sales Village com vista panorâmica de São Paulo' },
  { src: '/images/sales-village/lounge-tv.jpg', alt: 'Lounge do Sales Village com smart TV e vista para o parque' },
  { src: '/images/sales-village/sala-reuniao.jpg', alt: 'Sala de reunião do Sales Village com mesa redonda e vista para a cidade' },
  { src: '/images/sales-village/sala-executiva.jpg', alt: 'Sala de reunião executiva do Sales Village com vista panorâmica' },
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
