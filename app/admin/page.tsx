import HomeBlurbForm from '@/components/forms/HomeBlurbForm'
import { preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'

export default async function Page() {
  const homeBlurb = await preloadQuery(api.home.getHomeBlurb)

  return (
    <section className="container mx-auto p-4 gap-4 space-y-4">
      <h1>kreigh8 Admin Portal</h1>

      <h3>Home Page</h3>

      <HomeBlurbForm preloadedHomeBlurb={homeBlurb} />
    </section>
  )
}
