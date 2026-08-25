'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const SLIDES = [
  { image: `${BASE}/placeholder.png`, slug: 'rodinny-dum-v-hradku-nad-nisou' },
  { image: `${BASE}/placeholder.png`, slug: 'rodinny-dum-v-hradku-nad-nisou' },
  { image: `${BASE}/placeholder.png`, slug: 'rodinny-dum-v-hradku-nad-nisou' },
  { image: `${BASE}/placeholder.png`, slug: 'rodinny-dum-v-hradku-nad-nisou' },
  { image: `${BASE}/placeholder.png`, slug: 'rodinny-dum-v-hradku-nad-nisou' },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const paused = useRef(false)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) setCurrent((i) => (i + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative w-full h-[75vh] overflow-hidden"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) diff > 0
          ? setCurrent((i) => (i + 1) % SLIDES.length)
          : setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length)
        touchStartX.current = null
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
        >
          <img
            src={slide.image}
            alt={`Projekt ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </Link>
      ))}

      {/* Arrows — desktop only */}
      <button
        onClick={(e) => { e.preventDefault(); setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length) }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/50 hover:bg-white/80 text-[#111111] rounded-full transition-all"
        aria-label="Předchozí"
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.preventDefault(); setCurrent((i) => (i + 1) % SLIDES.length) }}
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
