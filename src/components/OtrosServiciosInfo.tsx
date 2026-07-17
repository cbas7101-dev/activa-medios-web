"use client"

import { motion } from "framer-motion"
import { ArrowRight, Megaphone, Monitor, Signpost, Bus, Image, Printer } from "lucide-react"

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

const SERVICIOS = [
  {
    titulo: "Publicitarios",
    desc: "Activa tu punto de venta con material P.O.P. y haz que tu empresa se destaque, imprime tu marca en: roll ups, pop ups, exhibidores, porta menús, agendas pasta dura, vidrios publicitarios, carpas, inflables, mesas degustadoras y productos personalizados. ¡Somos el complemento ideal para tu negocio!",
    icon: Megaphone,
  },
  {
    titulo: "Diseño Web",
    desc: "Planificamos, diseñamos y desarrollamos su página web buscando el mayor impacto estratégico a la hora de hacer clic con su negocio o empresa. ¡Tus productos y servicios véndelos o promociónalos así de fácil!",
    icon: Monitor,
  },
  {
    titulo: "Señalética",
    desc: "Soluciones altamente personalizadas: materiales durables y de calidad, aplicaciones foto luminiscentes y reflectivas estandarizadas para brindarle mayor seguridad.",
    icon: Signpost,
  },
  {
    titulo: "Publicidad Móvil",
    desc: "Utilizamos espacios publicitarios en autobuses de transporte público, camiones, furgones, taxis a nivel nacional para mostrar anuncios gráficos o de video en el exterior o interior. Le ofrecemos opciones de segmentación para aumentar la relevancia y la efectividad de las campañas publicitarias.",
    icon: Bus,
  },
  {
    titulo: "Gigantografías",
    desc: "Imprimimos en gran formato para publicidad y promoción en paredes, vallas publicitarias y edificios. Pueden ser personalizadas con gráficos e imágenes y adaptarse a diferentes ubicaciones y audiencias específicas. Impresión para exterior e interior en alta definición: lonas banner, traslúcida, vinil adhesivo mate o brillante, microperforados, laminados, reflectivo, roll ups, pop ups armables. ¡Incluimos el servicio de instalación!",
    icon: Image,
  },
  {
    titulo: "Imprenta",
    desc: "Somos la solución a sus proyectos gráficos e impresos, deseamos que nuestros servicios le ayuden a concretar sus objetivos. Imprime: hojas membretadas, carpetas corporativas, revistas, folletos, libros, tarjetas de presentación, flyers (hojas volantes), dípticos, trípticos, plegables, etiquetas, textos y gráficos en papel y otros materiales, personalizándolos según sus necesidades. Incluye acabados especiales como barniz UV, troquelados, estampados en relieve y láminas en pan de oro o plata para dar calidad y sofisticación.",
    icon: Printer,
  },
]

export default function OtrosServiciosInfo() {
  return (
    <div className="relative min-h-screen bg-black pt-24 pb-16">
      <div className="absolute top-1/4 right-1/4 size-96 rounded-full bg-red-600/5 blur-[140px]" />
      <div className="absolute bottom-1/4 left-1/4 size-80 rounded-full bg-red-600/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">

        <motion.div
          className="py-16 text-center md:py-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-sans text-sm font-semibold uppercase tracking-wider text-[#DC2626]">
            Complementos
          </span>
          <h1 className="mx-auto mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl">
            Otros <span className="text-[#DC2626]">Servicios</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-gray-400">
            Soluciones integrales de comunicación visual para tu marca.
            De la imprenta al mundo digital, un solo proveedor.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {SERVICIOS.map((svc) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.titulo}
                variants={cardItem}
                className="group flex flex-col rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/20 md:p-8"
              >
                <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-[#DC2626]/10">
                  <Icon className="size-7 text-[#DC2626]" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {svc.titulo}
                </h3>
                <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-gray-400">
                  {svc.desc}
                </p>
                <a
                  href="/cotizacion-3d"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#DC2626] px-5 py-3 font-sans text-sm font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#DC2626]/40"
                >
                  Cotiza ahora
                  <ArrowRight className="size-4" />
                </a>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </div>
  )
}
