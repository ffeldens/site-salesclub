'use client'

import { useState } from 'react'
import { Section, SectionHeading } from '@/components/ui/Section'
import { ChevronDownIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import type { Faq } from '@/lib/content'

export type FAQProps = {
  eyebrow?: string
  title?: string
  items: Faq[]
}

/**
 * Accordion de FAQ. Emite JSON-LD FAQPage (SEO/GEO). As perguntas devem ser
 * alinhadas a prompts reais (CLAUDE.md §8). Respostas ficam no HTML inicial.
 */
export function FAQ({ eyebrow = 'Dúvidas', title = 'Perguntas frequentes', items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: item.resposta },
    })),
  }

  return (
    <Section id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mx-auto max-w-3xl divide-y divide-subtle border-y border-subtle">
        {items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i}>
              <button
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-medium text-paper">{item.pergunta}</span>
                <ChevronDownIcon
                  className={cn('h-5 w-5 shrink-0 text-brand-vivid transition-transform', isOpen && 'rotate-180')}
                />
              </button>
              {/* resposta sempre no DOM (SEO/GEO), apenas oculta visualmente */}
              <div className={cn('overflow-hidden text-paper/70 transition-all', isOpen ? 'max-h-96 pb-5' : 'max-h-0')}>
                <p className="text-sm leading-relaxed">{item.resposta}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
