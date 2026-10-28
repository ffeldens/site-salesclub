/**
 * Método DREG (Desenhar · Recrutar · Educar · Gerenciar) — método proprietário do
 * Sales Club. DREG é a TEORIA; a Máquina de Vendas é o MODELO PRÁTICO que implementa
 * e evolui o método na operação do cliente.
 */

export type DregEtapa = {
  letra: string
  nome: 'Desenhar' | 'Recrutar' | 'Educar' | 'Gerenciar'
  titulo: string
  descricao: string
}

export const dregEtapas: DregEtapa[] = [
  {
    letra: 'D',
    nome: 'Desenhar',
    titulo: 'Desenhar a arquitetura comercial',
    descricao: 'ICP, processo, jornada do cliente e tecnologia — a planta antes do primeiro tijolo.',
  },
  {
    letra: 'R',
    nome: 'Recrutar',
    titulo: 'Recrutar as pessoas certas',
    descricao: 'Perfis com fit técnico e cultural para essa arquitetura, nas funções certas.',
  },
  {
    letra: 'E',
    nome: 'Educar',
    titulo: 'Educar de forma contínua',
    descricao: 'Onboarding e treinamento que mudam comportamento — não palestra motivacional.',
  },
  {
    letra: 'G',
    nome: 'Gerenciar',
    titulo: 'Gerenciar para sustentar',
    descricao: 'Metas, indicadores, rituais e remuneração que sustentam a previsibilidade.',
  },
]

/** Mapa solução × etapa DREG (P2.3). Recrutar é operacionalizado pela Máquina de Vendas. */
export const dregMapa: { etapa: string; solucoes: { label: string; href: string }[] }[] = [
  {
    etapa: 'Desenhar',
    solucoes: [
      { label: 'Diagnóstico Comercial', href: '/servicos/diagnostico-comercial' },
      { label: 'Sales Strategy', href: '/imersoes/sales-strategy' },
      { label: 'Máquina de Vendas (desenho)', href: '/servicos/maquina-de-vendas' },
    ],
  },
  {
    etapa: 'Recrutar',
    solucoes: [{ label: 'Máquina de Vendas (montagem do time)', href: '/servicos/maquina-de-vendas' }],
  },
  {
    etapa: 'Educar',
    solucoes: [
      { label: 'Imersões (Strategy e Leadership)', href: '/imersoes' },
      { label: 'Universidade · Sales Pro', href: '/universidade#sales-pro' },
      { label: 'Corporate (capacitações, convenções, palestras)', href: '/corporate' },
      { label: 'Sales Club pelo Brasil', href: '/sales-club-pelo-brasil' },
    ],
  },
  {
    etapa: 'Gerenciar',
    solucoes: [
      { label: 'Sales Leadership', href: '/imersoes/sales-leadership' },
      { label: 'Máquina de Vendas (governança)', href: '/servicos/maquina-de-vendas' },
      { label: 'ELITE Advisor', href: '/sales-advisory' },
      { label: 'Mentoria (Corporate)', href: '/corporate#mentoria' },
    ],
  },
]

/**
 * Referências editoriais do método. A Máquina de Vendas aqui é a METODOLOGIA (livro em
 * breve), não o serviço; o serviço vive em /servicos/maquina-de-vendas.
 */
export const referenciasMetodo = {
  metodologia: {
    nome: 'Máquina de Vendas',
    rotulo: 'metodologia Máquina de Vendas (livro em breve)',
    href: '/servicos/maquina-de-vendas',
  },
  livro: {
    titulo: 'Queime o Plano',
    autor: 'Felipe Feldens',
    capa: '/images/livro/queime-o-plano.webp',
    descricao: 'o modelo de gestão contínua de estratégia, resultados e cultura',
    // TODO(livro): link de compra/landing do Queime o Plano (quando disponível).
    link: null as string | null,
  },
}
