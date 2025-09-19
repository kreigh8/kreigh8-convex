'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function Clients(props: {
  preloadedTechnologies: Preloaded<typeof api.technologies.listTechnologies>
}) {
  const technologies = usePreloadedQuery(props.preloadedTechnologies)

  if (!technologies || technologies.length === 0) {
    return (
      <article className="flex gap-4">
        <p>No technologies found.</p>
      </article>
    )
  }

  return (
    <article className="flex gap-4">
      {technologies.map((technology) => (
        <div className="flex flex-col gap-4 items-center" key={technology._id}>
          <img
            src={technology.imageUrl as string}
            alt={technology.name}
            width={100}
            height={100}
          />
          <p>{technology.name}</p>
        </div>
      ))}
    </article>
  )
}
