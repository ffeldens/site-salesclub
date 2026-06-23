import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Stats } from '@/components/blocks/Stats'
import { Beneficios } from '@/components/blocks/Beneficios'
import { FAQ } from '@/components/blocks/FAQ'
import { AnswerBlock } from '@/components/blocks/AnswerBlock'
import { FormLead } from '@/components/blocks/FormLead'
import { CheckIcon } from '@/components/ui/icons'
import { getUniversidadeSC } from '@/content/universidade-sc'

const u = getUniversidadeSC()

export const metadata: Metadata = buildMetadata({
  title: 'Universidade Sales Club — plataforma de treinamento de vendas para empresas',
  description:
    'A Universidade Sales Club é a plataforma white-label para a sua empresa estruturar a própria universidade comercial: trilha de aulas, mentorias, planos de ação e indicadores, com onboarding em até 5 dias.',
  path: '/universidade',
})

export default function UniversidadePage() {
  return (
    <PageShell whatsappMessage="Olá! Quero estruturar a Universidade Sales Club na minha empresa.">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Início', url: siteConfig.url },
          { name: 'Universidade Sales Club', url: `${siteConfig.url}/universidade` },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Universidade Sales Club',
          serviceType: 'Plataforma de treinamento de vendas corporativo (white-label)',
          description: u.resumo,
          url: `${siteConfig.url}/universidade`,
          provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
          areaServed: 'BR',
          audience: { '@type': 'BusinessAudience', name: 'Empresas B2B com operação comercial' },
        }}
      />

      <HeroInstitucional
        eyebrow={u.hero.eyebrow}
        title={u.hero.title}
        subtitle={u.hero.subtitle}
        primaryCta={{ label: 'Estruturar minha universidade', href: '#cta' }}
        secondaryCta={{ label: 'Ver planos', href: '#planos' }}
      />

      {/* Answer-first + propósito */}
      <Section>
        <div className="max-w-3xl">
          <AnswerBlock>{u.resumo}</AnswerBlock>
          <p className="prose-sc mt-8">{u.proposito.intro}</p>
          <ul className="mt-4 grid gap-2 text-sm text-paper/80">
            {u.proposito.itens.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-medium text-paper">{u.proposito.fecho}</p>
        </div>
      </Section>

      <Stats stats={u.stats} tone="card" />

      {/* 3 pilares */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Como funciona"
          title="Um programa baseado em 3 pilares"
          description="Os pilares responsáveis por colocar mais dinheiro dentro da sua operação comercial."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {u.pilares.map((p) => (
            <Card key={p.numero} as="article" className="flex flex-col">
              <span className="font-display text-display text-brand-vivid">{p.numero}</span>
              <h3 className="mt-2 font-display text-heading text-paper-pure">{p.titulo}</h3>
              <span className="mt-1 text-xs uppercase tracking-wide text-mute">{p.nivel}</span>
              <ul className="mt-4 grid gap-2 text-sm text-paper/80">
                {p.itens.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-vivid" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Beneficios
        eyebrow="A plataforma"
        title="O que você terá na Universidade"
        items={u.recursos}
      />

      {/* Para quem */}
      <Section tone="card">
        <SectionHeading eyebrow="Públicos" title="Para quem é a plataforma" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {u.paraQuem.map((perfil) => (
            <Card key={perfil.titulo} as="article">
              <h3 className="font-display text-lg text-paper-pure">{perfil.titulo}</h3>
              <p className="mt-2 text-sm text-paper/70">{perfil.descricao}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Alinhamento de expectativa */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-card border border-subtle bg-ink-card p-8">
          <SectionHeading eyebrow="Transparência" title="Alinhamento de expectativa" />
          <p className="prose-sc">{u.alinhamento.intro}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {u.alinhamento.itens.map((item) => (
              <li
                key={item}
                className="rounded-card border border-subtle bg-ink px-4 py-3 text-sm font-medium text-paper/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Implementação */}
      <Section tone="card">
        <SectionHeading
          eyebrow="Onboarding"
          title="Implementação da plataforma"
          description={u.implementacaoNota}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {u.implementacao.map((passo) => (
            <div key={passo.numero} className="rounded-card border border-subtle bg-ink p-6">
              <span className="font-display text-2xl text-brand-vivid">{passo.numero}</span>
              <h3 className="mt-2 font-display text-lg text-paper-pure">{passo.titulo}</h3>
              <p className="mt-2 text-sm text-paper/70">{passo.descricao}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Planos */}
      <Section id="planos">
        <SectionHeading
          eyebrow="Investimento"
          title="Escolha o plano ideal para o tamanho da sua operação"
          description="Investimento mensal sob medida, conforme o número de acessos."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {u.planos.map((plano) => (
            <Card key={plano.nome} as="article" className="flex flex-col text-center">
              <h3 className="font-display text-heading text-paper-pure">{plano.nome}</h3>
              <p className="mt-2 text-sm text-paper/70">{plano.faixa}</p>
              <p className="mt-4 font-display text-xl text-brand-vivid">{plano.preco}</p>
              <p className="text-xs text-mute">mensal</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ROI */}
      <Section tone="card">
        <SectionHeading eyebrow="Resultado" title="Se executar, tem como não ser ROI?" align="center" />
        <div className="grid gap-6 md:grid-cols-3">
          {u.roi.fatores.map((f, i) => (
            <Card key={f.titulo} as="article">
              <span className="font-display text-display text-brand-vivid">{i + 1}</span>
              <h3 className="mt-2 font-display text-lg text-paper-pure">{f.titulo}</h3>
              <p className="mt-2 text-sm text-paper/70">{f.descricao}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Stats stats={u.roi.metricas} tone="card" />

      <FAQ
        eyebrow="Perguntas frequentes"
        title="Universidade Sales Club: dúvidas comuns"
        items={u.faq}
      />

      {/* Cross-link para o Sales Pro */}
      <Section>
        <div className="mx-auto max-w-3xl rounded-card border border-subtle bg-ink-card p-6 text-center">
          <p className="text-sm text-paper/80">
            Procurando uma formação para profissionais de vendas, e não a plataforma corporativa? Conheça
            a{' '}
            <Link href="/universidade/sales-pro" className="font-medium text-brand-vivid hover:underline">
              Formação Sales Pro
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section id="cta">
        <SectionHeading
          eyebrow="Próximo passo"
          title="Pronto para estruturar a universidade comercial da sua empresa?"
          description="Conte sobre a sua operação e o time retorna com a proposta e os planos de acesso."
          align="center"
        />
        <div className="mx-auto max-w-2xl">
          <FormLead
            source="universidade"
            produto="Universidade Sales Club"
            title=""
            ctaLabel="Quero estruturar minha universidade"
            mensagem={{ label: 'Sobre a sua operação', placeholder: 'Quantas pessoas no time comercial e o que você quer desenvolver?' }}
          />
        </div>
      </Section>
    </PageShell>
  )
}
