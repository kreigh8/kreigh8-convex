'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
  name: string
  url: string
  imageUrl: string | null
  active: boolean
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'url',
    header: 'URL'
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl
      return (
        <img
          src={imageUrl!}
          alt="Client Image"
          className="h-10 w-10 rounded-full object-cover"
        />
      )
    }
  },
  {
    accessorKey: 'active',
    header: 'Active'
  }
]
