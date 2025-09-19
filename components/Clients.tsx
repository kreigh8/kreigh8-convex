'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function Clients(props: {
  preloadedClients: Preloaded<typeof api.clients.listClients>
}) {
  const clients = usePreloadedQuery(props.preloadedClients)

  if (!clients || clients.length === 0) {
    return (
      <article className="flex gap-4">
        <p>No clients found.</p>
      </article>
    )
  }

  return (
    <article className="flex gap-4">
      {clients.map((client) => (
        <div className="flex flex-col gap-4 items-center" key={client._id}>
          <img
            src={client.imageUrl as string}
            alt={client.name}
            width={100}
            height={100}
          />
          <p>{client.name}</p>
        </div>
      ))}
    </article>
  )
}
