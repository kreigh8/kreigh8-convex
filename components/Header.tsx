'use client'

import Link from 'next/link'
import Login from './Login'
import { usePathname } from 'next/navigation'
import AdminHeader from './admin/Header'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const currentPathname = usePathname()

  return (
    <header>
      <nav className="sticky top-0 z-10 bg-background px-4 py-2 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        <Link href="/">kreigh8</Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Login />
        </div>
      </nav>
      {currentPathname.includes('/admin') && <AdminHeader />}
    </header>
  )
}
