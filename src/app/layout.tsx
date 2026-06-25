import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import { buildMetadata, organizationJsonLd } from '@/lib/seo'
import { OriginTracker } from '@/components/OriginTracker'
import { Analytics } from '@/components/Analytics'
import { GTM_ID, META_PIXEL_ID } from '@/lib/analytics'

const heebo = Heebo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heebo',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = buildMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={heebo.variable}>
      <body>
        {/* GTM + Meta Pixel (noscript) — devem vir logo após a abertura do body */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {META_PIXEL_ID && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              alt=""
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}

        {/* JSON-LD Organization (E-E-A-T / SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Analytics />
        <OriginTracker />
        {children}
      </body>
    </html>
  )
}
