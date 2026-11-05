import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import ElCorte from './components/ElCorte'
import LaBrasa from './components/LaBrasa'
import ElRitual from './components/ElRitual'
import Carta from './components/Carta'
import Acompanamientos from './components/Acompanamientos'
import Filosofia from './components/Filosofia'
import Reserva from './components/Reserva'
import Footer from './components/Footer'
import { asset } from './lib/asset'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--grain-url',
      `url(${asset('grain.svg')})`
    )

    const minTime = new Promise((resolve) => setTimeout(resolve, 2200))
    const videoReady = new Promise((resolve) => {
      const video = document.createElement('video')
      video.src = asset('videos/hero.mp4')
      video.preload = 'auto'
      const done = () => resolve()
      video.addEventListener('canplaythrough', done, { once: true })
      setTimeout(done, 4000)
    })

    Promise.all([minTime, videoReady]).then(() => setLoading(false))
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (loading) return undefined

    ScrollTrigger.refresh()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      autoRaf: false,
      anchors: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const ticker = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [loading])

  return (
    <>
      <Loader visible={loading} />
      <CustomCursor />
      <div className="grain" />
      <Navbar />
      <main>
        <Hero ready={!loading} />
        <ElCorte />
        <LaBrasa />
        <ElRitual />
        <Carta />
        <Acompanamientos />
        <Filosofia />
        <Reserva />
      </main>
      <Footer />
    </>
  )
}
