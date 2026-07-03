# HANDOVER — Site Sales Club (salesclub.com.br)

Guia de transferência para quem vai desenvolver e manter o site.
Complementa o `CLAUDE.md` (raiz), o `docs/PRD.md` e o `docs/diagnostico-comercial.md`.

---

## 1. Visão geral

Site institucional do Sales Club — autoridade/branding, geração de leads (Pipedrive)
e venda de programas. Prioridade nº 1 do projeto: **SEO + GEO** (aparecer no Google e
nas respostas de ChatGPT/Perplexity/Gemini).

- **Produção:** https://salesclub.com.br (apex canônico; `www` → 308 → apex)
- **Projeto Vercel:** `salesclub-site` · **Repo:** github.com/ffeldens/site-salesclub
- **Domínio temporário ainda ativo:** sc.mudacao.com.br (aponta pro mesmo deploy)

## 2. Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router, SSG/SSR) + React 19 + TypeScript estrito |
| Estilo | Tailwind CSS 3.4, tokens da marca (dark-first, vermelho `#AF0002`/`#FA0100`, dourado ELITE `#C08B52`, fonte Heebo) |
| CMS | Sanity 4.22 (`/studio`) — **só o blog** lê do CMS hoje; o resto é conteúdo em TS (ver §4). ⚠️ NÃO atualizar para sanity@5 enquanto estiver no Next 15 |
| Leads | Zod (validação) → `/api/lead` → Pipedrive v2 + planilha Google + e-mail (diagnóstico) |
| Analytics | GTM (`GTM-K5CH642X`) + Meta Pixel (`3787907997992821`) no layout; GA4 pronto (aguarda ID) |
| Hospedagem | Vercel (deploy automático via GitHub) |

## 3. Como rodar / publicar

```bash
npm install
npm run dev          # dev server
npm run typecheck    # tsc --noEmit (rodar antes de commitar)
npm run lint
npm run build        # build de produção
```

**Fluxo de publicação:** branch → PR → a Vercel gera uma **Preview URL** automática →
review/aprovação → merge na `main` → **deploy automático em produção**.

⚠️ **Gotcha:** nunca rode `npm run build` com o `npm run dev` aberto — corrompe o `.next`
("Cannot find module ./vendor-chunks"). Se acontecer: pare tudo, `rm -rf .next`, reinicie.

## 4. Mapa de conteúdo — onde editar cada coisa

O conteúdo vive em **`src/content/*.ts`** (tipado). As mudanças mais frequentes:

| O que mudar | Arquivo |
|---|---|
| Edições do Sales Club pelo Brasil (cidades, datas, link de inscrição/botão) | `src/content/eventos.ts` (`proximasEdicoes` / `ultimasEdicoes`; campo `inscricaoUrl` cria o botão "Garantir minha vaga · {data}") |
| Datas/turmas/mentores das imersões (Strategy, Leadership, AI) | `src/content/imersoes.ts` |
| Universidade (plataforma) + Formação Sales Pro (programa, `#sales-pro`) | `src/content/universidade-sc.ts` (plataforma) e `src/content/universidade.ts` (curso + vídeos de alunos) |
| Depoimentos em vídeo do Sales Strategy (22) | `src/content/depoimentos-video.ts` (`featured` = destaque na home/imersão) |
| ELITE: resultados de membros + vídeos | `src/content/elite-membros.ts` |
| Mentores da home/Sobre (lista compartilhada; home = lista + Thiago Concer) | `src/lib/content.ts` (`MENTORES`, `getMentoresHome`) — exibição sempre em ordem alfabética (componente `Mentores`) |
| Stats (+500 mil, +800…) | `src/lib/content.ts` (`STATS`) |
| Menu, contatos, WhatsApp, redes, CNPJ | `src/lib/site.ts` |
| Campos dos formulários (cargos, setores, faixas, dores) | `src/lib/lead-schema.ts` (⚠️ sincronizar com `src/content/diagnostico.ts` e com as opções dos campos no Pipedrive) |
| Blog | Sanity Studio (`/studio`) com fallback em `src/content/conteudo.ts` |
| Diagnóstico (perguntas, pilares, cálculo) | `src/content/diagnostico.ts` + `DiagnosticoTool.tsx` — spec completa em `docs/diagnostico-comercial.md` |
| Redirects 301 | `next.config.mjs` (`redirects()`) |

**Vídeos:** nunca hospedar MP4 no repo. Publicar no YouTube (pode ser "não listado")
e usar o ID no componente `VideoDepoimentos` (thumbnail + player só ao clicar).

## 5. Pipeline de leads (todos os formulários + diagnóstico)

```
FormLead / DiagnosticoTool
  → POST /api/lead  (zod + honeypot)
      ├─ Pipedrive v2  (Organização → Pessoa → Negócio + nota)
      ├─ Planilha Google (backup de TODO lead — Apps Script /exec)
      └─ (diagnóstico) e-mail para o time via Apps Script
```

### Pipedrive (`src/lib/pipedrive.ts`)
- API **v2** (`x-api-token`), base `https://salesclub2.pipedrive.com`.
- Cria **Organização → Pessoa → Negócio** nessa ordem. **Dedup**: Organização por nome,
  Pessoa por e-mail. **Negócio é sempre novo.**
