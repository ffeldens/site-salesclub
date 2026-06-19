import { defineField, defineType } from 'sanity'

/** Artigo do blog (/conteudo). Espelha o tipo Post de content/conteudo.ts. */
export const postType = defineType({
  name: 'post',
  title: 'Artigo (Blog)',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'resumo',
      title: 'Resumo (answer-first, 40–60 palavras)',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().min(60).max(600),
    }),
    defineField({ name: 'categoria', title: 'Categoria', type: 'string' }),
    defineField({ name: 'autor', title: 'Autor', type: 'string', initialValue: 'Sales Club' }),
    defineField({ name: 'dataPublicacao', title: 'Data de publicação', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'dataAtualizacao', title: 'Data de atualização', type: 'date', validation: (r) => r.required() }),
    defineField({
      name: 'capa',
      title: 'Imagem de capa',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'pergunta', title: 'Pergunta', type: 'string' },
            { name: 'resposta', title: 'Resposta', type: 'text', rows: 3 },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'categoria' },
  },
})
