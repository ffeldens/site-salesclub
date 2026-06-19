# Sales Club — Análise Competitiva e Estratégia do Website

**Documento 1 de 2** · Base para o PRD de desenvolvimento (ver `Sales_Club_Website_PRD.md`)
Data: 19/06/2026 · Autor: Felipe Feldens (COO Sales Club) com apoio do Claude

---

## 1. Objetivo do projeto

Desenvolver o novo website do Sales Club que cumpra simultaneamente três papéis:

1. **Autoridade e branding** — posicionar o Sales Club como "o maior ecossistema de vendas do Brasil" e Felipe/sócios como referência em gestão comercial.
2. **Geração de leads** — capturar e qualificar leads para imersões, serviços e Sales Board, integrando ao **Pipedrive (CRM)**.
3. **Venda de programas/produtos** — apresentar e converter as ofertas (imersões, Máquina de Vendas, Diagnóstico, Sales Board, app de OKRs).

**Escopo da v1:** site institucional multi-página + sistema de landing pages de campanha reutilizáveis.

---

## 2. Diagnóstico das propriedades atuais do Sales Club

Hoje o Sales Club opera com um ecossistema **fragmentado de tecnologias e domínios**, o que é o problema central a resolver.

| Propriedade | URL | Plataforma | Papel | Observação |
|---|---|---|---|---|
| Site institucional | salesclub.com.br | WordPress + Elementor | Hub principal, imersões e serviços | Bem estruturado, mas pesado e dependente de Elementor |
| LP lead magnet IA | salesclub.mudacao.com.br | HTML custom (subdomínio MudAção) | Captura via guia "20 prompts para líderes" | Boa LP de isca, mas fora do domínio principal |
| Movimento Telecom | salesclubtelecom.com.br | Lovable (React) | LP vertical para telecom | Domínio e stack separados; difícil de manter |
| Máquina de Vendas | /servicos/maquina-de-vendas | WordPress + Elementor | Serviço (squad de 3 especialistas) | **`noindex`** — invisível ao Google |
| Diagnóstico Comercial | /servicos/diagnostico-comercial | WordPress + Elementor | Serviço de diagnóstico | **`noindex`** — invisível ao Google |

### Pontos fortes identificados
- **Posicionamento claro e premium**: "máquina de vendas", "previsibilidade", "governança comercial", foco em liderança/decisores B2B.
- **Prova social forte**: logos de Google, Coca-Cola, Disney, Bayer, Subway, iFood, Walmart, Lego; +X empresários, nota de satisfação, % de crescimento.
- **Mentores de peso**: Thiago Concer, Raphael Lassance, Hélio Azevedo, Luiz Paulo Teixeira, Guilherme Junqueira, Gustavo Malavota, etc.
- **Ativo físico diferenciador**: o **Sales Village** (sede própria em SP) — usado como prova de solidez.
- **Estrutura de LP de imersão madura**: hero com data/local + countdown de agenda, módulos, mentores, depoimentos, FAQ extenso, CTA recorrente "Aplicar para a turma".
- **Modelo de conversão dual**: formulário de aplicação + CTA direto para WhatsApp ("Falar com especialista").

### Problemas / oportunidades
- **Fragmentação técnica**: 3 stacks diferentes (WordPress, Lovable, HTML) em ≥3 domínios. Custo de manutenção alto, identidade visual inconsistente, sem design system único.
- **SEO comprometido**: páginas de serviço marcadas `noindex`; conteúdo client-rendered em algumas LPs; sem blog/conteúdo orgânico robusto no domínio principal (concorrentes investem pesado nisso).
- **Dependência de Elementor**: performance e portabilidade limitadas; difícil padronizar componentes.
- **Sem template reutilizável de campanha**: cada LP nova é um esforço manual.
- **Rastreio de origem**: precisa garantir captura de UTMs ponta-a-ponta até o Pipedrive para medir ROI por campanha.
- **CTAs de WhatsApp com texto fixo desatualizado** (mensagens citam datas antigas de janeiro/fevereiro).

---

## 3. Análise das redes sociais

> **Limitação:** LinkedIn (`/company/salesclub-oficial`) e Instagram (`@salesclub_oficial`) exigem login e não puderam ser raspados automaticamente. A análise abaixo é qualitativa/estrutural. Para um audit detalhado de conteúdo, me envie prints ou um export das publicações.

