import { notFound } from 'next/navigation'
import Link from 'next/link'
import { activeProjects, getProject, getDisplayYear } from '@/lib/projects'
import { designProjects, getDesignProject } from '@/lib/design'
import PhotoGallery from '@/components/PhotoGallery'
import ProjectCarousel from '@/components/ProjectCarousel'
import type { Metadata } from 'next'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/omniarch'

export async function generateStaticParams() {
  return [
    ...activeProjects.map((p) => ({ slug: p.slug })),
    ...designProjects.map((p) => ({ slug: p.slug })),
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug) ?? getDesignProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} – OMNIARCH`,
    description: project.description,
  }
}

const METADATA_LABELS: Record<string, string> = {
  location: 'Místo',
  year: 'Rok',
  year_design: 'Návrh',
  year_completion: 'Realizace',
  type: 'Typ',
  architect: 'Architekt',
  architects: 'Architekti',
  organization: 'Studio',
  structural_engineer: 'Statika',
  structural_design: 'Stavební projekt',
  interior_design: 'Interiér',
  photography: 'Fotografie',
  project_manager: 'Vedení projektu',
  construction_solution: 'Stavební řešení',
  building_solutions: 'Stavební řešení',
  competition_result: 'Výsledek soutěže',
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const archProject = getProject(slug)
  const designProject = !archProject ? getDesignProject(slug) : undefined
  if (!archProject && !designProject) notFound()

  const placeholderImages = Array(5).fill(`${BASE}/placeholder.png`)

  // ── Design project ────────────────────────────────────────────────────────
  if (designProject) {
    const backLink = (
      <Link
        href="/design"
        className="inline-flex items-center gap-2 text-xs text-[#737373] hover:text-[#111111] uppercase tracking-wide transition-colors"
      >
        ← Design projekty
      </Link>
    )
    const textContent = (
      <div className="space-y-6">
        <p className="text-[10px] text-[#a89880] uppercase tracking-widest">Design</p>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-tight text-[#111111] leading-tight">
          {designProject.title}
        </h1>
        {designProject.tagline && (
          <p className="text-base font-light text-[#111111] leading-relaxed">
            {designProject.tagline}
          </p>
        )}
        <p className="text-base font-light text-[#737373] leading-relaxed">
          {designProject.description}
        </p>
      </div>
    )

    return (
      <div>
        {/* Mobile */}
        <div className="md:hidden">
          <div className="aspect-[4/3] relative overflow-hidden">
            <ProjectCarousel images={placeholderImages} title={designProject.title} />
          </div>
          <div className="px-6 py-12 space-y-10">
            {backLink}
            {textContent}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 items-start">
          <div className="px-12 xl:px-20 py-16">
            {backLink}
            <div className="mt-14">{textContent}</div>
          </div>
          <div className="sticky top-0 h-screen overflow-hidden">
            <ProjectCarousel images={placeholderImages} title={designProject.title} />
          </div>
        </div>

        {/* Gallery */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-[#e5e5e5]">
          <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-[#111111] mb-10">
            Galerie
          </h2>
          <PhotoGallery images={placeholderImages} title={designProject.title} />
        </section>
      </div>
    )
  }

  // ── Architecture project ──────────────────────────────────────────────────
  const project = archProject!
  const images = (project.images ?? [project.image ?? '/placeholder.png']).map(
    (image) => `${BASE}${image}`
  )
  const carouselImages = [...images]
  if (project.image ?? project.images?.[0]) {
    carouselImages[0] = `${BASE}/project-hero/${project.slug}.webp`
  }
  const year = getDisplayYear(project)
  const metaEntries = Object.entries(project.metadata).filter(
    ([key, val]) => val && key !== 'organization'
  )

  const backLink = (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-xs text-[#737373] hover:text-[#111111] uppercase tracking-wide transition-colors"
    >
      ← Všechny projekty
    </Link>
  )

  const textContent = (
    <div className="space-y-6">
      {project.metadata.type && (
        <p className="text-[10px] text-[#a89880] uppercase tracking-widest">
          {project.metadata.type}
        </p>
      )}
      <h1 className="text-3xl md:text-4xl font-extralight tracking-tight text-[#111111] leading-tight">
        {project.title}
      </h1>
      {(project.metadata.location || year) && (
        <p className="text-sm text-[#737373]">
          {[project.metadata.location, year].filter(Boolean).join(' · ')}
        </p>
      )}
      {project.tagline && (
        <p className="text-base font-light text-[#111111] leading-relaxed">
          {project.tagline}
        </p>
      )}
      <p className="text-base font-light text-[#737373] leading-relaxed">
        {project.description}
      </p>

      {metaEntries.length > 0 && (
        <div className="pt-4 border-t border-[#e5e5e5] space-y-4">
          {metaEntries.map(([key, val]) => (
            <div key={key} className="flex flex-col gap-0.5">
              <span className="text-[10px] text-[#a89880] uppercase tracking-widest">
                {METADATA_LABELS[key] ?? key}
              </span>
              <span className="text-xs text-[#111111] font-light">{val}</span>
            </div>
          ))}
          {project.metadata.organization && (
            <div className="flex flex-col gap-0.5 pt-4 border-t border-[#e5e5e5]">
              <span className="text-[10px] text-[#a89880] uppercase tracking-widest">Studio</span>
              <span className="text-xs text-[#111111] font-light">
                {project.metadata.organization}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div>
      {/* Mobile */}
      <div className="md:hidden">
        <div className="aspect-[4/3] relative overflow-hidden">
          <ProjectCarousel images={carouselImages} title={project.title} />
        </div>
        <div className="px-6 py-12 space-y-10">
          {backLink}
          {textContent}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-2 items-start">
        <div className="px-12 xl:px-20 py-16">
          {backLink}
          <div className="mt-14">{textContent}</div>
        </div>
        <div className="sticky top-0 h-screen overflow-hidden">
          <ProjectCarousel images={carouselImages} title={project.title} />
        </div>
      </div>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-[#e5e5e5]">
        <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-[#111111] mb-10">
          Galerie
        </h2>
        <PhotoGallery images={images} title={project.title} />
      </section>
    </div>
  )
}
