import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects, getProject, getDisplayYear } from '@/lib/projects'
import PhotoGallery from '@/components/PhotoGallery'
import type { Metadata } from 'next'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
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
  const project = getProject(slug)
  if (!project) notFound()

  const year = getDisplayYear(project)
  const imgSrc = `${BASE}${project.image ?? '/placeholder.png'}`
  const metaEntries = Object.entries(project.metadata).filter(
    ([key, val]) => val && key !== 'organization'
  )

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-[#737373] hover:text-[#111111] uppercase tracking-wide transition-colors mb-12"
      >
        ← Všechny projekty
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        {/* Info — first in DOM = top on mobile, right column on desktop */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <p className="text-xs text-[#737373] uppercase tracking-widest mb-3">
            {project.metadata.type}
          </p>
          <h1 className="text-2xl md:text-3xl font-extralight text-[#111111] leading-tight mb-2">
            {project.title}
          </h1>
          {(project.metadata.location || year) && (
            <p className="text-sm text-[#737373] mb-6">
              {[project.metadata.location, year].filter(Boolean).join(' · ')}
            </p>
          )}

          <p className="text-sm text-[#111111] font-light leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="border-t border-[#e5e5e5] pt-6 space-y-4">
            {metaEntries.map(([key, val]) => (
              <div key={key} className="flex flex-col gap-0.5">
                <span className="text-[10px] text-[#aaaaaa] uppercase tracking-widest">
                  {METADATA_LABELS[key] ?? key}
                </span>
                <span className="text-xs text-[#111111] font-light">{val}</span>
              </div>
            ))}
            {project.metadata.organization && (
              <div className="flex flex-col gap-0.5 pt-4 border-t border-[#e5e5e5]">
                <span className="text-[10px] text-[#aaaaaa] uppercase tracking-widest">Studio</span>
                <span className="text-xs text-[#111111] font-light">
                  {project.metadata.organization}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Images — second in DOM = below info on mobile, left 2 cols on desktop */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <PhotoGallery images={[imgSrc, imgSrc, imgSrc, imgSrc, imgSrc]} title={project.title} />
        </div>
      </div>
    </div>
  )
}
