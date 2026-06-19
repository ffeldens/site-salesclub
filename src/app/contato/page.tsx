import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { Section, SectionHeading } from '@/components/ui/Section'
import { FormLead } from '@/components/blocks/FormLead'

export const metadata: Metadata = buildMetadata({
  title: 'Contato',
  description: 'Fale com um especialista do Sales Club e descubra o melhor caminho para a sua área comercial.',
  path: '/contato',
})

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main>
        <Section>
          <SectionHeading
            eyebrow="Contato"
            title="Fale com um especialista"
            description="Conte um pouco sobre a sua operação comercial. Um especialista do Sales Club vai retornar pelo canal de sua preferência."
            align="center"
          />
          <div className="mx-auto max-w-2xl">
            <FormLead source="contato" title="" ctaLabel="Quero falar com um especialista" />
          </div>
        </Section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
