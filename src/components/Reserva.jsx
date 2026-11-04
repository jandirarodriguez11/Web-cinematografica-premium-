import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const initial = {
  name: '',
  email: '',
  date: '',
  people: '2',
  message: '',
}

export default function Reserva() {
  const root = useRef(null)
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-res]', {
        y: 56,
        opacity: 0,
        duration: 1.15,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="reserva" ref={root} className="relative bg-void py-28 md:py-40">
      <div className="px-6 md:px-12 lg:px-16 grid lg:grid-cols-12 gap-16 lg:gap-10">
        <div className="lg:col-span-5">
          <p data-res className="font-sans text-[11px] tracking-[0.42em] text-ember uppercase mb-5">
            07 · Reserva
          </p>
          <h2 data-res className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.95] mb-8">
            Una mesa junto al fuego.
          </h2>
          <p data-res className="text-ash font-sans font-light text-sm md:text-base leading-relaxed max-w-md mb-10">
            Solo con reserva. Servicio de miércoles a domingo, de 19:00 a 00:00. Si vienes en
            grupo, cuéntanoslo: el templo se prepara despacio.
          </p>
          <div data-res className="space-y-3 text-cream/80 font-sans text-sm">
            <p className="tracking-[0.2em] uppercase text-[11px] text-ash">Madrid</p>
            <p>Calle de la Brasa 7, 28004</p>
            <p>Mié–Dom · 19:00–00:00</p>
            <p className="text-ember">reservas@brasa.templo</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div data-res className="h-full min-h-[320px] flex flex-col justify-center border border-ember/30 px-8 py-16">
              <p className="font-sans text-[11px] tracking-[0.4em] text-ember uppercase mb-4">
                Recibido
              </p>
              <h3 className="font-serif text-4xl text-cream mb-4">El fuego te espera.</h3>
              <p className="text-ash font-light">
                Confirmaremos tu mesa en las próximas horas. Hasta entonces, que el hambre sea
                paciente.
              </p>
            </div>
          ) : (
            <form data-res onSubmit={onSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  placeholder="Nombre"
                  className="input-premium"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email"
                  className="input-premium"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="date" className="sr-only">
                    Fecha
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={onChange}
                    className="input-premium [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label htmlFor="people" className="sr-only">
                    Personas
                  </label>
                  <select
                    id="people"
                    name="people"
                    value={form.people}
                    onChange={onChange}
                    className="input-premium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-void">
                        {n} {n === 1 ? 'persona' : 'personas'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Mensaje — alergias, celebración, corte deseado"
                  className="input-premium resize-none"
                />
              </div>
              <button type="submit" className="btn-fire w-full sm:w-auto">
                Confirmar reserva
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
