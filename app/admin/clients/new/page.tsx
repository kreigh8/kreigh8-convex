import Breadcrumbs from '@/components/Breadcrumbs'
import ClientForm from '@/components/forms/ClientForm'

export default function AddClientPage() {
  return (
    <section className="container mx-auto">
      <Breadcrumbs />
      <ClientForm />
    </section>
  )
}
