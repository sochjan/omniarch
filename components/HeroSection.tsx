'use client'

import ProgressiveImage from '@/components/ProgressiveImage'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/omniarch'
const HERO_IMAGE = `${BASE}/hero.webp`

export default function HeroSection() {
  return (
    <section className="relative">
      {/* Mobile (< md): photo on top, text below */}
      <div className="md:hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <ProgressiveImage
            src={HERO_IMAGE}
            alt="Moderní rodinný dům ve Skalanech s dřevěnou fasádou zasazený do zelené krajiny"
            fill
            sizes="100vw"
            preload
            className="object-cover"
          />
        </div>
        <div className="px-6 py-14 space-y-12">
          <MobileText />
        </div>
      </div>

      {/* Desktop (md+): sticky split */}
      <div className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start">
        {/* Left — scrollable content */}
        <div className="px-12 xl:px-20 py-24 space-y-16">
          <div>
            <h2 className="text-4xl xl:text-5xl font-extralight tracking-tight text-[#111111] leading-tight mb-10">
              Architektura pro každodenní život
            </h2>
            <div className="space-y-5 text-base font-light leading-relaxed text-[#111111] max-w-md">
              <p>
                OMNIARCH je volné seskupení architektů a stavebních projektantů působících
                v Liberci a okolí. Vzniklo z přesvědčení, že dobrá architektura nemusí být
                výsadou velkých měst ani velkých rozpočtů.
              </p>
              <p>
                Specializujeme se na projekty rodinných domů, bytových staveb a komerčních
                objektů. Každý projekt vnímáme jako jedinečnou příležitost — nasloucháme
                klientům, studujeme místo a hledáme řešení, která jsou funkční, úsporná
                a vizuálně přesvědčivá.
              </p>
              <p>
                Pracujeme v menším kolektivu, kde má každý projekt svého zodpovědného
                architekta od prvního náčrtu až po kolaudaci. Důraz klademe na moderní
                a svěží vzhled, jednoduchost stavby a úspory energií.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest font-normal text-[#111111] mb-6">Procesy</p>
            <div className="space-y-5 text-base font-light leading-relaxed text-[#111111] max-w-md">
              <p>
                Náš pracovní postup začíná důkladným rozhovorem. Chceme rozumět tomu, jak
                žijete, co potřebujete a co si přejete. Na základě toho zpracujeme
                architektonickou studii, která hledá nejlepší řešení pro vaši situaci.
              </p>
              <p>
                Po odsouhlasení studie přistoupíme k dokumentaci pro územní rozhodnutí
                a stavební povolení. Komunikaci s úřady zajišťujeme za vás.
              </p>
              <p>
                Věříme, že kontinuita — jeden tým od prvního setkání až po předání klíčů —
                je zárukou kvality výsledku a klidného průběhu celého procesu.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-widest font-normal text-[#111111] mb-6">Tým</p>
            <div className="space-y-6 text-base font-light leading-relaxed text-[#111111] max-w-md">
              <div>
                <p className="font-normal mb-1">Ing. arch. Pavel Novák</p>
                <p className="text-[#737373] text-xs mb-2">Zakladatel, hlavní architekt</p>
                <p>
                  Vystudoval Fakultu architektury ČVUT v Praze. Architektuře se věnuje od roku
                  2004, nejprve v libereckém studiu SIADESIGN, od roku 2012 pod hlavičkou
                  OMNIARCH.
                </p>
              </div>
              <div>
                <p className="font-normal mb-1">Spolupracující specialisté</p>
                <p>
                  Tým doplňují osvědčení statici, specialisté TZB, energetičtí poradci
                  a interiéroví designéři, kteří se k projektům připojují podle jejich
                  specifických nároků.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#e5e5e5]">
            <a
              href="mailto:novak@omniarch.cz"
              className="text-xs text-[#737373] hover:text-[#111111] transition-colors uppercase tracking-widest"
            >
              novak@omniarch.cz
            </a>
          </div>
        </div>

        {/* Right — sticky photo, edge to edge */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative h-full w-full">
            <ProgressiveImage
              src={HERO_IMAGE}
              alt="Moderní rodinný dům ve Skalanech s dřevěnou fasádou zasazený do zelené krajiny"
              fill
              sizes="67vw"
              preload
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileText() {
  return (
    <>
      <div>
        <h2 className="text-3xl font-extralight tracking-tight text-[#111111] leading-tight mb-6">
          Architektura pro každodenní život
        </h2>
        <div className="space-y-4 text-base font-light leading-relaxed text-[#111111]">
          <p>
            OMNIARCH je volné seskupení architektů a stavebních projektantů působících
            v Liberci a okolí. Vzniklo z přesvědčení, že dobrá architektura nemusí být
            výsadou velkých měst ani velkých rozpočtů.
          </p>
          <p>
            Specializujeme se na projekty rodinných domů, bytových staveb a komerčních
            objektů. Každý projekt vnímáme jako jedinečnou příležitost — nasloucháme
            klientům a hledáme řešení, která jsou funkční, úsporná a vizuálně přesvědčivá.
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm uppercase tracking-widest font-normal text-[#111111] mb-4">Procesy</p>
        <div className="space-y-4 text-base font-light leading-relaxed text-[#111111]">
          <p>
            Náš pracovní postup začíná důkladným rozhovorem. Na základě toho zpracujeme
            architektonickou studii, která hledá nejlepší řešení pro vaši situaci.
          </p>
          <p>
            Věříme, že kontinuita — jeden tým od prvního setkání až po předání klíčů —
            je zárukou kvality výsledku.
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm uppercase tracking-widest font-normal text-[#111111] mb-4">Tým</p>
        <div className="space-y-4 text-sm font-light leading-relaxed text-[#111111]">
          <p className="font-normal">Ing. arch. Pavel Novák</p>
          <p className="text-[#737373] text-xs">Zakladatel, hlavní architekt</p>
          <p>
            Vystudoval Fakultu architektury ČVUT v Praze. Architektuře se věnuje od roku
            2004, nejprve v libereckém studiu SIADESIGN, od roku 2012 pod hlavičkou OMNIARCH.
          </p>
        </div>
      </div>
    </>
  )
}
