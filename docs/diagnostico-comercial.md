# Diagnóstico de Maturidade Comercial — Especificação para replicação

Documento técnico completo da ferramenta de **Diagnóstico Comercial** do site do Sales Club.
O objetivo é permitir que um desenvolvedor **replique a ferramenta em qualquer landing page**
(React, Vue, Svelte, HTML puro etc.), preservando exatamente o modelo, as perguntas, o cálculo
das notas e a experiência.

> No site oficial vive em `/servicos/diagnostico-comercial` (página canônica) e `/diagnostico` (LP).
> Componente: `DiagnosticoTool`. Dados: `content/diagnostico.ts`. Radar: `RadarPilares`.

---

## 1. Visão geral

- Ferramenta de **autoavaliação** da operação comercial de uma empresa B2B.
- **8 pilares**, cada um com **3–4 perguntas** (total de **25 perguntas**), respondidas numa **escala de 0 a 10**.
- Cada pilar é mapeado para uma etapa do método proprietário **DREG** (Desenhar · Recrutar · Educar · Gerenciar).
- Ao final, calcula: **score por pilar**, **score geral**, **score por etapa DREG** e identifica a **etapa mais fraca**,
  recomendando a trilha de produtos correspondente.
- Resultado imediato na tela (sem servidor para calcular): **anel de score**, **gráfico radar**, classificação por faixa
  e leitura DREG. O lead capturado é enviado ao backend para CRM.

### Fluxo (etapas)

```
Etapa 0  → Formulário de identificação (dados do lead) — obrigatório para começar
Etapa 1  → Pilar 1 (responde as perguntas 0–10, com feedback ao vivo)
Etapa 2  → Pilar 2
   ...
Etapa 8  → Pilar 8  → ao concluir: envia o lead + calcula o resultado
Etapa 9  → Tela de RESULTADO (score, radar, classificação, DREG, trilha, CTA)
```

Regras de navegação:
- Não avança da etapa 0 sem o formulário válido.
- Não avança de um pilar sem **todas** as perguntas daquele pilar respondidas.
- Pode voltar (as respostas ficam em estado).
- Ao concluir o último pilar, dispara o envio do lead e vai para o resultado (scroll ao topo).

---

## 2. O modelo — 8 pilares e mapeamento DREG

| # | Pilar | Ícone | Etapa DREG | Nº de perguntas |
|---|---|---|---|---|
| 1 | Perfil Ideal de Cliente | 🎯 | Desenhar | 3 |
| 2 | Geração de Leads | 🚀 | Desenhar | 4 |
| 3 | Cadência de Prospecção | 📞 | Gerenciar | 3 |
| 4 | Negociação e Fechamento | 🤝 | Educar | 3 |
| 5 | Monitoramento de Métricas | 📈 | Gerenciar | 3 |
| 6 | Uso de CRM e Ferramentas | 💻 | Desenhar | 3 |
| 7 | Liderança e Gestão | 👥 | Gerenciar | 3 |
| 8 | Treinamento e Desenvolvimento | 🎓 | Educar | 3 |

Distribuição por etapa DREG:
- **Desenhar** → pilares 1, 2, 6
- **Gerenciar** → pilares 3, 5, 7
- **Educar** → pilares 4, 8
- **Recrutar** → *(nenhum pilar mapeado; ver §5)*

---

## 3. As perguntas (todas as 25)

Toda pergunta usa a **escala 0–10** e possui 3 textos de feedback exibidos **ao vivo** conforme a nota escolhida,
segundo as faixas: **low** (0–4), **mid** (5–7), **high** (8–10). *(ver §4)*

Cada pilar também tem um **feedback de seção** (low/mid/high), exibido no resultado com base no **score do pilar**.

### Pilar 1 — Perfil Ideal de Cliente (🎯 · Desenhar)

**Feedback de seção**
- *low:* Sua empresa ainda não tem clareza sobre o perfil ideal de cliente. Isso resulta em leads desqualificados, desperdício de tempo do time e baixa conversão. Definir o ICP é o primeiro passo para uma operação comercial eficiente.
- *mid:* Há alguma noção do perfil ideal, mas ainda faltam critérios bem estruturados. Investir em uma definição clara do ICP vai melhorar significativamente a qualidade dos leads e a produtividade do time.
- *high:* Excelente! Sua empresa tem clareza sobre o perfil de cliente ideal. Isso otimiza toda a cadeia de prospecção e aumenta as taxas de conversão de forma consistente.

