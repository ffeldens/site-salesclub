import type { Faq, Stat } from '@/lib/content'

/**
 * Universidade Sales Club — a PLATAFORMA (white-label) que a empresa implementa
 * para estruturar a própria universidade comercial. Produto distinto da
 * Formação Sales Pro (curso online para profissionais). Conteúdo a partir do
 * deck "Sales Club Universidade".
 */

export type PilarPlataforma = { numero: string; titulo: string; nivel: string; itens: string[] }
export type ItemTitDesc = { titulo: string; descricao: string }
export type PassoImplementacao = { numero: string; titulo: string; descricao: string }
export type PlanoUniversidade = { nome: string; faixa: string; preco: string }

export const universidadeSC = {
  hero: {
    eyebrow: 'Universidade Sales Club',
    title: 'A universidade comercial da sua empresa, no ar em até 5 dias',
    subtitle:
      'Uma plataforma white-label de aceleração de vendas — prática, semana a semana — que desenvolve gestores, vendedores e marketing dentro da sua operação.',
  },
  resumo:
    'A Universidade Sales Club é uma plataforma de treinamento de vendas white-label que a sua empresa implementa com a própria marca para desenvolver o time comercial de forma prática e contínua. Combina trilha de aulas gravadas, aulas ao vivo, mentorias, planos de ação e indicadores — estruturada em três pilares (gestão, vendedores e marketing) e implantada pelo time de onboarding em até 5 dias úteis.',
  proposito: {
    intro:
      'Nascemos para mudar a realidade de operações comerciais com um programa prático, que desenvolve o seu time de forma real, semana a semana.',
    itens: [
      'Diminui o trabalho operacional do gestor.',
      'Melhora o marketing e a qualidade da geração de demanda.',
      'Coloca o time de vendas em execução real, elevando a performance semana a semana.',
      'Constrói processos táticos e operacionais sólidos.',
    ],
    fecho: 'Estamos prontos para acelerar operações que já vendem — levando-as a um novo patamar.',
  },
  stats: [
    { valor: '800+', label: 'empresas atendidas' },
    { valor: '50 mil', label: 'profissionais formados' },
    { valor: '10 anos', label: 'de ecossistema' },
    { valor: '300+', label: 'métodos validados' },
  ] satisfies Stat[],
  pilares: [
    { numero: '01', titulo: 'Gestão Comercial', nivel: 'Tático', itens: ['Mentoria ao vivo todo mês', 'Acompanhamento do plano de ação', 'Gestão colaborador a colaborador', 'Painel exclusivo do gestor'] },
    { numero: '02', titulo: 'Vendedores', nivel: 'Operacional', itens: ['Aula gravada + ao vivo toda semana', 'Plano de ação com caminho de resultado', 'Execução acompanhada por indicadores', 'Gamificação com XP e medalhas'] },
    { numero: '03', titulo: 'Marketing', nivel: 'Tático / Estratégico', itens: ['Mentorias exclusivas de gestão', 'Ferramentas de liderança comercial', 'Cultura de alta performance', 'Redução do trabalho operacional'] },
  ] satisfies PilarPlataforma[],
  recursos: [
    { titulo: 'Mentorias de Marketing e Vendas', descricao: 'Mentorias exclusivas para enriquecer a competência operacional dos gestores.' },
    { titulo: 'Trilha de estudos', descricao: 'Trilha completa de aulas gravadas, primordiais para o desenvolvimento da equipe comercial.' },
    { titulo: 'Materiais de sustentação', descricao: 'Materiais complementares na plataforma, prontos para usar nos momentos de execução.' },
    { titulo: 'Aulas ao vivo', descricao: 'Aulas ao vivo com especialistas em temas específicos, com tira-dúvidas e conteúdo na prática.' },
    { titulo: 'Plano de ação', descricao: 'Plano de ação validado para aplicar na equipe comercial e gerar resultados exponenciais.' },
    { titulo: 'Mentorias para gestores', descricao: 'Mentorias ao vivo e gravadas para os gestores aperfeiçoarem o comando das equipes.' },
  ] satisfies ItemTitDesc[],
  paraQuem: [
    { titulo: 'Diretores & CEOs', descricao: 'Estratégia comercial, previsibilidade e escala de receita.' },
    { titulo: 'Líderes comerciais', descricao: 'Gestão de time, métricas, coaching e cultura de performance.' },
    { titulo: 'Vendedores', descricao: 'Venda consultiva, negociação, fechamento e follow-up.' },
    { titulo: 'SDR & BDR', descricao: 'Prospecção, qualificação, cadências e primeiros contatos.' },
    { titulo: 'Key Account', descricao: 'Gestão de carteira, expansão e fidelização de grandes contas.' },
    { titulo: 'Agronegócio', descricao: 'Soluções específicas para times comerciais do agro.' },
  ] satisfies ItemTitDesc[],
  alinhamento: {
    intro: 'Somos transparentes desde o início. A Universidade acelera quem executa:',
    itens: [
      'Não fazemos pela empresa.',
      'Não gerenciamos pela empresa.',
      'Não executamos de forma exclusiva.',
      'Não existe ROI e lucro sem execução.',
    ],
  },
  implementacao: [
    { numero: '01', titulo: 'Alinhamento', descricao: 'Passo a passo do gestor, frequência de uso e modelagem da universidade.' },
    { numero: '02', titulo: 'Configuração', descricao: 'Identidade visual, logo da empresa e personalização completa da plataforma.' },
    { numero: '03', titulo: 'Cadastro', descricao: 'Envie a lista de alunos e gestores. Primeiros acessos liberados em até 2 dias úteis.' },
    { numero: '04', titulo: 'Lançamento', descricao: 'Como lançar a universidade, com as melhores práticas de 800+ empresas parceiras.' },
  ] satisfies PassoImplementacao[],
  implementacaoNota:
    'Nosso time exclusivo de onboarding cuida de tudo — implementação concluída em até 5 dias úteis.',
  planos: [
    { nome: 'Inicial', faixa: 'Até 10 acessos', preco: 'Sob medida' },
    { nome: 'Crescimento', faixa: '11 a 30 acessos', preco: 'Sob medida' },
    { nome: 'Scale', faixa: '31 a 50 acessos', preco: 'Sob medida' },
    { nome: 'Enterprise', faixa: '51 a 120 acessos', preco: 'Sob medida' },
  ] satisfies PlanoUniversidade[],
  roi: {
    fatores: [
      { titulo: 'Gestor com direção clara', descricao: 'Passo a passo ferramentado com indicadores. Menos operacional, mais estratégia.' },
      { titulo: 'Time com plano de ação', descricao: 'Clareza de execução toda semana. O vendedor sabe exatamente o que fazer e como.' },
      { titulo: 'Comitê de alinhamento', descricao: 'Reunião quinzenal de execução para ajustes e aceleração contínua dos resultados.' },
    ] satisfies ItemTitDesc[],
    metricas: [
      { valor: '+32%', label: 'conversão' },
      { valor: '-40%', label: 'tempo de ramp-up' },
      { valor: '+25%', label: 'retenção' },
      { valor: '2x', label: 'previsibilidade' },
    ] satisfies Stat[],
  },
  faq: [
    { pergunta: 'O que é a Universidade Sales Club?', resposta: 'É uma plataforma de treinamento de vendas white-label que a sua empresa implementa com a própria marca, para desenvolver o time comercial de forma prática e contínua — com trilha de aulas, aulas ao vivo, mentorias, planos de ação e indicadores, organizada em três pilares: gestão, vendedores e marketing.' },
    { pergunta: 'Qual a diferença entre a Universidade Sales Club e a Formação Sales Pro?', resposta: 'A Universidade Sales Club é a plataforma corporativa (white-label) que a empresa adota para estruturar a própria universidade comercial, com acessos por colaborador e onboarding dedicado. A Formação Sales Pro é um curso de 12 meses para profissionais de vendas. A empresa pode usar a Universidade como base e o Sales Pro como uma das trilhas.' },
    { pergunta: 'Em quanto tempo a plataforma fica no ar?', resposta: 'O time de onboarding conclui a implementação em até 5 dias úteis, com os primeiros acessos liberados em até 2 dias úteis após o envio da lista de alunos.' },
    { pergunta: 'A plataforma leva a marca da minha empresa?', resposta: 'Sim. A configuração inclui identidade visual, logo e personalização completa — a universidade fica com a cara da sua empresa (white-label).' },
    { pergunta: 'Quantos acessos posso contratar?', resposta: 'Há planos de até 10, de 11 a 30, de 31 a 50 e de 51 a 120 acessos, com investimento mensal sob medida para o tamanho da operação.' },
  ] satisfies Faq[],
}

export function getUniversidadeSC() {
  return universidadeSC
}
