import { AnimatePresence, motion } from 'framer-motion'

export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.p
            className="font-display text-[11px] tracking-[0.6em] text-ember mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            TEMPLO DEL FUEGO
          </motion.p>

          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl tracking-[0.45em] text-cream pl-[0.45em]">
            {['B', 'R', 'A', 'S', 'A'].map((letter, i) => (
              <motion.span
                key={letter}
                className="inline-block"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className="mt-10 h-px bg-ember origin-left"
            initial={{ scaleX: 0, width: 180 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
