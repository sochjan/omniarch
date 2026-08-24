import { notFound } from 'next/navigation'
import Link from 'next/link'
import { designProjects, getDesignProject } from '@/lib/design'
import PhotoGallery from '@/components/PhotoGallery'
import type { Metadata } from 'next'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export async function generateStaticParams() {
  return designProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getDesignProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} – OMNIARCH`,
    description: project.description,
  }
}

export default async function DesignProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getDesignProject(slug)
  if (!project) notFound()

  const imgSrc = `${BASE}/placeholder.png`

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <Link
        href="/design"
        className="inline-flex items-center gap-2 text-xs text-[#737373] hover:text-[#111111] uppercase tracking-wide transition-colors mb-12"
      >
        ← Všechny design projekty
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        <div className="lg:col-span-1 order-1 lg:order-2">
          <p className="text-xs text-[#737373] uppercase tracking-widest mb-3">Design</p>
          <h1 className="text-2xl md:text-3xl font-extralight text-[#111111] leading-tight mb-6">
            {project.title}
          </h1>
          <p className="text-sm text-[#111111] font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="lg:col-span-2 order-2 lg:order-1">
          <PhotoGallery images={[imgSrc, imgSrc, imgSrc, imgSrc, imgSrc]} title={project.title} />
        </div>
      </div>
    </div>
  )
}
