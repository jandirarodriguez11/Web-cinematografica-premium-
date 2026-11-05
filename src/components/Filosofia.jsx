import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import VideoBackground from './VideoBackground'
import { asset } from '../lib/asset'

export default function Filosofia() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-filo]', {
        y: 60,
        opacity: 0,
        duration: 1.3,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 70%',
        },
      })

      gsap.to('[data-filo-video]', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="filosofia" ref={root} className="relative bg-void overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[100svh]">
        <div className="relative min-h-[50vh] lg:min-h-full overflow-hidden">
          <div data-filo-video className="absolute inset-0 scale-110">
            <VideoBackground src={asset('videos/ritual.mp4')} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-void/80 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-black/30 lg:hidden" />
        </div>

        <div className="flex items-center px-6 md:px-12 lg:px-16 py-24 md:py-32">
          <div className="max-w-xl">
            <p data-filo className="font-sans text-[11px] tracking-[0.42em] text-ember uppercase mb-5">
              06 · Filosofía
            </p>
            <h2 data-filo className="font-serif text-5xl md:text-6xl text-cream leading-[0.95] mb-10">
              No somos un asador. Somos un templo.
            </h2>
            <div className="space-y-6 text-ash font-sans font-light text-sm md:text-base leading-relaxed">
              <p data-filo>
                Aquí la carne no se cocina: se honra. El fuego no es espectáculo. Es lenguaje.
                Cada servicio es una ceremonia breve — sal, llama, espera, silencio — pensada para
                quien se sienta a la mesa sin prisa.
              </p>
              <p data-filo>
                Respetamos al animal, al productor y al tiempo que ambos nos piden. No hay carta
                infinita. Hay pocas piezas, bien elegidas, y un fuego que no se apaga para
                impresionar, sino para completar lo que la maduración empezó.
              </p>
              <p data-filo className="font-serif italic text-cream/85 text-xl md:text-2xl pt-2">
                El calor es un acto de fe. La mesa, el altar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
