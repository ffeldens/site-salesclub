# PRD — Website Sales Club

**Documento 2 de 2** · Documento de Requisitos para desenvolvimento no Claude Code
Versão: 0.1 (rascunho para validação) · Data: 19/06/2026
Pré-leitura: `Sales_Club_Analise_e_Estrategia.md`

> Este documento foi escrito para ser usado diretamente no **Claude Code** como especificação. Recomenda-se colá-lo (ou parte dele) em um `CLAUDE.md` na raiz do repositório e construir página a página seguindo a seção 12 (Roadmap).

---

## 1. Visão e objetivos

Construir o novo site do Sales Club, unificando as propriedades hoje fragmentadas (WordPress/Elementor, Lovable, HTML) em **um único domínio, design system e stack**, cumprindo três objetivos:

1. **Autoridade/branding** — "o maior ecossistema de vendas do Brasil".
2. **Geração de leads** — captura qualificada integrada ao **Pipedrive**.
3. **Venda de programas** — imersões, serviços, Sales Board, app de OKRs.

### Métricas de sucesso (KPIs)
- Taxa de conversão de LP de imersão (visitante → lead) ≥ baseline atual + 20%.
- 100% dos leads chegam ao Pipedrive com UTMs e origem preenchidos.
- Core Web Vitals: LCP < 2,5s, CLS < 0,1, INP < 200ms (mobile).
- Páginas de serviço indexáveis (corrigir `noindex`).
- Lighthouse SEO ≥ 95, Performance ≥ 90 (mobile).
- **GEO**: aparecer como fonte citada para um conjunto de ~20 prompts-alvo ("melhor imersão de vendas para empresários", "como dar previsibilidade à área comercial", etc.) no ChatGPT, Perplexity, Google AI Overviews e Gemini — medição manual semanal (ver seção 8B).

---

## 2. Stack e decisões técnicas

| Camada | Escolha | Observação |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSR/SSG, SEO, ecossistema React (mesmo do app OKRs) |
| Estilo | **Tailwind CSS** + design tokens | Tokens a partir do brand guide |
| UI/components | Componentes próprios + (opcional) shadcn/ui | Biblioteca de blocos reutilizáveis |
| CMS | **Sanity** (headless) | Marketing edita LPs, posts e materiais sem código |
| Hospedagem | **Vercel** | Mesmo provedor do app OKRs |
| Forms/Integração | API Routes (serverless) → **Pipedrive API** | Validação server-side + anti-spam |
| Analytics | GA4 + Google Tag Manager + Meta Pixel | Pixels já usados nas LPs atuais |
| Captura de leads alternativa | WhatsApp Business (deep link) | CTA "Falar com especialista" |

**Repositório:** monorepo simples ou repo único Next.js. Branch `main` (produção) + `preview` (staging na Vercel).

---

## 3. Princípios de design

- **Mobile-first** (tráfego social/pago vem majoritariamente do mobile).
- **Premium/B2B**: limpo, com respiro, tipografia forte, uso de prova social e do Sales Village.
- **Design system com tokens** do brand guide (cores, tipografia, espaçamentos, raios, sombras). *(Anexar brand guide; se ausente, extrair do site atual.)*
- **Acessibilidade** AA (contraste, foco, labels, navegação por teclado, alt em imagens).
- **Velocidade**: imagens `next/image` (WebP/AVIF), lazy-load, fontes com `display: swap`.

---

## 4. Arquitetura de informação (rotas)

```
/                         Home (hub do ecossistema)
/imersoes                 Índice de imersões
/imersoes/[slug]          sales-strategy | sales-leadership | sales-ai
/servicos                 Índice de serviços produtizados (B2B, foco PME/scale-up)
/servicos/[slug]          maquina-de-vendas | diagnostico-comercial
/corporate                Hub enterprise/grande conta (Bayer, Axia, Unipar...)
/corporate/[slug]         capacitacoes | palestras | convencoes | projetos-especiais | mentoria
/elite                    Comunidade de empresários (membership; aplicação p/ entrar)
/sales-board              Produto Sales Board
/produtos/okrs            Vitrine do app de OKRs (login externo)
/sales-village            Ativo de marca + produto de locação (eventos + estúdio de podcast, 10–150 pessoas)
/sobre                    Ecossistema, mentores, manifesto
/cases                    Resultados / prova social
/conteudo                 Blog (índice)
/conteudo/[slug]          Post
/materiais                Lead magnets (índice)
/materiais/[slug]         LP de isca + form
/lp/[campanha]            TEMPLATE de landing page de campanha
/links                    Hub de bio social
/contato
/politica-de-privacidade
```

