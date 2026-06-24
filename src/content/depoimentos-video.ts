/**
 * Depoimentos em vídeo de clientes que participaram do Sales Strategy
 * (playlist oficial no YouTube). `featured` marca os destaques usados na home
 * e na página da imersão; a galeria completa fica em /cases.
 */
export type VideoDepoimento = {
  empresa: string
  segmento: string
  videoId: string
  featured?: boolean
  /** Frase extraída do depoimento (legenda revisada). */
  quote?: string
  /** Atribuição da frase (cargo e/ou nome, quando informado no vídeo). */
  pessoa?: string
}

export const depoimentosVideo: VideoDepoimento[] = [
  {
    empresa: 'Estácio',
    segmento: 'Educação',
    videoId: 'c9gUSvERWfg',
    featured: true,
    quote:
      'Se eu pudesse definir o Sales Club em uma palavra, seria perfeito. Cada minuto aqui é precioso — e todo profissional de vendas, em qualquer segmento, tem a obrigação de participar.',
    pessoa: 'Coordenadora de vendas indiretas',
  },
  {
    empresa: 'Point Solar',
    segmento: 'Energia',
    videoId: 'Xtvd5y6NmZ0',
    featured: true,
    quote:
      'Foi a melhor coisa que fizemos. Trouxe uma mudança enorme no clima da empresa e no faturamento — impactou em pelo menos 300%.',
    pessoa: 'Marcos Tavares, diretor',
  },
  {
    empresa: 'Sankhya',
    segmento: 'Gestão de negócios',
    videoId: 'h1la-baNkxI',
    featured: true,
    quote:
      '90% você até já sabe — mas são os 10% restantes que fazem toda a diferença. Para nós, está sendo um divisor de águas.',
    pessoa: 'Antônio, diretor nacional de vendas',
  },
  {
    empresa: 'Sicredi',
    segmento: 'Financeiro',
    videoId: 'h21ghLu6U4E',
    featured: true,
    quote:
      'Paguei barato pelo conhecimento que adquiri. Saí com ideias fantásticas para executar já na segunda-feira.',
  },
  {
    empresa: 'Grupo Ric',
    segmento: 'Comunicação e mídia',
    videoId: 'IODXoM0TKGI',
    featured: true,
    quote:
      'Ficou claro que comercial e marketing andam juntos do começo ao fim. E o melhor: eles ensinam o que aplicaram na prática, não o que leram em livros.',
    pessoa: 'Laila, marketing',
  },
  {
    empresa: 'Monteo Investimentos',
    segmento: 'Financeiro',
    videoId: 'kdqo5zMUXnM',
    featured: true,
    quote:
      'Já estamos entre as cinco maiores do país no segmento. O conhecimento que faltava para chegar ao topo estava aqui.',
    pessoa: 'Sócio',
  },
  { empresa: 'Afine-se', segmento: 'Saúde e áreas médicas', videoId: 'aOM6zknr3w8' },
  { empresa: 'GS Select Car', segmento: 'Auto-center', videoId: 'Y1GlnGLsrLk' },
  { empresa: 'Xgen', segmento: 'Software', videoId: 'lX1LVE8oCfg' },
  { empresa: 'Introduz Tecnologia', segmento: 'Tecnologia', videoId: '6N8m8iF1HBI' },
  { empresa: 'Grupo V3', segmento: 'Imobiliária', videoId: '8c-712KpFPQ' },
  { empresa: 'Anjo Química', segmento: 'Química', videoId: '8Gu7dSRC9LA' },
  { empresa: 'Fass Advogados', segmento: 'Advocacia', videoId: 'A0EFSaO0oVE' },
  { empresa: 'Scardua Distribuidora', segmento: 'Distribuição', videoId: 'LwqqX4zwJg4' },
  { empresa: 'Rockset', segmento: 'Publicidade e propaganda', videoId: 'JVu-Xq2VkzE' },
  { empresa: 'Axcell Aceleradora', segmento: 'Consultoria', videoId: 'MAiL7sBqx4M' },
  { empresa: 'Grupo Capitão', segmento: 'Gastronomia', videoId: 'hy9paz6MIq0' },
  { empresa: 'Cusqueña Brasil', segmento: 'Alimentos e bebidas', videoId: 'ZcKLSH6FfaY' },
  { empresa: 'Grupo B2', segmento: 'Marketing', videoId: 'atrwx-CKqew' },
  { empresa: "Stanley's Hair", segmento: 'Beleza', videoId: 'NYHXkcH_V0o' },
  { empresa: 'Sonho dos Pet', segmento: 'Pet shop', videoId: 'SHPTZ8H6B3g' },
  { empresa: 'Grupo Ferro Norte', segmento: 'Indústria e distribuição', videoId: 'j4FYb7UHp2E' },
]

export function getVideoDepoimentos(): VideoDepoimento[] {
  return depoimentosVideo
}

export function getVideoDepoimentosFeatured(limit?: number): VideoDepoimento[] {
  const f = depoimentosVideo.filter((v) => v.featured)
  return typeof limit === 'number' ? f.slice(0, limit) : f
}
