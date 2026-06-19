import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'

/**
 * robots.txt — LIBERA explicitamente os crawlers de IA (GEO §8B.1).
 * Bloqueia apenas rotas internas (/api, /styleguide).
 */
export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'anthropic-ai',
    'PerplexityBot',
    'Google-Extended',
    'Bingbot',
    'CCBot',
    'Amazonbot',
  ]

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/studio', '/styleguide'] },
      ...aiBots.map((bot) => ({ userAgent: bot, allow: '/', disallow: ['/api/', '/studio'] })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
