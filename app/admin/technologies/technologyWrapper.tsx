import { preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import Technologies from './technology'

export async function TechnologyWrapper() {
  const preloadedTechnologies = await preloadQuery(
    api.technologies.listTechnologies,
    {}
  )

  return <Technologies preloadedTechnologies={preloadedTechnologies} />
}
