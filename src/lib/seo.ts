import type { Metadata } from 'next'
import { siteConfig } from './site'

/**
 * Helpers de SEO (CLAUDE.md §7). `buildMetadata` padroniza title/description/
 * canonical/OG/Twitter por rota; `organizationJsonLd` alimenta o E-E-A-T.
 */

type BuildMetadataArgs = {
  title?: string
  description?: string
  path?: string
  noindex?: boolean
}

export function buildMetadata({
  title,
  description,
  path = '/',
  noindex = false,
}: BuildMetadataArgs = {}): Metadata {
  const fullTitle = title ? `${title} · ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`
  const desc = description ?? siteConfig.description
  const url = new URL(path, siteConfig.url).toString()

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      url,
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
    },
  }
}

/** JSON-LD Organization — incluído no layout raiz. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    slogan: siteConfig.tagline,
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin].filter(Boolean),
  }
}
