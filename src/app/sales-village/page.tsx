import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd } from '@/components/JsonLd'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import Image from 'next/image'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Beneficios } from '@/components/blocks/Beneficios'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { FormLead } from '@/components/blocks/FormLead'
import { getSalesVillageFotos } from '@/lib/content'

export const metadata: Metadata = buildMetadata({
  title: 'Sales Village — espaço para eventos e podcast em São Paulo',
  description:
    'O Sales Village é a sede do Sales Club em São Paulo, disponível para locação de eventos corporativos e gravação de podcast, com serviço completo para 10 a 150 pessoas.',
  path: '/sales-village',
})

export default function SalesVillagePage() {
  return (
    <PageShell whatsappMessage="Olá! Quero orçar um evento no Sales Village.">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'EventVenue',
          name: 'Sales Village',
          description:
            'Sede do Sales Club em São Paulo, disponível para locação de eventos corporativos e gravação de podcast (10 a 150 pessoas).',
          url: `${siteConfig.url}/sales-village`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'R. Verbo Divino, 2001, 17º andar, Torre A',
            addressLocality: 'São Paulo',
            addressRegion: 'SP',
            postalCode: '04719-002',
            addressCountry: 'BR',
          },
          maximumAttendeeCapacity: 150,
        }}
      />

      <HeroInstitucional
        eyebrow="Espaço"
        title="Sales Village: a sede do Sales Club, também para o seu evento"
        subtitle="Mais que a nossa casa em São Paulo — um espaço completo para locação de eventos corporativos e gravação de podcast, de 10 a 150 pessoas, com serviço ponta a ponta."
        primaryCta={{ label: 'Reservar / Orçar evento', href: '#cta' }}
      />

      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>
            O Sales Village é a sede do Sales Club em São Paulo (R. Verbo Divino, 2001) e também um espaço
            de locação para eventos corporativos e gravação de podcast, com serviço completo para 10 a
            150 pessoas — auditório, estúdio, lounge e salas de mentoria.
          </AnswerBlock>
        </div>
      </Section>

      <Section tone="card">
        <SectionHeading eyebrow="O espaço" title="Estrutura completa" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getSalesVillageFotos().map((foto) => (
            <div
              key={foto.src}
              className="relative aspect-[4/3] overflow-hidden rounded-card border border-subtle"
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </Section>

      <Beneficios
        eyebrow="Para o seu evento"
        title="Formatos de uso"
        items={[
          { titulo: 'Eventos corporativos', descricao: 'Convenções, kickoffs, treinamentos e workshops.' },
          { titulo: 'Gravação de podcast', descricao: 'Estúdio preparado para áudio e vídeo.' },
          { titulo: 'Capacidade flexível', descricao: 'De 10 a 150 pessoas, conforme o formato.' },
          { titulo: 'Serviço completo', descricao: 'Produção, catering e suporte ponta a ponta.' },
        ]}
      />

      <Section id="cta">
        <SectionHeading
          eyebrow="Reserva"
          title="Reservar / Orçar evento"
          description="Conte a data, o número de pessoas e o tipo de evento. Retornamos com uma proposta."
          align="center"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead
            source="sales-village"
            produto="Sales Village"
            title=""
            ctaLabel="Solicitar orçamento"
            comercial={false}
            extras={[
              { name: 'data_evento', label: 'Data desejada', type: 'date' },
              { name: 'participantes', label: 'Nº de participantes', type: 'select', options: ['10–30', '31–60', '61–100', '101–150'] },
              { name: 'tipo_evento', label: 'Tipo de evento', type: 'select', full: true, options: ['Convenção / Kickoff', 'Treinamento / Workshop', 'Palestra', 'Gravação de podcast', 'Outro'] },
            ]}
            mensagem={{
              label: 'Detalhes do evento',
              placeholder: 'Conte mais sobre o formato, horário e o que você precisa.',
            }}
          />
        </div>
      </Section>
    </PageShell>
  )
}
