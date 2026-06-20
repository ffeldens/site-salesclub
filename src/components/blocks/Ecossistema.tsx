import Link from 'next/link'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { getEcossistemaPilares } from '@/content/ecossistema'

/**
 * Mostra a amplitude do ecossistema (Aprender / Implementar / Pertencer /
 * Tecnologia & Espaço) — reforça "ecossistema de crescimento comercial".
 */
export function Ecossistema() {
  const pilares = getEcossistemaPilares()
  return (
    <Section>
      <SectionHeading
        eyebrow="Ecossistema"
        title="Um ecossistema completo de crescimento comercial"
        description="Mais que treinamentos: aprender, implementar, pertencer e sustentar — tudo em um só lugar para levar a sua empresa do improviso à previsibilidade."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pilares.map((pilar) => (
          <Card key={pilar.titulo} className="flex flex-col">
            <h3 className="font-display text-heading text-paper-pure">{pilar.titulo}</h3>
            <p className="mt-2 text-sm text-paper/65">{pilar.descricao}</p>
            <ul className="mt-4 space-y-2 border-t border-subtle pt-4">
              {pilar.itens.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-start gap-2 text-sm text-paper/85 hover:text-brand-vivid"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
