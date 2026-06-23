/**
 * Diagnóstico de Maturidade Comercial — recriado a partir do app original
 * (Lovable export). 8 pilares, perguntas 0–10 com feedback por faixa, score por
 * pilar + geral. Cada pilar mapeia para uma etapa do método DREG (P2.4) para
 * recomendar a trilha da etapa mais fraca.
 */

export interface Question {
  text: string
  feedbacks: { low: string; mid: string; high: string }
}

export type DregEtapa = 'Desenhar' | 'Recrutar' | 'Educar' | 'Gerenciar'

export interface Section {
  id: string
  name: string
  icon: string
  dreg: DregEtapa
  questions: Question[]
  sectionFeedback: { low: string; mid: string; high: string }
}

export const sections: Section[] = [
  {
    id: 'perfil-ideal',
    name: 'Perfil Ideal de Cliente',
    icon: '🎯',
    dreg: 'Desenhar',
    sectionFeedback: {
      low: 'Sua empresa ainda não tem clareza sobre o perfil ideal de cliente. Isso resulta em leads desqualificados, desperdício de tempo do time e baixa conversão. Definir o ICP é o primeiro passo para uma operação comercial eficiente.',
      mid: 'Há alguma noção do perfil ideal, mas ainda faltam critérios bem estruturados. Investir em uma definição clara do ICP vai melhorar significativamente a qualidade dos leads e a produtividade do time.',
      high: 'Excelente! Sua empresa tem clareza sobre o perfil de cliente ideal. Isso otimiza toda a cadeia de prospecção e aumenta as taxas de conversão de forma consistente.',
    },
    questions: [
      { text: 'De 0 a 10, o quanto sua empresa tem clareza sobre o perfil do cliente ideal?', feedbacks: { low: 'Empresa não tem clareza do perfil ideal de cliente. Leads desqualificados afetam as conversões.', mid: 'Há alguma noção do ICP, mas ainda precisa de ajustes na definição para melhorar os resultados.', high: 'Perfil de cliente bem definido, permitindo otimização da prospecção e conversão.' } },
      { text: 'De 0 a 10, o quanto sua equipe comercial sabe identificar um lead que se encaixa no perfil ideal?', feedbacks: { low: 'Equipe não sabe identificar um lead adequado, prejudicando a conversão.', mid: 'Há conhecimento sobre ICP, mas dificuldade em qualificar corretamente os leads.', high: 'Equipe bem treinada, sabe identificar e qualificar leads corretamente.' } },
      { text: 'De 0 a 10, o quanto os critérios para definir um cliente qualificado estão bem estruturados?', feedbacks: { low: 'Critérios de qualificação inexistentes ou mal definidos.', mid: 'Critérios existem, mas não são seguidos consistentemente pela equipe.', high: 'Critérios de qualificação bem estruturados e amplamente adotados pelo time.' } },
    ],
  },
  {
    id: 'geracao-leads',
    name: 'Geração de Leads',
    icon: '🚀',
    dreg: 'Desenhar',
    sectionFeedback: {
      low: 'O volume e a qualidade dos leads gerados estão abaixo do ideal. A empresa não possui estratégias estruturadas de inbound ou outbound, o que compromete diretamente as metas de vendas.',
      mid: 'Existem iniciativas de geração de leads, mas sem consistência. Há espaço para estruturar melhor as estratégias inbound e outbound para garantir um pipeline sempre abastecido.',
      high: 'A geração de leads está bem estruturada, com estratégias claras de inbound e outbound. O pipeline está consistentemente abastecido com leads qualificados.',
    },
    questions: [
      { text: 'De 0 a 10, o volume de leads gerados mensalmente é suficiente para bater as metas de vendas?', feedbacks: { low: 'Volume insuficiente de leads compromete o atingimento das metas.', mid: 'Volume de leads próximo ao adequado, mas com margem de melhoria para garantir metas.', high: 'O volume de leads é adequado e está alinhado às metas de vendas, garantindo um pipeline sempre abastecido.' } },
      { text: 'De 0 a 10, o quanto sua empresa possui uma estratégia bem definida para geração de leads inbound?', feedbacks: { low: 'Nenhuma estratégia de inbound definida. A empresa perde oportunidades de geração orgânica de leads.', mid: 'Existem algumas ações de inbound, mas sem consistência.', high: 'Estratégia de inbound bem definida, gerando leads qualificados de forma recorrente.' } },
      { text: 'De 0 a 10, o quanto sua empresa possui uma estratégia bem definida para geração de leads outbound?', feedbacks: { low: 'Não há estratégia de outbound definida, o que limita a prospecção ativa.', mid: 'Há ações de outbound, mas sem processos claros de segmentação e cadência.', high: 'O outbound está bem definido e estruturado, com processos claros de segmentação, abordagem e cadência de follow-ups.' } },
      { text: 'De 0 a 10, os leads gerados são, na maioria, qualificados e prontos para avançar no funil de vendas?', feedbacks: { low: 'Os leads são desqualificados, dificultando a conversão e resultando em desperdício de tempo da equipe comercial.', mid: 'Alguns leads são qualificados, mas há necessidade de melhorar os critérios de filtragem.', high: 'A maioria dos leads gerados são qualificados e prontos para avançar no funil.' } },
    ],
  },
  {
    id: 'cadencia-prospeccao',
    name: 'Cadência de Prospecção',
    icon: '📞',
    dreg: 'Gerenciar',
    sectionFeedback: {
      low: 'A equipe não segue um fluxo estruturado de prospecção. A atuação é reativa e sem previsibilidade, o que resulta em oportunidades perdidas e pipeline inconsistente.',
      mid: 'Há esforço na prospecção, mas falta consistência no fluxo e no ritmo de follow-ups. Estruturar uma cadência clara pode aumentar significativamente os resultados.',
      high: 'A cadência de prospecção é bem estruturada. O time mantém um ritmo consistente de contatos e follow-ups, garantindo um pipeline saudável e escalável.',
    },
    questions: [
      { text: 'De 0 a 10, o quanto sua equipe segue um fluxo estruturado e frequente de prospecção?', feedbacks: { low: 'Não há um fluxo estruturado de prospecção, o que leva à geração inconsistente de novas oportunidades.', mid: 'Há esforço de prospecção, mas o fluxo não é consistente ou bem documentado.', high: 'O fluxo de prospecção é estruturado e seguido com disciplina por toda a equipe.' } },
      { text: 'De 0 a 10, o quanto o time mantém um ritmo consistente de follow-ups até conseguir engajar o lead?', feedbacks: { low: 'Follow-ups são raros ou inexistentes, o que resulta em perda de leads por falta de engajamento.', mid: 'O follow-up ocorre, mas não tem cadência definida. Alguns leads são esquecidos.', high: 'O time mantém uma cadência rigorosa de follow-ups, maximizando o engajamento dos leads.' } },
      { text: 'De 0 a 10, o número de contatos feitos por vendedor por dia/semana é suficiente para manter o pipeline cheio?', feedbacks: { low: 'O volume de contatos é insuficiente para manter o pipeline saudável.', mid: 'O volume de contatos é razoável, mas pode ser aumentado para garantir um pipeline mais robusto.', high: 'O volume de contatos por vendedor é adequado e suficiente para manter um pipeline saudável e escalável.' } },
    ],
  },
  {
    id: 'negociacao',
    name: 'Negociação e Fechamento',
    icon: '🤝',
    dreg: 'Educar',
    sectionFeedback: {
      low: 'Os vendedores têm dificuldades com negociação e objeções, e a taxa de fechamento está abaixo do mercado. É necessário investir em capacitação técnica de vendas.',
      mid: 'O time negocia, mas ainda enfrenta dificuldades com objeções e ciclos longos. Treinamentos específicos em técnicas de fechamento podem trazer resultados rápidos.',
      high: 'O time domina técnicas de negociação e fechamento. As taxas de conversão estão acima da média do mercado, com ciclos de venda eficientes.',
    },
    questions: [
      { text: 'De 0 a 10, os vendedores dominam técnicas de negociação e objeções para aumentar a conversão?', feedbacks: { low: 'Os vendedores têm dificuldades em lidar com objeções e negociar, o que reduz significativamente as taxas de fechamento.', mid: 'Há algum domínio de técnicas, mas ainda há gaps em negociação e contorno de objeções.', high: 'Os vendedores dominam técnicas de negociação e contorno de objeções.' } },
      { text: 'De 0 a 10, a taxa de fechamento da empresa está dentro do esperado para o mercado?', feedbacks: { low: 'A taxa de fechamento está abaixo do mercado, indicando problemas no processo comercial.', mid: 'A taxa de fechamento está próxima do mercado, mas há espaço para melhoria.', high: 'A taxa de fechamento é alta e competitiva, demonstrando que o processo comercial está bem estruturado.' } },
      { text: 'De 0 a 10, os clientes costumam avançar sem necessidade de muitas rodadas de negociação?', feedbacks: { low: 'Os ciclos de negociação são longos e desgastantes, o que reduz a eficiência do time.', mid: 'Alguns clientes avançam rapidamente, mas ainda há muitas negociações demoradas.', high: 'Os clientes avançam com eficiência, com poucos ciclos de negociação.' } },
    ],
  },
  {
    id: 'metricas',
    name: 'Monitoramento de Métricas',
    icon: '📈',
    dreg: 'Gerenciar',
    sectionFeedback: {
      low: 'A empresa não acompanha KPIs comerciais de forma sistemática. As decisões são baseadas em intuição, o que aumenta o risco de erros estratégicos.',
      mid: 'Algumas métricas são analisadas, mas sem regularidade. Estabelecer um ritual de análise de dados vai melhorar a qualidade das decisões comerciais.',
      high: 'A empresa tem uma cultura orientada a dados. KPIs como CAC, LTV e taxas de conversão são monitorados regularmente.',
    },
    questions: [
      { text: 'De 0 a 10, sua empresa acompanha KPIs importantes como CAC, LTV e taxa de conversão?', feedbacks: { low: 'A empresa não monitora KPIs comerciais, tomando decisões sem embasamento em dados.', mid: 'Algumas métricas são analisadas, mas sem um acompanhamento regular.', high: 'A empresa monitora KPIs críticos como CAC, LTV e taxas de conversão com consistência.' } },
      { text: 'De 0 a 10, os dados de vendas são analisados regularmente para tomadas de decisão estratégicas?', feedbacks: { low: 'Não há análise regular de dados, o que compromete a qualidade das decisões comerciais.', mid: 'Algumas análises são feitas, mas não há um processo estruturado.', high: 'Os dados são analisados regularmente e embasam decisões estratégicas com agilidade e precisão.' } },
      { text: 'De 0 a 10, o time comercial entende a importância dos números e sabe como interpretá-los?', feedbacks: { low: 'A equipe não tem familiaridade com métricas comerciais, dificultando ajustes estratégicos.', mid: 'Parte do time entende métricas, mas ainda há gaps que limitam a tomada de decisão baseada em dados.', high: 'O time é fluente em dados comerciais e usa os números para melhorar continuamente a performance.' } },
    ],
  },
  {
    id: 'crm',
    name: 'Uso de CRM e Ferramentas',
    icon: '💻',
    dreg: 'Desenhar',
    sectionFeedback: {
      low: 'O CRM não está implementado ou é pouco utilizado. A falta de tecnologia compromete o controle do pipeline e a eficiência do processo comercial.',
      mid: 'Há uso de ferramentas, mas sem adoção plena. Garantir que o CRM seja usado corretamente por todos é fundamental para ter dados confiáveis e escalabilidade.',
      high: 'O CRM é bem utilizado e os dados são confiáveis. As ferramentas comerciais estão integradas ao processo, aumentando a eficiência.',
    },
    questions: [
      { text: 'De 0 a 10, o CRM está bem implementado e é usado ativamente pelos vendedores?', feedbacks: { low: 'O CRM não foi implementado ou não é utilizado corretamente.', mid: 'O CRM está implementado, mas com baixa adoção.', high: 'O CRM é amplamente utilizado, com alta adoção pelo time e dados confiáveis para gestão.' } },
      { text: 'De 0 a 10, o time preenche corretamente os dados no CRM e segue um fluxo de atualização?', feedbacks: { low: 'Os dados no CRM são incompletos ou desatualizados.', mid: 'Os dados são parcialmente preenchidos, mas falta disciplina e processo.', high: 'O time segue um fluxo estruturado de atualização no CRM, garantindo dados precisos.' } },
      { text: 'De 0 a 10, a empresa utiliza outras ferramentas para otimizar o processo comercial (ex: automação de e-mails, VoIP, dashboards)?', feedbacks: { low: 'A empresa não utiliza ferramentas complementares, perdendo eficiência.', mid: 'Algumas ferramentas são utilizadas, mas ainda há oportunidades de automação.', high: 'A empresa utiliza um stack tecnológico robusto que potencializa a eficiência e a escalabilidade.' } },
    ],
  },
  {
    id: 'lideranca',
    name: 'Liderança e Gestão',
    icon: '👥',
    dreg: 'Gerenciar',
    sectionFeedback: {
      low: 'A liderança comercial é fraca ou ausente. Faltam rituais de gestão, feedbacks estruturados e acompanhamento do time.',
      mid: 'A liderança existe, mas pode ser mais presente e estruturada. Implementar rituais de gestão e feedbacks regulares vai elevar o desempenho do time.',
      high: 'A liderança comercial é forte e engajada. O gestor acompanha a equipe de perto, dá feedbacks frequentes e mantém rituais de gestão que elevam a performance.',
    },
    questions: [
      { text: 'De 0 a 10, o gestor comercial acompanha de perto o desempenho da equipe e dá feedbacks?', feedbacks: { low: 'A gestão comercial é distante ou inexistente, resultando em time sem direção.', mid: 'O gestor comercial acompanha a equipe, mas não de maneira estruturada.', high: 'O gestor acompanha de perto, dá feedbacks regulares e garante que o time esteja alinhado e evoluindo.' } },
      { text: 'De 0 a 10, existem rituais de gestão (dailys, reuniões one-on-one) para manter o alinhamento do time?', feedbacks: { low: 'Não há rituais de gestão estruturados.', mid: 'Alguns rituais existem, mas falta consistência e estrutura.', high: 'Os rituais de gestão são consistentes e geram alinhamento, produtividade e engajamento no time.' } },
      { text: 'De 0 a 10, os vendedores sentem que têm um líder que os desenvolve e apoia no processo comercial?', feedbacks: { low: 'Os vendedores não se sentem apoiados pela liderança, o que gera desmotivação.', mid: 'A liderança está presente, mas ainda pode melhorar no desenvolvimento e suporte.', high: 'Os vendedores se sentem desenvolvidos e apoiados pela liderança, o que gera motivação e alta performance.' } },
    ],
  },
  {
    id: 'treinamento',
    name: 'Treinamento e Desenvolvimento',
    icon: '🎓',
    dreg: 'Educar',
    sectionFeedback: {
      low: 'O time não recebe treinamentos regulares e não há planos de desenvolvimento. Isso compromete a evolução das habilidades e aumenta a rotatividade.',
      mid: 'Há treinamentos ocasionais, mas sem estrutura contínua. Criar um programa regular de desenvolvimento vai acelerar a evolução do time e reduzir o turnover.',
      high: 'A empresa tem uma forte cultura de aprendizado. Os vendedores são treinados regularmente e têm planos de desenvolvimento claros.',
    },
    questions: [
      { text: 'De 0 a 10, o time recebe treinamentos regulares sobre técnicas de vendas e mercado?', feedbacks: { low: 'Não há treinamentos regulares, comprometendo o desenvolvimento das habilidades comerciais.', mid: 'Ocasionalmente são feitos treinamentos, mas sem uma estrutura contínua.', high: 'O time recebe treinamentos regulares e estruturados, mantendo as habilidades sempre atualizadas.' } },
      { text: 'De 0 a 10, os vendedores sabem como evoluir dentro da empresa e têm um plano de desenvolvimento?', feedbacks: { low: 'Não há clareza sobre crescimento na empresa, o que pode gerar desmotivação.', mid: 'Há alguma orientação sobre crescimento, mas os planos de desenvolvimento não são formalizados.', high: 'Os vendedores têm planos de desenvolvimento claros e entendem seu caminho de crescimento.' } },
      { text: 'De 0 a 10, a cultura da empresa incentiva o aprendizado contínuo e a melhoria da performance comercial?', feedbacks: { low: 'O aprendizado não faz parte da cultura da empresa.', mid: 'Há algum incentivo ao aprendizado, mas a cultura ainda não é totalmente orientada à melhoria contínua.', high: 'O aprendizado contínuo é parte da cultura da empresa, gerando equipes mais resilientes e de alta performance.' } },
    ],
  },
]