**O que o website precisa fazer em relação às redes:**
- Funcionar como **destino de conversão** do tráfego social (bio do Instagram, posts do LinkedIn) — daí a importância de LPs rápidas e mobile-first.
- Exibir **prova social viva**: embed/curadoria de depoimentos, fotos do Sales Village e de turmas, recortes de conteúdo do LinkedIn dos sócios.
- Ter **Open Graph / cards** bem configurados (já existem no WordPress) para que cada LP compartilhe bonito.
- Centralizar links (substituir "linktree" por uma página `/links` ou hub próprio).

**Recomendações de coerência de marca:** unificar tom (autoridade técnica + previsibilidade), paleta e tipografia entre site e social, e levar o conteúdo educativo do LinkedIn (que gera autoridade) para um **blog/recursos no domínio principal** — hoje uma lacuna frente aos concorrentes.

---

## 4. Benchmark de concorrentes

Analisados sob o mesmo framework: posicionamento, estrutura, ofertas, prova social, conversão e SEO.

### 4.1 Full Sales System (fullsalessystem.com)
- **Posicionamento**: "Venda mais e melhor todos os dias" — máquina de vendas previsível e escalável para PMEs/empresários.
- **Estrutura**: Home, Sobre, Soluções, Cases, Blog, Trabalhe conosco, "Espaço Full Sales" (sede), Agendar demonstração. Hub de subdomínio (fss.) para imersão, calculadora, playbook.
- **Ofertas**: Consultoria, Aceleração, Imersão presencial, Recrutamento comercial, Eventos, CRM próprio, Programa High Sales, IA Comercial (agente de agendamento).
- **Conversão**: CTA único e repetido "Agendar demonstração"; formulário longo de qualificação (cargo, nº colaboradores, faturamento) — qualifica bem o lead.
- **Prova social**: depoimentos com números agressivos de faturamento, selos de imprensa, áreas atendidas.
- **SEO/Conteúdo**: blog ativo e técnico (storytelling B2B, sales enablement, discovery call) — forte em orgânico. WordPress + WP Rocket.
- **Leitura para o Sales Club**: o **formulário de qualificação rico** e a **calculadora** são bons modelos. Sales Club tem posicionamento mais premium/enterprise — deve diferenciar pelo Sales Village, mentores de marca e governança.

### 4.2 DNA de Vendas (dnadevendas.com.br)
- **Posicionamento**: "A mais completa consultoria de vendas do Brasil" — crescimento com previsibilidade, 4 pilares (Processos, Gestão, Tecnologia, Pessoas).
- **Estrutura**: navegação rica por Quem Somos, Serviços (Full Service, Training, For Small, Educação Corporativa, Treinamento, Liderança), Ecossistema DNA (marcas), Resultados, Conteúdo (Blog, Materiais, Podcast), Contato. Presença multi-cidade.
- **Ofertas**: consultoria full-service, treinamento, palestras, educação corporativa + produtos de IA (SalesMeet.io, SalesMeet Edu).
- **Conversão**: formulário robusto e segmentado (segmento, cargo, nº vendedores, tema de interesse); telefones por cidade.
- **Prova social**: +2.200 clientes, 45 segmentos, cases com nomes fortes (MRV, iFood, SumUp, Afya), depoimentos de executivos com números.
- **SEO/Conteúdo**: muito forte — blog, materiais ricos, podcast, "ecossistema" de marcas. WordPress.
- **Leitura para o Sales Club**: referência em **arquitetura de serviços + ecossistema de marcas** e em **biblioteca de materiais/conteúdo**. É o concorrente mais "enterprise/consultoria". Sales Club pode se diferenciar pelo formato **imersão + comunidade ("clube") + IA aplicada**.

