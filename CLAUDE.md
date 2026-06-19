# CLAUDE.md — Website Sales Club

> Arquivo de instruções para o Claude Code. Coloque-o na **raiz do repositório**. Ele resume o projeto, a stack, as convenções e o passo a passo. O detalhamento completo está em `docs/PRD.md` (cole aqui o conteúdo de `Sales_Club_Website_PRD.md`) e `docs/Estrategia.md`.

---

## 1. O que estamos construindo

Novo website do **Sales Club** ("o maior ecossistema de vendas do Brasil"), unificando propriedades hoje fragmentadas (WordPress/Elementor, Lovable, HTML em vários domínios) em **um único domínio, design system e stack**. O site cumpre três objetivos: **autoridade/branding**, **geração de leads** (integrada ao Pipedrive) e **venda de programas**.

Prioridade absoluta de qualidade: **máxima performance em SEO (Google) e GEO (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude)**. Toda decisão técnica deve favorecer isso.

## 2. Stack (decidida — não trocar sem avisar)

- **Next.js (App Router) + TypeScript** — SSR/SSG/ISR. Todo conteúdo relevante deve sair no HTML inicial (sem depender de JS no client).
- **Tailwind CSS** com design tokens derivados do brand guide.
- **Sanity** (headless CMS) — marketing edita LPs, posts e materiais sem código.
- **Vercel** — hospedagem e CI/CD (mesmo ambiente do app de OKRs). Domínio registrado na Hostinger apontando DNS para a Vercel.
- **Pipedrive** — destino dos leads, via API Routes server-side.
- **GA4 + GTM + Meta Pixel** — analytics.

Componentes de UI: próprios + (opcional) shadcn/ui. Validação: **zod**. Anti-spam: honeypot + Cloudflare Turnstile.

## 3. Princípios

- **Mobile-first** (tráfego social/pago vem do mobile).
- **Premium/B2B**: limpo, com respiro, tipografia forte; usar prova social e o Sales Village.
- **Acessibilidade WCAG 2.1 AA**.
- **Performance**: `next/image` (AVIF/WebP), lazy-load, fontes `display: swap`. Metas: Lighthouse mobile Perf ≥ 90, SEO ≥ 95, A11y ≥ 90; LCP < 2,5s, CLS < 0,1, INP < 200ms.
- **Nunca** expor segredos no client. Tokens só em env vars (Vercel).
- Conteúdo no CMS, não hard-coded, sempre que for editável por marketing.

## 4. Arquitetura de rotas

```
/                         Home (hub do ecossistema; destacar ELITE)
/imersoes  +  /imersoes/[slug]        sales-strategy | sales-leadership | sales-ai
/servicos  +  /servicos/[slug]        maquina-de-vendas | diagnostico-comercial
/corporate +  /corporate/[slug]       capacitacoes | palestras | convencoes | projetos-especiais | mentoria
/elite                    Comunidade de empresários (membership)
/sales-board              Produto Sales Board
/produtos/okrs            Vitrine do app de OKRs (login externo)
/sales-village            Ativo de marca + produto de locação (eventos + estúdio de podcast, 10–150 pessoas)
/sobre · /cases
/conteudo + /conteudo/[slug]          Blog
/materiais + /materiais/[slug]        Lead magnets
/lp/[campanha]            TEMPLATE de landing page de campanha (montado via CMS)
/links · /contato · /politica-de-privacidade
```

Linhas de negócio e CTAs: Imersões → "Aplicar para turma"; Serviços → "Falar com especialista"; Corporate → "Solicitar proposta"; ELITE → "Aplicar para a comunidade"; Sales Village → "Reservar/Orçar evento".

Navegação: mega-menu "Soluções" agrupando por categoria (Imersões | Corporate | Serviços | Comunidade & Conselho [ELITE, Sales Board] | Espaço [Sales Village]).

**Migração:** redirects **301** de todas as URLs antigas (`salesclub.com.br/imersao-presencial/*`, `salesclub.mudacao.com.br`, `salesclubtelecom.com.br`) para as novas rotas.

## 5. Biblioteca de componentes (parametrizáveis via CMS)

Header/Nav (mega-menu, CTA sticky), HeroImersao (badges data/local, vídeo Vimeo, CTA duplo, add-to-calendar), HeroInstitucional, LogosProvaSocial, Stats (números animados), Modulos, Mentores, Beneficios, ParaQuem, Depoimentos, FAQ (com schema), SalesVillage (galeria), CTASection, **FormLead** (ver §6), CardConteudo/CardMaterial, Footer, WhatsAppFloat.

Construir tudo como blocos reordenáveis para alimentar o template `/lp/[campanha]`.

## 6. Formulários → Pipedrive (requisito central)

- Submit via **API Route** `/api/lead` (server-side). Validar com zod (client + server). Anti-spam (honeypot + Turnstile + rate limit). Nunca perder lead: se a API do Pipedrive falhar, gravar fallback (log/e-mail).
- Campos padrão: nome*, e-mail*, WhatsApp*, cargo, empresa, nº de vendedores/colaboradores, faturamento, segmento, consentimento LGPD*. Ocultos: `utm_source/medium/campaign/content/term`, `gclid`, `fbclid`, `page_url`, `referrer` (persistir via cookie/localStorage entre páginas).
- Criar/atualizar **Person** (idempotente por e-mail) + **Lead/Deal** no pipeline correto.
- **Roteamento por origem** (pipelines distintos): Imersões | Serviços | Corporate (Enterprise/In Company, com nº de colaboradores/formato/data) | ELITE (membership) | Sales Village (data, nº pessoas 10–150, evento/podcast) | Materiais (nutrição).

