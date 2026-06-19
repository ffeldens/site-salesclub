import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react'

/** Renderiza portable text do Sanity com a tipografia do site. */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="font-display text-heading text-paper-pure">{children}</h2>,
    h3: ({ children }) => <h3 className="font-display text-lg font-semibold text-paper">{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand pl-4 italic text-paper/80">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-paper">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value?.href} className="text-brand-vivid underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

export function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
