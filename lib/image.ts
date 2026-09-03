export function getBlurImage(src: string): string {
  if (src.endsWith('/placeholder.webp')) {
    return src.replace('/placeholder.webp', '/placeholder-blur.webp')
  }

  if (src.includes('/hero-carousel/')) {
    return src.replace('/hero-carousel/', '/hero-carousel/blur/')
  }

  if (src.includes('/optimized/')) {
    return src.replace('/optimized/', '/optimized/blur/')
  }

  if (src.endsWith('/card/card.webp')) {
    return src.replace('/card/card.webp', '/card/blur.webp')
  }

  if (src.endsWith('/hero.webp')) {
    return src.replace('/hero.webp', '/hero-blur.webp')
  }

  return src
}
