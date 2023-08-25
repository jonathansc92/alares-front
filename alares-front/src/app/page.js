import PlanComponent from '@/app/components/PlanComponent'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
              Planos
            </h2>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <PlanComponent speed="400" unit="Mega(s)" price="149,99" wifi games />
            <PlanComponent speed="200" unit="Mega(s)" price="99,99" wifi best />
            <PlanComponent speed="1" unit="Giga(s)" price="399,99" wifi games movies />
          </div>
        </div>
      </section>
    </main>
  )
}
