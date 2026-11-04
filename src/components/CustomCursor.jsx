import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    document.body.classList.add('has-custom-cursor')

    let x = 0
    let y = 0
    let rx = 0
    let ry = 0
    let hovering = false
    let raf
    let armed = false

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!armed) {
        armed = true
        dot.current?.classList.add('is-on')
        ring.current?.classList.add('is-on')
      }
    }

    const onOver = (e) => {
      hovering = Boolean(e.target.closest('a, button, input, textarea, select, [data-cursor]'))
    }

    const tick = () => {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
        ring.current.classList.toggle('is-hover', hovering)
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block" />
    </>
  )
}
