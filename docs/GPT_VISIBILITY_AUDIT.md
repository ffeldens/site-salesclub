# Auditoria de visibilidade em IA/busca (GPT Visibility) — ago/2026

Auditoria do site salesclub.com.br para consistência, rastreabilidade e citabilidade
em ChatGPT/Perplexity/Gemini e buscadores. Executada em 27/08/2026 (lote P0).

## Estado técnico (verificado)

| Item | Estado |
|---|---|
| Framework | Next.js 15 (App Router) · npm · rotas em `src/app/*` |
| Conteúdo | `src/content/*.ts` (tipado) + Sanity (só blog, com fallback) |
| Hospedagem | Vercel, deploy automático via GitHub (`ffeldens/site-salesclub`, branch main) |
| Domínio canônico | `https://salesclub.com.br` ✅ (www → 308 → apex) |
| Canonical absoluto | ✅ em todas as páginas (`buildMetadata` → `alternates.canonical`) |
| robots.txt | ✅ libera OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot etc.; inclui `Sitemap:` absoluto e host |
| sitemap.xml | ✅ gerado no build; artigos com `lastmod` (dataAtualizacao) desde este lote |
| JSON-LD | ✅ Organization, Course, Service, Event (+Offer), FAQPage (visíveis), BreadcrumbList |
| SSR | ✅ conteúdo 100% no HTML inicial (SSG/SSR) |
| llms.txt / llms-full.txt | ✅ |
| noindex indevido | não encontrado (noindex apenas em LPs de campanha, intencional) |

## Problemas encontrados e status

### P0-1 · Métrica conflitante: "50 mil" vs "+500 mil" profissionais formados — ⚠️ DECISÃO PENDENTE
- `src/content/universidade-sc.ts` (stats da Universidade, vindo do deck comercial): **"50 mil profissionais formados"**
- Restante do site (`lib/content.ts`, /sobre, servicos.ts, llms-full.txt): **"+500 mil"**
- Pode ser diferença de escopo (alunos da plataforma vs ecossistema), mas publicado sem
  qualificação é contradição. **Não corrigido por exigir decisão comercial** — ver
  `CONTENT_DECISIONS_REQUIRED.md` §1.

### P0-2 · "10 pilares" vs 8 pilares no Diagnóstico — ✅ CORRIGIDO
- A copy da página do Diagnóstico (raspada do site antigo) prometia "10 pilares", mas a
  ferramenta nativa tem **8 pilares** (25 perguntas) — e a própria lista `componentes`
  da página exibia 8 itens.
- Corrigido para "8 pilares" em `servicos.ts` (5x), `ResultadoDREG.tsx` (1x) e
  `servicos/[slug]/page.tsx` (1x).

### P0-3 · Conteúdo duplicado no domínio temporário — ✅ CORRIGIDO
- `sc.mudacao.com.br` servia o site inteiro em paralelo ao canônico.
- Adicionado 308 host-based `sc.mudacao.com.br/* → salesclub.com.br/*` no next.config.

### P0-4 · Grafia da marca — ✅ LIMPO
- Nenhuma ocorrência de "Sales Clube" em texto público (só o domínio de e-mail
  `@salesclube.com.br`, que é infraestrutura, não copy).

### P0-5 · Domínios antigos no código — ✅ LIMPO
- Zero referências a `v5.salesclube.com.br`, `gt.salesclub.com.br`,
  `diagnostico.salesclub.com.br` ou `sitesc.mudacao.com.br` no código/HTML.
- Redirects DESSES domínios (fora do nosso controle de código) → ver
  `GPT_VISIBILITY_EXTERNAL_ACTIONS` na lista externa (DNS/hospedagem de cada um).

### P0-6 · Datas de turmas — ✅ CONSISTENTES
- Fonte única em `src/content/imersoes.ts` (Strategy 10–11/set · Leadership 22–23/out ·
  Sales AI 15/set); listagem e detalhe consomem o mesmo dado.

## Falso positivo registrado
- "Post-lixo `page-2f06997a615504fd` no blog": era o nome do chunk JS da própria página
  (`/_next/static/chunks/app/conteudo/page-<hash>.js`). O blog sempre esteve limpo.
  Um filtro defensivo de rascunhos do Sanity foi mantido em `getPosts` mesmo assim.

## Próximos lotes (P1/P2 — ver conversa/backlog)
- Metadados otimizados das imersões + imagem OG social; comparativo em /imersoes;
  JSON-LD complementar (WebSite, Person, CourseInstance, LocalBusiness);
  artigos de busca genérica; estrutura de cases com URL própria; testes mínimos de SEO;
  doc de monitoramento mensal de citações.
