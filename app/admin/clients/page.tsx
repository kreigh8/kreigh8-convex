import { Button } from '@/components/ui/button'
import { ClientWrapper } from './clientWrapper'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <section className="container space-y-4 mx-auto py-4">
      <div className="flex justify-between items-center">
        <h1>kreigh8 Admin Clients</h1>

        <Button asChild>
          <Link href="/admin/clients/new">
            <Plus /> New
          </Link>
        </Button>
      </div>

      <ClientWrapper />
    </section>
  )
}
