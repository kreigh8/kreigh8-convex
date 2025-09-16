'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function Clients(props: {
  preloadedClients: Preloaded<typeof api.clients.listClients>
}) {
  const clients = usePreloadedQuery(props.preloadedClients)

  return <div>{JSON.stringify(clients, null, 2)}</div>
}
