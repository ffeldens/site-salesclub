import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export type CardConteudoProps = {
  titulo: string
  resumo: string
  href: string
  categoria?: string
  /** Frescor (GEO §8B.4) — exibir data visível. */
  dataPublicacao?: string
}

/** Card de post do blog (/conteudo). */
export function CardConteudo({ titulo, resumo, href, categoria, dataPublicacao }: CardConteudoProps) {
  return (
    <Card as="article" className="flex flex-col transition-colors hover:border-brand/50">
      {categoria && <Badge tone="brand" className="mb-3 self-start">{categoria}</Badge>}
      <h3 className="font-display text-heading text-paper-pure">
        <Link href={href} className="hover:text-brand-vivid">
          {titulo}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-paper/70">{resumo}</p>
      {dataPublicacao && (
        <time className="mt-4 text-xs text-mute" dateTime={dataPublicacao}>
          {dataPublicacao}
        </time>
      )}
    </Card>
  )
}

export type CardMaterialProps = {
  titulo: string
  resumo: string
  href: string
  formato?: string
}

/** Card de lead magnet (/materiais). */
export function CardMaterial({ titulo, resumo, href, formato = 'Material gratuito' }: CardMaterialProps) {
  return (
    <Card as="article" className="flex flex-col transition-colors hover:border-brand/50">
      <Badge className="mb-3 self-start">{formato}</Badge>
      <h3 className="font-display text-heading text-paper-pure">
        <Link href={href} className="hover:text-brand-vivid">
          {titulo}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-paper/70">{resumo}</p>
      <Link href={href} className="mt-4 text-sm font-semibold text-brand-vivid hover:underline">
        Baixar agora →
      </Link>
    </Card>
  )
}
