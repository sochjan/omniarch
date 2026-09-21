import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt – OMNIARCH',
  description: 'Kontaktujte nás pro konzultaci vašeho projektu. OMNIARCH, Liberec.',
}

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <p className="text-xs text-[#737373] uppercase tracking-widest mb-6">Kontakt</p>
      <h1 className="text-3xl md:text-4xl font-extralight text-[#111111] leading-tight mb-8">
        Začněme váš projekt
      </h1>
      <p className="text-base text-[#111111] font-light leading-relaxed max-w-sm mb-14">
        Rádi si vyslechneme váš záměr a navrhneme optimální řešení. Neváhejte nás kontaktovat
        pro nezávaznou konzultaci.
      </p>

      <div className="max-w-4xl space-y-14">
        <section aria-labelledby="architecture-contact">
          <h2 id="architecture-contact" className="text-xs text-[#a89880] uppercase tracking-widest mb-7">
            Architektura
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-10">
            <div>
              <h3 className="text-lg font-medium text-[#111111]">Ing. arch. Pavel Novák</h3>
              <p className="text-sm text-[#737373] mt-1">Architekt</p>
            </div>
            <div className="space-y-2 text-sm text-[#737373] sm:pt-1">
              <p>
                Tel.:{' '}
                <a href="tel:+420775656227" className="text-[#111111] hover:underline underline-offset-2">
                  +420 775 656 227
                </a>
              </p>
              <p>
                E-mail:{' '}
                <a href="mailto:novak@omniarch.cz" className="text-[#111111] hover:underline underline-offset-2">
                  novak@omniarch.cz
                </a>
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="building-contact">
          <h2 id="building-contact" className="text-xs text-[#a89880] uppercase tracking-widest mb-7">
            Stavební řešení
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-[#111111]">Ing. Jakub Moc</h3>
              <p className="text-sm text-[#737373] mt-1">Stavební projektant</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#111111]">Ing. Veronika Mocová Madecká</h3>
              <p className="text-sm text-[#737373] mt-1">Architekt, stavební projektant</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#111111]">František Ovečka</h3>
              <p className="text-sm text-[#737373] mt-1">Stavební projektant</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
