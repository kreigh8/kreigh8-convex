import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import Technologies from './Technologies'

export default async function TechnologiesWrapper() {
  const preloadedTechnologies = await preloadQuery(
    api.technologies.listTechnologies,
    {}
  )

  return (
    <section className="flex flex-col gap-4 w-full" id="technologies">
      <h2 className="w-full">Technologies</h2>
      <Technologies preloadedTechnologies={preloadedTechnologies} />
    </section>
  )
}
