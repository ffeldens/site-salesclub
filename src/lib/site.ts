/**
 * Configuração central do site: navegação (mega-menu "Soluções"), dados da
 * organização (E-E-A-T / JSON-LD) e contatos. Fonte única de verdade para
 * Header, Footer e metadata. Ver CLAUDE.md §4.
 */

export const siteConfig = {
  name: 'Sales Club',
  tagline: 'O maior ecossistema de vendas do Brasil',
  // MVP hospedado em subdomínio da MudAção; migra para salesclub.com.br no go-live.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sitesc.mudacao.com.br',
  description:
    'Imersões, serviços, comunidade e tecnologia para dar previsibilidade e escala à sua área comercial. O maior ecossistema de vendas do Brasil.',
  // E-E-A-T — visíveis no Footer e no JSON-LD Organization
  legalName: 'Sales Club',
  cnpj: '42.839.048/0001-38',
  address:
    'Sales Village — R. Verbo Divino, 2001, 17º andar, Torre A, Chácara Santo Antônio, São Paulo/SP, CEP 04719-002',
  whatsapp: {
    // TODO: confirmar número oficial
    number: '5511999999999',
    defaultMessage: 'Olá! Vim pelo site do Sales Club e quero falar com um especialista.',
  },
  social: {
    instagram: 'https://instagram.com/salesclub_oficial',
    linkedin: 'https://linkedin.com/company/salesclub-oficial',
    youtube: 'https://www.youtube.com/@salesclub_oficial',
    spotify: 'https://open.spotify.com/show/4NaJg4ebdAU9ofF58V6a3u',
  },
  // Vertical Telecom mantém domínio próprio — linkamos para fora.
  telecomUrl: 'https://salesclubtelecom.com.br',
} as const

export type SocialKey = 'instagram' | 'linkedin' | 'youtube' | 'spotify'

export type SocialLink = { key: SocialKey; label: string; href: string }

/** Redes sociais com URL preenchida, em ordem de exibição. */
export function getSocialLinks(): SocialLink[] {
  const order: { key: SocialKey; label: string }[] = [
    { key: 'instagram', label: 'Instagram' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'youtube', label: 'YouTube' },
    { key: 'spotify', label: 'Spotify' },
  ]
  return order
    .map(({ key, label }) => ({ key, label, href: String(siteConfig.social[key] ?? '') }))
    .filter((s) => s.href.length > 0)
}

export type NavItem = {
  label: string
  href: string
  description?: string
  /** Abre em nova aba (ex.: vertical Telecom, que mantém domínio próprio). */
  external?: boolean
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

/** Mega-menu "Soluções" agrupado por categoria (CLAUDE.md §4). */
export const solutionsMenu: NavGroup[] = [
  {
    label: 'Imersões',
    items: [
      { label: 'Sales Strategy', href: '/imersoes/sales-strategy', description: 'Estratégia comercial' },
      { label: 'Sales Leadership', href: '/imersoes/sales-leadership', description: 'Liderança de vendas' },
      { label: 'Sales AI', href: '/imersoes/sales-ai', description: 'IA aplicada a vendas' },
    ],
  },
  {
    label: 'Serviços',
    items: [
      { label: 'Máquina de Vendas', href: '/servicos/maquina-de-vendas', description: 'Squad de especialistas' },
      { label: 'Diagnóstico Comercial', href: '/servicos/diagnostico-comercial', description: 'Raio-x da operação' },
    ],
  },
  {
    label: 'Corporate',
    items: [
      { label: 'Capacitações', href: '/corporate/capacitacoes', description: 'Educação corporativa' },
      { label: 'Palestras', href: '/corporate/palestras' },
      { label: 'Convenções', href: '/corporate/convencoes' },
      { label: 'Projetos Especiais', href: '/corporate/projetos-especiais' },
      { label: 'Mentoria', href: '/corporate/mentoria' },
    ],
  },
  {
    label: 'Eventos & Educação',
    items: [
      { label: 'Sales Club pelo Brasil', href: '/sales-club-pelo-brasil', description: 'Encontros executivos de 1 dia pelo país' },
      { label: 'Universidade · Sales Pro', href: '/universidade/sales-pro', description: 'Formação online para times de vendas' },
    ],
  },
  {
    label: 'Comunidade & Conselho',
    items: [
      { label: 'ELITE', href: '/elite', description: 'Comunidade de empresários' },
      { label: 'Sales Board', href: '/sales-board', description: 'Conselho consultivo' },
    ],
  },
  {
    label: 'Espaço & Produtos',
    items: [
      { label: 'Sales Village', href: '/sales-village', description: 'Locação para eventos e podcast' },
      { label: 'App de OKRs', href: '/produtos/okrs', description: 'Gestão por OKRs' },
    ],
  },
  {
    label: 'Verticais',
    items: [
      {
        label: 'Sales Club Telecom',
        href: 'https://salesclubtelecom.com.br',
        description: 'Movimento para empresas de telecom',
        external: true,
      },
    ],
  },
]

/** Itens de topo do header (além do mega-menu). */
export const primaryNav: NavItem[] = [
  { label: 'Conteúdo', href: '/conteudo' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Cases', href: '/cases' },
  { label: 'Sobre', href: '/sobre' },
]
