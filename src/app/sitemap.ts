import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

/**
 * sitemap.xml. Rotas estáticas conhecidas; rotas dinâmicas (imersões, posts,
 * materiais) serão somadas a partir do CMS na Fase 4/5.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/imersoes',
    '/servicos',
    '/corporate',
    '/elite',
    '/sales-board',
    '/produtos/okrs',
    '/sales-village',
    '/sobre',
    '/cases',
    '/conteudo',
    '/materiais',
    '/contato',
    '/politica-de-privacidade',
  ]

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))
}