// Mesmas faixas do leadSchema (FAIXAS_VENDEDORES / FAIXAS_FATURAMENTO) para que
// o lead do diagnóstico chegue ao Pipedrive consistente com os demais formulários.
export const tamanhoOptions = ['1-5', '6-20', '21-50', '51-100', '100+']
export const faturamentoOptions = [
  'Até R$ 100k/mês',
  'R$ 100k–500k/mês',
  'R$ 500k–1M/mês',
  'R$ 1M–5M/mês',
  'Acima de R$ 5M/mês',
]

export const PUBLIC_DOMAINS = [
  'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'live.com',
  'icloud.com', 'uol.com.br', 'bol.com.br', 'terra.com.br', 'ig.com.br', 'r7.com', 'oi.com.br',
]

/** Trilha recomendada por etapa DREG (etapa mais fraca do diagnóstico). */
export const trilhaPorEtapa: Record<DregEtapa, { label: string; href: string }[]> = {
  Desenhar: [
    { label: 'Sales Strategy', href: '/imersoes/sales-strategy' },
    { label: 'Máquina de Vendas', href: '/servicos/maquina-de-vendas' },
  ],
  Recrutar: [{ label: 'Máquina de Vendas', href: '/servicos/maquina-de-vendas' }],
  Educar: [
    { label: 'Universidade · Sales Pro', href: '/universidade/sales-pro' },
    { label: 'Sales Leadership', href: '/imersoes/sales-leadership' },
  ],
  Gerenciar: [
    { label: 'Sales Leadership', href: '/imersoes/sales-leadership' },
    { label: 'Sales Advisory', href: '/sales-advisory' },
  ],
}

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function getFeedbackType(score: number): 'low' | 'mid' | 'high' {
  if (score <= 4) return 'low'
  if (score <= 7) return 'mid'
  return 'high'
}

export function getClassification(score: number) {
  if (score <= 4)
    return { label: '🔴 Operação em risco', cor: '#FA0100', desc: 'Sua operação comercial tem lacunas críticas que estão impedindo o crescimento. É urgente estruturar os fundamentos.' }
  if (score <= 7)
    return { label: '🟡 Em desenvolvimento', cor: '#F59E0B', desc: 'Você tem uma base razoável, mas há oportunidades claras de melhoria. Com ajustes estratégicos, o crescimento pode ser acelerado.' }
  return { label: '🟢 Alta performance', cor: '#22C55E', desc: 'Sua operação comercial está madura e estruturada. O foco agora é manter a consistência e buscar excelência nos detalhes.' }
}

export function getScoreColor(score: number): string {
  if (score <= 4) return '#FA0100'
  if (score <= 7) return '#F59E0B'
  return '#22C55E'
}
