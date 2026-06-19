import type { PortableTextBlock } from '@portabletext/react'
import type { Faq } from '@/lib/content'
import { sanityClient } from '@/sanity/client'

/**
 * Artigos do blog (/conteudo). Lê do Sanity quando há conteúdo publicado;
 * caso contrário, usa os seeds em TS (fallback robusto — o site nunca quebra).
 * O corpo dos posts do Sanity vem em portable text (`body`); os seeds usam
 * blocos simples (`corpo`).
 */

export type Bloco =
  | { tipo: 'h2'; texto: string }
  | { tipo: 'p'; texto: string }
  | { tipo: 'ul'; itens: string[] }

export type Post = {
  slug: string
  titulo: string
  resumo: string // answer-first (40–60 palavras)
  categoria: string
  autor: string
  dataPublicacao: string // ISO
  dataAtualizacao: string // ISO
  /** Corpo dos seeds (blocos simples). */
  corpo?: Bloco[]
  /** Corpo vindo do Sanity (portable text). */
  body?: PortableTextBlock[]
  faq?: Faq[]
}

const seedPosts: Post[] = [
  {
    slug: 'como-dar-previsibilidade-a-area-comercial',
    titulo: 'Como dar previsibilidade à área comercial em 4 pilares',
    resumo:
      'Previsibilidade comercial nasce de quatro pilares trabalhando juntos: processo definido, gestão por indicadores, pessoas capacitadas e tecnologia que sustenta a operação. Sem eles, a receita depende do esforço de poucos e oscila mês a mês — com eles, vira um sistema que opera com consistência.',
    categoria: 'Gestão Comercial',
    autor: 'Sales Club',
    dataPublicacao: '2026-06-10',
    dataAtualizacao: '2026-06-19',
    corpo: [
      { tipo: 'p', texto: 'A maioria das empresas que crescem no improviso chega a um teto: a receita passa a depender da agenda do dono ou de poucos vendedores. Dar previsibilidade significa transformar vendas em um sistema — e isso se constrói sobre quatro pilares.' },
      { tipo: 'h2', texto: '1. Processo comercial definido' },
      { tipo: 'p', texto: 'Um funil com etapas claras, critérios de passagem e padrões de abordagem reduz a variação entre pessoas e torna o resultado replicável.' },
      { tipo: 'h2', texto: '2. Gestão por indicadores' },
      { tipo: 'p', texto: 'Forecast, pipeline e metas acompanhados em rituais semanais permitem decidir com base em dados — não em achismo.' },
      { tipo: 'h2', texto: '3. Pessoas capacitadas' },
      { tipo: 'p', texto: 'Playbooks, trilhas de enablement e rotinas de 1:1 elevam o time e aceleram o onboarding de novos vendedores.' },
      { tipo: 'h2', texto: '4. Tecnologia que sustenta' },
      { tipo: 'p', texto: 'CRM higienizado, dashboards e automações (inclusive IA) liberam o time para vender e dão visibilidade à liderança.' },
      { tipo: 'h2', texto: 'Por onde começar' },
      { tipo: 'ul', itens: ['Diagnostique a maturidade atual da operação', 'Defina o funil e os indicadores prioritários', 'Estabeleça rituais de gestão semanais', 'Documente o playbook e capacite o time'] },
    ],
    faq: [
      { pergunta: 'Quanto tempo leva para ter previsibilidade?', resposta: 'Os primeiros ganhos aparecem em semanas com a organização de rituais e critérios; a consistência se consolida ao longo de alguns ciclos de gestão.' },
      { pergunta: 'Preciso de um CRM caro?', resposta: 'Não. O essencial é processo e disciplina de dados. Um CRM ajuda na execução, mas o método vem primeiro.' },
    ],
  },
  {
    slug: 'o-que-e-uma-maquina-de-vendas',
    titulo: 'O que é uma máquina de vendas (e como construir a sua)',
    resumo:
      'Uma máquina de vendas é uma operação comercial estruturada que gera receita de forma previsível e independente de pessoas específicas. Combina estratégia, aquisição, pessoas, capacitação, operações e gestão em um sistema integrado — em vez de depender do talento isolado de um vendedor ou da agenda do dono.',
    categoria: 'Estratégia',
    autor: 'Sales Club',
    dataPublicacao: '2026-06-05',
    dataAtualizacao: '2026-06-18',
    corpo: [
      { tipo: 'p', texto: 'O termo "máquina de vendas" descreve uma operação em que cada parte tem função clara e trabalha integrada às demais — de modo que a receita não dependa do esforço heroico de poucos.' },
      { tipo: 'h2', texto: 'Os componentes de uma máquina de vendas' },
      { tipo: 'ul', itens: ['Estratégia de vendas (ICP, oferta, canais, metas)', 'Aquisição e geração de demanda', 'Gestão de pessoas', 'Capacitação comercial', 'Operações de vendas (CRM, dashboards, SLAs)', 'Gestão de vendas (rituais e indicadores)'] },
      { tipo: 'h2', texto: 'Por que a maioria opera com 2 ou 3 componentes' },
      { tipo: 'p', texto: 'É comum encontrar empresas fortes em aquisição, mas frágeis em gestão e capacitação. A máquina só escala quando as seis frentes funcionam juntas.' },
    ],
  },
  {
    slug: 'okrs-em-vendas-por-onde-comecar',
    titulo: 'OKRs em vendas: por onde começar',
    resumo:
      'OKRs em vendas conectam objetivos qualitativos a resultados-chave mensuráveis, alinhando o time comercial à estratégia. Para começar, defina de 1 a 3 objetivos por ciclo, vincule 3 a 5 resultados-chave numéricos a cada um e sustente o avanço com check-ins semanais e rituais de gestão.',
    categoria: 'OKRs',
    autor: 'Sales Club',
    dataPublicacao: '2026-05-28',
    dataAtualizacao: '2026-06-15',
    corpo: [
      { tipo: 'p', texto: 'OKRs (Objectives and Key Results) dão foco e ritmo à área comercial, ligando a estratégia à execução do dia a dia.' },
      { tipo: 'h2', texto: 'Como estruturar' },
      { tipo: 'ul', itens: ['1 a 3 objetivos por ciclo (qualitativos e inspiradores)', '3 a 5 resultados-chave por objetivo (numéricos)', 'Check-ins semanais de progresso', 'Revisão e aprendizado ao fim de cada ciclo'] },
      { tipo: 'h2', texto: 'Erros comuns' },
      { tipo: 'p', texto: 'Transformar tarefas em OKRs, criar resultados sem número e não sustentar os rituais de acompanhamento são as falhas mais frequentes.' },
    ],
  },
]

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]|order(dataPublicacao desc){
  "slug": slug.current,
  titulo,
  resumo,
  "categoria": coalesce(categoria, "Conteúdo"),
  "autor": coalesce(autor, "Sales Club"),
  "dataPublicacao": string(dataPublicacao),
  "dataAtualizacao": coalesce(string(dataAtualizacao), string(dataPublicacao)),
  body,
  "faq": faq[]{pergunta, resposta}
}`

async function fetchSanityPosts(): Promise<Post[] | null> {
  try {
    const docs = await sanityClient.fetch<Post[]>(POSTS_QUERY)
    return docs && docs.length > 0 ? docs : null
  } catch {
    return null
  }
}

export async function getPosts(): Promise<Post[]> {
  const fromSanity = await fetchSanityPosts()
  if (fromSanity) return fromSanity
  return [...seedPosts].sort((a, b) => (a.dataPublicacao < b.dataPublicacao ? 1 : -1))
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const all = await getPosts()
  return all.find((p) => p.slug === slug)
}
