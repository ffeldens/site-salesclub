import type { Mentor, Faq } from '@/lib/content'

/**
 * Cursos da Universidade Sales Club. Migrado de salesclub.com.br/universidade/sales-pro.
 * Estrutura preparada para novos cursos (índice + detalhe por slug).
 * Migra para o Sanity na Fase 4.
 */

export type CursoModulo = { periodo: string; titulo: string; eixo: string }

export type Curso = {
  slug: string
  titulo: string
  headline: string
  subtitulo: string
  resumo: string
  descricao: string
  duracao: string
  formato: string
  certificado: string
  modulos: CursoModulo[]
  metodologia: { titulo: string; descricao: string }[]
  instrutores: Mentor[]
  paraQuem: string[]
  beneficios: string[]
  incluido: string[]
  faq: Faq[]
  ctaLabel: string
}

export const cursos: Curso[] = [
  {
    slug: 'sales-pro',
    titulo: 'Formação Sales Pro',
    headline:
      'Método para a sua atuação, ritmo para o seu funil e previsibilidade para o seu fechamento',
    subtitulo:
      'Programa de formação contínua de 12 meses que transforma técnicas isoladas de negociação em comportamento padronizado de alta performance — integrado à rotina diária do time de vendas.',
    resumo:
      'Sales Pro é a formação online (síncrona e assíncrona) de 12 meses da Universidade Sales Club para times de vendas. Combina aulas ao vivo no Zoom (com 96h para assistir à gravação), simulações e clínicas de certificação, transformando técnica isolada em comportamento padronizado de alta performance.',
    descricao:
      'Uma formação contínua desenhada para transformar técnicas isoladas em comportamento padronizado de alta performance. A metodologia se integra diretamente à rotina diária, com execução prática imediata já a partir do primeiro módulo — não é uma tarefa a mais na agenda, é a própria operação virando treino.',
    duracao: '12 meses',
    formato: 'Online híbrido — síncrono (Zoom) + assíncrono (gravações por 96h)',
    certificado: 'Certificação Master 360° (75%+ de presença, aplicação prática e média 8.0+)',
    modulos: [
      { periodo: 'Jan', titulo: 'Mindset de Tração', eixo: 'Mindset' },
      { periodo: 'Fev', titulo: 'Pipeline e Rotina', eixo: 'Process' },
      { periodo: 'Mar', titulo: 'Diagnóstico e Conexão', eixo: 'Investigation' },
      { periodo: 'Abr', titulo: 'Prospecção Consultiva', eixo: 'Opening' },
      { periodo: 'Mai', titulo: 'Pitch & Storytelling', eixo: 'Presentation' },
      { periodo: 'Jun', titulo: 'Negociação e Fechamento', eixo: 'Conversion' },
      { periodo: 'Jul', titulo: 'Follow-up e Recorrência', eixo: 'Maintenance' },
      { periodo: 'Ago', titulo: 'Neurociência em Vendas', eixo: 'Behavior' },
      { periodo: 'Set', titulo: 'Indicadores e Performance', eixo: 'Analysis' },
      { periodo: 'Out', titulo: 'CRM, Execução e IA', eixo: 'Tools' },
      { periodo: 'Nov', titulo: 'Comunicação e Alinhamento', eixo: 'Soft Skills' },
      { periodo: 'Dez', titulo: 'Cliente no Centro', eixo: 'Culture' },
    ],
    metodologia: [
      { titulo: 'Aula Magna', descricao: 'O mentor estabelece os padrões de mercado.' },
      { titulo: 'Aula Técnica', descricao: 'Processos passo a passo e scripts.' },
      { titulo: 'Treinamento', descricao: 'Simulações de venda (roleplay) com feedback.' },
      { titulo: 'Clínica', descricao: 'Avaliação e certificação do módulo.' },
    ],
    instrutores: [
      { nome: 'Viviane Machado', cargo: 'Especialista em enablement', bio: '10+ anos em T&D; liderou times nacionais na Proteste.' },
      { nome: 'Luiz Paulo Teixeira', cargo: 'CEO do Sales Club', bio: '20+ anos em educação executiva; passagem estratégica pela FGV.' },
      { nome: 'Raphael Lassance', cargo: 'Sócio-mentor', bio: 'Fundador da primeira agência de growth hacking do Brasil; 20+ anos.' },
      { nome: 'Hélio Azevedo', cargo: 'CRO do Sales Club', bio: '30+ anos em IBM, Microsoft e SAP; operações de vendas B2B e receita recorrente.' },
      { nome: 'Felipe Feldens', cargo: 'COO do Sales Club', bio: 'Estratégia, inovação e transformação organizacional; AI advisor.' },
    ],
    paraQuem: [
      'Vendedores profissionais que buscam alta performance',
      'Representantes comerciais que gerem carteira de forma independente',
      'Líderes e gestores de vendas que desenvolvem cultura de execução no time',
    ],
    beneficios: [
      'Processo padronizado para resultados mensais previsíveis',
      'Fim da volatilidade — adeus ao "efeito montanha-russa"',
      'Valor aplicável já no primeiro mês',
      'Técnicas modulares aplicáveis sem pré-requisitos',
      'Seu funil real como material de estudo',
      'Crescimento de carreira sem instabilidade',
    ],
    incluido: [
      'Plataforma Universidade Sales Club (acesso web, login individual)',
      'Acesso permanente às gravações dos módulos',
      'Ferramentas, templates e recursos na plataforma',
      'Sessões no Zoom com simulações de roleplay em grupo',
      'Acesso ao Sales Village para intensivos presenciais quando aplicável',
      'Mentoria com feedback direto dos instrutores nas clínicas',
    ],
    faq: [
      { pergunta: 'Como o curso se integra à agenda de quem já trabalha?', resposta: 'As atividades diárias do time viram o próprio treino prático. A formação se integra à rotina, em vez de competir com ela — você aplica no funil real enquanto aprende.' },
      { pergunta: 'Em quanto tempo vejo resultados?', resposta: 'Há ganhos imediatos a cada módulo, com aplicação prática já no primeiro mês. O ciclo anual garante consistência e consolidação de longo prazo.' },
      { pergunta: 'As aulas são ao vivo ou gravadas?', resposta: 'Ambos. As sessões são ao vivo no Zoom, com uma janela de 96 horas para assistir à gravação — autonomia total para encaixar no seu ritmo.' },
      { pergunta: 'Serve para quem está começando e para quem é experiente?', resposta: 'Sim. Vai do início de carreira (com mentalidade de elite) ao profissional experiente em busca de refinamento e padronização.' },
      { pergunta: 'Por que a formação é de 12 meses?', resposta: 'O ciclo anual permite o caminho completo de aprender, aplicar, corrigir e consolidar — transformando técnica em comportamento, não em conhecimento esquecível.' },
    ],
    ctaLabel: 'Quero aplicar para o Sales Pro',
  },
]

export function getCursos(): Curso[] {
  return cursos
}

export function getCurso(slug: string): Curso | undefined {
  return cursos.find((c) => c.slug === slug)
}