### 4.3 Vende-C (vende-c.com)
- **Posicionamento**: "A maior escola de vendas do Brasil" — processo, gestão e técnica (anti "dicas e hacks"). +70 mil alunos, +500 empresas, nota 9.7.
- **Estrutura**: home com vídeo, comparativo (VENDE-C vs. agências vs. outras escolas), ecossistema de soluções, evento PASS2026, área de aluno (login), corporativo.
- **Ofertas**: programa PRO, corporativo, evento anual (PASS), conteúdo. Forte na lógica de **escola/educação** com base de alunos.
- **Conversão**: "Atendimento VIP", formulário com DDI internacional, CTAs "Quero saber mais" recorrentes; vídeo de apresentação.
- **Prova social**: números massivos de alunos, parede de logos, comparativo direto com alternativas.
- **SEO/Conteúdo**: Elementor; forte em marca/topo de funil e eventos.
- **Leitura para o Sales Club**: o **quadro comparativo** ("por que nós vs. alternativas") é uma seção de conversão poderosa que o Sales Club não tem. A lógica de **evento âncora** (PASS) lembra as imersões — Sales Club pode reforçar a agenda de turmas como evento.

### 4.4 V4 Company — Go Modular (referência adicional, não raspada)
- Produto de **consultoria comercial modular** dentro da maior rede de assessoria de marketing/growth do Brasil. Forte em performance/mídia e modelo de franquia. Relevante como referência de **LP de campanha orientada a mídia paga** (estrutura enxuta, foco em formulário). Útil como padrão de LP de tráfego pago, menos como concorrente direto de imersão premium.

### Síntese competitiva
| Critério | Sales Club | Full Sales | DNA de Vendas | Vende-C |
|---|---|---|---|---|
| Proposta central | Ecossistema + imersões premium | Máquina de vendas p/ PME | Consultoria enterprise | Escola de vendas (alunos) |
| Diferencial físico | **Sales Village** | Espaço Full Sales | Multi-cidade | Evento PASS |
| Conteúdo/SEO | **Lacuna a preencher** | Forte | Muito forte | Médio |
| Comparativo "por que nós" | Ausente | Parcial | Parcial | **Forte** |
| Qualificação no form | Básica | **Rica** | **Rica** | Média |
| IA aplicada | Sales AI + app OKRs | IA de agendamento | SalesMeet.io | — |

**Conclusão estratégica:** o Sales Club já tem o posicionamento e a prova social mais "premium/enterprise" do grupo, mas **perde em SEO/conteúdo, em template de campanha e em coesão técnica**. O novo site deve (a) unificar tudo num só domínio e design system, (b) abrir uma frente de conteúdo/autoridade, (c) padronizar LPs de campanha com qualificação rica e UTMs até o Pipedrive, e (d) destacar os diferenciais únicos: Sales Village, mentores de marca, formato clube/comunidade e IA aplicada (Sales AI + app de OKRs).

---

## 5. Arquitetura de Informação (sitemap proposto)

```
/ (Home — hub do ecossistema)
├── /imersoes
│   ├── /imersoes/sales-strategy
│   ├── /imersoes/sales-leadership
│   └── /imersoes/sales-ai
├── /servicos                (ofertas produtizadas — B2B, foco PME/scale-up)
│   ├── /servicos/maquina-de-vendas      (corrigir noindex → index)
│   └── /servicos/diagnostico-comercial  (corrigir noindex → index)
├── /corporate               (HUB enterprise/grande conta — prova: Bayer, Axia, Unipar etc.)
│   ├── /corporate/capacitacoes          (treinamentos in-company / educação corporativa)
│   ├── /corporate/palestras             (palestras e keynotes)
│   ├── /corporate/convencoes            (convenções de vendas / eventos corporativos)
│   ├── /corporate/projetos-especiais    (projetos sob medida)
│   └── /corporate/mentoria              (mentoria executiva / de liderança)
├── /elite                   (COMUNIDADE de empresários: capacitação + Máquina de Vendas + mentoria + networking qualificado — a essência "clube")
├── /sales-board
├── /produtos/okrs            (app de OKRs — vitrine + login externo)
├── /sales-village           (ativo de marca + PRODUTO: locação p/ eventos e estúdio de podcast, serviço completo, 10–150 pessoas — CTA de reserva/orçamento)
├── /ecossistema  (ou /sobre — quem somos, mentores, manifesto)
├── /cases                   (prova social / resultados)
├── /conteudo (blog)         (NOVA frente de autoridade/SEO)
│   └── /conteudo/[slug]
├── /materiais               (lead magnets: ex. "20 prompts p/ líderes")
│   └── /materiais/[slug]    (LP de isca + form Pipedrive)
├── /links                   (hub de bio social)
├── /contato
├── /politica-de-privacidade
└── /lp/[campanha]           (TEMPLATE de landing page de campanha reutilizável)
```

