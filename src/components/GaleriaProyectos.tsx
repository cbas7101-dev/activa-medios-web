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

const CATEGORIAS = ["Todos", "Metálicos", "Acrílicos", "Acero inoxidable", "Bronce", "Cajas de luz", "Vallas", "Gigantografías", "Adhesivos", "Menuderos", "Backings", "Viceras", "Decoración"]

const PROYECTOS: Proyecto[] = [
  { id: 1, titulo: "Rótulo Metálico Barranco", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Barranco.jpg" },
  { id: 2, titulo: "Rótulo Metálico Bucodent", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Bucodent.jpg" },
  { id: 3, titulo: "Rótulo Metálico Bagueteria", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Bagueteria.jpg" },
  { id: 4, titulo: "Rótulo Metálico Coimpexa", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Coimpexa.jpg" },
  { id: 7, titulo: "Rótulo Acrílico Chicberry", categoria: "Acrílicos", imagen: "/Galeria/3%20Acrílicos/Chicberry.jpg" },
  { id: 8, titulo: "Rótulo Acrílico Elite", categoria: "Acrílicos", imagen: "/Galeria/3%20Acrílicos/Elite.jpg" },
  { id: 9, titulo: "Rótulo Acrílico Misska", categoria: "Acrílicos", imagen: "/Galeria/3%20Acrílicos/Misska.jpg" },
  { id: 10, titulo: "Rótulo Acrílico Remax", categoria: "Acrílicos", imagen: "/Galeria/3%20Acrílicos/Remax.jpg" },
  { id: 11, titulo: "Rótulo Acero Almenar", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Almenar.jpg" },
  { id: 12, titulo: "Rótulo Acero Impordenim", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Impordenim.jpg" },
  { id: 13, titulo: "Rótulo Acero Uniquedeco", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Uniquedeco.jpg" },
  { id: 14, titulo: "Rótulo Bronce", categoria: "Bronce", imagen: "/Galeria/5%20Bronce/Bronce.jpg" },
  { id: 15, titulo: "Rótulo Bronce Impordenim", categoria: "Bronce", imagen: "/Galeria/5%20Bronce/Impordenim-Bronce.jpg" },
  { id: 16, titulo: "Caja de Luz Dianita", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Dianita.jpg" },
  { id: 17, titulo: "Caja de Luz Seyer Totem", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Seyer-Totem.jpg" },
  { id: 18, titulo: "Valla Publicitaria", categoria: "Vallas", imagen: "/Galeria/6%20Vallas/Valla.png" },
  { id: 19, titulo: "Valla Publicitaria 2", categoria: "Vallas", imagen: "/Galeria/6%20Vallas/Valla%202.png" },
  { id: 20, titulo: "Gigantografía Misska Portal", categoria: "Gigantografías", imagen: "/Galeria/7%20Gigantografías/Misska-Portal-5.jpg" },
  { id: 21, titulo: "Adhesivo Corporativo", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Adhesivos.jpg" },
  { id: 22, titulo: "Adhesivo Senae", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Senae.jpg" },
  { id: 23, titulo: "Menudero Qopos", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/Menuderos.jpg" },
  { id: 24, titulo: "Menudero Led", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/Cuadros-Leds.jpg" },
  { id: 25, titulo: "Menudero 3", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/Menudero-3.jpg" },
  { id: 26, titulo: "Backing Roll Up", categoria: "Backings", imagen: "/Galeria/11%20Backings/Roll-ups.jpg" },
  { id: 27, titulo: "Backing Samy Stand", categoria: "Backings", imagen: "/Galeria/11%20Backings/Samy-Stand.jpg" },
  { id: 28, titulo: "Vicera 1", categoria: "Viceras", imagen: "/Galeria/12%20Viceras/IMG_20251016_153440.jpg" },
  { id: 29, titulo: "Vicera 2", categoria: "Viceras", imagen: "/Galeria/12%20Viceras/IMG_20251016_153534.jpg" },
  { id: 32, titulo: "Decoración 1", categoria: "Decoración", imagen: "/Galeria/13%20Decoración/20180424_201149.jpg" },
  { id: 33, titulo: "Decoración 2", categoria: "Decoración", imagen: "/Galeria/13%20Decoración/20180424_201159.jpg" },
  { id: 34, titulo: "Decoración 3", categoria: "Decoración", imagen: "/Galeria/13%20Decoración/20180424_201207.jpg" },
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
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-black pt-24 pb-16">
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
            Galería Rótulos 3D
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
              className={`rounded-full px-5 py-2 font-sans text-sm font-semibold transition-transform duration-300 ${
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
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10"
            >
              <img
                src={proyecto.imagen}
                alt={proyecto.titulo}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = "none" }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 p-4 transition-transform duration-300 group-hover:bg-black/70">
                <span className="translate-y-4 font-sans text-base font-bold text-white opacity-0 transition-transform duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {proyecto.titulo}
                </span>
                <span className="mt-1 translate-y-4 font-sans text-xs text-gray-400 opacity-0 transition-transform duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
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
              className="absolute left-4 top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-transform duration-300 hover:bg-white/20 hover:scale-110"
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
              <div className="flex aspect-[4/3] w-full max-w-4xl items-center justify-center overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900/50 backdrop-blur-md">
                <img
                  src={filtradas[lightboxIdx].imagen}
                  alt={filtradas[lightboxIdx].titulo}
                  className="size-full object-cover"
                  loading="lazy"
                />
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
              className="absolute right-4 top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-transform duration-300 hover:bg-white/20 hover:scale-110"
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
