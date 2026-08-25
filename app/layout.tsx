import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'OMNIARCH – projekty rodinných domů a obytných budov',
  description:
    'Volné seskupení architektů a stavebních projektantů z Liberce. Specializujeme se na projekty rodinných domů, bytových budov a komerčních staveb.',
  keywords: 'architektura, rodinné domy, projekty, Liberec, architekt, Pavel Novák, OMNIARCH',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#e6d9c4] text-[#111111]">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#e5e5e5] py-10 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4 text-sm text-[#737373]">
            <span className="tracking-widest uppercase text-[#111111] font-light text-xs">OMNIARCH</span>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="mailto:novak@omniarch.cz" className="hover:text-[#111111] transition-colors">
                novak@omniarch.cz
              </a>
              <a href="tel:+420775656227" className="hover:text-[#111111] transition-colors">
                +420 775 656 227
              </a>
              <span>Liberec, Česká republika</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
