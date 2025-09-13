'use client'

import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignInButton() {
  const router = useRouter()

  return (
    <Button size="icon" onClick={() => router.push('/sign-in')}>
      <User />
    </Button>
  )
}