1. **De 0 a 10, o quanto sua empresa tem clareza sobre o perfil do cliente ideal?**
   - *low:* Empresa não tem clareza do perfil ideal de cliente. Leads desqualificados afetam as conversões.
   - *mid:* Há alguma noção do ICP, mas ainda precisa de ajustes na definição para melhorar os resultados.
   - *high:* Perfil de cliente bem definido, permitindo otimização da prospecção e conversão.
2. **De 0 a 10, o quanto sua equipe comercial sabe identificar um lead que se encaixa no perfil ideal?**
   - *low:* Equipe não sabe identificar um lead adequado, prejudicando a conversão.
   - *mid:* Há conhecimento sobre ICP, mas dificuldade em qualificar corretamente os leads.
   - *high:* Equipe bem treinada, sabe identificar e qualificar leads corretamente.
3. **De 0 a 10, o quanto os critérios para definir um cliente qualificado estão bem estruturados?**
   - *low:* Critérios de qualificação inexistentes ou mal definidos.
   - *mid:* Critérios existem, mas não são seguidos consistentemente pela equipe.
   - *high:* Critérios de qualificação bem estruturados e amplamente adotados pelo time.

### Pilar 2 — Geração de Leads (🚀 · Desenhar)

**Feedback de seção**
- *low:* O volume e a qualidade dos leads gerados estão abaixo do ideal. A empresa não possui estratégias estruturadas de inbound ou outbound, o que compromete diretamente as metas de vendas.
- *mid:* Existem iniciativas de geração de leads, mas sem consistência. Há espaço para estruturar melhor as estratégias inbound e outbound para garantir um pipeline sempre abastecido.
- *high:* A geração de leads está bem estruturada, com estratégias claras de inbound e outbound. O pipeline está consistentemente abastecido com leads qualificados.

1. **De 0 a 10, o volume de leads gerados mensalmente é suficiente para bater as metas de vendas?**
   - *low:* Volume insuficiente de leads compromete o atingimento das metas.
   - *mid:* Volume de leads próximo ao adequado, mas com margem de melhoria para garantir metas.
   - *high:* O volume de leads é adequado e está alinhado às metas de vendas, garantindo um pipeline sempre abastecido.
2. **De 0 a 10, o quanto sua empresa possui uma estratégia bem definida para geração de leads inbound?**
   - *low:* Nenhuma estratégia de inbound definida. A empresa perde oportunidades de geração orgânica de leads.
   - *mid:* Existem algumas ações de inbound, mas sem consistência.
   - *high:* Estratégia de inbound bem definida, gerando leads qualificados de forma recorrente.
3. **De 0 a 10, o quanto sua empresa possui uma estratégia bem definida para geração de leads outbound?**
   - *low:* Não há estratégia de outbound definida, o que limita a prospecção ativa.
   - *mid:* Há ações de outbound, mas sem processos claros de segmentação e cadência.
   - *high:* O outbound está bem definido e estruturado, com processos claros de segmentação, abordagem e cadência de follow-ups.
4. **De 0 a 10, os leads gerados são, na maioria, qualificados e prontos para avançar no funil de vendas?**
   - *low:* Os leads são desqualificados, dificultando a conversão e resultando em desperdício de tempo da equipe comercial.
   - *mid:* Alguns leads são qualificados, mas há necessidade de melhorar os critérios de filtragem.
   - *high:* A maioria dos leads gerados são qualificados e prontos para avançar no funil.

### Pilar 3 — Cadência de Prospecção (📞 · Gerenciar)

**Feedback de seção**
- *low:* A equipe não segue um fluxo estruturado de prospecção. A atuação é reativa e sem previsibilidade, o que resulta em oportunidades perdidas e pipeline inconsistente.
- *mid:* Há esforço na prospecção, mas falta consistência no fluxo e no ritmo de follow-ups. Estruturar uma cadência clara pode aumentar significativamente os resultados.
- *high:* A cadência de prospecção é bem estruturada. O time mantém um ritmo consistente de contatos e follow-ups, garantindo um pipeline saudável e escalável.

