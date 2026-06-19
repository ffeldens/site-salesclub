import type { SchemaTypeDefinition } from 'sanity'
import { postType } from './post'

/**
 * Schemas do Sanity. Começamos pelo blog (post). Próximos a espelhar:
 * imersao, servico, corporateOferta, evento, curso, campanha (com blocos),
 * mentor, depoimento — ver src/sanity/README.md.
 */
export const schemaTypes: SchemaTypeDefinition[] = [postType]
