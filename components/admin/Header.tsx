import Link from 'next/link'

export default function AdminHeader() {
  return (
    <nav className="sticky top-0 z-10 bg-background px-4 py-2 border-b-2 w-full border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
      <div className="container flex justify-start mx-auto gap-4">
        <Link href="/admin">Home</Link>
        <Link href="/admin/clients">Clients</Link>
        <Link href="/admin/technologies">Technolgies</Link>
      </div>
    </nav>
  )
}