> ⚠️ Aguardando credenciais: `PIPEDRIVE_API_TOKEN`, IDs de pipelines/stages e dos custom fields. Até lá, abstrair atrás de um `lib/pipedrive.ts` com as chamadas tipadas e mockar o destino.

## 7. SEO técnico

- `generateMetadata` por rota (title, description, canonical, OG, Twitter).
- Páginas de serviço **indexáveis** (`index, follow`) — hoje estão `noindex`.
- `sitemap.xml` + `robots.txt` automáticos.
- **JSON-LD** por tipo: `Organization`, `Course`/`EducationEvent` (imersões), `Service` (serviços/corporate), `Place`/`EventVenue` (Sales Village), `FAQPage`, `Article`/`BlogPosting`, `BreadcrumbList`, `Person` (mentores), `Review`/`AggregateRating` (depoimentos). Validar no Rich Results Test.
- URLs limpas, breadcrumbs, internal linking forte. E-E-A-T (autores/mentores com bio, CNPJ, endereço do Sales Village visíveis).

## 8. GEO (otimização para motores generativos)

- **robots.txt deve LIBERAR** os crawlers de IA: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `Bingbot` (+ `CCBot`/`Amazonbot` conforme decisão).
- Conteúdo legível **sem JS** (SSR/SSG) — crawlers de IA frequentemente não executam JS.
- Publicar **`/llms.txt`** (índice Markdown das páginas autoritativas) e **`/llms-full.txt`**; expor páginas-chave também em Markdown limpo.
- Padrão de conteúdo em todo template editorial/serviço: **bloco "answer-first" de 40–60 palavras no topo**, **FAQ alinhada a prompts reais** (com schema), **densidade factual** (estatísticas com fonte, números próprios, citações dos mentores), uso de listas/tabelas, e clareza de entidade (quem é o Sales Club, o que faz, para quem, onde).
- **Frescor**: exibir `datePublished`/`dateModified` (visível + schema).

## 9. Analytics

GA4 + GTM (data layer) + Meta Pixel. Eventos: `view_lp`, `form_start`, `lead_submit`, `whatsapp_click`, `material_download`, `cta_click`. Persistir UTMs para atribuição multi-página.

## 10. Variáveis de ambiente (`.env.local` — não commitar)

```
NEXT_PUBLIC_SITE_URL=
SANITY_PROJECT_ID=
SANITY_DATASET=
SANITY_API_TOKEN=
PIPEDRIVE_API_TOKEN=
PIPEDRIVE_PIPELINE_IMERSOES=
PIPEDRIVE_PIPELINE_SERVICOS=
PIPEDRIVE_PIPELINE_CORPORATE=
PIPEDRIVE_PIPELINE_ELITE=
PIPEDRIVE_PIPELINE_VILLAGE=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

## 11. Convenções de código

- TypeScript estrito; sem `any` sem justificativa.
- App Router; Server Components por padrão, Client Components só quando necessário (`"use client"`).
- Componentes em `components/`, blocos de CMS em `components/blocks/`, libs em `lib/`, schemas Sanity em `sanity/`.
- Tailwind com tokens; evitar CSS solto. Nada de cores hard-coded fora dos tokens.
- Acessibilidade e `alt` obrigatórios. Commits pequenos e descritivos (Conventional Commits).
- Rodar `lint` + `typecheck` antes de considerar uma tarefa concluída.

## 12. Roadmap — construir nesta ordem

- **Fase 0 — Setup**: Next.js + TS + Tailwind, ESLint/Prettier, tokens do brand guide, deploy inicial Vercel, estrutura de pastas.
- **Fase 1 — Design system + componentes base** (§5) + página `/styleguide`.
- **Fase 2 — Integração de leads**: `/api/lead`, zod, anti-spam, `lib/pipedrive.ts`, captura de UTMs, fallback. Testar com um form real.
- **Fase 3 — Páginas core**: Home, Imersões, Serviços, Corporate, ELITE, Sales Village, Sales Board, Sobre, Cases, Contato.
- **Fase 4 — Template de LP + CMS (Sanity)**: `/lp/[campanha]`, montagem por blocos; migrar LP "20 prompts" e vertical Telecom.
- **Fase 5 — Blog/Materiais + SEO + GEO**: `/conteudo`, `/materiais`, metadata, sitemap, robots (liberando IA), JSON-LD, `llms.txt`/`llms-full.txt`, padrão answer-first, redirects 301.
- **Fase 6 — QA e lançamento**: Lighthouse, testes form→Pipedrive, A11y, cross-browser/mobile, checklist de migração, go-live + monitoramento.

**Sempre** comece pela Fase 0 e avance em ordem, confirmando comigo ao fim de cada fase.

## 13. Pendências de informação (peça antes de implementar o que depende disso)

1. **Brand guide** (cores, tipografia, logos) — base dos tokens.
2. **Pipedrive**: API token, IDs de pipelines/stages e custom fields, Lead vs. Deal.
3. **Sanity**: confirmar como CMS e escopo do que marketing edita.
4. **Conteúdo** das páginas Corporate, ELITE e Sales Village (textos, capacidade, serviços inclusos, clientes enterprise para prova: Bayer, Axia, Unipar...).
5. **app de OKRs**: só vitrine + link ou login integrado já na v1?

Se faltar algo dessa lista, **implemente atrás de uma abstração e mock**, deixe um `TODO` claro, e siga — não bloqueie o progresso.
