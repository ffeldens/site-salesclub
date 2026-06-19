# Imagens do site (JPGs das LPs atuais)

Solte os arquivos nas pastas abaixo seguindo os nomes sugeridos. Pode usar `.jpg`,
`.png` ou `.webp` — o `next/image` converte para AVIF/WebP e faz lazy-load.
Quando estiverem aqui, é só avisar que eu ligo cada imagem ao componente
correspondente (substituindo os placeholders atuais).

> Dica: prefira a maior resolução disponível (o Next gera os tamanhos menores).
> Para fundos de hero, ~2000px de largura. Para cards/galeria, ~1200px.

## `imersoes/` — fundos / imagens dos heros das imersões
- `sales-strategy.jpg`
- `sales-leadership.jpg`
- `sales-ai.jpg`
(usadas no hero de cada `/imersoes/[slug]` e nos cards do índice)

## `sales-village/` — galeria do espaço
Hoje há 6 slots em `/sales-village` (placeholders com rótulo):
- `auditorio.jpg`
- `estudio-podcast.jpg`
- `lounge.jpg`
- `salas-mentoria.jpg`
- `coffee.jpg`
- `networking.jpg`
(pode trazer mais — adapto a grade)

## `mentores/` — fotos dos mentores
Nome em kebab-case do mentor. Ex.:
- `thiago-concer.jpg`
- `luiz-paulo-teixeira.jpg`
- `helio-azevedo.jpg`
- `felipe-feldens.jpg`
- `raphael-lassance.jpg`
- `guilherme-junqueira.jpg`
- (Sales Leadership / squad) `gustavo-malavota.jpg`, `adriana-gomes.jpg`,
  `thiago-bezerra.jpg`, `luiz-ambrosio.jpg`, `giovanna-galetto.jpg`,
  `viviane-machado.jpg`, `thais-sterenberg.jpg`
(hoje os cards mostram as iniciais; com a foto, troco automaticamente)

## `clientes/` — logos de clientes (prova social)
Logos em **SVG de preferência** (ou PNG com fundo transparente). Nome da marca em
kebab-case:
- `google.svg`, `coca-cola.svg`, `disney.svg`, `subway.svg`, `ifood.svg`,
  `walmart.svg`, `mobil.svg`, `lego.svg` …
(hoje a prova social mostra os nomes em texto; com os logos, vira grade visual)

## `cases/` — imagens/destaques de cases (opcional)
Livre, conforme o material que houver.

---

### O que acontece quando você trouxer os arquivos
1. Troco os placeholders por `<Image>` nos componentes:
   - Galeria do Sales Village, cards/hero de imersões, fotos nos cards de mentores,
     grade de logos de clientes.
2. Defino `alt` descritivo em cada uma (acessibilidade + SEO).
3. Verifico no preview (desktop + mobile) e faço o commit.
