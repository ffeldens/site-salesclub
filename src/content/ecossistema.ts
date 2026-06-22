/**
 * Estrutura do ecossistema Sales Club para a Home: reforça o posicionamento de
 * "ecossistema de crescimento comercial" (não apenas treinamentos) e o
 * recomendador por dor/etapa DREG (feedback Lucas + brief V1.1 P3.2).
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

/** Recomendador por dor → etapa DREG → trilha (P3.2). Ponte para o diagnóstico. */
export type DorRecomendacao = {
  dor: string
  etapa: 'Desenhar' | 'Recrutar' | 'Educar' | 'Gerenciar'
  recomendados: { label: string; href: string }[]
}

export const recomendadorDor: DorRecomendacao[] = [
  {
    dor: 'O crescimento ainda passa pela minha mesa.',
    etapa: 'Desenhar',
    recomendados: [
      { label: 'Sales Strategy', href: '/imersoes/sales-strategy' },
      { label: 'Máquina de Vendas', href: '/servicos/maquina-de-vendas' },
    ],
  },
  {
    dor: 'Não tenho as pessoas certas nas funções certas.',
    etapa: 'Recrutar',
    recomendados: [{ label: 'Máquina de Vendas', href: '/servicos/maquina-de-vendas' }],
  },
  {
    dor: 'Cada vendedor vende de um jeito; o bom resultado não se repete.',
    etapa: 'Educar',
    recomendados: [
      { label: 'Universidade · Sales Pro', href: '/universidade/sales-pro' },
      { label: 'Sales Leadership', href: '/imersoes/sales-leadership' },
    ],
  },
  {
    dor: 'Bato meta num mês, frustro no outro — e decido no achismo.',
    etapa: 'Gerenciar',
    recomendados: [
      { label: 'Sales Leadership', href: '/imersoes/sales-leadership' },
      { label: 'App de OKRs', href: '/produtos/okrs' },
    ],
  },
]

export function getEcossistemaPilares(): EcossistemaPilar[] {
  return ecossistemaPilares
}

export function getRecomendadorDor(): DorRecomendacao[] {
  return recomendadorDor
}