Redirects 301 das URLs atuais (incl. `salesclub.mudacao.com.br`, `salesclubtelecom.com.br`, `/imersao-presencial/*`) para as novas rotas.

---

## 5. Biblioteca de componentes (blocos reutilizáveis)

Construir como componentes parametrizáveis (props vindas do CMS):

1. **Header/Nav** — logo, menu, CTA persistente, versão sticky mobile.
2. **HeroImersao** — título, subtítulo, badges (Presencial / Data / Local), vídeo de fundo (Vimeo), CTA duplo (Aplicar + WhatsApp), botões "adicionar à agenda" (Google/Outlook).
3. **HeroInstitucional** — variação para Home/serviços.
4. **LogosProvaSocial** — grid de logos de clientes (Google, Coca-Cola, Disney, etc.).
5. **Stats** — números animados (empresários, nota de satisfação, % crescimento).
6. **Modulos** — cards de módulos 1–4 (imersões).
7. **Mentores** — cards com foto, nome, cargo, bio.
8. **Beneficios** — blocos "o que muda na sua operação".
9. **ParaQuem** — segmentos de público.
10. **Depoimentos** — carrossel/quotes + nome/empresa.
11. **FAQ** — accordion (SEO: schema FAQPage).
12. **SalesVillage** — galeria + descrição da sede.
13. **CTASection** — faixa de conversão recorrente.
14. **FormLead** — formulário inteligente (ver seção 6).
15. **CardConteudo / CardMaterial** — para blog e lead magnets.
16. **Footer** — endereço, CNPJ, redes, política de privacidade.
17. **WhatsAppFloat** — botão flutuante com mensagem parametrizável por página.

---

## 6. Formulários e integração com Pipedrive (requisito central)

### 6.1 Comportamento
- Formulários renderizados a partir de uma definição (campos configuráveis por LP no CMS).
- Submit via **API Route** server-side (`/api/lead`). Nunca expor token do Pipedrive no client.
- Validação client + server (zod). Mensagens de erro claras.
- **Anti-spam**: honeypot + Cloudflare Turnstile (ou reCAPTCHA) + rate limiting por IP.
- Após sucesso: tela/estado de agradecimento + (opcional) redirect para WhatsApp ou entrega do material.

### 6.2 Campos padrão (qualificação rica — inspirado em Full Sales/DNA)
- Nome completo* · E-mail* · WhatsApp* · Cargo (select: Sócio/CEO; Diretor/Head; Gerente/Coord.; Vendedor/SDR/Closer; Outro)
- Empresa · Nº de vendedores/colaboradores (faixas) · Faturamento médio mensal (faixas) · Segmento
- Consentimento LGPD* (checkbox + link política)
- Campos ocultos: `utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid, page_url, referrer`

### 6.3 Mapeamento Pipedrive
- Criar/atualizar **Person** (nome, e-mail, telefone).
- Criar **Lead** ou **Deal** no pipeline/stage definido (ex.: "Inbound - Site"), com:
  - Título: `[Produto] — [Nome] — [Empresa]`
  - Custom fields: cargo, nº vendedores, faturamento, segmento, origem da página, UTMs, gclid.
  - Source/Channel: mapear `utm_source/medium`.
- Idempotência: evitar duplicar Person pelo e-mail.
- Tratamento de erro: se Pipedrive falhar, registrar lead em fallback (log/e-mail) e nunca perder o lead.
- **Roteamento por origem**: cada linha de negócio cai em um pipeline/stage distinto no Pipedrive:
  - **Imersões** → pipeline de inscrição/aplicação por turma.
  - **Serviços** (Máquina de Vendas, Diagnóstico) → pipeline inbound de serviços.
  - **Corporate** (`/corporate/*`) → CTA "Solicitar proposta/briefing", pipeline **Enterprise/In Company** com campos extras (nº de colaboradores a treinar, formato, data/evento) e SLA consultivo.
  - **ELITE** (`/elite`) → CTA "Aplicar para a comunidade", pipeline de membership (aplicação + qualificação de perfil).
  - **Sales Village** (`/sales-village`) → CTA "Reservar/Orçar evento", com campos de data, nº de pessoas (10–150), tipo (evento/podcast) e necessidades de produção.
  - **Materiais** → captura simples de lead (nutrição).

