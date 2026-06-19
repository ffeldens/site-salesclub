# Website Sales Club

Novo website do **Sales Club** — "o maior ecossistema de vendas do Brasil". Unifica as
propriedades hoje fragmentadas (WordPress/Elementor, Lovable, HTML) em **um único domínio,
design system e stack**, com prioridade absoluta em **SEO + GEO**.

Especificação completa: [`docs/PRD.md`](docs/PRD.md) e [`docs/Estrategia.md`](docs/Estrategia.md).
Instruções para o Claude Code: [`CLAUDE.md`](CLAUDE.md).

## Stack

Next.js (App Router) + TypeScript · Tailwind CSS (tokens do brand guide) · Sanity (CMS, Fase 4) ·
Vercel · Pipedrive (API Routes) · GA4/GTM/Meta Pixel.

## Começando

```bash
npm install
cp .env.example .env.local   # preencher conforme as credenciais chegarem
npm run dev                  # http://localhost:3000
```

Páginas-chave: `/` (Home) e `/styleguide` (design system / biblioteca de blocos).

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run format` | Prettier |

## Estrutura

```
src/
  app/              Rotas (App Router) + api/lead + robots.ts + sitemap.ts
  components/       UI base (ui/) e blocos de CMS reordenáveis (blocks/)
  lib/              Abstrações: content (CMS mock), pipedrive (mock), seo, utm, analytics
  content/          Seed de conteúdo tipado (migra para o Sanity na Fase 4)
public/             Assets + llms.txt
docs/               PRD e Estratégia
```

## Status (roadmap)

- [x] **Fase 0** — Setup: Next+TS+Tailwind, tokens, ESLint/Prettier, estrutura.
- [x] **Fase 1** — Design system + biblioteca de blocos + `/styleguide`.
- [ ] **Fase 2** — Integração de leads (Pipedrive real, Turnstile, rate limit, fallback).
- [ ] **Fase 3** — Páginas core.
- [ ] **Fase 4** — Template `/lp/[campanha]` + CMS Sanity.
- [ ] **Fase 5** — Blog/Materiais + SEO/GEO completos + redirects 301.
- [ ] **Fase 6** — QA e lançamento.

## Pendências de informação

Ver [`CLAUDE.md`](CLAUDE.md) §13. Resumo: credenciais Pipedrive, projeto Sanity, IDs de
analytics, conteúdo de Corporate/ELITE/Sales Village e decisão sobre o app de OKRs. Tudo o que
depende disso está **mockado atrás de uma abstração** com `TODO`.
