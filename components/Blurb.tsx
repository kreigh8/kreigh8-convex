'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function HomeBlurb(props: {
  preloadedHomeBlurb: Preloaded<typeof api.home.getHomeBlurb>
}) {
  const homeBlurb = usePreloadedQuery(props.preloadedHomeBlurb)

  return <h3>{homeBlurb?.homeBlurb}</h3>
}
