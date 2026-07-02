/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // SVGs próprios da marca (logos em /public/brand). Conteúdo confiável.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // CDN do Sanity (quando o CMS for plugado na Fase 4)
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Thumbnails de vídeo Vimeo
      { protocol: 'https', hostname: 'i.vimeocdn.com' },
      // Thumbnails de vídeo do YouTube (depoimentos do Sales Strategy)
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  // Headers de segurança (RNF §11 do PRD)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
  // Redirects 301 das URLs antigas (Fase 5 — placeholder; preencher na migração).
  // Ver docs/PRD.md §4 e CLAUDE.md §4 "Migração".
  async redirects() {
    return [
      // Canônico: www → apex (salesclub.com.br). Evita conteúdo duplicado.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.salesclub.com.br' }],
        destination: 'https://salesclub.com.br/:path*',
        permanent: true,
      },
      // Corporate consolidado em página única com âncoras (P2.5)
      { source: '/corporate/capacitacoes', destination: '/corporate#capacitacoes', permanent: true },
      { source: '/corporate/palestras', destination: '/corporate#palestras', permanent: true },
      { source: '/corporate/convencoes', destination: '/corporate#convencoes', permanent: true },
      { source: '/corporate/projetos-especiais', destination: '/corporate#projetos-especiais', permanent: true },
      { source: '/corporate/mentoria', destination: '/corporate#mentoria', permanent: true },
      // Rebrand Sales Board → Sales Advisory
      { source: '/sales-board', destination: '/sales-advisory', permanent: true },
      // 301 das URLs antigas (WordPress): imersões presenciais → /imersoes/*
      { source: '/imersao-presencial/:slug*', destination: '/imersoes/:slug*', permanent: true },
      // Unificação Universidade + Sales Pro (Sales Pro é um programa da Universidade)
      { source: '/universidade/sales-pro', destination: '/universidade#sales-pro', permanent: true },
      // TODO(Fase 5): demais URLs antigas do WordPress conforme a lista do Felipe.
    ]
  },
}

export default nextConfig