> **Pendência de acesso:** API token do Pipedrive, IDs do pipeline/stage e dos custom fields, e definição de Lead vs. Deal.

---

## 7. Template de Landing Page de campanha (`/lp/[campanha]`)

- 100% montável pelo CMS a partir dos blocos da seção 5 (ordem configurável).
- Sem header/footer completos (foco em conversão) — versão "LP mode" com logo + CTA apenas.
- Slots: hero, prova social, benefícios, oferta, depoimentos, FAQ, form/CTA.
- UTMs capturadas automaticamente; pixel/GTM por campanha.
- Usado para verticais (ex.: **Telecom**) e campanhas de mídia paga.

---

## 8A. SEO técnico (Google)

Objetivo: máxima performance na busca tradicional do Google.

- **Renderização SSR/SSG**: todo conteúdo relevante entregue no HTML inicial (sem depender de JS) — resolve o problema atual de páginas client-rendered.
- Metadata dinâmica por rota (`generateMetadata`): title, description, canonical, OG, Twitter card.
- **Corrigir `noindex`** das páginas de serviço (Máquina de Vendas e Diagnóstico Comercial → `index, follow`).
- `sitemap.xml` + `robots.txt` gerados automaticamente; sitemap submetido ao Google Search Console.
- **Schema.org (JSON-LD)** por tipo de página: `Organization`, `Course`/`EducationEvent` (imersões), `Service` (serviços), `FAQPage`, `Article`/`BlogPosting` (blog), `BreadcrumbList`, `Person` (mentores), `Review`/`AggregateRating` (depoimentos).
- **Arquitetura de URLs limpa** e semântica; breadcrumbs; internal linking forte entre imersões ↔ serviços ↔ conteúdo.
- Blog (`/conteudo`) como frente de autoridade/orgânico — principal lacuna vs. concorrentes (Full Sales e DNA investem pesado).
- Imagens otimizadas (`next/image`, AVIF/WebP, alt descritivo) e Core Web Vitals dentro das metas (fator de ranqueamento).
- **E-E-A-T**: páginas de autores/mentores com bio e credenciais; assinatura nos posts; página "Sobre" robusta; CNPJ, endereço (Sales Village) e contato visíveis.
- Migração: **301** de todas as URLs antigas; preservar slugs onde possível; monitorar no Search Console.

## 8B. GEO — Generative Engine Optimization (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude)

GEO é otimizar para ser **recuperado, confiado e citado** pelos motores generativos — que normalmente citam de 3 a 12 fontes por resposta. Estudo de Princeton mostra que técnicas de GEO podem aumentar a visibilidade como fonte em até ~40%. Como o Sales Club já tem autoridade de marca e parte para um SEO novo, é a hora de nascer GEO-ready.

### 8B.1 Acesso técnico para crawlers de IA (pré-requisito)
- `robots.txt` deve **permitir explicitamente** os bots de IA: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI), `ClaudeBot`/`anthropic-ai` (Anthropic), `PerplexityBot`, `Google-Extended` (treino/IA do Google), `Bingbot`/`Amazonbot`/`CCBot` conforme decisão de marca.
- Conteúdo legível **sem JavaScript** (SSR/SSG) — muitos crawlers de IA não executam JS.
- Performance e HTML limpo (semântica: `article`, `section`, `h1–h3`, listas, tabelas).

### 8B.2 `llms.txt` e exports estruturados
- Publicar **`/llms.txt`** na raiz: índice em Markdown das páginas que o Sales Club considera autoritativas (imersões, serviços, sobre, cases, posts-pilar), reduzindo o custo de leitura dos modelos e melhorando a precisão das citações.
- Gerar **`/llms-full.txt`** (conteúdo consolidado) e, por página-chave, versões em Markdown limpo (ex.: rota `.md`) — exports estruturados que RAG consome melhor que HTML.
- *(llms.txt é tática de apoio; conteúdo estruturado e confiável continua sendo o núcleo.)*

