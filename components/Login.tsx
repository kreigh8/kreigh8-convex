'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import { Settings, User } from 'lucide-react'
import SignInButton from './SignInButton'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Login() {
  return (
    <div className="flex">
      <Authenticated>
        <div className="flex gap-2 justify-center items-center">
          <Link href="/admin">
            <Button size="icon">
              <Settings />
            </Button>
          </Link>
        </div>
        <User />
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </div>
  )
}
