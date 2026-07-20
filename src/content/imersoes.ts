import type { Mentor, Faq } from '@/lib/content'

/**
 * Conteúdo das imersões, migrado das páginas atuais (salesclub.com.br/imersao-presencial/*).
 * Datas/valores devem ser confirmados antes do go-live (ver TODO no fim do arquivo).
 * Migra para o Sanity na Fase 4 — manter as assinaturas dos getters em lib/content.
 */

export type Modulo = { numero: number; titulo: string; descricao: string }

export type Imersao = {
  slug: string
  titulo: string
  headline: string
  subtitulo: string
  data?: string
  local: string
  formato: string
  /** Bloco answer-first (40–60 palavras) para SEO/GEO. */
  resumo: string
  descricao: string
  modulos: Modulo[]
  mentores: Mentor[]
  beneficios: string[]
  paraQuem: string[]
  faq: Faq[]
  ctaLabel: string
  destaque?: boolean
  /** Imagem do hero (opcional). */
  heroImagem?: { src: string; alt: string }
  heroModo?: 'fundo' | 'recorte'
  /** Etapa DREG primária da solução (selo BadgeDREG). */
  dreg?: string
}

const SALES_VILLAGE =
  'Sales Village — R. Verbo Divino, 2001, 17º andar, Torre A, São Paulo/SP'

