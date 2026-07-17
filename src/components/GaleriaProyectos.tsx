"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type Proyecto = {
  id: number
  titulo: string
  categoria: string
  imagen: string
}

const CATEGORIAS = ["Todos", "Rotulación 3D", "Cursos", "Señaléticas", "Acrílicos"]

const PROYECTOS: Proyecto[] = [
  { id: 1, titulo: "Letras Corpóreas Doradas", categoria: "Rotulación 3D", imagen: "/work-1.png" },
  { id: 2, titulo: "Taller de Letras 3D Nivel 1", categoria: "Cursos", imagen: "/work-2.png" },
  { id: 3, titulo: "Señalética Corporativa Oficinas", categoria: "Señaléticas", imagen: "/work-3.png" },
  { id: 4, titulo: "Panel Acrílico Iluminado", categoria: "Acrílicos", imagen: "/work-4.png" },
  { id: 5, titulo: "Rótulo 3D Fachada Comercial", categoria: "Rotulación 3D", imagen: "/work-5.png" },
  { id: 6, titulo: "Taller Avanzado Rotulación", categoria: "Cursos", imagen: "/work-6.png" },
  { id: 7, titulo: "Señalética Zona de Seguridad", categoria: "Señaléticas", imagen: "/work-1.png" },
  { id: 8, titulo: "Acrílico Luminoso Recepción", categoria: "Acrílicos", imagen: "/work-2.png" },
  { id: 9, titulo: "Letras 3D Iluminadas LED", categoria: "Rotulación 3D", imagen: "/work-3.png" },
  { id: 10, titulo: "Taller Práctico Señaléticas", categoria: "Cursos", imagen: "/work-4.png" },
  { id: 11, titulo: "Señalética Exterior Metálica", categoria: "Señaléticas", imagen: "/work-5.png" },
  { id: 12, titulo: "Estructuras Acrílicas Publicitarias", categoria: "Acrílicos", imagen: "/work-6.png" },
  { id: 13, titulo: "Rótulo Corporativo 3D", categoria: "Rotulación 3D", imagen: "/work-1.png" },
  { id: 14, titulo: "Capacitación en Rotulación", categoria: "Cursos", imagen: "/work-2.png" },
  { id: 15, titulo: "Letrero Acrílico Exterior", categoria: "Acrílicos", imagen: "/work-3.png" },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function GaleriaProyectos() {
  const [activa, setActiva] = useState("Todos")
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const filtradas = useMemo(() => {
    if (activa === "Todos") return PROYECTOS
    return PROYECTOS.filter((p) => p.categoria === activa)
  }, [activa])

  const openLightbox = (idx: number) => setLightboxIdx(idx)
  const closeLightbox = () => setLightboxIdx(null)

  const prevImage = () => {
    setLightboxIdx((prev) =>
      prev !== null ? (prev - 1 + filtradas.length) % filtradas.length : null
    )
  }

  const nextImage = () => {
    setLightboxIdx((prev) =>
      prev !== null ? (prev + 1) % filtradas.length : null
    )
  }

  return (
    <div className="relative min-h-screen bg-black pt-24 pb-16">
      <div className="absolute top-1/3 left-1/4 size-80 rounded-full bg-red-600/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 size-72 rounded-full bg-red-600/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Galería
          </h1>
          <p className="mt-3 font-sans text-base text-gray-400">
            Proyectos que hablan por sí solos
          </p>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiva(cat)}
              className={`rounded-full px-5 py-2 font-sans text-sm font-semibold transition-all duration-300 ${
                activa === cat
                  ? "bg-[#DC2626] text-white shadow-lg shadow-[#DC2626]/30"
                  : "bg-zinc-800/50 text-gray-400 backdrop-blur-md hover:bg-zinc-700 hover:text-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={activa}
        >
          {filtradas.map((proyecto, idx) => (
            <motion.button
              key={proyecto.id}
              type="button"
              onClick={() => openLightbox(idx)}
              variants={cardItem}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10"
            >
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 text-gray-600">
                <span className="text-2xl font-bold tracking-widest">
                  {proyecto.categoria.slice(0, 3).toUpperCase()}
                </span>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 p-4 transition-all duration-300 group-hover:bg-black/70">
                <span className="translate-y-4 font-sans text-base font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {proyecto.titulo}
                </span>
                <span className="mt-1 translate-y-4 font-sans text-xs text-gray-400 opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                  {proyecto.categoria}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); closeLightbox() }}
              className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="size-6" />
            </button>

            <motion.button
              type="button"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
              aria-label="Anterior"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="size-7" />
            </motion.button>

            <motion.div
              className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex aspect-[4/3] w-full max-w-4xl items-center justify-center rounded-2xl border border-zinc-700/50 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-md">
                <span className="text-4xl font-bold tracking-widest text-gray-600">
                  {filtradas[lightboxIdx].categoria.slice(0, 3).toUpperCase()}
                </span>
              </div>
              <p className="mt-4 font-sans text-lg font-bold text-white">
                {filtradas[lightboxIdx].titulo}
              </p>
              <p className="mt-1 font-sans text-sm text-gray-400">
                {filtradas[lightboxIdx].categoria}
              </p>
              <p className="mt-2 font-sans text-xs text-gray-600">
                {lightboxIdx + 1} / {filtradas.length}
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110"
              aria-label="Siguiente"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="size-7" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
