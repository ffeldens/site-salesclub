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
}

export const depoimentosVideo: VideoDepoimento[] = [
  { empresa: 'Estácio', segmento: 'Educação', videoId: 'c9gUSvERWfg', featured: true },
  { empresa: 'Point Solar', segmento: 'Energia', videoId: 'Xtvd5y6NmZ0', featured: true },
  { empresa: 'Sankhya', segmento: 'Gestão de negócios', videoId: 'h1la-baNkxI', featured: true },
  { empresa: 'Sicredi', segmento: 'Financeiro', videoId: 'h21ghLu6U4E', featured: true },
  { empresa: 'Grupo Ric', segmento: 'Comunicação e mídia', videoId: 'IODXoM0TKGI', featured: true },
  { empresa: 'Monteo Investimentos', segmento: 'Financeiro', videoId: 'kdqo5zMUXnM', featured: true },
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
