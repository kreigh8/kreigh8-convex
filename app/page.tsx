'use client'

import { useMutation, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import Link from 'next/link'
import { FormEvent, useRef, useState } from 'react'

export default function Home() {
  return (
    <>
      <main className="p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">kreigh8</h1>
        <Content />
      </main>
    </>
  )
}

function Content() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10
    }) ?? {}

  const clients = useQuery(api.clients.listClients, {}) || []
  const addNumber = useMutation(api.myFunctions.addNumber)

  const generateUploadUrl = useMutation(api.images.generateUploadUrl)
  const sendImage = useMutation(api.images.sendImage)

  const imageInput = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const [name] = useState(() => 'User ' + Math.floor(Math.random() * 10000))
  async function handleSendImage(event: FormEvent) {
    event.preventDefault()

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl()
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': selectedImage!.type },
      body: selectedImage
    })
    const { storageId } = await result.json()
    console.log('storageId', storageId)
    // Step 3: Save the newly allocated storage id to the database
    await sendImage({ storageId, author: name })

    setSelectedImage(null)
    imageInput.current!.value = ''
  }

  if (viewer === undefined || numbers === undefined) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <p>Welcome {viewer ?? 'Anonymous'}!</p>

      <ul>
        {clients.map((client) => (
          <li key={client._id}>
            {client.imageUrl ? (
              <ImageComponent client={client} />
            ) : (
              <span>{client.name}</span>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSendImage}>
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          onChange={(event) => setSelectedImage(event.target.files![0])}
          disabled={selectedImage !== null}
        />
        <input
          type="submit"
          value="Send Image"
          disabled={selectedImage === null}
        />
      </form>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>
      <p>
        <button
          className="bg-foreground text-background text-sm px-4 py-2 rounded-md"
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) })
          }}
        >
          Add a random number
        </button>
      </p>
      <p>
        Numbers:{' '}
        {numbers?.length === 0
          ? 'Click the button!'
          : (numbers?.join(', ') ?? '...')}
      </p>
      <p>
        Edit{' '}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          convex/myFunctions.ts
        </code>{' '}
        to change your backend
      </p>
      <p>
        Edit{' '}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          app/page.tsx
        </code>{' '}
        to change your frontend
      </p>
      <p>
        See the{' '}
        <Link href="/server" className="underline hover:no-underline">
          /server route
        </Link>{' '}
        for an example of loading data in a server component
      </p>
      <div className="flex flex-col">
        <p className="text-lg font-bold">Useful resources:</p>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Convex docs"
              description="Read comprehensive documentation for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Stack articles"
              description="Learn about best practices, use cases, and more from a growing
            collection of articles, videos, and walkthroughs."
              href="https://www.typescriptlang.org/docs/handbook/2/basic-types.html"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <ResourceCard
              title="Templates"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Discord"
              description="Join our developer community to ask questions, trade tips & tricks,
            and show off your projects."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ResourceCard({
  title,
  description,
  href
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <div className="flex flex-col gap-2 bg-slate-200 dark:bg-slate-800 p-4 rounded-md h-28 overflow-auto">
      <a href={href} className="text-sm underline hover:no-underline">
        {title}
      </a>
      <p className="text-xs">{description}</p>
    </div>
  )
}

function ImageComponent({ client }: { client: { url?: string | null } }) {
  if (!client.url) {
    return <span>No image available</span>
  }
  return <img alt={client.url} src={client.url} height="300px" width="auto" />
}
