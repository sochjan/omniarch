import { createHash } from 'node:crypto'
import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_PROJECTS_DIR = path.join(ROOT, 'content', 'projects')
const PUBLIC_PROJECTS_DIR = path.join(ROOT, 'public', 'projects')
const GENERATED_FILE = path.join(ROOT, 'lib', 'projects.generated.ts')
const ASSET_MANIFEST_FILE = path.join(ROOT, 'scripts', 'project-assets-manifest.json')
const ASSET_VERSION = 2
const CATEGORIES = new Set(['residential', 'commercial', 'public'])
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png'])
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

async function hashFile(file) {
  return createHash('sha256').update(await readFile(file)).digest('hex')
}

async function writeIfChanged(file, content) {
  const current = await readFile(file, 'utf8').catch(() => '')
  if (current !== content) await writeFile(file, content)
}

async function createWebImage(source, destination, width, quality) {
  await mkdir(path.dirname(destination), { recursive: true })
  await sharp(source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(destination)
}

async function generateAssets(task, manifest, nextManifest) {
  const { source, folder, stem, first } = task
  const relativeSource = path.relative(ROOT, source)
  const hash = await hashFile(source)
  const optimizedDir = path.join(PUBLIC_PROJECTS_DIR, folder, 'optimized')
  const outputs = [
    path.join(optimizedDir, `${stem}.webp`),
    path.join(optimizedDir, 'blur', `${stem}.webp`),
  ]

  if (first) {
    outputs.push(
      path.join(optimizedDir, 'hero.webp'),
      path.join(optimizedDir, 'blur', 'hero.webp'),
      path.join(PUBLIC_PROJECTS_DIR, folder, 'card', 'card.webp'),
      path.join(PUBLIC_PROJECTS_DIR, folder, 'card', 'blur.webp'),
    )
  }

  const cacheKey = `${ASSET_VERSION}:${hash}`
  const allOutputsExist = (await Promise.all(outputs.map(exists))).every(Boolean)
  if (manifest[relativeSource] === cacheKey && allOutputsExist) {
    nextManifest[relativeSource] = cacheKey
    return false
  }

  await createWebImage(source, outputs[0], 2000, 72)
  await createWebImage(source, outputs[1], 10, 25)
  if (first) {
    await createWebImage(source, outputs[2], 1920, 68)
    await createWebImage(source, outputs[3], 10, 25)
    await createWebImage(source, outputs[4], 1200, 70)
    await createWebImage(source, outputs[5], 10, 25)
  }

  nextManifest[relativeSource] = cacheKey
  return true
}

async function mapWithConcurrency(items, concurrency, callback) {
  let index = 0
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index]
      index += 1
      await callback(item)
    }
  })
  await Promise.all(workers)
}

async function main() {
  const directories = (await readdir(CONTENT_PROJECTS_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(collator.compare)

  const records = []
  const assetTasks = []

  for (const folder of directories) {
    const directory = path.join(CONTENT_PROJECTS_DIR, folder)
    const metadataFile = path.join(directory, 'project.json')
    if (!(await exists(metadataFile))) continue

    let project
    try {
      project = JSON.parse(await readFile(metadataFile, 'utf8'))
    } catch (error) {
      fail(metadataFile, `invalid JSON (${error.message})`)
    }
    validateProject(metadataFile, folder, project)

    const originalsDirectory = path.join(directory, 'full')
    const imageFiles = (await readdir(originalsDirectory, { withFileTypes: true }).catch(() => []))
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort(collator.compare)

    const images = imageFiles.map((name) => {
      const stem = path.parse(name).name
      return `/projects/${folder}/optimized/${stem}.webp`
    })

    imageFiles.forEach((name, imageIndex) => {
      assetTasks.push({
        source: path.join(originalsDirectory, name),
        folder,
        stem: path.parse(name).name,
        first: imageIndex === 0,
      })
    })

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

  const manifest = JSON.parse(await readFile(ASSET_MANIFEST_FILE, 'utf8').catch(() => '{}'))
  const nextManifest = {}
  let generatedAssetCount = 0
  await mapWithConcurrency(assetTasks, 4, async (task) => {
    if (await generateAssets(task, manifest, nextManifest)) generatedAssetCount += 1
  })

  const generatedProjects = records.map((project) =>
    Object.fromEntries(Object.entries(project).filter(([field]) => field !== 'order'))
  )
  const generatedSource = [
    '// This file is generated by scripts/generate-projects.mjs. Do not edit it directly.',
    "import type { Project } from './projects'",
    '',
    `export const projects: Project[] = ${JSON.stringify(generatedProjects, null, 2)}`,
    '',
  ].join('\n')

  await writeIfChanged(GENERATED_FILE, generatedSource)
  await writeIfChanged(ASSET_MANIFEST_FILE, `${JSON.stringify(nextManifest, null, 2)}\n`)
  console.log(`Generated ${records.length} projects; refreshed ${generatedAssetCount} source image(s).`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
