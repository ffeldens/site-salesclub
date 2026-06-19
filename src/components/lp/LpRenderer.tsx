import { HeroInstitucional, type HeroInstitucionalProps } from '@/components/blocks/HeroInstitucional'
import { LogosProvaSocial, type LogosProvaSocialProps } from '@/components/blocks/LogosProvaSocial'
import { Stats, type StatsProps } from '@/components/blocks/Stats'
import { Beneficios, type BeneficiosProps } from '@/components/blocks/Beneficios'
import { Depoimentos, type DepoimentosProps } from '@/components/blocks/Depoimentos'
import { FAQ, type FAQProps } from '@/components/blocks/FAQ'
import { CTASection, type CTASectionProps } from '@/components/blocks/CTASection'
import { FormLead } from '@/components/blocks/FormLead'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { Section, SectionHeading } from '@/components/ui/Section'
import type { LeadSource } from '@/lib/lead-schema'

/**
 * Motor de Landing Pages por blocos (CLAUDE.md §7). Uma campanha é uma lista
 * ordenada de blocos; este renderer mapeia cada bloco ao componente da
 * biblioteca (§5). É a mesma estrutura que o Sanity vai alimentar na Fase 4.
 */

export type LpBloco =
  | { tipo: 'hero'; dados: HeroInstitucionalProps }
  | { tipo: 'answer'; dados: { texto: string } }
  | { tipo: 'logos'; dados: LogosProvaSocialProps }
  | { tipo: 'stats'; dados: StatsProps }
  | { tipo: 'beneficios'; dados: BeneficiosProps }
  | { tipo: 'depoimentos'; dados: DepoimentosProps }
  | { tipo: 'faq'; dados: FAQProps }
  | { tipo: 'richtext'; dados: { eyebrow?: string; titulo?: string; paragrafos: string[] } }
  | { tipo: 'cta'; dados: CTASectionProps }
  | {
      tipo: 'form'
      dados: {
        source: LeadSource
        produto?: string
        title?: string
        description?: string
        ctaLabel?: string
        rich?: boolean
        ctaVariant?: 'primary' | 'gold'
        eyebrow?: string
        sectionTitle?: string
      }
    }

export function LpRenderer({ blocos }: { blocos: LpBloco[] }) {
  return (
    <>
      {blocos.map((bloco, i) => {
        switch (bloco.tipo) {
          case 'hero':
            return <HeroInstitucional key={i} {...bloco.dados} />
          case 'answer':
            return (
              <Section key={i}>
                <div className="max-w-3xl">
                  <AnswerBlock>{bloco.dados.texto}</AnswerBlock>
                </div>
              </Section>
            )
          case 'logos':
            return <LogosProvaSocial key={i} {...bloco.dados} />
          case 'stats':
            return <Stats key={i} {...bloco.dados} />
          case 'beneficios':
            return <Beneficios key={i} {...bloco.dados} />
          case 'depoimentos':
            return <Depoimentos key={i} {...bloco.dados} />
          case 'faq':
            return <FAQ key={i} {...bloco.dados} />
          case 'richtext':
            return (
              <Section key={i}>
                <div className="max-w-3xl">
                  {(bloco.dados.eyebrow || bloco.dados.titulo) && (
                    <SectionHeading eyebrow={bloco.dados.eyebrow} title={bloco.dados.titulo ?? ''} />
                  )}
                  <div className="prose-sc space-y-4">
                    {bloco.dados.paragrafos.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              </Section>
            )
          case 'cta':
            return <CTASection key={i} {...bloco.dados} />
          case 'form':
            return (
              <Section key={i} id="form" tone="card">
                <SectionHeading
                  eyebrow={bloco.dados.eyebrow}
                  title={bloco.dados.sectionTitle ?? 'Garanta o seu acesso'}
                  align="center"
                />
                <div className="mx-auto max-w-2xl">
                  <FormLead
                    source={bloco.dados.source}
                    produto={bloco.dados.produto}
                    title={bloco.dados.title ?? ''}
                    description={bloco.dados.description}
                    ctaLabel={bloco.dados.ctaLabel}
                    rich={bloco.dados.rich ?? false}
                    ctaVariant={bloco.dados.ctaVariant}
                  />
                </div>
              </Section>
            )
          default:
            return null
        }
      })}
    </>
  )
}