- Campos personalizados vão **aninhados em `custom_fields`** (a v2 rejeita hashes na raiz).
  Hashes mapeados na constante `FK` (vindos do `manual_integracao_pipedrive_2.docx`).
- Campos de lista (enum/set): o código busca as definições em runtime
  (`/v1/*Fields`, com cache) e converte **rótulo → id da opção** (matching sem
  acento/espaço). Rótulo sem opção correspondente = campo fica vazio + log `unmatched`
  → alinhar as opções no Pipedrive com os rótulos de `lead-schema.ts`.
- ⚠️ WhatsApp é campo **numérico** no Pipedrive → enviado só dígitos.
- `PIPEDRIVE_DRY_RUN=1` → retorna os payloads resolvidos sem criar nada (use para validar).
- Mensagem, ttclid/msclkid e resumo vão na **nota** do negócio.

### Planilha (backup) + e-mail do diagnóstico (Google Apps Script)
- Web App (doPost) anexado à planilha de leads; URL na env `SHEETS_WEBHOOK_URL`.
- O script casa os dados com o **cabeçalho da linha 1 por NOME de coluna** (ordem livre).
- Envia e-mail (MailApp) para o time quando `origem` começa com `diagnostico`
  (destinatário na const `TEAM_EMAIL` do script).
- ⚠️ Gotchas do Apps Script:
  - Editar o código **não** atualiza o `/exec`: use *Implantar → Gerenciar implantações →
    Editar (✏️) → Versão "Nova versão"* (mantém a URL). "Nova implantação" gera URL nova
    (aí precisa atualizar `SHEETS_WEBHOOK_URL` na Vercel + redeploy).
  - Web App precisa de acesso **"Qualquer pessoa"** (senão 401).
  - MailApp exige autorização única (rodar `_autorizarEmail` no editor e aceitar).

## 6. Analytics & SEO/GEO

- **GTM + Meta Pixel** carregam no layout (`components/Analytics.tsx`) com PageView em
  navegação SPA; `track()` (`lib/analytics.ts`) manda eventos ao dataLayer + Pixel
  (`lead_submit`→Lead, `whatsapp_click`→Contact) + GA4 quando ativo.
- **GA4**: setar `NEXT_PUBLIC_GA4_ID` na Vercel ativa. ⚠️ Não criar tag GA4 dentro do
  GTM também (contaria em dobro).
- **SEO/GEO**: metadata via `lib/seo.ts`; JSON-LD por página (Organization, Course,
  Service, Event, BlogPosting, FAQPage); `sitemap.ts`, `robots.ts` (libera bots de IA),
  `public/llms.txt` (manter atualizado ao criar/mover páginas); blocos "answer-first".
- Toda página nova/movida: atualizar sitemap (se estático), llms.txt e criar 301 se
  houver URL antiga.

## 7. Acessos necessários

| Serviço | Uso | Observação |
|---|---|---|
| GitHub `ffeldens/site-salesclub` | código/PRs | acesso do time aqui |
| Vercel `salesclub-site` | deploy, env vars, domínios, logs | conta do Felipe — mudanças de env/domínio passam por ele |
| Pipedrive (salesclub2) | CRM; token do usuário "site" | trocar token = Settings→Env na Vercel + redeploy |
| Google (planilha + Apps Script) | backup de leads + e-mail diagnóstico | conta dona do script envia os e-mails |
| Sanity `3vneeegd` | blog/Studio | CORS p/ domínios em sanity.io/manage |
| YouTube @salesclub_oficial | vídeos de depoimento (não listados) | |
| GTM / Meta Ads | tags e pixel | |
| Hostinger / registro do domínio | DNS salesclub.com.br | A `@`→76.76.21.21, CNAME `www` |

## 8. Pendências conhecidas (jul/2026)

- **GA4**: aguardando Measurement ID do time de analytics (código pronto).
- **Redirects 301 do WordPress**: só `/imersao-presencial/*` mapeado; falta a lista completa de URLs antigas.
- **Pipedrive**: campo "Principal desafio comercial" é TEXTO (mudar para "múltiplas opções" se quiserem filtrar); criar campos p/ ttclid/msclkid se desejado; funis por origem (`PIPEDRIVE_PIPELINE_*`) não configurados.
- **/sales-village**: página interna mantida para consulta; links já apontam para salesvillage.com.br. Ao deletar: remover rota + sitemap e criar 301.
- **Depoimentos em texto/cases**: números reais dos cases e depoimentos nominais do Corporate pendentes.
- **Newsletter**: `/api/newsletter` mockado (aguarda definição de ESP).
- **Sanity**: plugar os demais conteúdos (plano em `src/sanity/README.md`) se o marketing quiser editar sem dev.

## 9. Regras de conteúdo

- Depoimentos/citações: usar somente falas reais (extraídas dos vídeos) com atribuição
  confirmada — nunca inventar nomes, empresas ou números.
- Não exibir preços de imersões (site não publica valores).
- Leads de teste: sempre apagar do Pipedrive e da planilha após validar.
