import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { HeroInstitucional } from '@/components/blocks/HeroInstitucional'
import { LogosProvaSocial } from '@/components/blocks/LogosProvaSocial'
import { Stats } from '@/components/blocks/Stats'
import { Beneficios } from '@/components/blocks/Beneficios'
import { Mentores } from '@/components/blocks/Mentores'
import { SalesVillage } from '@/components/blocks/SalesVillage'
import { Depoimentos } from '@/components/blocks/Depoimentos'
import { FAQ } from '@/components/blocks/FAQ'
import { CTASection } from '@/components/blocks/CTASection'
import { Section, SectionHeading } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CardConteudo } from '@/components/blocks/Cards'
import { Ecossistema } from '@/components/blocks/Ecossistema'
import { ParaQuemPerfil } from '@/components/blocks/ParaQuemPerfil'
import { Dor } from '@/components/blocks/Dor'
import { MetodoDREG } from '@/components/blocks/MetodoDREG'
import { ComoPensamos } from '@/components/blocks/ComoPensamos'
import { LivroAutoridade } from '@/components/blocks/LivroAutoridade'
import { YoutubeIcon, SpotifyIcon } from '@/components/ui/icons'
import { siteConfig } from '@/lib/site'
import { formatDate } from '@/lib/format'
import { getPosts } from '@/content/conteudo'
import {
  getClienteLogos,
  getDepoimentos,
  getFaqHome,
  getMentoresHome,
  getStats,
} from '@/lib/content'

export default async function HomePage() {
  const ultimosPosts = (await getPosts()).slice(0, 2)
  return (
    <>
      <Header />
      <main>
        <HeroInstitucional
          eyebrow="O maior ecossistema de vendas do Brasil"
          title="Do improviso à previsibilidade de receita."
          subtitle="O Sales Club é o ecossistema que reúne imersões, consultoria, comunidade e tecnologia em um só lugar — para transformar a área comercial de empresas B2B em uma máquina de vendas previsível, com processo, gestão e gente de alta performance."
          primaryCta={{ label: 'Fazer diagnóstico gratuito (5 min)', href: '/servicos/diagnostico-comercial' }}
          secondaryCta={{ label: 'Falar com especialista', href: '/contato' }}
          imagem={{ src: '/images/sales-village/roundtable.webp', alt: 'Mentoria e networking entre empresários no Sales Village' }}
        />

        <Dor />

        <LogosProvaSocial logos={getClienteLogos()} />

        <Stats stats={getStats()} />

        <div id="ecossistema">
          <Ecossistema />
        </div>

        <MetodoDREG />

        <LivroAutoridade tone="base" />

        <ParaQuemPerfil />

        <ComoPensamos />

        <Beneficios
          eyebrow="O que muda na sua operação"
          title="O que muda quando vendas viram arquitetura"
          items={[
            { titulo: 'Processo comercial estruturado', descricao: 'Do topo do funil ao fechamento, com etapas claras.' },
            { titulo: 'Gestão por indicadores e OKRs', descricao: 'Decisões guiadas por dados, não por achismo.' },
            { titulo: 'Times mais produtivos', descricao: 'Playbooks, cadências e ritmo de vendas.' },
            { titulo: 'IA aplicada a vendas', descricao: 'Ganho de eficiência com Sales AI e automações.' },
          ]}
        />

        <Mentores mentores={getMentoresHome()} />

        <SalesVillage />

        <Depoimentos depoimentos={getDepoimentos()} />

        {/* Conteúdo & Podcast */}
        <Section>
          <SectionHeading
            eyebrow="Conteúdo & Podcast"
            title="Aprenda com o maior ecossistema de vendas do Brasil"
            description="Artigos, episódios e conteúdos em vídeo sobre gestão comercial, previsibilidade e liderança."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {ultimosPosts.map((p) => (
              <CardConteudo
                key={p.slug}
                titulo={p.titulo}
                resumo={p.resumo}
                href={`/conteudo/${p.slug}`}
                categoria={p.categoria}
                dataPublicacao={formatDate(p.dataPublicacao)}
              />
            ))}
            <Card className="flex flex-col justify-between">
              <div>
                <h3 className="font-display text-heading text-paper-pure">Ouça e assista</h3>
                <p className="mt-2 text-sm text-paper/70">
                  O podcast do Sales Club no Spotify e os conteúdos em vídeo no YouTube.
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Button href={siteConfig.social.spotify} variant="secondary" size="sm">
                  <SpotifyIcon className="h-4 w-4" /> Ouvir no Spotify
                </Button>
                <Button href={siteConfig.social.youtube} variant="secondary" size="sm">
                  <YoutubeIcon className="h-4 w-4" /> Assistir no YouTube
                </Button>
                <Button href="/podcast" variant="ghost" size="sm">
                  Ver tudo →
                </Button>
              </div>
            </Card>
          </div>
        </Section>

        <FAQ items={getFaqHome()} />

        <CTASection
          title="Sua máquina de vendas começa por um diagnóstico."
          description="Em 5 minutos, descubra qual etapa do método DREG está travando o seu crescimento — e a trilha para destravar."
          primaryCta={{ label: 'Fazer diagnóstico gratuito (5 min)', href: '/servicos/diagnostico-comercial' }}
          secondaryCta={{ label: 'Falar com especialista', href: '/contato' }}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
