import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='grid h-screen w-full grow items-center px-4 justify-center'>
      <SignIn />
    </div>
  )
}