1. **De 0 a 10, o quanto sua equipe segue um fluxo estruturado e frequente de prospecção?**
   - *low:* Não há um fluxo estruturado de prospecção, o que leva à geração inconsistente de novas oportunidades.
   - *mid:* Há esforço de prospecção, mas o fluxo não é consistente ou bem documentado.
   - *high:* O fluxo de prospecção é estruturado e seguido com disciplina por toda a equipe.
2. **De 0 a 10, o quanto o time mantém um ritmo consistente de follow-ups até conseguir engajar o lead?**
   - *low:* Follow-ups são raros ou inexistentes, o que resulta em perda de leads por falta de engajamento.
   - *mid:* O follow-up ocorre, mas não tem cadência definida. Alguns leads são esquecidos.
   - *high:* O time mantém uma cadência rigorosa de follow-ups, maximizando o engajamento dos leads.
3. **De 0 a 10, o número de contatos feitos por vendedor por dia/semana é suficiente para manter o pipeline cheio?**
   - *low:* O volume de contatos é insuficiente para manter o pipeline saudável.
   - *mid:* O volume de contatos é razoável, mas pode ser aumentado para garantir um pipeline mais robusto.
   - *high:* O volume de contatos por vendedor é adequado e suficiente para manter um pipeline saudável e escalável.

### Pilar 4 — Negociação e Fechamento (🤝 · Educar)

**Feedback de seção**
- *low:* Os vendedores têm dificuldades com negociação e objeções, e a taxa de fechamento está abaixo do mercado. É necessário investir em capacitação técnica de vendas.
- *mid:* O time negocia, mas ainda enfrenta dificuldades com objeções e ciclos longos. Treinamentos específicos em técnicas de fechamento podem trazer resultados rápidos.
- *high:* O time domina técnicas de negociação e fechamento. As taxas de conversão estão acima da média do mercado, com ciclos de venda eficientes.

1. **De 0 a 10, os vendedores dominam técnicas de negociação e objeções para aumentar a conversão?**
   - *low:* Os vendedores têm dificuldades em lidar com objeções e negociar, o que reduz significativamente as taxas de fechamento.
   - *mid:* Há algum domínio de técnicas, mas ainda há gaps em negociação e contorno de objeções.
   - *high:* Os vendedores dominam técnicas de negociação e contorno de objeções.
2. **De 0 a 10, a taxa de fechamento da empresa está dentro do esperado para o mercado?**
   - *low:* A taxa de fechamento está abaixo do mercado, indicando problemas no processo comercial.
   - *mid:* A taxa de fechamento está próxima do mercado, mas há espaço para melhoria.
   - *high:* A taxa de fechamento é alta e competitiva, demonstrando que o processo comercial está bem estruturado.
3. **De 0 a 10, os clientes costumam avançar sem necessidade de muitas rodadas de negociação?**
   - *low:* Os ciclos de negociação são longos e desgastantes, o que reduz a eficiência do time.
   - *mid:* Alguns clientes avançam rapidamente, mas ainda há muitas negociações demoradas.
   - *high:* Os clientes avançam com eficiência, com poucos ciclos de negociação.

### Pilar 5 — Monitoramento de Métricas (📈 · Gerenciar)

**Feedback de seção**
- *low:* A empresa não acompanha KPIs comerciais de forma sistemática. As decisões são baseadas em intuição, o que aumenta o risco de erros estratégicos.
- *mid:* Algumas métricas são analisadas, mas sem regularidade. Estabelecer um ritual de análise de dados vai melhorar a qualidade das decisões comerciais.
- *high:* A empresa tem uma cultura orientada a dados. KPIs como CAC, LTV e taxas de conversão são monitorados regularmente.

1. **De 0 a 10, sua empresa acompanha KPIs importantes como CAC, LTV e taxa de conversão?**
   - *low:* A empresa não monitora KPIs comerciais, tomando decisões sem embasamento em dados.
   - *mid:* Algumas métricas são analisadas, mas sem um acompanhamento regular.
   - *high:* A empresa monitora KPIs críticos como CAC, LTV e taxas de conversão com consistência.
