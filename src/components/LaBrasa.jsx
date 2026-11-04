import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VideoBackground from './VideoBackground'

const embers = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${4 + ((i * 17) % 92)}%`,
  delay: `${(i * 0.37) % 4.5}s`,
  duration: `${3.8 + (i % 5) * 0.55}s`,
  size: 2 + (i % 4),
}))

export default function LaBrasa() {
  const root = useRef(null)
  const heat = useRef(null)
  const temp = useRef(null)
  const embersRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-brasa]', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      })

      gsap.set(heat.current, { opacity: 0.08 })
      gsap.set(embersRef.current, { opacity: 0.15 })

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(heat.current, { opacity: 0.08 + p * 0.7 })
          gsap.set(embersRef.current, { opacity: 0.15 + p * 0.85 })
          if (temp.current) {
            temp.current.textContent = `${Math.round(180 + p * 640)}°`
          }
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="brasa" ref={root} className="relative h-[220vh] bg-void">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <VideoBackground src="/videos/brasa.mp4" />
        <div className="absolute inset-0 bg-black/45" />
        <div ref={heat} className="heat-glow absolute inset-0 pointer-events-none" />

        <div ref={embersRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          {embers.map((e) => (
            <span
              key={e.id}
              className="ember"
              style={{
                left: e.left,
                animationDelay: e.delay,
                animationDuration: e.duration,
                width: e.size,
                height: e.size,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-20 md:pb-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="max-w-2xl">
              <p data-brasa className="font-sans text-[11px] tracking-[0.42em] text-ember uppercase mb-5">
                02 · La Brasa
              </p>
              <h2
                data-brasa
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.95] mb-6"
              >
                El fuego no se domestica.
              </h2>
              <p data-brasa className="text-cream/75 font-sans font-light text-sm md:text-base leading-relaxed max-w-lg">
                Brasas vivas. Sin gas. Sin atajos. El calor envuelve la pieza hasta que la grasa
                canta y la corteza se vuelve ritual. Aquí el templo se enciende.
              </p>
            </div>

            <div data-brasa className="md:text-right">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/50 mb-2">
                Temperatura del templo
              </p>
              <p ref={temp} className="font-display text-5xl md:text-6xl text-ember tracking-wider">
                180°
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
