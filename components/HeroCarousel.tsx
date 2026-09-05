'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import ProgressiveImage from '@/components/ProgressiveImage'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/omniarch'
const heroImage = (number: number) => `${BASE}/hero-carousel/hero${number}.webp`

const SLIDES = [
  {
    image: heroImage(1),
    slug: 'rekonstrukce-rd-v-holenicich',
    title: 'Rekonstrukce RD Holenice',
    details: 'Holenice, Turnov · 2018',
    alt: 'Rekonstruovaný rodinný dům v Holenicích se zahradou a kamennými terasami',
  },
  {
    image: heroImage(2),
    slug: 'rodinny-dum-skalany',
    title: 'Rodinný dům Skalany',
    details: 'Skalany, Český ráj · 2018',
    alt: 'Moderní rodinný dům ve Skalanech s dřevěnou fasádou a výhledem do krajiny',
  },
  {
    image: heroImage(3),
    slug: 'rodinny-dum-podoli',
    title: 'Rodinný dům v Podolí',
    details: 'Podolí, Uherské Hradiště · 2008',
    alt: 'Rodinný dům v Podolí u Uherského Hradiště s terasou a solárními kolektory',
  },
  {
    image: heroImage(4),
    slug: 'rodinny-dum-radcice',
    title: 'Rodinný dům v Liberci – Radčicích',
    details: 'Radčice, Liberec',
    alt: 'Vizualizace rodinného domu v Radčicích s moderní fasádou a zastřešenou terasou',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [firstImageLoaded, setFirstImageLoaded] = useState(false)
  const paused = useRef(false)
  const touchStartX = useRef<number | null>(null)
  const mouseStartX = useRef<number | null>(null)
  const wasDragging = useRef(false)

  const prev = () => {
    if (firstImageLoaded) setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  }
  const next = () => {
    if (firstImageLoaded) setCurrent((i) => (i + 1) % SLIDES.length)
  }

  useEffect(() => {
    if (!firstImageLoaded) return
    const interval = setInterval(() => {
      if (!paused.current) setCurrent((i) => (i + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [firstImageLoaded])

  useEffect(() => {
    if (!firstImageLoaded) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!window.matchMedia('(min-width: 768px)').matches) return
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return

      const target = event.target as HTMLElement | null
      if (target?.isContentEditable || target?.matches('input, textarea, select')) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        setCurrent((i) => (i + 1) % SLIDES.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [firstImageLoaded])

  return (
    <div
      className="relative w-full h-[82vh] overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false; mouseStartX.current = null }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; wasDragging.current = false }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) {
          wasDragging.current = true
          if (diff > 0) next()
          else prev()
        }
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
        if (Math.abs(diff) > 50) {
          if (diff > 0) next()
          else prev()
        }
        mouseStartX.current = null
      }}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={i !== current}
        >
          <ProgressiveImage
            src={slide.image}
            alt={slide.alt}
            fill
            sizes="100vw"
            loading={i === 0 ? 'eager' : 'lazy'}
            onLoad={() => {
              if (i === 0) setFirstImageLoaded(true)
            }}
            className="object-cover"
            draggable={false}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
          <Link
            href={`/${slide.slug}`}
            className="group absolute left-6 bottom-12 md:left-10 md:bottom-9 z-10 text-white drop-shadow-sm"
            tabIndex={i === current ? 0 : -1}
            onClick={(event) => {
              if (wasDragging.current) event.preventDefault()
              wasDragging.current = false
            }}
          >
            <h2 className="text-lg md:text-2xl font-light tracking-tight">
              {slide.title}
            </h2>
            <p className="hidden md:block mt-1 text-xs font-light tracking-wide text-white/80 group-hover:text-white transition-colors">
              {slide.details}
            </p>
            <span className="block mt-2 h-px w-0 bg-white/80 transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
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
            onClick={(e) => {
              e.preventDefault()
              if (firstImageLoaded) setCurrent(i)
            }}
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