### 8B.3 Padrão de conteúdo "answer-first" + fact-density
Toda página e post deve seguir:
- **Bloco de resposta direta de 40–60 palavras no topo** ("quick answer"), respondendo à pergunta-alvo de forma extraível.
- **FAQ alinhada a prompts reais** (com `FAQPage` schema) — perguntas como o usuário faria a uma IA.
- **Densidade factual**: estatísticas com fonte, números próprios (nº de empresários formados, nota de satisfação, % de crescimento), **citações/quotes de especialistas** (mentores) e dados datados. São as alavancas de maior impacto em GEO.
- **Conteúdo em listas e tabelas** quando couber (formatos que LLMs sintetizam e citam bem) — ex.: o quadro comparativo "Sales Club vs. alternativas" (inspirado no Vende-C).
- **Clareza de entidade**: deixar explícito quem é o Sales Club, o que oferece, para quem, onde (Sales Village/SP) e provas — para o modelo associar a marca às consultas certas.

### 8B.4 Frescor (freshness)
- Perplexity penaliza conteúdo desatualizado; AI Overviews prioriza páginas atualizadas nos últimos ~12 meses.
- Exibir `datePublished`/`dateModified` (visível e no schema); rotina de atualização de páginas-pilar a cada 7–14 dias / cadência de novos conteúdos.

### 8B.5 Autoridade fora do site (off-site GEO)
- LLMs citam muito **Reddit, Quora, YouTube, LinkedIn, Wikipedia e mídia**. Plano paralelo (não-código): presença/menções dos sócios e da marca nessas fontes, PR, e dados originais "citáveis" (ex.: pesquisa anual de maturidade comercial do Sales Club) — vira ativo linkável e citável.

### 8B.6 Medição de GEO
- Definir ~20 **prompts-alvo** e rodá-los semanalmente em ChatGPT, Perplexity, Google AI Overviews e Gemini, registrando se/onde o Sales Club é citado (planilha de tracking ou ferramenta tipo LLMrefs/Profound).
- Acompanhar tráfego de referência de domínios de IA no GA4.

> Padrões de citação por engine (para priorização): ChatGPT cita ~3–6 fontes; Perplexity ~8–12 (mais "publisher-friendly", mostra bylines e cards de fonte); Google AI Overviews ~4–8 com forte viés de autoridade de domínio.

---

## 9. Analytics e rastreamento

- GA4 + GTM (data layer com eventos de conversão).
- Meta Pixel (já presente: IDs nas LPs atuais — consolidar).
- Eventos: `view_lp`, `form_start`, `lead_submit`, `whatsapp_click`, `material_download`, `cta_click`.
- UTMs persistidas (cookie/localStorage) para atribuição multi-página até o submit.

---

## 10. Conteúdo a migrar/produzir

- Imersões: Sales Strategy, Sales Leadership, Sales AI (textos, módulos, mentores, FAQ — já existem, migrar).
- Serviços: Máquina de Vendas (squad de 3 especialistas), Diagnóstico Comercial.
- **Corporate** (enterprise/grande conta): hub + 5 páginas-filhas (capacitações/educação corporativa, palestras, convenções, projetos especiais, mentoria). Prova social com clientes enterprise atendidos (Bayer, Axia, Unipar etc.) e cases. CTA "Solicitar proposta". Schema `Service` (e `Event` p/ palestras/convenções).
- **ELITE** (comunidade de empresários): página de produto explicando os pilares (capacitação + Máquina de Vendas + mentoria + networking qualificado), benefícios de associação, depoimentos de membros e CTA "Aplicar para a comunidade". É a expressão do conceito "clube" — diferencial central frente aos concorrentes. Avaliar área de membros logada em fase futura.
- **Sales Village** (espaço): dupla narrativa — (1) ativo de marca/sede; (2) **produto de locação** para eventos e gravação de podcast, serviço completo, 10–150 pessoas. Galeria, formatos de uso, capacidade, serviços inclusos e CTA "Reservar/Orçar". Schema `Place`/`EventVenue`.
- Sales Board e app de OKRs (vitrine).
- Sales Village (galeria + descrição).
- Lead magnet "20 prompts para líderes comerciais" (já existe — virar `/materiais/[slug]`).
- Cases/depoimentos e logos de clientes.
- Mentores (bios e fotos).
- Posts iniciais do blog (definir 5–10 temas de partida).

---

## 11. Requisitos não-funcionais

