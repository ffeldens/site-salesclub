import type { LpBloco } from '@/components/lp/LpRenderer'

/**
 * Campanhas de landing page (/lp/[campanha]). Cada campanha é uma lista
 * ordenada de blocos — montável sem deploy de código quando vier do Sanity.
 * Hoje definidas em TS (mock); na Fase 4 os getters passam a ler do Sanity.
 */

export type LpCampaign = {
  slug: string
  meta: { title: string; description: string }
  /** LPs de mídia paga normalmente ficam fora do índice de busca. */
  noindex?: boolean
  logoCtaLabel?: string
  logoCtaHref?: string
  blocos: LpBloco[]
}

export const campanhas: LpCampaign[] = [
  {
    slug: '20-prompts',
    meta: {
      title: '20 Prompts de IA para Líderes Comerciais',
      description:
        'Guia gratuito com 20 prompts de IA prontos para líderes comerciais aplicarem em gestão, previsão e produtividade de vendas.',
    },
    logoCtaLabel: 'Baixar grátis',
    logoCtaHref: '#form',
    blocos: [
      {
        tipo: 'hero',
        dados: {
          eyebrow: 'Material gratuito · IA em vendas',
          title: '20 prompts de IA para líderes comerciais',
          subtitle:
            'Um guia prático com 20 prompts prontos para você aplicar inteligência artificial na gestão, na previsão e na produtividade da sua área de vendas — hoje mesmo.',
          primaryCta: { label: 'Baixar o guia grátis', href: '#form' },
        },
      },
      {
        tipo: 'answer',
        dados: {
          texto:
            'Este guia gratuito reúne 20 prompts de IA testados para líderes comerciais: da análise de pipeline e previsão de receita à criação de scripts, cadências e rituais de gestão. Copie, cole na sua ferramenta de IA preferida e ganhe tempo com decisões melhores.',
        },
      },
      {
        tipo: 'beneficios',
        dados: {
          eyebrow: 'O que você recebe',
          title: 'O que tem dentro do guia',
          items: [
            { titulo: '20 prompts prontos', descricao: 'Organizados por tema: gestão, previsão, prospecção e capacitação.' },
            { titulo: 'Aplicável na hora', descricao: 'Copie, cole e adapte ao contexto da sua operação.' },
            { titulo: 'Foco em liderança', descricao: 'Pensado para quem gere times e precisa de previsibilidade.' },
            { titulo: 'Sem custo', descricao: 'Material gratuito do maior ecossistema de vendas do Brasil.' },
          ],
        },
      },
      {
        tipo: 'form',
        dados: {
          source: 'materiais',
          produto: 'Guia 20 Prompts de IA',
          eyebrow: 'Acesso imediato',
          sectionTitle: 'Receba o guia no seu e-mail',
          description: 'Preencha os dados e enviamos o acesso ao guia na hora.',
          ctaLabel: 'Quero o guia gratuito',
          rich: false,
        },
      },
      {
        tipo: 'faq',
        dados: {
          items: [
            { pergunta: 'O material é gratuito mesmo?', resposta: 'Sim, 100% gratuito. Basta informar seu e-mail para receber o acesso.' },
            { pergunta: 'Preciso saber usar IA?', resposta: 'Não. Os prompts vêm prontos e com orientação de uso — é copiar, colar e adaptar.' },
            { pergunta: 'Para quem é este guia?', resposta: 'Para líderes, gestores e diretores comerciais que querem aplicar IA com foco em previsibilidade e produtividade.' },
          ],
        },
      },
    ],
  },
]

export function getCampanhas(): LpCampaign[] {
  return campanhas
}

export function getCampanha(slug: string): LpCampaign | undefined {
  return campanhas.find((c) => c.slug === slug)
}
