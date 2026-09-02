import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt – OMNIARCH',
  description: 'Kontaktujte nás pro konzultaci vašeho projektu. OMNIARCH, Liberec.',
}

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <p className="text-xs text-[#737373] uppercase tracking-widest mb-6">Kontakt</p>
          <h1 className="text-3xl md:text-4xl font-extralight text-[#111111] leading-tight mb-8">
            Začněme váš projekt
          </h1>
          <p className="text-base text-[#111111] font-light leading-relaxed max-w-sm">
            Rádi si vyslechneme váš záměr a navrhneme optimální řešení. Neváhejte nás kontaktovat
            pro nezávaznou konzultaci.
          </p>
        </div>

        <div className="space-y-10">
          <div className="border-t border-[#e5e5e5] pt-8">
            <p className="text-xs text-[#a89880] uppercase tracking-widest mb-3">Hlavní kontakt</p>
            <h2 className="text-base font-normal text-[#111111] mb-4">Ing. arch. Pavel Novák</h2>
            <div className="space-y-2">
              <a
                href="mailto:novak@omniarch.cz"
                className="flex items-center gap-3 text-sm text-[#737373] hover:text-[#111111] transition-colors group"
              >
                <span className="text-[10px] uppercase tracking-widest w-16 shrink-0">Email</span>
                <span className="group-hover:underline underline-offset-2">novak@omniarch.cz</span>
              </a>
              <a
                href="tel:+420775656227"
                className="flex items-center gap-3 text-sm text-[#737373] hover:text-[#111111] transition-colors group"
              >
                <span className="text-[10px] uppercase tracking-widest w-16 shrink-0">Telefon</span>
                <span>+420 775 656 227</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-[#737373]">
                <span className="text-[10px] uppercase tracking-widest w-16 shrink-0">Sídlo</span>
                <span>Liberec, Česká republika</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e5e5e5] pt-8">
            <p className="text-xs text-[#a89880] uppercase tracking-widest mb-3">Co nabízíme</p>
            <ul className="space-y-2 text-base text-[#737373] font-light">
              <li>Architektonická studie</li>
              <li>Dokumentace pro územní řízení</li>
              <li>Dokumentace pro stavební povolení</li>
              <li>Dokumentace pro provedení stavby</li>
              <li>Interiérový design</li>
              <li>Autorský dozor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
