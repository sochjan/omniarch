'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import ProgressiveImage from '@/components/ProgressiveImage'

type PhotoGalleryProps = {
  images: string[]
  captions?: Array<string | null>
  title: string
}

export default function PhotoGallery({ images, captions = [], title }: PhotoGalleryProps) {
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
  const captionAt = (index: number) => captions[index]?.trim() || null
  const currentCaption = lightboxIndex === null ? null : captionAt(lightboxIndex)

  return (
    <>
      <figure className="mb-5 md:mb-7">
        <div
          className="aspect-[4/3] relative overflow-hidden cursor-zoom-in"
          onClick={() => setLightboxIndex(0)}
        >
          <ProgressiveImage
            src={main}
            alt={captionAt(0) ?? title}
            fill
            sizes="(max-width: 1279px) 100vw, 1280px"
            loading="eager"
            className="object-cover"
          />
        </div>
        {captionAt(0) && (
          <figcaption className="mt-2.5 max-w-3xl text-xs md:text-sm font-light leading-relaxed text-[#737373]">
            {captionAt(0)}
          </figcaption>
        )}
      </figure>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6 md:gap-y-8">
          {rest.map((src, i) => (
            <figure key={src}>
              <div
                className="aspect-[4/3] relative overflow-hidden cursor-zoom-in"
                onClick={() => setLightboxIndex(i + 1)}
              >
                <ProgressiveImage
                  src={src}
                  alt={captionAt(i + 1) ?? `${title} – fotografie ${i + 2}`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 640px"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              {captionAt(i + 1) && (
                <figcaption className="mt-2 text-xs md:text-sm font-light leading-relaxed text-[#737373]">
                  {captionAt(i + 1)}
                </figcaption>
              )}
            </figure>
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
            <div className="flex flex-1 min-h-0 w-full items-center justify-center">
              <div className="relative inline-flex max-w-full max-h-full">
                <img
                  src={images[lightboxIndex]}
                  alt={currentCaption ?? `${title} – fotografie ${lightboxIndex + 1}`}
                  decoding="async"
                  className="block w-auto h-auto max-w-full max-h-full object-contain pointer-events-none"
                />
                {currentCaption && (
                  <p className="absolute inset-x-0 bottom-0 px-4 md:px-6 pt-10 md:pt-12 pb-4 md:pb-5 text-center text-xs md:text-sm font-light leading-relaxed text-white bg-gradient-to-t from-black/65 via-black/30 to-transparent">
                    {currentCaption}
                  </p>
                )}
              </div>
            </div>
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
