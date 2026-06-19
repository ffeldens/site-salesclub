import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

/** Cliente de leitura do Sanity. Token opcional (dataset privado). */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
})
