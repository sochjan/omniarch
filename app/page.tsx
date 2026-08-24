import { projects } from '@/lib/projects'
import ProjectGrid from '@/components/ProjectGrid'

export default function HomePage() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-[#111111] leading-tight mb-4">
            Architektura pro každodenní život
          </h1>
          <p className="text-[#737373] text-base font-light leading-relaxed">
            Volné seskupení architektů a stavebních projektantů z Liberce. Klademe důraz na moderní
            a svěží vzhled, jednoduchost stavby a úspory energií.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <ProjectGrid projects={projects} />
      </section>
    </div>
  )
}
