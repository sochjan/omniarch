import type { Metadata } from 'next'
import { activeProjects } from '@/lib/projects'
import ProjectGrid from '@/components/ProjectGrid'

export const metadata: Metadata = {
  title: 'Architektura – OMNIARCH',
  description: 'Architektonické projekty OMNIARCH — rodinné domy, komerční a veřejné stavby.',
}

export default function ArchitecturePage() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="max-w-2xl">
          <p className="text-xs text-[#737373] uppercase tracking-widest mb-4">Architektura</p>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-[#111111] leading-tight mb-4">
            Projekty
          </h1>
          <p className="text-[#737373] text-base font-light leading-relaxed">
            Přes dvacet let projektové praxe. Od rodinných domů po veřejné stavby v celé České
            republice.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <ProjectGrid projects={activeProjects} />
      </section>
    </div>
  )
}
