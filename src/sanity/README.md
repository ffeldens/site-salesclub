# Integração com o Sanity (Fase 4 — plug)

O conteúdo do site já está **isolado atrás de getters tipados** em `src/content/*`
e `src/lib/content.ts`. Plugar o Sanity = reimplementar esses getters com queries
GROQ, **sem mudar as assinaturas** — as páginas não precisam ser reescritas.

## Estado atual (mock)
Conteúdo definido em TypeScript:
- `content/imersoes.ts` · `content/servicos.ts` · `content/corporate.ts`
- `content/eventos.ts` · `content/universidade.ts` · `content/conteudo.ts`
- `content/campanhas.ts` (LPs montadas por blocos — ver `components/lp/LpRenderer.tsx`)
- `lib/content.ts` (mentores, stats, depoimentos, logos, FAQ da Home)

## Passo a passo para plugar (quando houver credenciais)
1. Criar projeto no Sanity → obter `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`
   (já previstos em `.env.example`).
2. `npm i sanity @sanity/client next-sanity @portabletext/react`.
3. Definir schemas em `src/sanity/schemas/` espelhando os tipos atuais:
   - `imersao`, `servico`, `corporateOferta`, `evento`, `curso`, `post`,
     `campanha` (com array de blocos = `LpBloco`), `mentor`, `depoimento`, `faq`.
4. Criar `src/sanity/client.ts` (createClient) e queries GROQ em `src/sanity/queries.ts`.
5. Reimplementar os getters de `content/*` para buscar do Sanity (mantendo os tipos).
6. (Opcional) Embutir o Studio em `/studio` via `next-sanity`.
7. Adicionar `cdn.sanity.io` em `next.config` images (já incluído) e revalidação ISR/webhook.

## Blocos da LP (campanha)
O array `blocos: LpBloco[]` (discriminated union em `LpRenderer.tsx`) vira, no Sanity,
um campo `array` de objetos com `tipo` + `dados` — permitindo ao marketing montar e
reordenar LPs sem deploy. Cada `tipo` mapeia 1:1 a um componente da biblioteca (§5).