2. **De 0 a 10, os dados de vendas são analisados regularmente para tomadas de decisão estratégicas?**
   - *low:* Não há análise regular de dados, o que compromete a qualidade das decisões comerciais.
   - *mid:* Algumas análises são feitas, mas não há um processo estruturado.
   - *high:* Os dados são analisados regularmente e embasam decisões estratégicas com agilidade e precisão.
3. **De 0 a 10, o time comercial entende a importância dos números e sabe como interpretá-los?**
   - *low:* A equipe não tem familiaridade com métricas comerciais, dificultando ajustes estratégicos.
   - *mid:* Parte do time entende métricas, mas ainda há gaps que limitam a tomada de decisão baseada em dados.
   - *high:* O time é fluente em dados comerciais e usa os números para melhorar continuamente a performance.

### Pilar 6 — Uso de CRM e Ferramentas (💻 · Desenhar)

**Feedback de seção**
- *low:* O CRM não está implementado ou é pouco utilizado. A falta de tecnologia compromete o controle do pipeline e a eficiência do processo comercial.
- *mid:* Há uso de ferramentas, mas sem adoção plena. Garantir que o CRM seja usado corretamente por todos é fundamental para ter dados confiáveis e escalabilidade.
- *high:* O CRM é bem utilizado e os dados são confiáveis. As ferramentas comerciais estão integradas ao processo, aumentando a eficiência.

1. **De 0 a 10, o CRM está bem implementado e é usado ativamente pelos vendedores?**
   - *low:* O CRM não foi implementado ou não é utilizado corretamente.
   - *mid:* O CRM está implementado, mas com baixa adoção.
   - *high:* O CRM é amplamente utilizado, com alta adoção pelo time e dados confiáveis para gestão.
2. **De 0 a 10, o time preenche corretamente os dados no CRM e segue um fluxo de atualização?**
   - *low:* Os dados no CRM são incompletos ou desatualizados.
   - *mid:* Os dados são parcialmente preenchidos, mas falta disciplina e processo.
   - *high:* O time segue um fluxo estruturado de atualização no CRM, garantindo dados precisos.
3. **De 0 a 10, a empresa utiliza outras ferramentas para otimizar o processo comercial (ex: automação de e-mails, VoIP, dashboards)?**
   - *low:* A empresa não utiliza ferramentas complementares, perdendo eficiência.
   - *mid:* Algumas ferramentas são utilizadas, mas ainda há oportunidades de automação.
   - *high:* A empresa utiliza um stack tecnológico robusto que potencializa a eficiência e a escalabilidade.

### Pilar 7 — Liderança e Gestão (👥 · Gerenciar)

**Feedback de seção**
- *low:* A liderança comercial é fraca ou ausente. Faltam rituais de gestão, feedbacks estruturados e acompanhamento do time.
- *mid:* A liderança existe, mas pode ser mais presente e estruturada. Implementar rituais de gestão e feedbacks regulares vai elevar o desempenho do time.
- *high:* A liderança comercial é forte e engajada. O gestor acompanha a equipe de perto, dá feedbacks frequentes e mantém rituais de gestão que elevam a performance.

1. **De 0 a 10, o gestor comercial acompanha de perto o desempenho da equipe e dá feedbacks?**
   - *low:* A gestão comercial é distante ou inexistente, resultando em time sem direção.
   - *mid:* O gestor comercial acompanha a equipe, mas não de maneira estruturada.
   - *high:* O gestor acompanha de perto, dá feedbacks regulares e garante que o time esteja alinhado e evoluindo.
2. **De 0 a 10, existem rituais de gestão (dailys, reuniões one-on-one) para manter o alinhamento do time?**
   - *low:* Não há rituais de gestão estruturados.
   - *mid:* Alguns rituais existem, mas falta consistência e estrutura.
   - *high:* Os rituais de gestão são consistentes e geram alinhamento, produtividade e engajamento no time.
3. **De 0 a 10, os vendedores sentem que têm um líder que os desenvolve e apoia no processo comercial?**
   - *low:* Os vendedores não se sentem apoiados pela liderança, o que gera desmotivação.
   - *mid:* A liderança está presente, mas ainda pode melhorar no desenvolvimento e suporte.
   - *high:* Os vendedores se sentem desenvolvidos e apoiados pela liderança, o que gera motivação e alta performance.

