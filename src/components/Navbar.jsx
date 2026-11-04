import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { href: '#corte', label: 'El Corte' },
  { href: '#brasa', label: 'La Brasa' },
  { href: '#ritual', label: 'El Ritual' },
  { href: '#carta', label: 'Carta' },
  { href: '#reserva', label: 'Reserva' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled || open ? 'bg-void/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 lg:px-14 h-16 md:h-[4.5rem]">
          <a
            href="#hero"
            className="font-display text-sm md:text-base tracking-[0.45em] text-cream pl-[0.45em]"
          >
            BRASA
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {links.slice(0, 4).map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="#reserva"
              className="hidden sm:inline-flex text-[10px] tracking-[0.32em] uppercase text-ember border border-ember/40 px-5 py-2 hover:bg-ember hover:text-void transition-colors duration-500"
            >
              Reservar
            </a>
            <button
              type="button"
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`block h-px w-6 bg-cream transition-transform duration-500 ${
                  open ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span className={`block h-px w-6 bg-cream transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span
                className={`block h-px w-6 bg-cream transition-transform duration-500 ${
                  open ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-void flex flex-col justify-center px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col gap-7">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-4xl text-cream"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
