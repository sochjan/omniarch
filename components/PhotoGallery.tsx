'use client'

import { useState, useEffect, useCallback } from 'react'

export default function PhotoGallery({ images, title }: { images: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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

  const [main, ...rest] = images

  return (
    <>
      <div
        className="aspect-[4/3] relative overflow-hidden mb-3 cursor-zoom-in"
        onClick={() => setLightboxIndex(0)}
      >
        <img src={main} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {rest.map((src, i) => (
            <div
              key={i}
              className="aspect-[4/3] relative overflow-hidden cursor-zoom-in"
              onClick={() => setLightboxIndex(i + 1)}
            >
              <img src={src} alt={`${title} – fotografie ${i + 2}`} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
        >
          <img
            src={images[lightboxIndex]}
            alt={`${title} – fotografie ${lightboxIndex + 1}`}
            className="max-h-screen max-w-screen-lg w-full object-contain px-16"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl px-3 py-4 transition-colors"
            aria-label="Předchozí"
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl px-3 py-4 transition-colors"
            aria-label="Další"
          >
            →
          </button>
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-xl px-3 py-2 transition-colors"
            aria-label="Zavřít"
          >
            ✕
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  )
}