export const imersoes: Imersao[] = [
  {
    slug: 'sales-strategy',
    titulo: 'Sales Strategy',
    headline: 'Sales Strategy: máquina de vendas com governança para a alta liderança',
    subtitulo:
      'Imersão presencial para empresários, CEOs e heads de vendas que precisam reduzir a dependência de pessoas e organizar a área comercial com funil estratégico, processos claros, rotinas de gestão e indicadores confiáveis.',
    data: '9 e 10 de julho',
    local: SALES_VILLAGE,
    formato: 'Presencial',
    resumo:
      'Sales Strategy é a imersão presencial do Sales Club para a alta liderança comercial. Em 2 dias você estrutura funil, processos, indicadores e rotinas de gestão para tornar a receita previsível e menos dependente de pessoas — com governança, método e um roteiro de 90 dias.',
    descricao:
      'Imersão presencial voltada a empresários, CEOs e heads de vendas que precisam reduzir a dependência de pessoas e organizar a área comercial com mais segurança: funil comercial estratégico, processos claros, rotinas de gestão bem estabelecidas e indicadores que dão base para discutir receita, risco e escalabilidade.',
    modulos: [
      { numero: 1, titulo: 'Diagnóstico e engenharia comercial', descricao: 'Mapeamento completo do funil etapa por etapa para identificar gaps, retrabalho e oportunidades de receita. Definição dos indicadores prioritários e dos primeiros ajustes na arquitetura comercial.' },
      { numero: 2, titulo: 'Processos, playbooks e rotinas comerciais', descricao: 'Organização dos processos por etapas, critérios de passagem, padrões de abordagem e alinhamento entre marketing e vendas. Construção das referências para o playbook de vendas.' },
      { numero: 3, titulo: 'Métricas, previsibilidade e caixa', descricao: 'Estruturação de forecast, pipeline e acompanhamento de metas a partir de dados. Conexão dos indicadores comerciais à geração de caixa e às decisões de investimento.' },
      { numero: 4, titulo: 'Liderança comercial, incentivos e disciplina de gestão', descricao: 'O papel da liderança na sustentação da máquina de vendas: responsabilidades, modelo de comissionamento, desenvolvimento e retenção do time, rotinas e fóruns de gestão.' },
    ],
    mentores: [
      { nome: 'Raphael Lassance', cargo: 'Sócio-mentor', bio: 'Fundador da primeira agência de growth hacking do Brasil; comunidade E-commerce Hacks.', foto: '/images/mentores/raphael-lassance.webp' },
      { nome: 'Hélio Azevedo', cargo: 'CRO do Sales Club', bio: 'Investidor e estrategista em vendas e marketing B2B.', foto: '/images/mentores/helio-azevedo.webp' },
      { nome: 'Luiz Paulo Teixeira', cargo: 'CEO do Sales Club', bio: 'Líder do maior ecossistema de vendas do Brasil.', foto: '/images/mentores/luiz-paulo-teixeira.webp' },
      { nome: 'Felipe Feldens', cargo: 'COO do Sales Club', bio: 'Estratégia, inovação e transformação organizacional.', foto: '/images/mentores/felipe-feldens.webp' },
      { nome: 'Guilherme Junqueira', cargo: 'CEO da Delta Academy', bio: 'Empreendedor e investidor; Forbes Under 30.', foto: '/images/mentores/guilherme-junqueira.webp' },
    ],
    beneficios: [
      'Máquina de vendas com direção clara e receita mais previsível',
      'Visão completa do funil com etapas, metas e responsabilidades',
      'Modelo de playbook comercial',
      'Painel de indicadores para leitura rápida de performance',
      'Agenda e rotina de gestão comercial (reuniões, 1:1, acompanhamentos)',
      'Roteiro de 90 dias para implementação',
    ],
    paraQuem: [
      'Empresários, sócios, CEOs e diretores da área comercial',
      'Quem quer ampliar a governança sobre o funil com indicadores confiáveis',
      'Quem precisa reduzir a variação de performance entre pessoas, regiões e canais',
      'Quem quer estruturar a liderança comercial com mais método e disciplina',
    ],
    faq: [
      { pergunta: 'Para quem exatamente é a Sales Strategy?', resposta: 'Para empresários, sócios, CEOs e diretores da área comercial que lideram (ou estão estruturando) um time de vendas e querem organizar a máquina comercial com mais método, previsibilidade e governança.' },
      { pergunta: 'Minha empresa ainda é pequena, faz sentido participar?', resposta: 'Faz sentido quando já existe — ou está em montagem — uma operação comercial minimamente estruturada (pessoas dedicadas, metas, rotina de vendas). A imersão é mais proveitosa para quem já vive a gestão comercial no dia a dia.' },
      { pergunta: 'Já tenho uma estrutura comercial montada, ainda vale a pena?', resposta: 'Sim. Muitas empresas vêm justamente para revisar arquitetura comercial, indicadores, modelo de gestão e agenda da liderança.' },
      { pergunta: 'Posso levar alguém do meu time?', resposta: 'Sim. É comum participarem sócio + diretor comercial, ou diretor + gerente. A definição de vagas adicionais é feita caso a caso com o time do Sales Club.' },
      { pergunta: 'O conteúdo é aplicável a qualquer setor?', resposta: 'Sim. A imersão trabalha fundamentos de gestão comercial, funil, processos, indicadores e liderança aplicáveis a negócios B2B, B2C, serviços, indústria, varejo e operações digitais.' },
    ],
    ctaLabel: 'Aplicar para a turma',
    destaque: true,
    heroImagem: { src: '/images/sales-village/auditorio-led.webp', alt: 'Sala de imersão do Sales Village com painel de LED Sales Strategy' },
    heroModo: 'fundo',
    dreg: 'Desenhar',
  },
  {
    slug: 'sales-leadership',
    titulo: 'Sales Leadership',
    headline: 'Sales Leadership: formando líderes comerciais de alta performance',
    subtitulo:
      'Em 2 dias intensivos você fortalece sua liderança comercial com metodologia e ferramentas práticas para criar rotinas de gestão consistentes, ganhar previsibilidade de receita e alinhar pessoas, processos e indicadores.',
    data: '21 e 22 de agosto',
    local: SALES_VILLAGE,
    formato: 'Presencial · 20 horas',
    resumo:
      'Sales Leadership é a imersão de 2 dias (20h) do Sales Club para gestores comerciais. Você sai com rotinas de gestão (1:1, revisão de funil e forecast), critérios de governança por etapa, CRM padronizado e trilhas de enablement por função — para reduzir oscilação e escalar resultado.',
    descricao:
      'Dois dias presenciais em formato intensivo, combinando oficinas e mentoria coletiva. Você fortalece a liderança comercial com metodologia e ferramentas práticas para criar rotinas de gestão consistentes, ganhar previsibilidade de receita e alinhar pessoas, processos e indicadores.',
    modulos: [
      { numero: 1, titulo: 'Liderança e rotina de gestão', descricao: 'Metas e indicadores por função; rotinas semanais de 1:1 e revisão de forecast; feedback orientado a desenvolvimento; coaching de campo e revisão de desempenho.' },
      { numero: 2, titulo: 'Jornada do cliente e governança por etapa', descricao: 'Responsáveis por etapa e SLAs; mensagens por segmento e momento; passagens entre áreas bem definidas para reduzir perdas; padrões de execução para reduzir ruído operacional.' },
      { numero: 3, titulo: 'Operações de Receita para previsibilidade', descricao: 'CRM padronizado (etapas, critérios e higiene do funil); painel de funil e forecast; rotinas de acompanhamento e cadências de gestão; governança para manter consistência ao longo do tempo.' },
      { numero: 4, titulo: 'Capacitação por função', descricao: 'Trilhas por papel (Pré-vendas, Vendas e Sucesso do Cliente); playbooks e processos para reduzir variação e acelerar onboarding; simulações em sala e rotinas de execução.' },
    ],
    mentores: [
      { nome: 'Adriana Gomes', cargo: 'Liderança e governança', bio: 'Especialista em desenvolvimento de lideranças, governança corporativa, diversidade e inclusão.', foto: '/images/mentores/adriana-gomes.webp' },
      { nome: 'Gustavo Malavota', cargo: 'Vendas e treinamento', bio: 'Capacitou +180 mil vendedores e líderes em 15 anos. Fundador da Mola Educação; autor de "52 Semanas em Ações de Vendas".', foto: '/images/mentores/gustavo-malavota.webp' },
      { nome: 'Felipe Feldens', cargo: 'COO do Sales Club', bio: '18+ anos liderando mudanças em grandes empresas e scale-ups (99, Sicredi, varejo nacional).', foto: '/images/mentores/felipe-feldens.webp' },
      { nome: 'Thiago Bezerra', cargo: 'Head Comercial e de Serviços', bio: '15 anos na área comercial, da operação à liderança; responde por crescimento de receita e execução estratégica.', foto: '/images/mentores/thiago-bezerra.webp' },
      { nome: 'Luiz Ambrósio', cargo: 'Fundador e COO da Vinci Society', bio: 'Growth e Vendas; ex-Growth Lead no G4 Educação, Liv Up e Raccoon.', foto: '/images/mentores/luiz-ambrosio.webp' },
    ],
    beneficios: [
      'Conduzir 1:1 e revisões de funil com uma régua clara',
      'Desenho simples de responsabilidades e acordos entre áreas',
      'Ordem nas etapas, critérios e higiene de dados do CRM',
      'Metas e forecast baseados no que está no CRM',
      'Resultado escalável sem depender de poucos vendedores',
      'Material aplicável: rotinas semanais do líder, checklists de governança, referências de playbooks e trilhas de enablement',
    ],
    paraQuem: [
      'Gerentes e coordenadores que já lideram times',
      'Heads e diretores (CRO e direção comercial) que precisam reduzir oscilação',
      'Líderes em transição para gestão',
      'Empresas em fase de crescimento que precisam de execução replicável',
    ],
    faq: [
      { pergunta: 'Para quem é a Sales Leadership?', resposta: 'Para gestores e lideranças comerciais que precisam ampliar consistência e previsibilidade: gerentes e coordenadores, heads e diretores, novas lideranças e empresas em crescimento.' },
      { pergunta: 'O que eu implemento na primeira semana?', resposta: 'Reorganizar rotinas semanais (1:1, revisão de pipeline e forecast); definir critérios por etapa no CRM; estabelecer SLAs e owners; criar um plano de enablement de curto prazo com 2 a 4 sessões.' },
      { pergunta: 'Qual é a duração e a carga horária?', resposta: '2 dias presenciais em formato intensivo, com carga horária total de 20 horas, combinando oficinas e mentoria coletiva.' },
      { pergunta: 'É focado em B2B, B2C ou ambos?', resposta: 'Ambos. Funciona para B2B (vendas consultivas, ciclos longos), B2C (volume, cadência, conversão) e híbridos. O método de liderança permanece aplicável.' },
      { pergunta: 'Eu preciso ter CRM para aproveitar?', resposta: 'O foco é processo, critérios e governança, não a ferramenta. Se você usa CRM, acelera a higiene; se não usa, ganha clareza operacional.' },
      { pergunta: 'A Sales Leadership substitui consultoria?', resposta: 'Não. Ela acelera a construção de método e governança para o líder implementar internamente. Para um desenho completo, combine com os programas de engenharia comercial.' },
    ],
    ctaLabel: 'Aplicar para a turma',
    heroImagem: { src: '/images/mentores/grupo-leadership.webp', alt: 'Mentores da imersão Sales Leadership do Sales Club' },
    heroModo: 'recorte',
    dreg: 'Gerenciar',
  },
  {
    slug: 'sales-ai',
    titulo: 'Sales AI',
    headline: 'Sales AI: inteligência artificial sob comando da liderança comercial',
    subtitulo:
      'Imersão presencial para diretores comerciais, heads de vendas, gerentes nacionais e empreendedores que precisam colocar a IA em vendas sob comando da liderança — com governança, segurança de dados e impacto em funil, receita e ROI.',
    data: '15 de setembro',
    local: SALES_VILLAGE,
    formato: 'Presencial · dia inteiro (~8h)',
    resumo:
      'Sales AI é a imersão de um dia do Sales Club para colocar a inteligência artificial a serviço do funil, da gestão e das decisões de receita. Resolve o Shadow AI (uso descontrolado com risco de vazamento) e a ineficiência operacional, com governança e um playbook prático de IA em vendas.',
    descricao:
      'Um dia para colocar a Inteligência Artificial a serviço do seu funil de vendas, da gestão e das decisões de receita. A imersão resolve dois problemas críticos: Shadow AI (uso descontrolado de ferramentas com risco de vazamento de dados) e ineficiência operacional (falta de tempo, leads desqualificados, baixa previsibilidade).',
    modulos: [
      { numero: 1, titulo: 'Fundamentos e oportunidades', descricao: 'Desmistifique a IA e entenda como ela pode gerar vantagem competitiva no seu negócio.' },
      { numero: 2, titulo: 'Produtividade do empresário', descricao: 'Otimize seu tempo e suas decisões com ferramentas que fazem o trabalho pesado por você.' },
      { numero: 3, titulo: 'Geração de demanda com IA', descricao: 'Atraia leads qualificados com campanhas e dados inteligentes.' },
      { numero: 4, titulo: 'Conversão e estratégia de vendas', descricao: 'Use IA para personalizar abordagens e aumentar as taxas de fechamento.' },
    ],
    mentores: [
      { nome: 'Hélio Azevedo', cargo: 'CRO do Sales Club', bio: 'Ex-Microsoft e SAP. Especialista em IA para geração e conversão de demanda.' },
      { nome: 'Thais Sterenberg', cargo: 'Founder da Elephan.ai', bio: 'CEO de plataforma de inteligência de receita com IA. Top 10 Female Founders.' },
      { nome: 'Guilherme Junqueira', cargo: 'CEO da Delta Academy', bio: 'Fundador da Gama Academy (vendida à Ânima Educação). Forbes Under 30.' },
    ],
    beneficios: [
      'Inteligência artificial sob governança',
      'Funil mais limpo e time focado em negócios',
      'Produtividade pessoal em alto nível',
      'Playbook prático de IA em vendas',
      'Acesso às gravações por 12 meses',
      'Grupo seleto de empresários e lideranças comerciais',
    ],
    paraQuem: [
      'Diretores e heads de vendas',
      'Gerentes comerciais',
      'Empreendedores e sócios',
      'Lideranças que buscam eficiência e escala sem perder governança',
    ],
    faq: [
      { pergunta: 'É necessário saber programar ou ter conhecimento técnico?', resposta: 'Não. É uma imersão de negócios, formatada para que gestores entendam estratégia e aplicação prática sem escrever código.' },
      { pergunta: 'Como funciona o formato?', resposta: 'Experiência presencial de aproximadamente 8 horas, dia inteiro, no Sales Village em São Paulo.' },
      { pergunta: 'Qual o valor do investimento?', resposta: 'Os valores variam conforme lote, condições comerciais e parcerias. Entre em contato para receber uma proposta atualizada.' },
    ],
    ctaLabel: 'Entrar na lista de espera',
    dreg: 'Desenhar',
  },
]

export function getImersoes(): Imersao[] {
  return imersoes
}

export function getImersao(slug: string): Imersao | undefined {
  return imersoes.find((i) => i.slug === slug)
}

// TODO(conteúdo): confirmar datas vigentes das turmas e valores de investimento
// (as páginas atuais não exibem preço); revisar depoimentos com atribuição nominal.
