'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import { LogOut, Settings, User } from 'lucide-react'
import SignInButton from './SignInButton'
import Link from 'next/link'
import { Button } from './ui/button'
import { SignOutButton } from '@clerk/clerk-react'

export default function Login() {
  return (
    <div className="flex">
      <Authenticated>
        <div className="flex gap-2 justify-center items-center">
          <Button size="icon" variant="outline" asChild>
            <Link href="/admin">
              <Settings />
            </Link>
          </Button>

          <SignOutButton>
            <Button size="icon" variant="outline">
              <LogOut />
            </Button>
          </SignOutButton>
        </div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </div>
  )
}