### Pilar 8 — Treinamento e Desenvolvimento (🎓 · Educar)

**Feedback de seção**
- *low:* O time não recebe treinamentos regulares e não há planos de desenvolvimento. Isso compromete a evolução das habilidades e aumenta a rotatividade.
- *mid:* Há treinamentos ocasionais, mas sem estrutura contínua. Criar um programa regular de desenvolvimento vai acelerar a evolução do time e reduzir o turnover.
- *high:* A empresa tem uma forte cultura de aprendizado. Os vendedores são treinados regularmente e têm planos de desenvolvimento claros.

1. **De 0 a 10, o time recebe treinamentos regulares sobre técnicas de vendas e mercado?**
   - *low:* Não há treinamentos regulares, comprometendo o desenvolvimento das habilidades comerciais.
   - *mid:* Ocasionalmente são feitos treinamentos, mas sem uma estrutura contínua.
   - *high:* O time recebe treinamentos regulares e estruturados, mantendo as habilidades sempre atualizadas.
2. **De 0 a 10, os vendedores sabem como evoluir dentro da empresa e têm um plano de desenvolvimento?**
   - *low:* Não há clareza sobre crescimento na empresa, o que pode gerar desmotivação.
   - *mid:* Há alguma orientação sobre crescimento, mas os planos de desenvolvimento não são formalizados.
   - *high:* Os vendedores têm planos de desenvolvimento claros e entendem seu caminho de crescimento.
3. **De 0 a 10, a cultura da empresa incentiva o aprendizado contínuo e a melhoria da performance comercial?**
   - *low:* O aprendizado não faz parte da cultura da empresa.
   - *mid:* Há algum incentivo ao aprendizado, mas a cultura ainda não é totalmente orientada à melhoria contínua.
   - *high:* O aprendizado contínuo é parte da cultura da empresa, gerando equipes mais resilientes e de alta performance.

---

## 4. Método de cálculo das notas

Todas as respostas são inteiros de **0 a 10**. Perguntas não respondidas contam como **0** no cálculo
(mas a UI exige responder todas antes de avançar, então na prática não há zeros forçados).

**Arredondamento padrão:** 1 casa decimal → `round(valor * 10) / 10`.

1. **Score do pilar** = média aritmética das notas das perguntas do pilar.
   ```
   score_pilar = round( (soma_das_notas_do_pilar / nº_perguntas_do_pilar) * 10 ) / 10
   ```
2. **Score geral** = média aritmética dos 8 scores de pilar.
   ```
   score_geral = round( (soma_dos_scores_de_pilar / 8) * 10 ) / 10
   ```
3. **Score por etapa DREG** = média dos scores dos pilares daquela etapa.
   ```
   score_etapa = round( (soma_dos_scores_dos_pilares_da_etapa / nº_pilares_da_etapa) * 10 ) / 10
   ```
   - Etapas com **nenhum** pilar são ignoradas → hoje só existem **Desenhar, Educar e Gerenciar**.
4. **Etapa mais fraca** = a etapa DREG com o **menor** score (usada para recomendar a trilha).

> Todos os cálculos são **client-side** (sem backend). O resultado aparece instantaneamente.

### Classificação por faixa (aplica ao score geral e também a cada pilar)

| Faixa (score) | Classificação | Cor |
|---|---|---|
| **0 – 4** (`≤ 4`) | 🔴 Operação em risco | `#FA0100` |
| **5 – 7** (`≤ 7`) | 🟡 Em desenvolvimento | `#F59E0B` |
| **8 – 10** (`> 7`) | 🟢 Alta performance | `#22C55E` |

Descrições da classificação (score geral):
- **🔴 Operação em risco:** "Sua operação comercial tem lacunas críticas que estão impedindo o crescimento. É urgente estruturar os fundamentos."
- **🟡 Em desenvolvimento:** "Você tem uma base razoável, mas há oportunidades claras de melhoria. Com ajustes estratégicos, o crescimento pode ser acelerado."
- **🟢 Alta performance:** "Sua operação comercial está madura e estruturada. O foco agora é manter a consistência e buscar excelência nos detalhes."

