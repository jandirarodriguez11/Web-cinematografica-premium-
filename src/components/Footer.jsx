export default function Footer() {
  return (
    <footer className="bg-void border-t border-white/5 px-6 md:px-12 lg:px-16 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <p className="font-display text-2xl tracking-[0.45em] text-cream pl-[0.45em] mb-3">BRASA</p>
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-ash">
            Madurada · Asada · Respetada
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-[11px] tracking-[0.28em] uppercase text-cream/70">
          <a href="https://instagram.com" className="hover:text-ember transition-colors">
            Instagram
          </a>
          <a href="mailto:reservas@brasa.templo" className="hover:text-ember transition-colors">
            Email
          </a>
          <a href="#reserva" className="hover:text-ember transition-colors">
            Reserva
          </a>
        </div>
      </div>
      <p className="mt-12 text-[10px] tracking-[0.2em] uppercase text-ash/70">
        © {new Date().getFullYear()} Brasa · Templo del fuego y de la carne
      </p>
    </footer>
  )
}
