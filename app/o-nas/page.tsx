import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'O nás – OMNIARCH',
  description:
    'OMNIARCH je volné seskupení architektů a stavebních projektantů z Liberce specializující se na projekty rodinných domů a obytných budov.',
}

const team = [
  {
    name: 'Ing. arch. Pavel Novák',
    role: 'Architekt',
    contact: 'novak@omniarch.cz',
    phone: '+420 775 656 227',
  },
  {
    name: 'František Ovečka',
    role: 'Stavební projektant',
  },
  {
    name: 'Ing. Jakub Moc',
    role: 'Stavební projektant',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <p className="text-xs text-[#737373] uppercase tracking-widest mb-6">O nás</p>
          <h1 className="text-3xl md:text-4xl font-extralight text-[#111111] leading-tight mb-8">
            Volné seskupení architektů z Liberce
          </h1>
          <div className="space-y-5 text-base text-[#111111] font-light leading-relaxed">
            <p>
              OMNIARCH představuje volné seskupení architektů a stavebních projektantů z Liberce,
              kteří sdílejí podobný pohled na současnou architekturu a design.
            </p>
            <p>
              Specializujeme se zejména na projekty rodinných domů a obytných budov. Naše portfolio
              dále zahrnuje komerční stavby, dopravní budovy, design městského mobiliáře a
              individuální nábytek.
            </p>
            <p>
              Poskytujeme komplexní projektové služby ve všech fázích — od architektonické studie,
              přes vyřízení povolení stavebního záměru až po dokumentaci pro provedení stavby.
            </p>
            <p>
              Důraz klademe na moderní a svěží vzhled, jednoduchost stavby, úspory energií a
              individuální přístup ke každému klientovi.
            </p>
            <p>
              Dřívější projekty (2004–2011) vznikaly pod názvem{' '}
              <span className="text-[#111111]">SIADESIGN Liberec s.r.o.</span>
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-[#737373] uppercase tracking-widest mb-6">Tým</p>
          <div className="space-y-8">
            {team.map((member) => (
              <div key={member.name} className="border-t border-[#e5e5e5] pt-6">
                <h2 className="text-base font-normal text-[#111111] mb-1">{member.name}</h2>
                <p className="text-xs text-[#737373] uppercase tracking-wide mb-3">{member.role}</p>
                {member.contact && (
                  <a
                    href={`mailto:${member.contact}`}
                    className="text-xs text-[#737373] hover:text-[#111111] transition-colors block"
                  >
                    {member.contact}
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/\s/g, '')}`}
                    className="text-xs text-[#737373] hover:text-[#111111] transition-colors block"
                  >
                    {member.phone}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-[#e5e5e5] pt-8">
            <p className="text-xs text-[#737373] uppercase tracking-widest mb-4">Filosofie</p>
            <blockquote className="text-base text-[#111111] font-light leading-relaxed italic">
              „Moderní a svěží vzhled, jednoduchost stavby, úspory energií — s individuálním
              přístupem ke každému projektu."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
