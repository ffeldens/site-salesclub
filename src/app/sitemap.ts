import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { getImersoes } from '@/content/imersoes'
import { getServicos } from '@/content/servicos'
import { getCursos } from '@/content/universidade'
import { getPosts } from '@/content/conteudo'
import { getCampanhas } from '@/content/campanhas'

/**
 * sitemap.xml. Rotas estáticas + detalhes de imersões/serviços/corporate.
 * Posts e materiais entram a partir do CMS na Fase 4/5.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/imersoes',
    '/servicos',
    '/corporate',
    '/elite',
    '/sales-board',
    '/produtos/okrs',
    '/sales-village',
    '/sales-club-pelo-brasil',
    '/universidade',
    '/metodo',
    '/podcast',
    '/conteudo',
    '/sobre',
    '/cases',
    '/contato',
    '/politica-de-privacidade',
  ]

  const dynamicRoutes = [
    ...getImersoes().map((i) => `/imersoes/${i.slug}`),
    ...getServicos().map((s) => `/servicos/${s.slug}`),
    ...getCursos().map((c) => `/universidade/${c.slug}`),
    ...(await getPosts()).map((p) => `/conteudo/${p.slug}`),
    // LPs de campanha indexáveis (mídia paga costuma ser noindex)
    ...getCampanhas().filter((c) => !c.noindex).map((c) => `/lp/${c.slug}`),
  ]

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}
