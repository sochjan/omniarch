import { projects } from './projects.generated'

export type ProjectCategory = 'residential' | 'commercial' | 'public'

export type Project = {
  slug: string
  active?: boolean
  title: string
  tagline?: string
  description: string
  category: ProjectCategory
  image?: string
  images?: string[]
  metadata: {
    location?: string
    year?: string
    year_design?: string
    year_completion?: string
    type?: string
    architect?: string
    architects?: string
    organization?: string
    structural_engineer?: string
    structural_design?: string
    interior_design?: string
    photography?: string
    project_manager?: string
    construction_solution?: string
    building_solutions?: string
    competition_result?: string
  }
}

export const CATEGORY_LABELS: Record<ProjectCategory | 'all', string> = {
  all: 'Vše',
  residential: 'Rodinné domy',
  commercial: 'Komerční',
  public: 'Veřejné stavby',
}

export function getDisplayYear(project: Project): string {
  return project.metadata.year_completion ?? project.metadata.year ?? project.metadata.year_design ?? ''
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug && project.active !== false)
}

export { projects }

export const activeProjects = projects.filter((project) => project.active !== false)
