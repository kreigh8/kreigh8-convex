import { api } from '@/convex/_generated/api'
import { preloadQuery } from 'convex/nextjs'
import Clients from './Clients'

export default async function ClientWrapper() {
  const preloadedClients = await preloadQuery(api.clients.listClients, {})

  return (
    <section className="flex flex-col gap-4 w-full" id="clients">
      <h3>Clients</h3>
      <Clients preloadedClients={preloadedClients} />
    </section>
  )
}
