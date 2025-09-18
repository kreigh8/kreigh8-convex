import Blurb from '@/components/Blurb'
import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'

export default async function HomeWrapper() {
  const preloadedHomeBlurb = await preloadQuery(api.home.getHomeBlurb, {})

  return (
    <>
      <main className="container mx-auto flex my-4">
        <section className="flex gap-4 w-full">
          <article className="flex flex-col w-full gap-4">
            <h1 className="text-4xl font-bold">Welcome to kreigh8</h1>
            <Blurb preloadedHomeBlurb={preloadedHomeBlurb} />
          </article>

          <article className="flex flex-col w-full"></article>
        </section>
      </main>
    </>
  )
}
