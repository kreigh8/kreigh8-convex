import { SignIn } from '@clerk/nextjs'

// import SignIn from "@/components/SignIn";

export default function Page() {
  return (
    <div className='grid h-screen w-full grow items-center px-4 justify-center'>
      <SignIn />
    </div>
  )
}