import type { Mentor, Faq } from '@/lib/content'

/**
 * Conteúdo dos serviços produtizados, migrado das landings atuais
 * (maquinadevendaslp.lovable.app e diagcom.lovable.app, embutidas via iframe
 * em salesclub.com.br/servicos/*). Corrige o `noindex` atual (CLAUDE.md §7).
 */

export type Fase = { numero: number; titulo: string; descricao: string; entregas?: string[] }

export type Servico = {
  slug: string
  titulo: string
  headline: string
  subtitulo: string
  /** Bloco answer-first (40–60 palavras) para SEO/GEO. */
  resumo: string
  descricao: string
  /** Tipo de oferta — define o CTA e o roteamento do lead. */
  tipo: 'implementacao' | 'ferramenta-gratuita'
  componentes?: { titulo: string; descricao: string }[]
  fases?: Fase[]
  squad?: Mentor[]
  diferenciais: string[]
  beneficios: string[]
  paraQuem: string[]
  faq: Faq[]
  ctaLabel: string
  ctaHref?: string
}

export const servicos: Servico[] = [
  {
    slug: 'maquina-de-vendas',
    titulo: 'Máquina de Vendas',
    headline: 'Sua empresa vende. Mesmo quando você sai da sala.',
    subtitulo:
      'Um squad de 3 especialistas dedicado a estruturar a sua operação comercial — processos, pessoas, ferramentas e gestão — para gerar receita de forma previsível, escalável e independente de você.',
    resumo:
      'A Máquina de Vendas do Sales Club é um serviço de implementação com um squad de 3 especialistas que estrutura processos, pessoas, ferramentas e gestão da sua operação comercial. Em três fases — diagnóstico, implementação e operação assistida — você passa a gerar receita previsível e independente do dono.',
    descricao:
      'A Máquina de Vendas foi desenhada para empresas que já entenderam que precisam de estrutura e não querem mais esperar ter "tempo para implementar". O squad trabalha junto com você, do diagnóstico à operação assistida — implementação com você, não só para você.',
    tipo: 'implementacao',
    componentes: [
      { titulo: 'Estratégia de Vendas', descricao: 'Funil estratégico: ICP definido, oferta posicionada, canais por dados e metas conectadas ao planejamento.' },
      { titulo: 'Gestor de Clientes (Aquisição)', descricao: 'Geração de demanda: prospecção ativa e passiva, cadências de outbound e gestão de leads qualificados.' },
      { titulo: 'Gestão de Pessoas', descricao: 'Pessoas certas nas funções certas: perfil ideal por posição, contratação, onboarding e avaliação objetiva.' },
      { titulo: 'Capacitação Comercial', descricao: 'Playbook de vendas, scripts, mapa de objeções, trilha de treinamento e Universidade Interna.' },
      { titulo: 'Operações de Vendas', descricao: 'CRM, telefonia, dashboards, processos documentados, SLAs entre áreas e higiene de base.' },
      { titulo: 'Gestor de Vendas', descricao: 'Rotinas: 1:1, revisão de funil, revisão de previsão de vendas e avaliação de desempenho.' },
    ],
    fases: [
      {
        numero: 1,
        titulo: 'Análise e Diagnóstico',
        descricao: 'Reunião de partida, auditoria de ferramentas, matriz de risco e SWOT, entrevistas com a equipe, ICP por dados e plano de ação com metas e remuneração variável.',
        entregas: ['Diagnóstico completo', 'ICP definido', 'Análise SWOT e Matriz RFV', 'Planilha de CAC e LTV', 'Fluxograma do processo comercial', 'Projeção de metas e remuneração variável'],
      },
      {
        numero: 2,
        titulo: 'Implementação e Gestão',
        descricao: 'Seleção e implementação de ferramentas, painéis de performance, rotinas de gestão, configuração de CRM, treinamento de liderança e time, Manual Comercial, PDIs e Universidade Interna.',
        entregas: ['Ferramentas operacionais', 'Time treinado', 'Painéis de performance', 'Manual Comercial completo', 'Rotinas de gestão estruturadas', 'Acordos entre áreas documentados'],
      },
      {
        numero: 3,
        titulo: 'Operação Assistida',
        descricao: 'Monitoramento contínuo, revisão de remuneração e comissionamento, revisão de CAC e LTV ao fim do ciclo, ajustes finos em processos e recalibração de metas.',
        entregas: ['Plano de ação baseado em dados reais', 'Revisão de CAC e LTV', 'Recalibração de metas', 'Operação comercial rodando de forma autônoma'],
      },
    ],
    squad: [
      { nome: 'Thiago Bezerra', cargo: 'Estrategista de Vendas', bio: '15 anos na área comercial, de operação à liderança em tecnologia, educação, indústria e consultoria.' },
      { nome: 'Giovanna Galetto', cargo: 'Operações de Vendas', bio: 'Engenheira da Computação, pós em Liderança Estratégica, especialização em Ciência de Dados e IA. Pipedrive, HubSpot, RD Station, Bitrix24.' },
      { nome: 'Viviane Machado', cargo: 'Capacitação Comercial', bio: '+10 anos em T&D, com passagem pela Proteste e experiência em estruturação de máquinas de vendas.' },
    ],
    diferenciais: [
      'Squad dedicado: três especialistas complementares na sua operação',
      'Metodologia validada em mais de 800 empresas',
      'Materiais editáveis: tudo que é construído fica com a sua empresa',
      'Acompanhamento semanal com acesso direto ao time',
      'Ecossistema Sales Club: a mesma estrutura que formou +500 mil vendedores',
    ],
    beneficios: [
      'Receita previsível e independente da agenda do dono',
      'Papéis e responsabilidades definidos no time comercial',
      'Processos documentados e conhecimento que fica na empresa',
      'Ferramentas configuradas e time treinado',
    ],
    paraQuem: [
      'Empresas com operação rodando (time comercial, base de clientes, produto recorrente) a quem falta método',
      'Negócios que dependem do esforço individual do dono para crescer',
      'Sócios, CEOs, diretores e heads de vendas',
    ],
    faq: [
      { pergunta: 'Para que tipo de empresa a Máquina de Vendas foi criada?', resposta: 'Para empresas com operação rodando — time comercial (mesmo pequeno), base de clientes e produto vendido de forma recorrente. O que falta é método. Se a empresa já gera receita mas depende de esforço individual para crescer, é esse o cenário que o squad estrutura.' },
      { pergunta: 'Quanto tempo dura o serviço?', resposta: 'São três fases (Diagnóstico; Implementação e Gestão; Operação Assistida). O tempo total varia conforme o tamanho e a complexidade, sempre com prazos realistas definidos no plano de ação da primeira fase.' },
      { pergunta: 'Vou precisar parar o dia a dia da empresa para participar?', resposta: 'Não. O squad tira esse peso. Você participa da reunião de partida, das revisões estratégicas semanais e das decisões importantes, enquanto a execução do dia a dia fica com os três especialistas.' },
      { pergunta: 'E se eu já tiver CRM ou outras ferramentas?', resposta: 'Melhor ainda. Na fase de diagnóstico o squad avalia o que manter, otimizar ou substituir. O objetivo é integrar o que existe ao método, não reinventar.' },
      { pergunta: 'O que acontece com os materiais depois?', resposta: 'Tudo fica com a empresa: Manual Comercial, roteiros, painéis, fluxogramas, Universidade Interna e documentação, em formato editável. A independência da operação é objetivo central.' },
    ],
    ctaLabel: 'Quero estruturar minha operação',
  },
  {
    slug: 'diagnostico-comercial',
    titulo: 'Diagnóstico Comercial',
    headline: 'Descubra onde sua operação comercial está perdendo vendas — e como corrigir agora.',
    subtitulo:
      'Em 5 minutos, receba um diagnóstico gratuito dos 10 pilares que movem (ou travam) o crescimento comercial da sua empresa, com score geral, análise pilar a pilar e recomendações práticas.',
    resumo:
      'O Diagnóstico Comercial do Sales Club é uma ferramenta gratuita de autoavaliação de maturidade comercial. Em cerca de 5 minutos você responde perguntas objetivas sobre 10 pilares de vendas e recebe, na hora, um score geral, a análise de cada pilar e recomendações práticas para priorizar melhorias.',
    descricao:
      'Uma ferramenta de autodiagnóstico gratuita, desenvolvida com base em centenas de diagnósticos aplicados em empresas. Compartilhe rapidamente o cenário da sua operação e receba um panorama completo dos 10 pilares do crescimento comercial.',
    tipo: 'ferramenta-gratuita',
    componentes: [
      { titulo: 'Perfil Ideal de Cliente (ICP)', descricao: 'Definição clara de ICP melhora a qualidade dos leads e a produtividade.' },
      { titulo: 'Geração de Leads', descricao: 'Inbound e outbound estruturados para um pipeline sempre abastecido.' },
      { titulo: 'Cadência de Prospecção', descricao: 'Cadência clara e ritmo de follow-ups.' },
      { titulo: 'Negociação e Fechamento', descricao: 'Técnicas de objeção e fechamento.' },
      { titulo: 'Monitoramento de Métricas', descricao: 'Ritual de análise de dados para melhores decisões.' },
      { titulo: 'Uso de CRM e Ferramentas', descricao: 'Adoção plena do CRM por todo o time.' },
      { titulo: 'Liderança e Gestão', descricao: 'Rituais de gestão e feedbacks regulares.' },
      { titulo: 'Treinamento e Desenvolvimento', descricao: 'Programa regular de desenvolvimento que reduz o turnover.' },
    ],
    fases: [
      { numero: 1, titulo: 'Informe seus dados', descricao: 'Nome, empresa, telefone e e-mail corporativo para personalizar o diagnóstico.' },
      { numero: 2, titulo: 'Avalie seu processo comercial', descricao: 'Perguntas objetivas divididas nos 10 pilares, em uma escala de 0 a 10.' },
      { numero: 3, titulo: 'Receba seu resultado na hora', descricao: 'Score geral, análise pilar a pilar e recomendações práticas — imediatamente.' },
    ],
    diferenciais: [
      '100% gratuito, sem cadastro prévio',
      'Resultado imediato, na própria tela',
      'Leva cerca de 5 minutos',
      'Metodologia baseada em centenas de diagnósticos aplicados',
    ],
    beneficios: [
      'Score geral de maturidade comercial',
      'Análise detalhada de cada um dos 10 pilares',
      'Recomendações práticas para priorizar melhorias',
      'Decisões baseadas em dados, não em intuição',
    ],
    paraQuem: [
      'Gestores comerciais',
      'Diretores de vendas',
      'Founders que querem entender a maturidade da operação',
    ],
    faq: [
      { pergunta: 'Para quem é este diagnóstico?', resposta: 'Para gestores comerciais, diretores de vendas e founders que querem entender o nível de maturidade da operação e identificar as principais alavancas de crescimento.' },
      { pergunta: 'Quanto tempo leva para completar?', resposta: 'Menos de 5 minutos. São perguntas objetivas, numa escala de 0 a 10, com base no cenário atual da sua operação.' },
      { pergunta: 'Preciso criar conta ou pagar alguma coisa?', resposta: 'Não. É 100% gratuito e sem cadastro prévio. Você informa dados básicos, responde e vê o resultado na hora.' },
      { pergunta: 'O que acontece depois que concluo o diagnóstico?', resposta: 'Você pode solicitar uma conversa com um especialista do Sales Club para aprofundar os resultados e montar um plano de ação personalizado.' },
      { pergunta: 'Minhas informações ficam seguras?', resposta: 'Sim. Os dados são usados exclusivamente para gerar o diagnóstico personalizado e, se solicitado, para contato. Não há compartilhamento com terceiros.' },
    ],
    ctaLabel: 'Quero meu diagnóstico gratuito',
  },
]

export function getServicos(): Servico[] {
  return servicos
}

export function getServico(slug: string): Servico | undefined {
  return servicos.find((s) => s.slug === slug)
}
