/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // CDN do Sanity (quando o CMS for plugado na Fase 4)
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Thumbnails de vídeo Vimeo
      { protocol: 'https', hostname: 'i.vimeocdn.com' },
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
      // Exemplo (descomentar/expandir na Fase 5):
      // { source: '/imersao-presencial/sales-strategy', destination: '/imersoes/sales-strategy', permanent: true },
    ]
  },
}

export default nextConfig