### Faixas de feedback (por pergunta e por seção)

```
faixa(score): score ≤ 4 → "low" ; score ≤ 7 → "mid" ; senão → "high"
```
- **Por pergunta:** o feedback (low/mid/high) é exibido **ao vivo** com base na nota que o usuário acabou de marcar.
- **Por seção:** no resultado, exibe o feedback de seção com base no **score do pilar**.

---

## 5. Recomendação de trilha (etapa DREG mais fraca)

Com a **etapa mais fraca**, a ferramenta recomenda os produtos/trilhas:

| Etapa DREG | Trilha recomendada |
|---|---|
| **Desenhar** | Sales Strategy · Máquina de Vendas |
| **Recrutar** | Máquina de Vendas |
| **Educar** | Universidade · Sales Pro · Sales Leadership |
| **Gerenciar** | Sales Leadership · Sales Advisory |

> Observação: como nenhum pilar mapeia para **Recrutar**, essa etapa nunca é calculada como a mais fraca no
> conjunto atual de perguntas (o mapa existe caso novos pilares sejam adicionados).

---

## 6. Tela de resultado

Elementos exibidos (ordem sugerida):

1. **Cabeçalho** com nome + empresa do respondente.
2. **Anel/medidor de score geral** (0–10) — cor conforme a faixa (§4). Rótulo da classificação (🔴/🟡/🟢) + descrição.
3. **Gráfico radar** com os 8 pilares (§7).
4. **Leitura DREG:** "Sua etapa mais fraca é **{Etapa}** ({score}/10). Comece por aqui:" + botões da trilha (§5).
5. **Barras por pilar:** cada pilar com seu score, cor por faixa e o feedback de seção correspondente.
6. **CTA:** falar com especialista (`/contato`) e/ou WhatsApp; opção de refazer.

---

## 7. Gráfico radar (SVG, sem dependências)

Radar de 8 eixos (um por pilar). Especificação:

- `viewBox` quadrado (ex.: 320×320), centro `(cx, cy)`, raio `R` (ex.: 110).
- Ângulo do eixo *i*: `-π/2 + (i * 2π / n)` (começa no topo, sentido horário), com `n = 8`.
- Ponto de cada vértice de dado: raio = `(clamp(score,0,10) / 10) * R`.
- **Anéis de grade** em 25%, 50%, 75%, 100% do raio (polígonos de `n` lados).
- **Eixos**: linhas do centro a cada vértice externo.
- **Área de dados**: polígono `fill: rgba(250,1,0,0.22)`, `stroke: #FA0100`, `strokeWidth: 2`; vértices como círculos `#FA0100`.
- **Rótulos**: sigla (iniciais das primeiras 3 palavras do nome do pilar) + score, posicionados a `R + 16`.

```
angleFor(i) = -Math.PI/2 + (i * 2*Math.PI)/n
point(i, radius) = { x: cx + radius*cos(angleFor(i)), y: cy + radius*sin(angleFor(i)) }
vérticeDado(i) = point(i, (clamp(score_i,0,10)/10) * R)
```

---

## 8. Formulário de identificação (etapa 0)

Campos e validação (todos obrigatórios):

| Campo | Regra |
|---|---|
| **Nome** | não vazio |
| **Empresa** | não vazio |
| **E-mail** | formato válido **e corporativo** — bloqueia domínios públicos (ver lista) |
| **Telefone/WhatsApp** | máscara `(DD) 9XXXX-XXXX`; mínimo 10 dígitos |
| **Nº de vendedores** (tamanho do time) | seleção: `1-5, 6-10, 11-20, 21-30, 31-40, 41-50, 50+` |
| **Faturamento anual** | seleção: `Até R$ 500 mil`, `R$ 500 mil a R$ 1 milhão`, `R$ 1 milhão a R$ 5 milhões`, `R$ 5 milhões a R$ 10 milhões`, `R$ 10 milhões a R$ 50 milhões`, `R$ 50 milhões a R$ 100 milhões`, `Acima de R$ 100 milhões` |

**Domínios públicos bloqueados (e-mail corporativo):**
`gmail.com, hotmail.com, yahoo.com, outlook.com, live.com, icloud.com, uol.com.br, bol.com.br, terra.com.br, ig.com.br, r7.com, oi.com.br`

