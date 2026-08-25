export type DesignProject = {
  slug: string
  title: string
  tagline?: string
  description: string
}

export const designProjects: DesignProject[] = [
  { slug: 'garazove-stani', title: 'Garážové stání', tagline: 'Funkční garážové stání s architektonicky uceleným výrazem.', description: 'Projekt garážového stání.' },
  { slug: 'zidle-s-podruckami', title: 'Židle s područkami', tagline: 'Ergonomická židle pro veřejný prostor s důrazem na komfort a trvanlivost.', description: 'Návrh židle s područkami pro veřejný prostor.' },
  { slug: 'jidelni-stul', title: 'Jídelní stůl', tagline: 'Jídelní stůl s čistými liniemi pro moderní interiér.', description: 'Návrh jídelního stolu.' },
  { slug: 'manzelska-postel', title: 'Manželská postel', tagline: 'Postel s klidnou geometrií a důrazem na materiálovou kvalitu.', description: 'Návrh manželské postele.' },
  { slug: 'reklamni-sloup-s-wc', title: 'Reklamní sloup s WC', tagline: 'Multifunkční městský mobiliář spojující reklamu a hygienické zázemí.', description: 'Reklamní sloup s integrovaným WC pro veřejný prostor.' },
  { slug: 'drevena-lavka-vresina', title: 'Dřevěná lávka Vřesina', tagline: 'Dřevěná lávka pro pěší s přirozeným začleněním do krajiny.', description: 'Projekt dřevěné lávky ve Vřesině.' },
  { slug: 'lavicky-z-plechu', title: 'Lavičky z plechu', tagline: 'Minimalistické plechové lavičky pro veřejný prostor.', description: 'Návrh laviček z plechu pro veřejný prostor.' },
  { slug: 'pristresky-na-kontejnery', title: 'Přístřešky na kontejnery', tagline: 'Estetické zastřešení odpadních kontejnerů pro kultivovanější obraz ulice.', description: 'Přístřešky na odpadní kontejnery.' },
  { slug: 'senior-fit-park', title: 'Senior Fit Park', tagline: 'Venkovní fitness prvky navržené s ohledem na potřeby seniorů.', description: 'Projekt fitness parku pro seniory.' },
  { slug: 'novinovy-stanek', title: 'Novinový stánek', tagline: 'Kompaktní novinový stánek s moderním a snadno rozpoznatelným výrazem.', description: 'Návrh novinového stánku.' },
  { slug: 'modulove-verejne-wc', title: 'Modulové veřejné WC', tagline: 'Modulové WC pro flexibilní umístění v městském prostoru.', description: 'Modulové veřejné WC pro umístění v městském prostoru.' },
  { slug: 'zastrесeni-nastupiste', title: 'Zastřešení nástupiště', tagline: 'Lehká ocelová konstrukce pro zastřešení cestujících na nástupišti.', description: 'Projekt zastřešení nástupiště.' },
  { slug: 'stojany-na-kola', title: 'Stojany na kola', tagline: 'Jednoduché a funkční stojany na kola pro veřejný prostor.', description: 'Návrh stojanů na kola pro veřejný prostor.' },
]

export function getDesignProject(slug: string): DesignProject | undefined {
  return designProjects.find((p) => p.slug === slug)
}
