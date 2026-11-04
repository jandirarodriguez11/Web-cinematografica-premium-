import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import VideoBackground from './VideoBackground'

export default function Hero({ ready }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (ready) {
        const tl = gsap.timeline({ delay: 0.15 })
        tl.fromTo(
          '[data-hero="logo"]',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' }
        )
          .fromTo(
            '[data-hero="tag"]',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.08 },
            '-=0.7'
          )
          .fromTo(
            '[data-hero="scroll"]',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
            '-=0.55'
          )
      }

      gsap.to('[data-hero="video"]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      id="hero"
      ref={root}
      className="relative h-[100svh] overflow-hidden"
    >
      <div data-hero="video" className="absolute inset-0 scale-110">
        <VideoBackground src="/videos/hero.mp4" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-void" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p
          data-hero="tag"
          className="opacity-0 font-sans text-[10px] md:text-[11px] tracking-[0.55em] text-ember uppercase mb-6 md:mb-8"
        >
          Templo del fuego y de la carne
        </p>

        <h1
          data-hero="logo"
          className="opacity-0 font-display text-[13vw] leading-[0.9] sm:text-8xl md:text-9xl lg:text-[9.5rem] tracking-[0.38em] sm:tracking-[0.48em] text-cream pl-[0.38em] sm:pl-[0.48em]"
        >
          BRASA
        </h1>

        <p
          data-hero="tag"
          className="opacity-0 mt-8 md:mt-10 font-sans text-[10px] md:text-xs tracking-[0.42em] text-cream/80 uppercase"
        >
          Madurada · Asada · Respetada
        </p>
      </div>

      <a
        href="#corte"
        data-hero="scroll"
        className="opacity-0 absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-cream/70"
      >
        <span className="font-sans text-[9px] tracking-[0.38em] uppercase">
          Scroll to raise the heat
        </span>
        <span className="scroll-line block w-px h-12 bg-gradient-to-b from-ember to-transparent" />
      </a>
    </section>
  )
}
