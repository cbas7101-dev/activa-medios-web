"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Layers, Box, ShieldCheck } from "lucide-react"

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

const materialItem = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
}

const MATERIALES = [
  {
    titulo: "Acrílico",
    desc: "Acabado brillante y profesional. Ideal para letras corpóreas iluminadas y paneles luminosos de alta gama.",
    Icon: Layers,
  },
  {
    titulo: "PVC",
    desc: "Ligero, resistente y económico. Perfecto para rótulos interiores, señalética y letras sin iluminación.",
    Icon: Box,
  },
  {
    titulo: "Aluminio Compuesto",
    desc: "Máxima durabilidad para exteriores. Resistente a la intemperie, ideal para fachadas comerciales y corporativas.",
    Icon: ShieldCheck,
  },
  {
    titulo: "Neón Flex LED",
    desc: "Tecnología LED flexible que imita el neón clásico. Eficiente, duradero y con colores vibrantes.",
    Icon: Sparkles,
  },
]

export default function RotulacionInfo() {
  return (
    <div className="relative min-h-screen bg-black pt-24 pb-16">
      <div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-red-600/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-red-600/5 blur-[100px]" />

        {/* HERO - full width */}
        <motion.div
          className="relative flex w-full min-h-[60vh] flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-20 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Background image */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="/fotos/rotulos3d.png"
              alt=""
              className="h-full w-full object-cover opacity-30"
            />
          </div>

          {/* Gradient overlay full-width */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-wider text-accent"
            >
              <Sparkles className="size-3.5" />
              Rotulación 3D profesional
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl"
            >
              Dale volumen a{" "}
              <span className="text-[#DC2626]">tu marca</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-gray-400 md:text-lg"
            >
              Fabricamos e instalamos letras corpóreas, rótulos 3D iluminados y neón flex LED.
              Transformamos tus ideas en piezas de comunicación visual que destacan y perduran.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8">
              <a
                href="/cotizacion-3d"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#DC2626] px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DC2626]/40"
              >
                Cotiza tu rótulo 3D
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </motion.div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* CTA - ¿Listo para tu rótulo 3D? */}
        <motion.section
          className="py-16 text-center md:py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-[#DC2626]/30 bg-[#DC2626]/10 px-6 py-14 backdrop-blur-md md:py-20">
            <div className="absolute inset-x-0 top-1/2 mx-auto h-32 w-3/4 -translate-y-1/2 rounded-full bg-red-600/20 blur-[80px]" />
            <div className="relative">
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-balance text-white md:text-5xl">
                ¿Listo para tu rótulo 3D?
              </h2>
              <p className="mx-auto mt-4 max-w-lg font-sans text-base leading-relaxed text-gray-400">
                Recibe una cotización personalizada sin compromiso en minutos.
              </p>
              <a
                href="/cotizacion-3d"
                className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#DC2626] px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DC2626]/40"
              >
                Cotiza tu Rótulo 3D
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.section>

        {/* MATERIALES */}
        <motion.section
          className="py-16 md:py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 max-w-2xl">
            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-[#DC2626]">
              Materiales
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-balance text-white md:text-4xl">
              Trabajamos con los mejores materiales
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {MATERIALES.map((mat) => (
              <motion.div
                key={mat.titulo}
                variants={materialItem}
                className="group rounded-2xl border border-transparent bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
              >
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-zinc-800/50 backdrop-blur-md">
                  <mat.Icon className="size-7 text-red-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {mat.titulo}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-gray-400">
                  {mat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

      </div>
    </div>
  )
}
