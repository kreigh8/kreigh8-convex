import BlurbWrapper from '@/components/BlurbWrapper'
import ClientWapper from '@/components/ClientWrapper'
import TechnologiesWrapper from '@/components/TechnologiesWrapper'

export default async function Page() {
  return (
    <>
      <main className="container mx-auto grid grid-cols-1 gap-4 my-4">
        <section className="flex gap-4 w-full">
          <article className="flex flex-col w-full gap-4">
            <h1 className="text-4xl font-bold">Welcome to kreigh8</h1>
            <BlurbWrapper />
          </article>

          <article className="flex flex-col w-full"></article>
        </section>

        <ClientWapper />

        <TechnologiesWrapper />
      </main>
    </>
  )
}