- **Performance**: Lighthouse mobile Perf ≥ 90, SEO ≥ 95.
- **Acessibilidade**: WCAG 2.1 AA.
- **Segurança**: segredos só em env vars (Vercel); validação server-side; proteção anti-spam; HTTPS; headers de segurança.
- **LGPD**: consentimento explícito, política de privacidade, base legal para contato por e-mail/WhatsApp.
- **Responsividade**: breakpoints mobile/tablet/desktop.
- **Manutenibilidade**: componentes tipados, conteúdo no CMS, documentação no `README`.
- **i18n**: PT-BR (estrutura preparada para futura expansão, não obrigatória na v1).

---

## 12. Roadmap de execução no Claude Code (fases)

**Fase 0 — Setup**
- Inicializar Next.js + TS + Tailwind; configurar ESLint/Prettier; design tokens do brand guide; deploy inicial na Vercel; estrutura de pastas; `CLAUDE.md`.

**Fase 1 — Design system + componentes base**
- Header, Footer, tipografia, botões, grid, tokens; biblioteca de blocos (seção 5) com Storybook ou página `/styleguide`.

**Fase 2 — Integração de leads**
- `/api/lead`, validação zod, anti-spam, cliente Pipedrive, captura de UTMs, fallback. Testar com um form real.

**Fase 3 — Páginas core**
- Home, índices e páginas de Imersões, Serviços, Sales Board, Sales Village, Sobre, Cases, Contato.

**Fase 4 — Template de LP + CMS**
- `/lp/[campanha]`, integração Sanity, montagem por blocos, migrar LP "20 prompts" e vertical Telecom.

**Fase 5 — Blog/Materiais + SEO técnico + GEO**
- `/conteudo`, `/materiais`, metadata dinâmica, sitemap, robots.txt (liberando crawlers de IA), JSON-LD por tipo de página, redirects 301.
- `llms.txt` + `llms-full.txt` + exports em Markdown das páginas-chave.
- Padrão "answer-first" (bloco de 40–60 palavras), FAQs alinhadas a prompts, densidade factual e datas visíveis em todos os templates de conteúdo.

**Fase 6 — QA e lançamento**
- Lighthouse, testes de form→Pipedrive, acessibilidade, cross-browser/mobile, checklist de migração, go-live + monitoramento.

---

## 13. Critérios de aceite (Definition of Done)

- [ ] Todas as rotas da seção 4 implementadas e responsivas.
- [ ] Formulários criam Person + Lead/Deal no Pipedrive com UTMs e custom fields corretos; nenhum lead perdido em falha.
- [ ] Páginas de serviço **indexáveis**; sitemap e robots corretos.
- [ ] Lighthouse mobile: Performance ≥ 90, SEO ≥ 95, Acessibilidade ≥ 90.
- [ ] Core Web Vitals dentro das metas.
- [ ] **SEO técnico**: SSR/SSG em todo conteúdo relevante; JSON-LD válido (testado no Rich Results Test) por tipo de página; 301 de URLs antigas funcionando.
- [ ] **GEO**: `robots.txt` liberando GPTBot/ClaudeBot/PerplexityBot/Google-Extended; `llms.txt` publicado; todo template de conteúdo com bloco "answer-first" (40–60 palavras), FAQ com schema, e data de atualização visível; páginas-chave disponíveis em Markdown limpo.
- [ ] Template `/lp/[campanha]` cria uma LP nova só via CMS, sem deploy de código.
- [ ] Redirects 301 de todas as URLs antigas funcionando.
- [ ] Eventos de analytics disparando corretamente.
- [ ] Conteúdo editável por marketing no CMS.
- [ ] Política de privacidade e consentimento LGPD presentes.

---

## 14. Pendências / decisões em aberto (para Felipe)

1. **Brand guide**: anexar (cores, tipografia, logos) — o `Sales_Club_Brand_Guide.md` existe no projeto; precisa ser disponibilizado ao Claude Code.
2. **Pipedrive**: API token, pipeline/stage de destino, Lead vs. Deal, custom fields.
3. **CMS**: confirmar Sanity (vs. Payload/Strapi) e o escopo do que marketing edita.
4. **Domínio**: consolidar tudo em `salesclub.com.br`? O que fazer com `salesclubtelecom.com.br` (redirect ou manter como campanha)?
5. **App de OKRs**: apenas vitrine + link, ou login integrado já na v1?
6. **Conteúdo**: quem produz os textos do blog e a lista inicial de campanhas/verticais.
7. **Prazo e responsáveis**: quem desenvolve (você no Claude Code? time?), data alvo de go-live.
