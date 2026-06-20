/**
 * Estrutura do ecossistema Sales Club para a Home: reforça o posicionamento de
 * "ecossistema de crescimento comercial" (não apenas treinamentos) e facilita a
 * navegação por perfil de público (feedback Lucas Barreira).
 */

export type EcossistemaPilar = {
  titulo: string
  descricao: string
  itens: { label: string; href: string; externo?: boolean }[]
}

export const ecossistemaPilares: EcossistemaPilar[] = [
  {
    titulo: 'Aprender',
    descricao: 'Imersões presenciais, formação contínua e encontros pelo país.',
    itens: [
      { label: 'Imersões (Strategy, Leadership, AI)', href: '/imersoes' },
      { label: 'Universidade · Sales Pro', href: '/universidade/sales-pro' },
      { label: 'Sales Club pelo Brasil', href: '/sales-club-pelo-brasil' },
    ],
  },
  {
    titulo: 'Implementar',
    descricao: 'Consultoria que estrutura a operação comercial com você.',
    itens: [
      { label: 'Máquina de Vendas', href: '/servicos/maquina-de-vendas' },
      { label: 'Diagnóstico Comercial (grátis)', href: '/servicos/diagnostico-comercial' },
      { label: 'Corporate / Enterprise', href: '/corporate' },
    ],
  },
  {
    titulo: 'Pertencer',
    descricao: 'Comunidade e conselho para crescer entre pares.',
    itens: [
      { label: 'ELITE — comunidade de empresários', href: '/elite' },
      { label: 'Sales Board — conselho de vendas', href: '/sales-board' },
    ],
  },
  {
    titulo: 'Tecnologia & Espaço',
    descricao: 'Ferramentas e sede própria que sustentam a previsibilidade.',
    itens: [
      { label: 'App de OKRs', href: '/produtos/okrs' },
      { label: 'Sales Village (eventos e podcast)', href: '/sales-village' },
    ],
  },
]

export type PerfilPublico = {
  perfil: string
  dor: string
  recomendados: { label: string; href: string }[]
}

export const perfis: PerfilPublico[] = [
  {
    perfil: 'Sócio / CEO',
    dor: 'Quero descentralizar as vendas e ter previsibilidade de receita.',
    recomendados: [
      { label: 'Sales Strategy', href: '/imersoes/sales-strategy' },
      { label: 'Comunidade ELITE', href: '/elite' },
    ],
  },
  {
    perfil: 'Diretor / Head comercial',
    dor: 'Preciso estruturar processo, gestão e uma máquina de vendas.',
    recomendados: [
      { label: 'Máquina de Vendas', href: '/servicos/maquina-de-vendas' },
      { label: 'Sales Leadership', href: '/imersoes/sales-leadership' },
    ],
  },
  {
    perfil: 'Gestor / Coordenador',
    dor: 'Quero rotina de gestão e consistência de resultados no time.',
    recomendados: [
      { label: 'Sales Leadership', href: '/imersoes/sales-leadership' },
      { label: 'App de OKRs', href: '/produtos/okrs' },
    ],
  },
  {
    perfil: 'Time de vendas',
    dor: 'Quero método e ritmo para vender com mais previsibilidade.',
    recomendados: [
      { label: 'Universidade · Sales Pro', href: '/universidade/sales-pro' },
      { label: 'Diagnóstico Comercial', href: '/servicos/diagnostico-comercial' },
    ],
  },
]

export function getEcossistemaPilares(): EcossistemaPilar[] {
  return ecossistemaPilares
}

export function getPerfis(): PerfilPublico[] {
  return perfis
}
