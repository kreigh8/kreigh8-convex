import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { TechnologyWrapper } from './technologyWrapper'

export default function Page() {
  return (
    <section className="container space-y-4 mx-auto py-4">
      <div className="flex justify-between items-center">
        <h1>kreigh8 Admin Technologies</h1>

        <Button asChild>
          <Link href="/admin/technologies/new">
            <Plus /> New
          </Link>
        </Button>
      </div>

      <TechnologyWrapper />
    </section>
  )
}
