import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/lib/projects'
import { getDisplayYear } from '@/lib/projects'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/omniarch'

export default function ProjectCard({ project }: { project: Project }) {
  const year = getDisplayYear(project)
  const hasProjectImage = Boolean(project.image ?? project.images?.[0])
  const src = hasProjectImage
    ? `${BASE}/project-cards/${project.slug}.webp`
    : `${BASE}/placeholder.png`

  return (
    <Link href={`/${project.slug}`} className="group block">
      <div className="aspect-[4/3] relative overflow-hidden mb-3">
        <Image
          src={src}
          alt={project.title}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white drop-shadow">
            Zobrazit projekt →
          </span>
        </div>
        <div className="absolute inset-0 bg-[#111111] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
      <h2 className="text-sm font-normal text-[#111111] leading-snug group-hover:opacity-70 transition-opacity duration-200">
        {project.title}
      </h2>
      {project.tagline && (
        <p className="text-sm text-[#737373] mt-1 leading-relaxed">
          {project.tagline}
        </p>
      )}
      {(project.metadata.location || year) && (
        <p className="text-sm text-[#a89880] mt-1">
          {[project.metadata.location, year].filter(Boolean).join(' · ')}
        </p>
      )}
    </Link>
  )
}
