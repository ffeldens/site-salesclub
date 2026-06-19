import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import { buildMetadata, organizationJsonLd } from '@/lib/seo'
import { OriginTracker } from '@/components/OriginTracker'

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
        {/* JSON-LD Organization (E-E-A-T / SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <OriginTracker />
        {children}
      </body>
    </html>
  )
}
