/**
 * Configuração central do site: navegação (mega-menu "Soluções"), dados da
 * organização (E-E-A-T / JSON-LD) e contatos. Fonte única de verdade para
 * Header, Footer e metadata. Ver CLAUDE.md §4.
 */

export const siteConfig = {
  name: 'Sales Club',
  tagline: 'O maior ecossistema de vendas do Brasil',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://salesclub.com.br',
  description:
    'Imersões, serviços, comunidade e tecnologia para dar previsibilidade e escala à sua área comercial. O maior ecossistema de vendas do Brasil.',
  // E-E-A-T — visíveis no Footer e no JSON-LD Organization
  legalName: 'Sales Club',
  cnpj: 'CNPJ a confirmar',
  address: 'Sales Village — São Paulo, SP',
  whatsapp: {
    // TODO: confirmar número oficial
    number: '5511999999999',
    defaultMessage: 'Olá! Vim pelo site do Sales Club e quero falar com um especialista.',
  },
  social: {
    instagram: 'https://instagram.com/salesclub_oficial',
    linkedin: 'https://linkedin.com/company/salesclub-oficial',
    youtube: '',
  },
} as const

export type NavItem = {
  label: string
  href: string
  description?: string
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
]

/** Itens de topo do header (além do mega-menu). */
export const primaryNav: NavItem[] = [
  { label: 'Cases', href: '/cases' },
  { label: 'Conteúdo', href: '/conteudo' },
  { label: 'Sobre', href: '/sobre' },
]
