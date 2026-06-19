import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

/** Studio do Sanity embutido em /studio. */
export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
