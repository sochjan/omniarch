'use client'

import { useState } from 'react'
import type { Project, ProjectCategory } from '@/lib/projects'
import { CATEGORY_LABELS } from '@/lib/projects'
import ProjectCard from './ProjectCard'

const FILTERS: Array<{ key: ProjectCategory | 'all'; label: string }> = [
  { key: 'all', label: CATEGORY_LABELS.all },
  { key: 'residential', label: CATEGORY_LABELS.residential },
  { key: 'commercial', label: CATEGORY_LABELS.commercial },
  { key: 'public', label: CATEGORY_LABELS.public },
]

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all')

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <div>
      <div className="mb-10 border-b border-[#e5e5e5] pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 mb-3">
          <div className="flex items-center gap-5 overflow-x-auto scrollbar-none">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`whitespace-nowrap shrink-0 text-xs tracking-wide uppercase transition-colors pb-0.5 ${
                  active === key
                    ? 'text-[#111111] border-b border-[#111111]'
                    : 'text-[#737373] hover:text-[#111111]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#737373] shrink-0">{filtered.length} projektů</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