**Jornada de conversão (por intenção):**
- **Topo (autoridade)** → Home / Conteúdo / Materiais → captura de e-mail (lead magnet) → nutrição.
- **Meio (consideração)** → páginas de imersão/serviço → form de aplicação qualificado → Pipedrive (deal) → WhatsApp.
- **Fundo (decisão)** → "Aplicar para a turma" / "Agendar diagnóstico" → atendimento humano.

Todo formulário grava **UTM source/medium/campaign/content/term + página de origem + gclid** no Pipedrive.

---

## 6. Recomendação de stack técnica

**Stack recomendada: Next.js (App Router) + TypeScript + Tailwind CSS, deploy na Vercel, com CMS headless (Sanity) e integração serverless ao Pipedrive.**

Justificativa:

- **Coerência com o que já existe**: o app de OKRs já é React + Supabase + Vercel. Manter Next.js/Vercel unifica o ecossistema técnico e facilita futura área logada/portal de membros.
- **SEO e performance**: Next.js entrega SSR/SSG + Core Web Vitals fortes — resolve a fraqueza atual de SEO e o problema de páginas client-rendered/`noindex`. Supera WordPress+Elementor e Lovable em controle e velocidade.
- **Design system único e componentes reutilizáveis**: um template de LP de campanha (`/lp/[campanha]`) e blocos reutilizáveis (hero, módulos, mentores, depoimentos, FAQ, form) resolvem a fragmentação e aceleram cada campanha nova.
- **Edição por marketing sem código**: **Sanity** (headless CMS) permite à equipe criar/editar LPs, posts e materiais sem depender de dev — ponto que o WordPress hoje cobre e que não podemos perder.
- **Integração Pipedrive**: rotas de API (serverless functions) recebem o form, validam server-side, aplicam anti-spam (honeypot + rate limit/Turnstile) e criam Person + Lead/Deal no Pipedrive via API, carregando UTMs e origem.
- **Ótimo para desenvolvimento no Claude Code**: estrutura de arquivos clara, componentes tipados, fácil de o Claude Code scaffoldar página a página a partir do PRD.

**Alternativa considerada:** *Astro + Tailwind* — excelente para site de conteúdo/marketing com JS mínimo. Foi preterida porque o Sales Club terá formulários dinâmicos, integrações e provável área logada futura, onde o ecossistema Next.js/Vercel (já em uso) é mais vantajoso. *(Se a prioridade fosse apenas marketing estático e custo mínimo, Astro seria a escolha.)*

**Migração:** manter WordPress/Elementor no ar até o novo site cobrir todas as URLs; planejar **redirects 301** das URLs atuais (incl. salesclubtelecom e mudacao subdomain) para preservar SEO. Verticais (ex.: Telecom) viram campanhas dentro de `/lp/[campanha]`.

---

## 7. Próximos passos

1. Validar este diagnóstico e a recomendação de stack.
2. Aprovar o **PRD** (`Sales_Club_Website_PRD.md`) que detalha páginas, componentes, integrações e critérios de aceite.
3. Confirmar acessos: brand guide (cores/tipografia/logos), conta Pipedrive (API token + pipeline/stage de destino), conta Vercel, repositório Git.
4. Definir quem edita conteúdo (escopo do CMS) e a lista inicial de campanhas/verticais.

---

### Fontes consultadas
- [Sales Club — Sales Strategy](https://salesclub.com.br/imersao-presencial/sales-strategy/)
- [Sales Club — Sales Leadership](https://salesclub.com.br/imersao-presencial/sales-leadership/)
- [Sales Club — Máquina de Vendas](https://salesclub.com.br/servicos/maquina-de-vendas/)
- [Sales Club — Diagnóstico Comercial](https://salesclub.com.br/servicos/diagnostico-comercial/)
- [Sales Club — LP "20 prompts"](https://salesclub.mudacao.com.br/)
- [Movimento Sales Club Telecom](https://salesclubtelecom.com.br/)
- [Full Sales System](https://fullsalessystem.com/)
- [DNA de Vendas](https://dnadevendas.com.br/)
- [Vende-C](https://vende-c.com/)
- V4 Company — Go Modular (referência, não raspada)
