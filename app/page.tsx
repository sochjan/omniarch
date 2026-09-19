import { activeProjects } from '@/lib/projects'
import ProjectGrid from '@/components/ProjectGrid'
import HeroSection from '@/components/HeroSection'
import HeroCarousel from '@/components/HeroCarousel'

// Temporary homepage presentation. Set to false to restore the static hero and
// the original "Vybrané projekty" carousel below it.
const USE_TEMPORARY_PROJECT_HERO = true

export default function HomePage() {
  return (
    <div>
      <HeroSection useProjectCarousel={USE_TEMPORARY_PROJECT_HERO} />

      {!USE_TEMPORARY_PROJECT_HERO && (
        <div className="pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-[#111111]">Vybrané projekty</h2>
          </div>
          <HeroCarousel />
        </div>
      )}

      <section
        className={`max-w-7xl mx-auto px-6 md:px-12 pb-24 ${
          USE_TEMPORARY_PROJECT_HERO ? 'pt-20 md:pt-24' : ''
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-[#111111] mb-10">Projekty</h2>
        <ProjectGrid projects={activeProjects} />
      </section>
    </div>
  )
}
