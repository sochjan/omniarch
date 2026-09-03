'use client'

import { useState } from 'react'
import type { ReactEventHandler } from 'react'
import Image from 'next/image'
import { getBlurImage } from '@/lib/image'

type ProgressiveImageProps = {
  src: string
  alt: string
  fill?: true
  sizes: string
  className?: string
  preload?: boolean
  loading?: 'eager' | 'lazy'
  draggable?: boolean
  onLoad?: ReactEventHandler<HTMLImageElement>
}

export default function ProgressiveImage({
  src,
  alt,
  sizes,
  className,
  preload,
  loading,
  draggable,
  onLoad,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Image
        src={getBlurImage(src)}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        loading={loading}
        className="object-cover"
        style={{
          filter: 'blur(16px)',
          transform: 'scale(1.08)',
          opacity: loaded ? 0 : 1,
          transition: 'opacity 500ms ease',
        }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={loading}
        className={className}
        draggable={draggable}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event)
        }}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 500ms ease',
        }}
      />
    </>
  )
}
