import { access, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PROJECTS_DIR = path.join(ROOT, 'public', 'projects')
const GENERATED_FILE = path.join(ROOT, 'lib', 'projects.generated.ts')
const CATEGORIES = new Set(['residential', 'commercial', 'public'])
const TOP_LEVEL_FIELDS = new Set([
  'slug',
  'order',
  'title',
  'tagline',
  'description',
  'category',
  'active',
  'metadata',
])
const METADATA_FIELDS = new Set([
  'location',
  'year',
  'year_design',
  'year_completion',
  'type',
  'architect',
  'architects',
  'organization',
  'structural_engineer',
  'structural_design',
  'interior_design',
  'photography',
  'project_manager',
  'construction_solution',
  'building_solutions',
  'competition_result',
])
const collator = new Intl.Collator('en', { numeric: true })

function fail(file, message) {
  throw new Error(`${path.relative(ROOT, file)}: ${message}`)
}

function assertString(file, value, field, required = true) {
  if (value === undefined && !required) return
  if (typeof value !== 'string' || (required && value.trim() === '')) {
    fail(file, `"${field}" must be ${required ? 'a non-empty' : 'a'} string`)
  }
}

function validateProject(file, folder, project) {
  if (!project || typeof project !== 'object' || Array.isArray(project)) {
    fail(file, 'must contain a JSON object')
  }
  for (const field of Object.keys(project)) {
    if (!TOP_LEVEL_FIELDS.has(field)) fail(file, `unknown field "${field}"`)
  }
  assertString(file, project.slug, 'slug')
  if (project.slug !== folder) fail(file, `slug must match its folder name "${folder}"`)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
    fail(file, 'slug may contain only lowercase letters, numbers, and single hyphens')
  }
  if (!Number.isInteger(project.order) || project.order < 1) {
    fail(file, '"order" must be a positive integer')
  }
  assertString(file, project.title, 'title')
  assertString(file, project.tagline, 'tagline', false)
  assertString(file, project.description, 'description')
  if (!CATEGORIES.has(project.category)) {
    fail(file, '"category" must be residential, commercial, or public')
  }
  if (typeof project.active !== 'boolean') fail(file, '"active" must be true or false')
  if (!project.metadata || typeof project.metadata !== 'object' || Array.isArray(project.metadata)) {
    fail(file, '"metadata" must be an object')
  }
  for (const [field, value] of Object.entries(project.metadata)) {
    if (!METADATA_FIELDS.has(field)) fail(file, `unknown metadata field "${field}"`)
    assertString(file, value, `metadata.${field}`)
  }
}

async function exists(file) {
  try {
    await access(file)
    return true
  } catch {
    return false
  }
}

async function writeIfChanged(file, content) {
  const current = await readFile(file, 'utf8').catch(() => '')
  if (current !== content) await writeFile(file, content)
}

async function main() {
  const directories = (await readdir(PROJECTS_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(collator.compare)
  const records = []

  for (const folder of directories) {
    const directory = path.join(PROJECTS_DIR, folder)
    const metadataFile = path.join(directory, 'project.json')
    if (!(await exists(metadataFile))) continue

    let project
    try {
      project = JSON.parse(await readFile(metadataFile, 'utf8'))
    } catch (error) {
      fail(metadataFile, `invalid JSON (${error.message})`)
    }
    validateProject(metadataFile, folder, project)

    const optimizedDirectory = path.join(directory, 'optimized')
    const imageFiles = (await readdir(optimizedDirectory, { withFileTypes: true }).catch(() => []))
      .filter((entry) => entry.isFile() && entry.name.endsWith('.webp') && entry.name !== 'hero.webp')
      .map((entry) => entry.name)
      .sort(collator.compare)
    const images = imageFiles.map((name) => `/projects/${folder}/optimized/${name}`)

    if (images.length > 0) {
      for (const requiredAsset of [
        path.join(optimizedDirectory, 'hero.webp'),
        path.join(directory, 'card', 'card.webp'),
      ]) {
        if (!(await exists(requiredAsset))) fail(metadataFile, `missing ${path.relative(directory, requiredAsset)}`)
      }
    }
    records.push({ ...project, ...(images.length > 0 ? { images } : {}) })
  }

  const slugs = new Set()
  const orders = new Set()
  for (const project of records) {
    if (slugs.has(project.slug)) throw new Error(`Duplicate project slug: ${project.slug}`)
    if (orders.has(project.order)) throw new Error(`Duplicate project order: ${project.order}`)
    slugs.add(project.slug)
    orders.add(project.order)
  }
  records.sort((a, b) => a.order - b.order)

  const generatedProjects = records.map((project) =>
    Object.fromEntries(Object.entries(project).filter(([field]) => field !== 'order'))
  )
  const source = [
    '// This file is generated by scripts/generate-projects.mjs. Do not edit it directly.',
    "import type { Project } from './projects'",
    '',
    `export const projects: Project[] = ${JSON.stringify(generatedProjects, null, 2)}`,
    '',
  ].join('\n')
  await writeIfChanged(GENERATED_FILE, source)
  console.log(`Generated ${records.length} projects from optimized assets.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
