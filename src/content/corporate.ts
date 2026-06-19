/**
 * Conteúdo do hub Corporate (enterprise / grande conta) e suas 5 páginas-filhas.
 * NÃO existe no site público atual — texto derivado do PRD (§10), provisório.
 * TODO(conteúdo): validar descrições, formatos e prova social enterprise
 * (Bayer, Axia, Unipar, Eletrobras, Pearson, Cyrela...) com o cliente.
 */

export type CorporateOferta = {
  slug: string
  titulo: string
  headline: string
  resumo: string
  descricao: string
  itens: string[]
}

export const corporateOfertas: CorporateOferta[] = [
  {
    slug: 'capacitacoes',
    titulo: 'Capacitações',
    headline: 'Educação corporativa e treinamentos in company',
    resumo:
      'As capacitações corporativas do Sales Club levam a metodologia comercial validada em +800 empresas para dentro da sua organização, com trilhas in company desenhadas para o seu contexto, escala e indicadores.',
    descricao:
      'Programas de educação corporativa e treinamentos in company para times comerciais de grande porte, com conteúdo customizado, trilhas por função e mensuração de resultados.',
    itens: [
      'Trilhas por função (pré-vendas, vendas, sucesso do cliente, liderança)',
      'Conteúdo customizado para o seu segmento e ciclo de vendas',
      'Formatos presencial, online e híbrido',
      'Mensuração de aprendizado e impacto em indicadores',
    ],
  },
  {
    slug: 'palestras',
    titulo: 'Palestras',
    headline: 'Palestras e keynotes de vendas e liderança',
    resumo:
      'Palestras e keynotes com os mentores do Sales Club para convenções, kickoffs e eventos corporativos — sobre máquina de vendas, previsibilidade, liderança comercial e IA aplicada.',
    descricao:
      'Keynotes inspiracionais e técnicas para eventos internos, com curadoria de tema e mentor de acordo com o objetivo do encontro.',
    itens: ['Temas de vendas, liderança, previsibilidade e IA', 'Mentores de marca', 'Formato presencial ou online'],
  },
  {
    slug: 'convencoes',
    titulo: 'Convenções',
    headline: 'Convenções de vendas e eventos corporativos',
    resumo:
      'O Sales Club concebe e executa convenções de vendas e eventos corporativos completos — da curadoria de conteúdo à produção — para engajar e capacitar times comerciais em escala.',
    descricao:
      'Concepção e produção de convenções de vendas, kickoffs e eventos corporativos, integrando conteúdo, experiência e a estrutura do Sales Village.',
    itens: ['Curadoria de conteúdo e palestrantes', 'Produção e experiência', 'Possibilidade de uso do Sales Village'],
  },
  {
    slug: 'projetos-especiais',
    titulo: 'Projetos Especiais',
    headline: 'Projetos comerciais sob medida',
    resumo:
      'Para desafios comerciais únicos, o Sales Club desenha projetos especiais sob medida — combinando consultoria, capacitação, tecnologia e mentoria conforme a necessidade da grande conta.',
    descricao:
      'Projetos comerciais customizados para grandes contas, combinando as capacidades do ecossistema conforme o objetivo de negócio.',
    itens: ['Escopo desenhado caso a caso', 'Combinação de consultoria, capacitação e tecnologia', 'Gestão de projeto dedicada'],
  },
  {
    slug: 'mentoria',
    titulo: 'Mentoria',
    headline: 'Mentoria executiva e de liderança comercial',
    resumo:
      'A mentoria executiva do Sales Club acompanha líderes e diretores comerciais de grandes contas em ciclos estruturados, com os mentores de marca, para acelerar decisões e desenvolvimento.',
    descricao:
      'Mentoria executiva e de liderança comercial para C-levels e diretores, em ciclos estruturados e acompanhamento individual.',
    itens: ['Acompanhamento individual ou em grupo', 'Mentores de marca', 'Ciclos estruturados com objetivos claros'],
  },
]

export function getCorporateOfertas(): CorporateOferta[] {
  return corporateOfertas
}

export function getCorporateOferta(slug: string): CorporateOferta | undefined {
  return corporateOfertas.find((o) => o.slug === slug)
}
