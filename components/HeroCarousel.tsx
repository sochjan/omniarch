'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/omniarch'

const SLIDES = [
  {
    image: `${BASE}/projects/rekonstrukce-rd-v-holenicich/holenice_001.jpg`,
    slug: 'rekonstrukce-rd-v-holenicich',
    alt: 'Rekonstruovaný rodinný dům v Holenicích se zahradou a kamennými terasami',
  },
  {
    image: `${BASE}/projects/rodinny-dum-skalany/skalany_001.jpg`,
    slug: 'rodinny-dum-skalany',
    alt: 'Moderní rodinný dům ve Skalanech s dřevěnou fasádou a výhledem do krajiny',
  },
  {
    image: `${BASE}/projects/rodinny-dum-podoli/podoli_001.jpg`,
    slug: 'rodinny-dum-podoli',
    alt: 'Rodinný dům v Podolí u Uherského Hradiště s terasou a solárními kolektory',
  },
  {
    image: `${BASE}/projects/rodinny-dum-radcice/radcice_001.jpg`,
    slug: 'rodinny-dum-radcice',
    alt: 'Vizualizace rodinného domu v Radčicích s moderní fasádou a zastřešenou terasou',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const paused = useRef(false)
  const touchStartX = useRef<number | null>(null)
  const mouseStartX = useRef<number | null>(null)
  const wasDragging = useRef(false)

  const prev = () => setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setCurrent((i) => (i + 1) % SLIDES.length)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) setCurrent((i) => (i + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative w-full h-[75vh] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false; mouseStartX.current = null }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
        touchStartX.current = null
      }}
      onMouseDown={(e) => { mouseStartX.current = e.clientX; wasDragging.current = false }}
      onMouseMove={(e) => {
        if (mouseStartX.current !== null && Math.abs(e.clientX - mouseStartX.current) > 10)
          wasDragging.current = true
      }}
      onMouseUp={(e) => {
        if (mouseStartX.current === null) return
        const diff = mouseStartX.current - e.clientX
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
        mouseStartX.current = null
      }}
    >
      {SLIDES.map((slide, i) => (
        <Link
          key={i}
          href={`/${slide.slug}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
          tabIndex={i === current ? 0 : -1}
          onClick={(e) => {
            if (wasDragging.current) {
              e.preventDefault()
              wasDragging.current = false
            }
          }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </Link>
      ))}

      {/* Arrows — desktop only */}
      <button
        onClick={(e) => { e.preventDefault(); prev() }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/50 hover:bg-white/80 text-[#111111] rounded-full transition-all"
        aria-label="Předchozí"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.preventDefault(); next() }}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/50 hover:bg-white/80 text-[#111111] rounded-full transition-all"
        aria-label="Další"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); setCurrent(i) }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-125' : 'bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
