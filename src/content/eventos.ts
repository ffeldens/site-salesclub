import type { Mentor } from '@/lib/content'

/**
 * Conteúdo do "Sales Club pelo Brasil" — encontro executivo de 1 dia,
 * realizado mensalmente em diferentes cidades. Migrado da LP atual
 * (sales-club-pelo-brasil.lovable.app). TODO(conteúdo): atualizar as edições
 * (cidades/datas) a cada mês e confirmar valores.
 */

export type Edicao = {
  cidade: string
  uf: string
  data: string
  local?: string
  status?: string
  /** Link de pagamento/checkout (ex.: Eduzz) — exibe botão de inscrição na edição. */
  inscricaoUrl?: string
}

export const salesClubPeloBrasil = {
  slug: 'sales-club-pelo-brasil',
  titulo: 'Sales Club pelo Brasil',
  headline:
    'Estratégia, governança e execução comercial para escalar resultados em todo o Brasil',
  subtitulo:
    'Um encontro executivo de 1 dia para fundadores e líderes que querem estruturar uma máquina de vendas capaz de crescer com consistência em diferentes regiões.',
  resumo:
    'O Sales Club pelo Brasil é um encontro executivo de 1 dia, realizado uma vez por mês em diferentes cidades do país. Em um dia intenso e prático, você diagnostica gargalos, aprende método de processo comercial e sai com um plano de execução para construir uma máquina de vendas previsível.',
  descricao:
    'O Sales Club pelo Brasil leva para diferentes regiões do país o que já funciona dentro das empresas que crescem com previsibilidade: estratégia, governança e execução comercial de alta qualidade. Não é sobre teoria — é sobre estrutura, método e execução aplicável. O Sales Club é o maior ecossistema de educação corporativa em vendas do Brasil.',
  formato: 'Presencial · 1 dia · executivo',
  pilares: [
    { titulo: 'Gargalos', descricao: 'Identifique e corrija o que trava sua receita e impede a escala.' },
    { titulo: 'Método', descricao: 'Aprenda processos para vender mais e melhor, com consistência.' },
    { titulo: 'Metrificação', descricao: 'Implemente governança, rituais e métricas que sustentam o crescimento.' },
  ],
  comoFunciona: [
    { numero: 1, titulo: 'Diagnóstico', descricao: 'Identificar os gargalos que travam a receita.' },
    { numero: 2, titulo: 'Método', descricao: 'Processos para vender mais e melhor.' },
    { numero: 3, titulo: 'Aplicação', descricao: 'Ferramentas para a operação real.' },
    { numero: 4, titulo: 'Metrificação', descricao: 'Medir performance com previsibilidade.' },
  ],
  mentores: [
    { nome: 'Tiago Ferla', cargo: 'Founder & Chairman', bio: 'CEO do Grupo Doca; mentor de mais de 5.000 empresas em escala. "Vendas não é talento — é arquitetura."' },
    { nome: 'Luiz Paulo Teixeira', cargo: 'CEO do Sales Club', bio: 'Especialista em estratégia e crescimento empresarial; liderou a expansão do Sales Club no Brasil.' },
    { nome: 'Felipe Feldens', cargo: 'COO do Sales Club', bio: 'Especialista em processos e escala operacional; arquiteto da metodologia de execução do Sales Club.' },
  ] satisfies Mentor[],
  beneficios: [
    { titulo: 'Clareza estratégica', descricao: 'Diagnóstico real da operação e do que trava o crescimento hoje.' },
    { titulo: 'Método aplicável', descricao: 'Frameworks de processo comercial prontos para usar na segunda-feira.' },
    { titulo: 'Governança comercial', descricao: 'Rituais, indicadores e cadência para tirar a operação do improviso.' },
    { titulo: 'Previsibilidade de receita', descricao: 'Forecast confiável e funil estruturado para sustentar decisões.' },
    { titulo: 'Time de alta performance', descricao: 'Modelo de gestão, metas e produtividade para escalar pessoas.' },
    { titulo: 'Plano de execução', descricao: 'Roadmap dos próximos 90 dias para destravar o próximo salto.' },
  ],
  paraQuem: [
    'Sócios e fundadores que precisam descentralizar vendas',
    'Diretores e líderes que querem estruturar processos',
    'Empresas com faturamento acima de R$ 5 milhões/ano',
    'Negócios que validaram mercado, mas enfrentam gargalos',
  ],
  naoEhParaVoce: [
    'Quem está começando do zero',
    'Quem busca apenas teoria',
    'Quem não vai aplicar',
  ],
  stats: [
    { valor: '+5.000', label: 'empresas impactadas' },
    { valor: 'NPS +95', label: 'de satisfação' },
    { valor: '+40%', label: 'crescimento médio de receita' },
    { valor: '+500', label: 'empresas com máquina estruturada' },
  ],
  // TODO(conteúdo): atualizar a agenda mensalmente.
  proximasEdicoes: [
    { cidade: 'Campinas', uf: 'SP', data: '14 de agosto', status: 'Inscrições abertas', inscricaoUrl: 'https://chk.eduzz.com/VWGN8RPV07' },
    { cidade: 'Itajaí', uf: 'SC', data: 'Setembro', status: 'Em breve' },
    { cidade: 'Luiz Eduardo Magalhães', uf: 'BA', data: 'Outubro', status: 'Em breve' },
  ] as Edicao[],
  ultimasEdicoes: [
    { cidade: 'Garibaldi', uf: 'RS', data: 'Junho', local: 'Mosteiro Hotel de Charme' },
    { cidade: 'Teresina', uf: 'PI', data: 'Maio' },
  ] as Edicao[],
  ctaLabel: 'Quero participar do encontro',
}

export function getSalesClubPeloBrasil() {
  return salesClubPeloBrasil
}
