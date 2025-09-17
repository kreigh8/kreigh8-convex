'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { DataTable } from '@/components/table/DataTable'
import { columns } from './columns'

export default function Technologies(props: {
  preloadedTechnologies: Preloaded<typeof api.technologies.listTechnologies>
}) {
  const technologies = usePreloadedQuery(props.preloadedTechnologies)

  return <DataTable data={technologies} columns={columns} />
}
