import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { getImersoes } from '@/content/imersoes'
import { getServicos } from '@/content/servicos'
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
    '/sales-advisory',
    '/sales-village',
    '/sales-club-pelo-brasil',
    '/destino-futuro',
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
    // LPs de campanha indexáveis (mídia paga costuma ser noindex)
    ...getCampanhas().filter((c) => !c.noindex).map((c) => `/lp/${c.slug}`),
  ]

  // Artigos entram com lastmod confiável (dataAtualizacao do conteúdo).
  const postRoutes = (await getPosts()).map((p) => ({
    url: `${siteConfig.url}/conteudo/${p.slug}`,
    lastModified: p.dataAtualizacao,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...[...staticRoutes, ...dynamicRoutes].map((route) => ({
      url: `${siteConfig.url}${route}`,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...postRoutes,
  ]
}
