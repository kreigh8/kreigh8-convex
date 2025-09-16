'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { DataTable } from '@/components/table/DataTable'
import { columns } from './columns'

export default function Clients(props: {
  preloadedClients: Preloaded<typeof api.clients.listClients>
}) {
  const clients = usePreloadedQuery(props.preloadedClients)

  return <DataTable data={clients} columns={columns} />
}
