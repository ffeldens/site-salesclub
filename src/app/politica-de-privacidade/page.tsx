import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { PageShell } from '@/components/PageShell'
import { Section } from '@/components/ui/Section'

export const metadata: Metadata = buildMetadata({
  title: 'Política de Privacidade',
  description: 'Como o Sales Club coleta, usa e protege os seus dados pessoais, em conformidade com a LGPD.',
  path: '/politica-de-privacidade',
})

// TODO(jurídico): revisar este texto com o time jurídico antes do go-live.
export default function PoliticaPage() {
  return (
    <PageShell>
      <Section>
        <div className="prose-sc max-w-prose">
          <h1 className="font-display text-display text-paper-pure">Política de Privacidade</h1>
          <p className="mt-4 text-sm text-mute">Última atualização: junho de 2026</p>

          <h2 className="mt-10 font-display text-heading text-paper">1. Quem somos</h2>
          <p className="mt-2">
            {siteConfig.legalName} (CNPJ {siteConfig.cnpj}), com sede no {siteConfig.address}, é
            responsável pelo tratamento dos dados pessoais coletados neste site.
          </p>

          <h2 className="mt-8 font-display text-heading text-paper">2. Dados que coletamos</h2>
          <p className="mt-2">
            Coletamos os dados que você fornece em nossos formulários (nome, e-mail, WhatsApp, empresa,
            cargo e informações da operação comercial) e dados de navegação e origem (UTMs, página de
            origem e identificadores de campanha) para atribuição e contato.
          </p>

          <h2 className="mt-8 font-display text-heading text-paper">3. Como usamos seus dados</h2>
          <p className="mt-2">
            Utilizamos seus dados para responder a solicitações, apresentar nossas ofertas, qualificar o
            atendimento comercial e enviar comunicações relevantes — sempre com base legal adequada
            (consentimento ou legítimo interesse), nos termos da LGPD (Lei nº 13.709/2018).
          </p>

          <h2 className="mt-8 font-display text-heading text-paper">4. Compartilhamento</h2>
          <p className="mt-2">
            Seus dados são tratados em nosso CRM e ferramentas de marketing. Não vendemos seus dados a
            terceiros. Podemos utilizar operadores (ex.: provedores de tecnologia) que tratam dados em
            nosso nome e sob nossas instruções.
          </p>

          <h2 className="mt-8 font-display text-heading text-paper">5. Seus direitos</h2>
          <p className="mt-2">
            Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados, bem como
            revogar o consentimento, a qualquer momento, pelo e-mail{' '}
            <a href="mailto:contato@salesclub.com.br" className="text-brand-vivid underline">
              contato@salesclub.com.br
            </a>
            .
          </p>

          <h2 className="mt-8 font-display text-heading text-paper">6. Cookies</h2>
          <p className="mt-2">
            Utilizamos cookies e tecnologias semelhantes para analytics e atribuição de campanhas (GA4,
            Google Tag Manager e Meta Pixel). Você pode gerenciar os cookies nas configurações do seu
            navegador.
          </p>
        </div>
      </Section>
    </PageShell>
  )
}
