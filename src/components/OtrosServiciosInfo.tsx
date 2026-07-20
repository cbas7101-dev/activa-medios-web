"use client"

import { motion } from "framer-motion"
import { ArrowRight, Megaphone, Monitor, Signpost, Bus, Image, Printer } from "lucide-react"

type Servicio = {
  titulo: string
  desc: string
  icon: React.ElementType
  imagen: string
}

const SERVICIOS: Servicio[] = [
  {
    titulo: "Publicitarios",
    desc: "Activa tu punto de venta con material P.O.P. y haz que tu empresa se destaque, imprime tu marca en: roll ups, pop ups, exhibidores, porta menús, agendas pasta dura, vidrios publicitarios, carpas, inflables, mesas degustadoras y productos personalizados. ¡Somos el complemento ideal para tu negocio!",
    icon: Megaphone,
    imagen: "/fotos/Publicitarios-foto-interna-ai-e1679525816548.png",
  },
  {
    titulo: "Diseño Web",
    desc: "Planificamos, diseñamos y desarrollamos su página web buscando el mayor impacto estratégico a la hora de hacer clic con su negocio o empresa. ¡Tus productos y servicios véndelos o promociónalos así de fácil!",
    icon: Monitor,
    imagen: "/fotos/Diseno-web-foto-interna-2-ai-e1680123248104.png",
  },
  {
    titulo: "Señalética",
    desc: "Soluciones altamente personalizadas: materiales durables y de calidad, aplicaciones foto luminiscentes y reflectivas estandarizadas para brindarle mayor seguridad.",
    icon: Signpost,
    imagen: "/fotos/Senaletica-foto-interna-ai.png",
  },
  {
    titulo: "Publicidad Móvil",
    desc: "Utilizamos espacios publicitarios en autobuses de transporte público, camiones, furgones, taxis a nivel nacional para mostrar anuncios gráficos o de video en el exterior o interior. Le ofrecemos opciones de segmentación para aumentar la relevancia y la efectividad de las campañas publicitarias.",
    icon: Bus,
    imagen: "/fotos/Publicidad-movil-foto-interna-ai.png",
  },
  {
    titulo: "Gigantografías",
    desc: "Imprimimos en gran formato para publicidad y promoción en paredes, vallas publicitarias y edificios. Pueden ser personalizadas con gráficos e imágenes y adaptarse a diferentes ubicaciones y audiencias específicas. Impresión para exterior e interior en alta definición: lonas banner, traslúcida, vinil adhesivo mate o brillante, microperforados, laminados, reflectivo, roll ups, pop ups armables. ¡Incluimos el servicio de instalación!",
    icon: Image,
    imagen: "/fotos/Gigantografias-foto-interna-ai (1).png",
  },
  {
    titulo: "Imprenta",
    desc: "Somos la solución a sus proyectos gráficos e impresos, deseamos que nuestros servicios le ayuden a concretar sus objetivos. Imprime: hojas membretadas, carpetas corporativas, revistas, folletos, libros, tarjetas de presentación, flyers (hojas volantes), dípticos, trípticos, plegables, etiquetas, textos y gráficos en papel y otros materiales, personalizándolos según sus necesidades. Incluye acabados especiales como barniz UV, troquelados, estampados en relieve y láminas en pan de oro o plata para dar calidad y sofisticación.",
    icon: Printer,
    imagen: "/fotos/Imprenta-foto-interna-ai.png",
  },
]

export default function OtrosServiciosInfo() {
  return (
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-black pt-24 pb-16">
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

        <div className="flex flex-col gap-16 md:gap-24">
          {SERVICIOS.map((svc, index) => {
            const Icon = svc.icon
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={svc.titulo}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={svc.imagen}
                    alt={svc.titulo}
                    className="w-full h-auto object-cover rounded-2xl shadow-xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-[#DC2626]/10">
                    <Icon className="size-7 text-[#DC2626]" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                    {svc.titulo}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-gray-400 md:text-base">
                    {svc.desc}
                  </p>
                  <a
                    href="/cotizacion-3d"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#DC2626] px-6 py-3 font-sans text-sm font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#DC2626]/40"
                  >
                    Cotiza ahora
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
