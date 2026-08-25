'use client'

import { useState, useRef } from 'react'

export default function ProjectCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length)
  const next = () => setCurrent((i) => (i + 1) % images.length)

  return (
    <div
      className="relative w-full h-full"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
        touchStartX.current = null
      }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} – ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
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
                onClick={() => setCurrent(i)}
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
