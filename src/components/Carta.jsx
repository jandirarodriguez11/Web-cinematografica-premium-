import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { cuts } from '../data/content'

export default function Carta() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-carta-head]', {
        y: 56,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      })

      gsap.from('[data-cut]', {
        y: 70,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-grid]',
          start: 'top 78%',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="carta" ref={root} className="relative bg-void py-28 md:py-40">
      <div className="px-6 md:px-12 lg:px-16 mb-14 md:mb-20">
        <p data-carta-head className="font-sans text-[11px] tracking-[0.42em] text-ember uppercase mb-5">
          04 · Nuestra Carta
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2
            data-carta-head
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.95] max-w-xl"
          >
            Cortes que merecen el fuego.
          </h2>
          <p data-carta-head className="text-ash font-sans font-light text-sm max-w-sm md:text-right">
            Precios orientativos por 100 g. El peso final se confirma en mesa, a la vista.
          </p>
        </div>
      </div>

      <div data-grid className="grid sm:grid-cols-2 lg:grid-cols-3">
        {cuts.map((cut) => (
          <article
            key={cut.name}
            data-cut
            data-cursor
            className="cut-card group relative overflow-hidden aspect-[4/5] border-t border-white/5 sm:border-r"
          >
            <img
              src={cut.image}
              alt={cut.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 transition-colors duration-500 group-hover:from-black/95" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_bottom,rgba(255,77,0,0.28),transparent_55%)]" />

            <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
              <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-cream/60 mb-2">
                {cut.origin} · {cut.aging}
              </p>
              <div className="flex items-end justify-between gap-4">
                <h3 className="font-serif text-3xl md:text-4xl text-cream group-hover:text-ember transition-colors duration-500">
                  {cut.name}
                </h3>
                <p className="font-sans text-cream">
                  <span className="text-lg">{cut.price}€</span>
                  <span className="text-[10px] tracking-widest text-ash ml-1">{cut.unit}</span>
                </p>
              </div>
              <span className="mt-4 block h-px w-0 bg-ember group-hover:w-16 transition-all duration-700" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
