import type { Metadata } from 'next'
import Link from 'next/link'
import { designProjects } from '@/lib/design'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: 'Design – OMNIARCH',
  description: 'Průmyslový design, městský mobiliář a nábytkové projekty studia OMNIARCH.',
}

export default function DesignPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="max-w-2xl mb-16">
        <p className="text-xs text-[#737373] uppercase tracking-widest mb-4">Design</p>
        <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-[#111111] leading-tight mb-4">
          Průmyslový design
        </h1>
        <p className="text-[#737373] text-base font-light leading-relaxed">
          Vedle architektonické praxe se věnujeme i průmyslovému designu — od městského mobiliáře
          přes nábytek až po drobné architektonické prvky ve veřejném prostoru.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {designProjects.map((item) => (
          <Link key={item.slug} href={`/${item.slug}`} className="group block">
            <div className="aspect-[4/3] relative overflow-hidden mb-3">
              <img
                src={`${BASE}/placeholder.png`}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white drop-shadow">
                  Zobrazit projekt →
                </span>
              </div>
              <div className="absolute inset-0 bg-[#111111] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <h2 className="text-sm font-normal text-[#111111] group-hover:opacity-70 transition-opacity duration-200">
              {item.title}
            </h2>
            {item.tagline && (
              <p className="text-xs text-[#737373] mt-1 leading-relaxed">{item.tagline}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
