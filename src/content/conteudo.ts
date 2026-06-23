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
    slug: 'como-estruturar-programa-treinamento-vendas-corporativo',
    titulo: 'Como estruturar um programa de treinamento de vendas corporativo',
    resumo:
      'Um programa de treinamento de vendas corporativo eficaz vai além de palestras pontuais: combina diagnóstico da operação, trilhas por função, prática aplicada ao funil real, certificação e indicadores de impacto. Estruture em sete passos, do objetivo de negócio à medição de ROI, para transformar técnica isolada em comportamento padrão de alta performance.',
    categoria: 'Educação Corporativa',
    autor: 'Sales Club',
    dataPublicacao: '2026-06-22',
    dataAtualizacao: '2026-06-23',
    corpo: [
      { tipo: 'p', texto: 'Treinar o time comercial deixou de ser um evento isolado e virou uma capacidade contínua. Empresas que crescem com previsibilidade tratam o treinamento de vendas como um programa estruturado — com objetivo de negócio, método e medição — e não como uma palestra motivacional que se esquece na segunda-feira.' },
      { tipo: 'p', texto: 'Veja como estruturar um programa de treinamento de vendas corporativo que muda comportamento e aparece no resultado, em sete passos.' },
      { tipo: 'h2', texto: '1. Comece pelo objetivo de negócio' },
      { tipo: 'p', texto: 'Antes de escolher conteúdo, defina o resultado: aumentar a taxa de conversão, encurtar o ciclo de vendas, elevar o ticket médio ou reduzir a dependência de poucos vendedores. O objetivo guia toda a trilha e os indicadores.' },
      { tipo: 'h2', texto: '2. Diagnostique a maturidade da operação' },
      { tipo: 'p', texto: 'Mapeie onde estão os gargalos — ICP, geração de leads, prospecção, negociação, gestão. Um diagnóstico evita treinar o que já funciona e foca no que trava a receita.' },
      { tipo: 'h2', texto: '3. Desenhe trilhas por função' },
      { tipo: 'p', texto: 'Pré-vendas, vendedores, closers e líderes precisam de conteúdos diferentes. Trilhas por papel aumentam a relevância e aceleram a aplicação.' },
      { tipo: 'h2', texto: '4. Escolha formatos que mudam comportamento' },
      { tipo: 'ul', itens: ['Aula técnica (processo, scripts, passo a passo)', 'Treinamento prático com simulações (roleplay) e feedback', 'Mentoria e clínicas de correção de rota', 'Conteúdo on-demand para consulta e onboarding'] },
      { tipo: 'h2', texto: '5. Aplique na rotina, com o funil real' },
      { tipo: 'p', texto: 'O melhor laboratório é a própria operação: transforme leads e negociações reais em objeto de estudo. Aprendizado contextualizado gera ganho já no primeiro ciclo.' },
      { tipo: 'h2', texto: '6. Certifique e padronize' },
      { tipo: 'p', texto: 'Critérios claros (presença, aplicação prática e desempenho) transformam conhecimento em padrão de execução replicável por todo o time.' },
      { tipo: 'h2', texto: '7. Meça o impacto' },
      { tipo: 'p', texto: 'Acompanhe indicadores antes e depois (conversão, ciclo, ticket, ramp-up de novos vendedores). Sem medição, treinamento vira custo; com medição, vira investimento com ROI.' },
      { tipo: 'h2', texto: 'Treinamento pontual ou programa contínuo?' },
      { tipo: 'p', texto: 'Eventos pontuais geram pico de motivação que se dissipa. Programas contínuos, em ciclos, consolidam comportamento — é a diferença entre saber vender e bater meta todos os meses.' },
    ],
    faq: [
      { pergunta: 'Quanto tempo leva para ver resultado em um treinamento de vendas?', resposta: 'Com aplicação no funil real, há ganhos já no primeiro mês. A consistência de longo prazo vem com um programa contínuo, em ciclos, que consolida o comportamento.' },
      { pergunta: 'Treinamento in company ou aberto?', resposta: 'In company permite customizar para o seu contexto, ciclo de vendas e indicadores; programas abertos expõem o time a outras realidades. Operações que buscam padronização e impacto mensurável costumam priorizar o in company.' },
      { pergunta: 'Como medir o ROI do treinamento de vendas?', resposta: 'Compare indicadores antes e depois — taxa de conversão, ciclo de vendas, ticket médio e tempo de ramp-up de novos vendedores — e relacione o ganho de receita ao investimento.' },
    ],
  },
  {
    slug: 'educacao-corporativa-em-vendas',
    titulo: 'Educação corporativa em vendas: o que é e como implementar',
    resumo:
      'Educação corporativa em vendas é a estratégia de desenvolver continuamente a competência comercial de uma empresa — com trilhas estruturadas, método e cultura de aprendizado — em vez de treinamentos avulsos. Bem implementada, reduz a dependência de talentos isolados, padroniza a execução e sustenta o crescimento com previsibilidade.',
    categoria: 'Educação Corporativa',
    autor: 'Sales Club',
    dataPublicacao: '2026-06-20',
    dataAtualizacao: '2026-06-23',
    corpo: [
      { tipo: 'p', texto: 'Educação corporativa em vendas é o que separa empresas que dependem de poucos talentos das que constroem uma máquina comercial previsível. Em vez de treinamentos esporádicos, é um sistema contínuo de desenvolvimento — com método, trilhas e cultura de aprendizado integrados à rotina.' },
      { tipo: 'h2', texto: 'Por que sai na frente quem investe agora' },
      { tipo: 'p', texto: 'O interesse por educação corporativa e treinamento de vendas cresce de forma acelerada no Brasil. Estruturar a formação comercial cedo cria vantagem difícil de copiar: time padronizado, onboarding rápido e resultados consistentes.' },
      { tipo: 'h2', texto: 'Os pilares de uma educação corporativa em vendas que funciona' },
      { tipo: 'ul', itens: ['Trilhas por função (pré-vendas, vendas, liderança)', 'Conteúdo aplicado ao funil real, não cenários hipotéticos', 'Prática deliberada (roleplay) e feedback contínuo', 'Certificação e padronização de execução', 'Indicadores que ligam aprendizado a resultado'] },
      { tipo: 'h2', texto: 'Como implementar passo a passo' },
      { tipo: 'p', texto: 'Comece por um diagnóstico de maturidade comercial, defina objetivos de negócio, desenhe trilhas por papel, escolha formatos que mudam comportamento, aplique na rotina e meça o impacto. A consistência vem de operar em ciclos, não em eventos isolados.' },
      { tipo: 'h2', texto: 'Educação corporativa não é palestra' },
      { tipo: 'p', texto: 'Palestra inspira; educação corporativa transforma. A diferença está na disciplina de execução: método, prática e medição que fazem a nova técnica virar comportamento padrão.' },
    ],
    faq: [
      { pergunta: 'Qual a diferença entre treinamento de vendas e educação corporativa em vendas?', resposta: 'Treinamento costuma ser pontual; educação corporativa é um sistema contínuo de desenvolvimento, com trilhas, método e cultura de aprendizado integrados à operação para sustentar resultados no longo prazo.' },
      { pergunta: 'Por onde começar a educação corporativa em vendas?', resposta: 'Por um diagnóstico de maturidade comercial, que mostra os gargalos e prioriza onde a formação terá maior impacto na receita.' },
    ],
  },
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
