'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import ProgressiveImage from '@/components/ProgressiveImage'

export default function PhotoGallery({ images, title }: { images: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const mouseStartX = useRef<number | null>(null)
  const wasDragging = useRef(false)

  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length])
  const next = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)), [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, close, prev, next])

  useEffect(() => {
    if (lightboxIndex === null) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [lightboxIndex])

  const [main, ...rest] = images

  return (
    <>
      <div
        className="aspect-[4/3] relative overflow-hidden mb-3 cursor-zoom-in"
        onClick={() => setLightboxIndex(0)}
      >
        <ProgressiveImage
          src={main}
          alt={title}
          fill
          sizes="(max-width: 1279px) 100vw, 1280px"
          loading="eager"
          className="object-cover"
        />
      </div>

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {rest.map((src, i) => (
            <div
              key={i}
              className="aspect-[4/3] relative overflow-hidden cursor-zoom-in"
              onClick={() => setLightboxIndex(i + 1)}
            >
              <ProgressiveImage
                src={src}
                alt={`${title} – fotografie ${i + 2}`}
                fill
                sizes="(max-width: 767px) 50vw, 640px"
                loading="lazy"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie: ${title}`}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-none overscroll-contain"
          onClick={() => { if (!wasDragging.current) close(); wasDragging.current = false }}
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
          <div className="flex flex-col items-center w-full h-full px-0 pt-12 pb-16 md:px-8 md:pt-8 md:pb-20">
            <img
              src={images[lightboxIndex]}
              alt={`${title} – fotografie ${lightboxIndex + 1}`}
              decoding="async"
              className="w-full flex-1 min-h-0 object-contain pointer-events-none"
            />
            <div className="absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-6">
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="hidden md:block text-white/70 hover:text-white text-2xl px-3 py-2 transition-colors cursor-pointer"
                aria-label="Předchozí"
              >
                ←
              </button>
              <span className="text-white/50 text-xs tracking-widest">
                {lightboxIndex + 1} / {images.length}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="hidden md:block text-white/70 hover:text-white text-2xl px-3 py-2 transition-colors cursor-pointer"
                aria-label="Další"
              >
                →
              </button>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); close() }}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-xl px-3 py-2 transition-colors cursor-pointer"
            aria-label="Zavřít"
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}
