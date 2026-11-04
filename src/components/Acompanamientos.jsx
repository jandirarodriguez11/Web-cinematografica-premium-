import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { sides } from '../data/content'

export default function Acompanamientos() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-side-head]', {
        y: 50,
        opacity: 0,
        duration: 1.15,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      })

      gsap.from('[data-side]', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-sides]',
          start: 'top 80%',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="acompanamientos" ref={root} className="relative bg-coal py-28 md:py-40">
      <div className="px-6 md:px-12 lg:px-16 mb-14 md:mb-16">
        <p data-side-head className="font-sans text-[11px] tracking-[0.42em] text-ember uppercase mb-5">
          05 · Acompañamientos
        </p>
        <h2
          data-side-head
          className="font-serif text-5xl md:text-6xl text-cream leading-[0.95] max-w-2xl"
        >
          Lo que acompaña al rito.
        </h2>
      </div>

      <div data-sides className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
        {sides.map((side) => (
          <article
            key={side.name}
            data-side
            data-cursor
            className="group bg-coal relative overflow-hidden"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={side.image}
                alt={side.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="px-7 py-7 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-cream mb-1 group-hover:text-ember transition-colors duration-500">
                  {side.name}
                </h3>
                <p className="text-ash text-sm font-light">{side.note}</p>
              </div>
              <p className="font-sans text-cream/80 text-sm whitespace-nowrap">{side.price}€</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
