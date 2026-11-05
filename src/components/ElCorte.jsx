import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import VideoBackground from './VideoBackground'
import { asset } from '../lib/asset'

export default function ElCorte() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-reveal]', {
        y: 64,
        opacity: 0,
        duration: 1.25,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 72%',
        },
      })

      gsap.from('[data-frame]', {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-frame]',
          start: 'top 80%',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="corte" ref={root} className="relative bg-void py-28 md:py-40 lg:py-48">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 px-6 md:px-12 lg:px-16 items-center">
        <div className="lg:col-span-5 lg:pr-8">
          <p data-reveal className="font-sans text-[11px] tracking-[0.42em] text-ember uppercase mb-5">
            01 · El Corte
          </p>
          <h2
            data-reveal
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.95] mb-8"
          >
            La espera es el primer fuego.
          </h2>
          <p data-reveal className="text-ash font-sans font-light text-sm md:text-base leading-relaxed max-w-md">
            Seleccionamos canales de vaca vieja, maduradas entre 30 y 60 días en cámara propia.
            La humedad, el silencio y el tiempo hacen el resto. No aceleramos lo que la carne ya
            sabe hacer.
          </p>
          <p data-reveal className="mt-6 text-cream/70 font-serif italic text-xl md:text-2xl max-w-sm">
            Cada pieza es elegida. Madurada en silencio. Esperada.
          </p>
        </div>

        <div className="lg:col-span-7" data-frame>
          <div className="relative aspect-[4/5] md:aspect-[16/11] overflow-hidden">
            <VideoBackground src={asset('videos/hero.mp4')} />
            <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-cream/80">
                Cámara de maduración · 1,2 °C
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
