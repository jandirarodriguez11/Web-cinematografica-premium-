import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import VideoBackground from './VideoBackground'
import { ritual } from '../data/content'
import { asset } from '../lib/asset'

export default function ElRitual() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-ritual-head]', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      })

      gsap.from('[data-step]', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-steps]',
          start: 'top 80%',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ritual"
      ref={root}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
    >
      <VideoBackground src={asset('videos/ritual.mp4')} />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-black/55 to-black/30" />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-32 pb-16 md:pb-20">
        <p data-ritual-head className="font-sans text-[11px] tracking-[0.42em] text-ember uppercase mb-5">
          03 · El Ritual
        </p>
        <h2
          data-ritual-head
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.95] max-w-3xl mb-4"
        >
          Cuatro gestos. Ninguno es decoración.
        </h2>
        <p data-ritual-head className="text-ash font-sans font-light max-w-xl mb-14 md:mb-16">
          Sal · Tiempo · Vuelta · Reposo. El orden es sagrado.
        </p>

        <div data-steps className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 border-t border-white/10 pt-10">
          {ritual.map((step) => (
            <article key={step.n} data-step className="group">
              <p className="font-display text-ember/90 text-sm tracking-[0.35em] mb-4">{step.n}</p>
              <h3 className="font-serif text-3xl text-cream mb-3 group-hover:text-ember transition-colors duration-500">
                {step.title}
              </h3>
              <p className="text-ash font-sans font-light text-sm leading-relaxed">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