**Máscara de telefone (referência):**
```
digits = value.replace(/\D/g,'').slice(0,11)
len<=2  → "(DD"
len<=6  → "(DD) XXXX"
len<=10 → "(DD) XXXX-XXXX"
senão   → "(DD) XXXXX-XXXX"
```

---

## 9. Envio do lead (integração)

Ao concluir o último pilar, envia um **POST** para o endpoint de captura (`/api/lead` no site).
O payload inclui os dados do formulário + um **resumo textual do resultado**:

```jsonc
{
  "nome": "...",
  "email": "...",
  "whatsapp": "...",
  "empresa": "...",
  "vendedores": "21-30",           // tamanho do time
  "faturamento": "R$ 5 milhões a R$ 10 milhões",
  "consentimento": true,
  "source": "diagnostico",
  "produto": "Diagnóstico Comercial (6.0/10)",   // score geral no rótulo
  "mensagem": "Diagnóstico Comercial — score geral 6.0/10\nEtapa DREG mais fraca: Desenhar\nScores por pilar: Perfil Ideal de Cliente 5 · Geração de Leads 6 · ...",
  // + UTMs / origem (utm_source, utm_medium, page_url, etc.)
}
```

Notas:
- O envio é **best-effort**: falhar não bloqueia a exibição do resultado para o usuário.
- No site, esse endpoint cria/atualiza no CRM (Pipedrive), grava numa planilha de backup e dispara e-mail interno.
  Numa LP standalone, aponte para o seu próprio endpoint/CRM.

---

## 10. Algoritmo resumido (pseudocódigo)

```js
// estado
step = 0                 // 0 = form; 1..8 = pilares; 9 = resultado
user = { nome, empresa, email, telefone, tamanho, faturamento }
answers = {}             // chave "pilarId-indicePergunta" -> nota 0..10

// avançar
if (step === 0) { validarForm(); step = 1 }
else {
  pilar = sections[step-1]
  if (!todasRespondidas(pilar)) mostrarErro()
  else if (step === 8) { enviarLead(); step = 9 }   // último pilar
  else step++
}

// cálculo (ao renderizar o resultado)
porPilar = sections.map(s => ({
  ...s,
  score: round(avg(s.questions.map((_,i) => answers[`${s.id}-${i}`] ?? 0)) * 10)/10
}))
geral = round(avg(porPilar.map(p => p.score)) * 10)/10
porEtapa = ['Desenhar','Recrutar','Educar','Gerenciar']
  .map(e => { const m = porPilar.filter(p => p.dreg === e);
              return m.length ? { etapa:e, score: round(avg(m.map(p=>p.score))*10)/10 } : null })
  .filter(Boolean)
maisFraca = porEtapa.sort((a,b) => a.score - b.score)[0]
classificacao = geral <= 4 ? 'risco' : geral <= 7 ? 'desenvolvimento' : 'alta'
trilha = trilhaPorEtapa[maisFraca.etapa]
```

---

## 11. Paleta / identidade (referência do site)

- Vermelho da marca (dado do radar / faixa risco): `#FA0100`
- Amarelo (faixa desenvolvimento): `#F59E0B`
- Verde (faixa alta performance): `#22C55E`
- Tema **dark-first**; escala 0–10 apresentada como botões (0..10) com feedback ao vivo abaixo da pergunta.

---

## 12. Checklist para replicar numa landing page

- [ ] Copiar os **8 pilares + 25 perguntas + feedbacks** (§3) e o **mapa DREG** (§2).
- [ ] Implementar o **formulário** com validação de e-mail corporativo e máscara de telefone (§8).
- [ ] Renderizar **um pilar por etapa**, com botões 0–10 e feedback ao vivo por pergunta (§3–4).
- [ ] Implementar o **cálculo** de score por pilar / geral / etapa DREG e etapa mais fraca (§4).
- [ ] Tela de **resultado**: anel de score, radar (§7), classificação (§4), leitura DREG + trilha (§5), barras por pilar.
- [ ] **POST do lead** para o seu endpoint/CRM com o resumo do resultado (§9).
- [ ] Aplicar a **paleta** e o comportamento de cor por faixa (§11).
