'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '/omniarch'

const links = [
  { href: '/architektura', label: 'Architektura' },
  { href: '/design', label: 'Design' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#fafaf8]/90 backdrop-blur-sm border-b border-[#e5e5e5]">
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center hover:opacity-70 transition-opacity"
          >
            <img src={`${BASE}/logo.svg`} alt="OMNIARCH" className="h-5 w-auto" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-xs tracking-wide uppercase transition-colors ${
                    pathname === href ? 'text-[#111111]' : 'text-[#737373] hover:text-[#111111]'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger — lines are 7px apart, so translate 7px to meet at center */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[6px]"
          >
            <span
              className={`block w-5 h-px bg-[#111111] transition-all duration-300 origin-center ${
                open ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-[#111111] transition-all duration-300 ${
                open ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-[#111111] transition-all duration-300 origin-center ${
                open ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#fafaf8] flex flex-col pt-20 px-8 md:hidden">
          <ul className="flex flex-col gap-8 mt-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`text-2xl font-extralight tracking-wide transition-colors ${
                    pathname === href ? 'text-[#111111]' : 'text-[#737373]'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pb-12 text-xs text-[#737373] space-y-1">
            <p>novak@omniarch.cz</p>
            <p>+420 775 656 227</p>
          </div>
        </div>
      )}
    </>
  )
}
