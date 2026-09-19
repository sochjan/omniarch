'use client'

import ProjectCarousel, { type ProjectCarouselLink } from '@/components/ProjectCarousel'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/omniarch'

const slides: Array<ProjectCarouselLink & { image: string }> = [
  {
    image: `${BASE}/projects/rekonstrukce-rd-v-holenicich/optimized/holenice_001.webp`,
    href: '/rekonstrukce-rd-v-holenicich',
    title: 'Rekonstrukce RD Holenice',
    details: 'Holenice, Turnov · 2018',
    alt: 'Rekonstruovaný rodinný dům v Holenicích se zahradou a kamennými terasami',
  },
  {
    image: `${BASE}/projects/rodinny-dum-skalany/optimized/skalany_001.webp`,
    href: '/rodinny-dum-skalany',
    title: 'Rodinný dům Skalany',
    details: 'Skalany, Český ráj · 2018',
    alt: 'Rodinný dům ve Skalanech s tmavou dřevěnou fasádou zasazený do svahu',
  },
  {
    image: `${BASE}/projects/rodinny-dum-podoli/optimized/podoli_001.webp`,
    href: '/rodinny-dum-podoli',
    title: 'Rodinný dům v Podolí',
    details: 'Podolí, Uherské Hradiště · 2008',
    alt: 'Rodinný dům v Podolí s terasou a solárními kolektory',
  },
  {
    image: `${BASE}/projects/chalupa-rudolfov/optimized/rudolfov_003.webp`,
    href: '/chalupa-rudolfov',
    title: 'Chalupa v Rudolfově',
    details: 'Rudolfov, Liberec · 2015',
    alt: 'Obnovená chalupa v Rudolfově se zahradní terasou a přírodním jezírkem',
  },
]

export default function HomepageProjectCarousel() {
  return (
    <ProjectCarousel
      images={slides.map((slide) => slide.image)}
      links={slides}
      title="Vybrané realizace OMNIARCH"
    />
  )
}
