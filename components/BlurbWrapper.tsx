import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import Blurb from './Blurb'

export default async function BlurbWrapper() {
  const preloadedHomeBlurb = await preloadQuery(api.home.getHomeBlurb, {})

  return <Blurb preloadedHomeBlurb={preloadedHomeBlurb} />
}
