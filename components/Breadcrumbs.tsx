'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
// import { useRouter } from 'next/navigation'

export default function Breadcrumbs() {
  // Get previous link from document.referrer
  const previousLink =
    typeof window !== 'undefined' && document.referrer ? document.referrer : '/'

  return (
    <Button variant="ghost" asChild>
      <Link href={previousLink}>
        <ArrowLeft /> Back
      </Link>
    </Button>
  )
}
