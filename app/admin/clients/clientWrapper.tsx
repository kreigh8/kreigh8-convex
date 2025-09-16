import { preloadQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'
import Clients from './clients'

export async function ClientWrapper() {
  const preloadedClients = await preloadQuery(api.clients.listClients, {})

  return <Clients preloadedClients={preloadedClients} />
}
