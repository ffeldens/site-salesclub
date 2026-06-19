import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { getImersoes } from '@/content/imersoes'
import { getServicos } from '@/content/servicos'
import { getCorporateOfertas } from '@/content/corporate'
import { getCursos } from '@/content/universidade'

/**
 * sitemap.xml. Rotas estáticas + detalhes de imersões/serviços/corporate.
 * Posts e materiais entram a partir do CMS na Fase 4/5.
 */
export default function sitemap(): MetadataRoute.Sitemap {
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
    '/sobre',
    '/cases',
    '/contato',
    '/politica-de-privacidade',
  ]

  const dynamicRoutes = [
    ...getImersoes().map((i) => `/imersoes/${i.slug}`),
    ...getServicos().map((s) => `/servicos/${s.slug}`),
    ...getCorporateOfertas().map((o) => `/corporate/${o.slug}`),
    ...getCursos().map((c) => `/universidade/${c.slug}`),
  ]

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}
