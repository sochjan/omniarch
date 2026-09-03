'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { getBlurImage } from '@/lib/image'

export default function ProjectCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState<number[]>([0])
  const ready = useRef(new Set<number>())
  const pending = useRef<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const mouseStartX = useRef<number | null>(null)

  const mount = (index: number) => {
    setMounted((indices) => indices.includes(index) ? indices : [...indices, index])
  }

  const show = (index: number) => {
    if (ready.current.has(index)) {
      setCurrent(index)
      mount((index + 1) % images.length)
    } else {
      pending.current = index
      mount(index)
    }
  }

  const prev = () => show((current - 1 + images.length) % images.length)
  const next = () => show((current + 1) % images.length)

  return (
    <div
      className="relative w-full h-full"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) {
          if (diff > 0) next()
          else prev()
        }
        touchStartX.current = null
      }}
      onMouseDown={(e) => { mouseStartX.current = e.clientX }}
      onMouseUp={(e) => {
        if (mouseStartX.current === null) return
        const diff = mouseStartX.current - e.clientX
        if (Math.abs(diff) > 50) {
          if (diff > 0) next()
          else prev()
        }
        mouseStartX.current = null
      }}
      onMouseLeave={() => { mouseStartX.current = null }}
    >
      {images.map((src, i) => mounted.includes(i) && (
        <Image
          key={i}
          src={src}
          alt={`${title} – ${i + 1}`}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          preload={i === 0}
          placeholder="blur"
          blurDataURL={getBlurImage(src)}
          onLoad={() => {
            ready.current.add(i)
            if (i === current) mount((i + 1) % images.length)
            if (pending.current === i) {
              pending.current = null
              setCurrent(i)
              mount((i + 1) % images.length)
            }
          }}
          className={`object-cover transition-opacity duration-700 select-none cursor-grab active:cursor-grabbing ${
            i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          draggable={false}
        />
      ))}

      {images.length > 1 && (
        <>
          {/* Arrows — desktop only */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/50 hover:bg-white/80 text-[#111111] rounded-full transition-all"
            aria-label="Předchozí"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/50 hover:bg-white/80 text-[#111111] rounded-full transition-all"
            aria-label="Další"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => show(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-white scale-125' : 'bg-white/40'
                }`}
                aria-label={`Fotografie ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
