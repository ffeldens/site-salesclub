import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CalendarIcon } from '@/components/ui/icons'
import { cn } from '@/lib/cn'

export type HeroImersaoImagem = { src: string; alt: string }

export type HeroImersaoProps = {
  title: string
  subtitle?: string
  data?: string
  local?: string
  formato?: string
  applyHref?: string
  whatsappHref?: string
  imagem?: HeroImersaoImagem
  /** 'fundo' = foto full-bleed atrás do texto; 'recorte' = imagem ao lado (cutout). */
  imagemModo?: 'fundo' | 'recorte'
}

/**
 * Hero das páginas de imersão: badges (formato/data/local) + CTA duplo.
 * Suporta imagem de fundo (foto) ou recorte ao lado (grupo de mentores).
 */
export function HeroImersao({
  title,
  subtitle,
  data,
  local,
  formato = 'Presencial',
  applyHref = '#aplicar',
  whatsappHref = '#whatsapp',
  imagem,
  imagemModo = 'fundo',
}: HeroImersaoProps) {
  const isFundo = imagem && imagemModo === 'fundo'
  const isRecorte = imagem && imagemModo === 'recorte'

  return (
    <section className="relative overflow-hidden border-b border-subtle">
      {/* Foto de fundo full-bleed + overlay escuro para legibilidade */}
      {isFundo && (
        <>
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50" />
        </>
      )}
      {!isFundo && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-80 w-[600px] rounded-full bg-brand/20 blur-[120px]"
        />
      )}

      <div
        className={cn(
          'container-content relative py-20 sm:py-28',
          isRecorte && 'grid items-center gap-10 lg:grid-cols-2',
        )}
      >
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="brand">{formato}</Badge>
            {data && (
              <Badge>
                <CalendarIcon className="h-3.5 w-3.5" />
                {data}
              </Badge>
            )}
            {local && <Badge>{local}</Badge>}
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-display-lg text-paper-pure">{title}</h1>
          {subtitle && <p className="prose-sc mt-5 text-lg">{subtitle}</p>}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={applyHref} size="lg">
              Aplicar para a turma
            </Button>
            <Button href={whatsappHref} variant="whatsapp" size="lg">
              Falar com especialista
            </Button>
          </div>
        </div>

        {/* Recorte (grupo de mentores) ao lado */}
        {isRecorte && (
          <div className="relative hidden aspect-[4/3] lg:block">
            <Image
              src={imagem.src}
              alt={imagem.alt}
              fill
              priority
              className="object-contain object-bottom"
              sizes="50vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}
