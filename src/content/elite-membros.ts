import type { VideoDepoimento } from './depoimentos-video'

/**
 * Resultados e depoimentos de membros da comunidade ELITE.
 * - `resultadosElite`: métricas reais informadas pelos membros (cards).
 * - `depoimentosVideoElite`: depoimentos em vídeo no YouTube (Shorts) com frase
 *   extraída da legenda (revisada). Vídeos hospedados no Google Drive ficam de
 *   fora até serem publicados no YouTube.
 */

export type MembroResultado = {
  empresa: string
  segmento?: string
  destaque: string
  contexto: string
}

export const resultadosElite: MembroResultado[] = [
  { empresa: 'Soldiers Nutrition', segmento: 'E-commerce · Suplementos', destaque: '+1.080%', contexto: 'no 1º ano (e +100% no 2º) de ELITE' },
  { empresa: 'Mave', segmento: 'Comércio', destaque: '+500%', contexto: 'nos últimos 2 anos' },
  { empresa: 'WUP', segmento: 'Consultoria', destaque: '+300%', contexto: 'só com a Imersão 360' },
  { empresa: 'Umentor', segmento: 'Software para RH', destaque: '+142%', contexto: 'de crescimento desde a entrada no ELITE' },
  { empresa: 'Nova ISP', destaque: '130%', contexto: 'da meta batida em maio/24 — e crescendo mês a mês' },
  { empresa: 'Smart Air', segmento: 'Comércio e serviços', destaque: '+120%', contexto: 'vs. o mesmo período do ano anterior' },
  { empresa: 'Panflight', destaque: '119%', contexto: 'da meta batida em junho/24' },
  { empresa: 'Via Painéis', segmento: 'Comércio e serviços', destaque: '+80%', contexto: 'em 3 meses após a Imersão 360' },
]

export const depoimentosVideoElite: VideoDepoimento[] = [
  {
    empresa: 'Tax.co',
    segmento: 'Contabilidade',
    videoId: 'QWwEUIX6GFQ',
    quote:
      'Saímos de um platô de crescimento e passamos a acelerar ainda mais nos últimos 12 meses. No ELITE encontrei pessoas que conhecem o processo e me ajudaram a implementar a máquina de vendas.',
    pessoa: 'Lu Wulf, CEO',
  },
  {
    empresa: 'Action 360',
    segmento: 'Franquia · Academia',
    videoId: '0tKfcFGLfrA',
    quote:
      'Precisávamos crescer e gerar demanda. Hoje temos uma máquina de vendas com CRM estruturado e as métricas que sustentam a meta do time.',
  },
]

export function getResultadosElite(): MembroResultado[] {
  return resultadosElite
}

export function getDepoimentosVideoElite(): VideoDepoimento[] {
  return depoimentosVideoElite
}
