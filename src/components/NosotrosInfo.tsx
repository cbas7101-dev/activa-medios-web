"use client"

import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const bentoItem = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
}

const TALLER_FOTOS = [
  { src: "/Fotos_y_Videos/Tpazio-2.jpg", alt: "Vista del taller de Activa Medios" },
  { src: "/Fotos_y_Videos/impresora-origen-1.jpg", alt: "Impresora de gran formato en el taller" },
  { src: "/Fotos_y_Videos/moladora.jpg", alt: "Herramientas de corte y fabricación" },
  { src: "/Fotos_y_Videos/Gigantografias-foto-interna-ai.png", alt: "Gigantografía instalada en fachada" },
  { src: "/Fotos_y_Videos/Tpazio-2.jpg", alt: "Proyecto de rotulación 3D en taller" },
]

export default function NosotrosInfo() {
  return (
    <div className="relative min-h-screen bg-black pt-24 pb-16">
      <div className="absolute top-1/4 left-1/3 size-96 rounded-full bg-red-600/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-red-600/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">

        <motion.div
          className="grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:py-24"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div>
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-wider text-accent"
            >
              Quito – Ecuador
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-balance text-white md:text-5xl"
            >
              Hecho en Quito, con{" "}
              <span className="text-[#DC2626]">manos que saben</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 font-sans text-base leading-relaxed text-gray-400"
            >
              En Activa Medios llevamos más de una década transformando espacios con
              comunicación visual profesional. Nacimos en Quito con la convicción de
              que un letrero bien hecho no solo informa: construye identidad.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="mt-4 font-sans text-base leading-relaxed text-gray-400"
            >
              Desde nuestro taller fabricamos letras corpóreas, rótulos 3D iluminados,
              neón flex LED, acrílicos y más. Cada proyecto lo tratamos con el cuidado
              artesanal que merece, combinando tecnología y experiencia para ofrecer
              resultados que hablan por sí solos.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={4}
              className="mt-4 font-sans text-base leading-relaxed text-gray-400"
            >
              Creemos en el trabajo bien hecho, en los detalles que marcan la diferencia
              y en el compromiso con cada cliente. Porque tu marca merece brillar.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#DC2626]/20 to-transparent blur-2xl" />
            <img
              src="/Fotos_y_Videos/Nuestra-Historia-scaled.jpg"
              alt="Taller de Activa Medios en Quito"
              className="relative rounded-2xl border border-white/10 object-cover shadow-2xl"
            />
          </motion.div>
        </motion.div>

        <motion.section
          className="py-16 md:py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10 max-w-2xl">
            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-[#DC2626]">
              Nuestro taller
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance text-white md:text-4xl">
              Así trabajamos
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={bentoItem}
              className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10 md:col-span-2 md:row-span-2"
            >
              <img
                src={TALLER_FOTOS[0].src}
                alt={TALLER_FOTOS[0].alt}
                className="size-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div
              variants={bentoItem}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10"
            >
              <img
                src={TALLER_FOTOS[1].src}
                alt={TALLER_FOTOS[1].alt}
                className="size-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div
              variants={bentoItem}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10"
            >
              <img
                src={TALLER_FOTOS[2].src}
                alt={TALLER_FOTOS[2].alt}
                className="size-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div
              variants={bentoItem}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10"
            >
              <img
                src={TALLER_FOTOS[3].src}
                alt={TALLER_FOTOS[3].alt}
                className="size-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div
              variants={bentoItem}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10"
            >
              <img
                src={TALLER_FOTOS[4].src}
                alt={TALLER_FOTOS[4].alt}
                className="size-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  )
}
