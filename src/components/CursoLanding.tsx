"use client"

import { motion } from "framer-motion"
import {
  Clock, Check,
  GraduationCap, Briefcase, TrendingUp, Wrench, MessageCircle
} from "lucide-react"

const INCLUYE = [
  "Charla: costos y presupuestos.",
  "Charla: manejo de maquinaria.",
  "Todos los materiales para las prácticas.",
  "Kit de protección personal.",
  "Archivos PDF del curso.",
  "Diploma de participación.",
  "Servicio de cafetería y refrigerio sin costo.",
]

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

const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
}

export default function CursoLanding() {
  return (
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-black pt-24 pb-16">
      <div className="absolute top-1/4 left-1/3 size-96 rounded-full bg-red-600/5 blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 size-80 rounded-full bg-red-600/5 blur-[100px]" />

      <section
        id="hero"
        className="relative -mt-24 flex h-[70vh] min-h-[400px] w-full items-center justify-center overflow-hidden bg-black md:h-[85vh]"
      >
        <img
          src="/fotos/rotulos3d.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

        <div className="relative z-20 mt-20 px-4 text-center md:mt-32">
          <p className="mb-2 font-heading text-lg tracking-widest text-orange-500 md:text-2xl">ACTIVA MEDIOS PRESENTA</p>
          <h1 className="font-heading text-4xl font-bold leading-snug tracking-wider text-orange-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_0_rgb(194_65_0),_4px_4px_0_rgb(154_52_18),_6px_6px_12px_rgba(0,0,0,0.5)] sm:text-5xl md:text-8xl lg:text-9xl">
            CURSO DE<br /><span className="mt-2 block md:mt-3">RÓTULOS 3D</span>
          </h1>
          <p className="mt-4 text-base font-medium text-white/80 md:text-xl">Presencial – Quito, Ecuador</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      <section className="border-t border-white/10 bg-black py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-3 md:gap-8">
          <div className="flex items-start gap-4">
            <svg className="mt-1 h-8 w-8 shrink-0 text-orange-500 md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="font-heading text-sm tracking-widest text-orange-500">INICIO</p>
              <p className="text-base font-semibold text-white md:text-lg">15 de febrero de 2025</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <svg className="mt-1 h-8 w-8 shrink-0 text-orange-500 md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-heading text-sm tracking-widest text-orange-500">DURACIÓN</p>
              <p className="text-base font-semibold text-white md:text-lg">25 HORAS</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <svg className="mt-1 h-8 w-8 shrink-0 text-orange-500 md:h-10 md:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="font-heading text-sm tracking-widest text-orange-500">UBICACIÓN</p>
              <p className="text-base font-semibold text-white md:text-lg">De Las Toronjas S/N y De Los Melones, esquina. Sector: El Inca. Quito – Ecuador.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-8">

        <motion.section
          className="py-12 md:py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl">
            Horarios Disponibles
          </h2>
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={cardItem}
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10 md:p-8"
            >
              <span className="rounded-full bg-[#DC2626]/10 px-3 py-1 font-sans text-xs font-semibold text-[#DC2626]">
                Opción 1
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-white">
                Matutino
              </h3>
              <p className="mt-1 font-sans text-sm text-gray-400">5 días</p>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-zinc-800/50 px-4 py-3 backdrop-blur-md">
                <Clock className="size-5 shrink-0 text-[#DC2626]" />
                <span className="font-sans text-sm text-gray-300">
                  Lunes a viernes de <strong className="text-white">8h00 a 13h00</strong>
                </span>
              </div>
            </motion.div>
            <motion.div
              variants={cardItem}
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10 md:p-8"
            >
              <span className="rounded-full bg-[#DC2626]/10 px-3 py-1 font-sans text-xs font-semibold text-[#DC2626]">
                Opción 2
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-white">
                Fines de Semana
              </h3>
              <p className="mt-1 font-sans text-sm text-gray-400">4 días</p>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-zinc-800/50 px-4 py-3 backdrop-blur-md">
                <Clock className="size-5 shrink-0 text-[#DC2626]" />
                <span className="font-sans text-sm text-gray-300">
                  Sábado y domingo de <strong className="text-white">8h45 a 16h00</strong>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Video principal */}
        <div className="mx-auto mb-16 aspect-video max-w-4xl overflow-hidden rounded-xl">
          <iframe
            src="https://www.youtube.com/embed/m82i-MyWMjU?start=23"
            className="size-full"
            allowFullScreen
            title="Video del curso"
          />
        </div>

        {/* Sección dividida: Qué incluye + Inversión */}
        <div className="mx-auto my-16 grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-2">

          <div>
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl lg:text-left">
              ¿Qué incluye?
            </h2>
            <ul className="space-y-3">
              {INCLUYE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                  <span className="font-sans text-sm text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl lg:text-left">
              Inversión
            </h2>
            <p className="mb-8 text-center font-sans text-sm text-gray-400 lg:text-left">
              Formas de pago flexibles para ti
            </p>
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={cardItem}
                className="relative rounded-2xl border-2 border-[#DC2626] bg-zinc-900/50 p-6 shadow-lg shadow-[#DC2626]/10 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#DC2626]/20 md:p-8"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#DC2626] px-4 py-1 font-sans text-xs font-bold uppercase tracking-wider text-white">
                  Recomendado
                </span>
                <div className="mt-4 text-center">
                  <p className="font-sans text-sm font-semibold text-gray-400">1 Solo Pago</p>
                  <p className="mt-2 font-heading text-4xl font-extrabold text-white">
                    $180 <span className="text-base font-normal text-gray-500">USD</span>
                  </p>
                  <p className="mt-2 font-sans text-xs text-green-400">
                    ✓ 10% de descuento
                  </p>
                  <p className="mt-1 font-sans text-xs text-gray-500">
                    Válido hasta el 31 de enero de 2025
                  </p>
                  <div className="mt-4 rounded-xl bg-zinc-800/50 px-4 py-3">
                    <p className="font-sans text-xs text-gray-400">
                      Pago en efectivo, depósito o transferencia
                    </p>
                  </div>
                  <motion.a
                    href="https://wa.me/593999099175?text=Hola%2C%20quiero%20reservar%20mi%20cupo%20para%20el%20Curso%20Presencial%20de%20R%C3%B3tulos%203D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#DC2626] px-6 py-3.5 font-sans text-sm font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DC2626]/40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MessageCircle className="size-4" />
                    ¡RESERVA UN CUPO!
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                variants={cardItem}
                className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10 md:p-8"
              >
                <div className="text-center">
                  <p className="font-sans text-sm font-semibold text-gray-400">2 Pagos</p>
                  <p className="mt-2 font-heading text-4xl font-extrabold text-white">
                    $200 <span className="text-base font-normal text-gray-500">USD</span>
                  </p>
                  <div className="mt-4 space-y-2 rounded-xl bg-zinc-800/50 px-4 py-3">
                    <p className="font-sans text-xs text-gray-400">
                      <strong className="text-white">$50 USD</strong> para separar tu cupo
                    </p>
                    <p className="font-sans text-xs text-gray-400">
                      <strong className="text-white">$150 USD</strong> el día inicial
                    </p>
                  </div>
                  <motion.a
                    href="https://wa.me/593999099175?text=Hola%2C%20quiero%20reservar%20mi%20cupo%20para%20el%20Curso%20Presencial%20de%20R%C3%B3tulos%203D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#DC2626] px-6 py-3.5 font-sans text-sm font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DC2626]/40"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MessageCircle className="size-4" />
                    ¡RESERVA UN CUPO!
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Testimonios */}
        <motion.section
          className="py-12 md:py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl">
            Testimonios
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe
                src="https://www.youtube.com/embed/clT9GnYWvi8"
                className="size-full"
                allowFullScreen
                title="Testimonio 1"
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe
                src="https://www.youtube.com/embed/Y4ZxTZSQzUQ"
                className="size-full"
                allowFullScreen
                title="Testimonio 2"
              />
            </div>
          </div>
        </motion.section>

        {/* ¿Qué podrás hacer después del curso? */}
        <motion.section
          className="py-12 md:py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl">
            ¿Qué podrás hacer después del curso?
          </h2>
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={cardItem}
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#DC2626]/10">
                <Briefcase className="size-6 text-[#DC2626]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Emprendimiento</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-gray-400">
                Crear tu propio negocio o repotenciar el existente.
              </p>
            </motion.div>
            <motion.div
              variants={cardItem}
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#DC2626]/10">
                <TrendingUp className="size-6 text-[#DC2626]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Desarrollo Empresarial</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-gray-400">
                Desarrollar, fabricar e instalar rótulos 3D.
              </p>
            </motion.div>
            <motion.div
              variants={cardItem}
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#DC2626]/10">
                <Wrench className="size-6 text-[#DC2626]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Mecanizar Procesos</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-gray-400">
                Manejar herramientas de corte, suelda y doblado.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="py-12 md:py-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-8 text-center backdrop-blur-xl shadow-2xl shadow-red-900/5 md:p-12">
            <GraduationCap className="mx-auto size-10 text-[#DC2626]" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-white">
              ¿Listo para empezar?
            </h2>
            <p className="mt-2 font-sans text-sm text-gray-400">
              Cupos limitados. Reserva el tuyo hoy y da el siguiente paso en tu
              carrera profesional.
            </p>
            <motion.a
              href="https://wa.me/593999099175?text=Hola%2C%20quiero%20reservar%20mi%20cupo%20para%20el%20Curso%20Presencial%20de%20R%C3%B3tulos%203D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DC2626]/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="size-5" />
              ¡RESERVA UN CUPO!
            </motion.a>
          </div>
        </motion.section>

        {/* ORGANIZADO POR */}
        <motion.section
          className="py-12 text-center md:py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-sm tracking-widest text-white/50">ORGANIZADO POR:</p>
          <div className="mx-auto mt-6 inline-block rounded-2xl bg-white px-8 py-6 shadow-xl">
            <img
              src="/logotpo-activa.png"
              alt="Activa Medios"
              className="h-16 w-auto md:h-20"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.section>

      </div>
    </div>
  )
}
