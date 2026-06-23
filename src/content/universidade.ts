import type { Mentor, Faq } from '@/lib/content'

/**
 * Cursos da Universidade Sales Club. Sales Pro reconstruído a partir da LP
 * oficial (salesclub.com.br/universidade/sales-pro) — mesma estrutura/seções e
 * copy. Mentor Thiago Concer omitido por decisão do projeto.
 */

export type CursoModulo = { periodo: string; titulo: string; eixo: string }
export type ParTitDesc = { titulo: string; descricao: string }

export type Curso = {
  slug: string
  titulo: string
  headline: string
  subtitulo: string
  tagline?: string
  resumo: string
  duracao: string
  formato: string
  /** Benefícios "arquitetura de aplicação imediata" (4 cards). */
  beneficios: ParTitDesc[]
  /** Pilares do método (3). */
  pilares: ParTitDesc[]
  manifesto: { texto: string; destaque: string }
  modulos: CursoModulo[]
  metodologia: ParTitDesc[]
  certificacao: { titulo: string; descricao: string; requisitos: string[]; img?: string }
  instrutores: Mentor[]
  paraQuem: ParTitDesc[]
  incluido: string[]
  faq: Faq[]
  ctaLabel: string
}

export const cursos: Curso[] = [
  {
    slug: 'sales-pro',
    titulo: 'Formação Sales Pro',
    headline: 'Método para a sua atuação, ritmo para o seu funil e previsibilidade para o seu fechamento',
    subtitulo:
      'Garanta método para a sua atuação, ritmo para o seu funil e previsibilidade para o seu fechamento de vendas.',
    tagline:
      'Um programa desenhado para transformar técnicas isoladas de negociação em um comportamento padrão de alta performance.',
    resumo:
      'Sales Pro é a formação online (síncrona e assíncrona) de 12 meses da Universidade Sales Club para profissionais de vendas. Combina aula magna, aula técnica, treinamento (roleplay) e clínica de certificação a cada módulo, integrando o aprendizado à rotina e transformando técnica isolada em comportamento padrão de alta performance.',
    duracao: '12 meses',
    formato: 'Online híbrido — síncrono (Zoom) + assíncrono (gravações por 96h)',
    beneficios: [
      { titulo: 'Evolução gradual e consistente', descricao: 'Você não espera a conclusão para ver resultado: a formação gera ganho técnico e prático ao final de cada mês.' },
      { titulo: 'Independência modular', descricao: 'Aplique as técnicas de Negociação imediatamente, sem depender do módulo de Prospecção.' },
      { titulo: 'Aprendizado contextualizado', descricao: 'Nada de cenários hipotéticos: você executa no seu funil atual, transformando seus leads em objeto de estudo e prática.' },
      { titulo: 'Integração com a sua agenda', descricao: 'O conteúdo não é "mais uma tarefa", e sim uma ferramenta de trabalho que dá eficiência ao que você já faz.' },
    ],
    pilares: [
      { titulo: 'Ritmo e previsibilidade', descricao: 'Um funil saudável não depende de sorte. Com processo, você mantém uma cadência de prospecção e fechamento estável o ano todo.' },
      { titulo: 'Domínio da execução', descricao: 'A meta vira plano de ação: você sabe o que fazer a cada dia para construir o resultado — confiança do método no lugar da ansiedade.' },
      { titulo: 'Consistência de elite', descricao: 'Resultados se constroem com padronização. Conhecimento vira resiliência e um crescimento de carreira livre de "montanhas-russas".' },
    ],
    manifesto: {
      texto:
        'A distância entre saber vender e bater a meta todo mês é a disciplina de execução. O Sales Pro estrutura sua evolução em ciclos mensais, garantindo que cada nova técnica seja imediatamente aplicada e replicada no seu funil.',
      destaque: 'Você não estuda para passar numa prova. Você treina para dominar o seu mercado.',
    },
    modulos: [
      { periodo: 'Jan', titulo: 'Mindset de Tração', eixo: 'Mentalidade' },
      { periodo: 'Fev', titulo: 'Pipeline e Rotina', eixo: 'Processo' },
      { periodo: 'Mar', titulo: 'Diagnóstico e Conexão', eixo: 'Investigação' },
      { periodo: 'Abr', titulo: 'Prospecção Consultiva', eixo: 'Abertura' },
      { periodo: 'Mai', titulo: 'Pitch & Storytelling', eixo: 'Apresentação' },
      { periodo: 'Jun', titulo: 'Negociação e Fechamento', eixo: 'Conversão' },
      { periodo: 'Jul', titulo: 'Follow-up e Recorrência', eixo: 'Manutenção' },
      { periodo: 'Ago', titulo: 'Neurociência em Vendas', eixo: 'Comportamento' },
      { periodo: 'Set', titulo: 'Indicadores e Performance', eixo: 'Análise' },
      { periodo: 'Out', titulo: 'CRM, Execução e IA', eixo: 'Ferramentas' },
      { periodo: 'Nov', titulo: 'Comunicação e Alinhamento', eixo: 'Soft Skills' },
      { periodo: 'Dez', titulo: 'Cliente no Centro', eixo: 'Cultura' },
    ],
    metodologia: [
      { titulo: 'Aula magna', descricao: 'O mentor convidado estabelece o padrão de mercado e a mentalidade do módulo, conectando o tema à realidade dos seus negócios.' },
      { titulo: 'Aula técnica', descricao: 'Processo, scripts e o "como fazer" passo a passo para executar a estratégia definida.' },
      { titulo: 'Treinamento', descricao: 'Simulações de venda (roleplay) em ambiente seguro, com feedback imediato antes de ir para o cliente real.' },
      { titulo: 'Clínica', descricao: 'Momento de avaliar o aprendizado, corrigir rotas e obter a certificação do módulo.' },
    ],
    certificacao: {
      titulo: 'Certificação Master 360°',
      descricao: 'Uma chancela de competência técnica validada pelo mercado, conquistada ao longo dos 12 módulos.',
      requisitos: [
        'Disciplina — presença acima de 75%',
        'Execução — aplicação prática comprovada no funil',
        'Padrão Elite — média acima de 8.0',
      ],
      img: '/images/sales-pro/certificacao-master-360.webp',
    },
    instrutores: [
      { nome: 'Viviane Machado', cargo: 'Especialista em Enablement', bio: '10+ anos em Treinamento & Desenvolvimento, com passagem estratégica pela Proteste e background em consultoria de Máquina de Vendas.', foto: '/images/mentores/viviane-machado.webp' },
      { nome: 'Luiz Paulo Teixeira', cargo: 'CEO do Sales Club', bio: '20+ anos em educação executiva e estratégia empresarial; papel estratégico na FGV, conectando formação de lideranças e resultados de negócio.', foto: '/images/mentores/luiz-paulo-teixeira.webp' },
      { nome: 'Raphael Lassance', cargo: 'Sócio-mentor', bio: 'Fundador da primeira agência de growth hacking do Brasil; 20+ anos ajudando empresas a crescer com método, métricas e ROI.', foto: '/images/mentores/raphael-lassance.webp' },
      { nome: 'Hélio Azevedo', cargo: 'CRO do Sales Club', bio: '30+ anos em IBM, Microsoft e SAP; estrutura operações comerciais previsíveis, escaláveis e orientadas a dados.', foto: '/images/mentores/helio-azevedo.webp' },
      { nome: 'Felipe Feldens', cargo: 'COO do Sales Club', bio: 'Especialista em estratégia, inovação e transformação organizacional; advisor em IA aplicada aos negócios.', foto: '/images/mentores/felipe-feldens.webp' },
    ],
    paraQuem: [
      { titulo: 'Vendedores profissionais', descricao: 'Para quem busca alta performance: construir o resultado com antecedência e estratégia, negociar valor e elevar a qualidade dos fechamentos.' },
      { titulo: 'Representantes comerciais', descricao: 'Para quem atua com autonomia e gere a própria carteira como um negócio — estrutura para escalar com organização e fortalecer a base de clientes.' },
      { titulo: 'Líderes e gestores de vendas', descricao: 'Para quem desenvolve talentos e sustenta metas: instalar uma cultura de execução técnica e se tornar o mentor do time.' },
    ],
    incluido: [
      '12 meses de formação continuada na Universidade Sales Club',
      'Aula magna, aula técnica, treinamento (roleplay) e clínica em cada módulo',
      'Gravações das aulas com janela de 96h para assistir e validar presença',
      'Encontros interativos via Zoom',
      'Certificação Master 360°',
      'Ambiente Sales Village (sede em SP) com infraestrutura executiva para os intensivos',
    ],
    faq: [
      { pergunta: 'Como a formação se integra à agenda do executivo?', resposta: 'A metodologia foi desenhada para ser aplicada durante o seu trabalho, transformando suas atividades diárias em treino prático. O objetivo não é adicionar tarefas, mas dar eficiência ao que você já faz.' },
      { pergunta: 'Em quanto tempo começo a ver resultados práticos?', resposta: 'A aplicação é imediata. Os módulos geram ganho rápido e independente a cada mês. A jornada anual transforma esses ganhos em consistência e maturidade de longo prazo, evitando que o resultado seja passageiro.' },
      { pergunta: 'Como funciona a flexibilidade para acompanhar as aulas?', resposta: 'Você tem total autonomia. As aulas ficam gravadas na Universidade Sales Club; para a certificação do módulo, há uma janela de 96 horas (4 dias) para assistir e validar a presença no seu melhor horário.' },
      { pergunta: 'Qual o racional de investimento do programa?', resposta: 'O Sales Pro é um aporte em previsibilidade. O custo está em manter um funil instável, perder oportunidades por falha técnica ou treinar sem ver evolução. Aqui, o foco é o retorno direto sobre a execução e a performance.' },
      { pergunta: 'Qual o perfil de senioridade indicado?', resposta: 'Atende desde quem deseja iniciar a carreira já com mentalidade e processos de elite (sem vícios de mercado) até profissionais experientes que buscam refinamento técnico para se tornarem Top Performers.' },
      { pergunta: 'Por que a metodologia aposta em um ciclo anual?', resposta: 'O ciclo anual permite aprender, aplicar, corrigir e consolidar o comportamento — transformando a técnica em instinto comercial natural.' },
      { pergunta: 'Como acesso o ambiente de aprendizado?', resposta: 'De forma simples e centralizada: os encontros ocorrem via Zoom e todas as gravações, materiais e ferramentas ficam na Universidade Sales Club, com login individual e exclusivo.' },
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
