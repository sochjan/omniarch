export type DesignProject = {
  slug: string
  title: string
  description: string
}

export const designProjects: DesignProject[] = [
  { slug: 'garazove-stani', title: 'Garážové stání', description: 'Projekt garážového stání.' },
  { slug: 'zidle-s-podruckami', title: 'Židle s područkami', description: 'Návrh židle s područkami pro veřejný prostor.' },
  { slug: 'jidelni-stul', title: 'Jídelní stůl', description: 'Návrh jídelního stolu.' },
  { slug: 'manzelska-postel', title: 'Manželská postel', description: 'Návrh manželské postele.' },
  { slug: 'reklamni-sloup-s-wc', title: 'Reklamní sloup s WC', description: 'Reklamní sloup s integrovaným WC pro veřejný prostor.' },
  { slug: 'drevena-lavka-vresina', title: 'Dřevěná lávka Vřesina', description: 'Projekt dřevěné lávky ve Vřesině.' },
  { slug: 'lavicky-z-plechu', title: 'Lavičky z plechu', description: 'Návrh laviček z plechu pro veřejný prostor.' },
  { slug: 'pristresky-na-kontejnery', title: 'Přístřešky na kontejnery', description: 'Přístřešky na odpadní kontejnery.' },
  { slug: 'senior-fit-park', title: 'Senior Fit Park', description: 'Projekt fitness parku pro seniory.' },
  { slug: 'novinovy-stanek', title: 'Novinový stánek', description: 'Návrh novinového stánku.' },
  { slug: 'modulove-verejne-wc', title: 'Modulové veřejné WC', description: 'Modulové veřejné WC pro umístění v městském prostoru.' },
  { slug: 'zastrесeni-nastupiste', title: 'Zastřešení nástupiště', description: 'Projekt zastřešení nástupiště.' },
  { slug: 'stojany-na-kola', title: 'Stojany na kola', description: 'Návrh stojanů na kola pro veřejný prostor.' },
]

export function getDesignProject(slug: string): DesignProject | undefined {
  return designProjects.find((p) => p.slug === slug)
}
