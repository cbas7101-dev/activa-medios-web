"use client"

import { motion } from "framer-motion"
import {
  Calendar, Clock, MapPin, Check,
  GraduationCap, Briefcase, TrendingUp, Wrench, MessageCircle,
  Sparkles
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

      <motion.section
        className="relative -mt-24 w-full bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/fotos/Cursos-foto-interna-ai.png')" }}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent bg-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center md:px-8">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#DC2626]/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#DC2626]"
          >
            <Sparkles className="size-3.5" />
            Curso Presencial
          </motion.div>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl md:leading-tight"
          >
            CURSO PRESENCIAL DE{" "}
            <span className="text-[#DC2626]">RÓTULOS 3D</span> Y{" "}
            <span className="text-[#DC2626]">NEÓN FLEX</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-gray-400 md:text-lg"
          >
            Aprende paso a paso desde 0, en este curso 100% práctico y
            personalizado. Incluye todos los materiales para las prácticas
            profesionales.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
          >
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/50 px-5 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/5">
              <Calendar className="size-5 shrink-0 text-[#DC2626]" />
              <span className="font-sans text-sm text-gray-300">
                <span className="font-semibold text-white">Inicio:</span> 15 de febrero 2025
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/50 px-5 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/5">
              <Clock className="size-5 shrink-0 text-[#DC2626]" />
              <span className="font-sans text-sm text-gray-300">
                <span className="font-semibold text-white">Duración:</span> 25 Horas
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/50 px-5 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/5">
              <MapPin className="size-5 shrink-0 text-[#DC2626]" />
              <span className="font-sans text-sm text-gray-300">
                <span className="font-semibold text-white">Ubicación:</span> Quito – Ecuador
              </span>
            </div>
          </motion.div>
          <motion.p
            variants={fadeUp}
            custom={4}
            className="mt-3 font-sans text-xs text-gray-500"
          >
            De Las Toronjas S/N y De Los Melones, Sector El Inca
          </motion.p>
        </div>
      </motion.section>

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
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10 md:p-8"
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
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10 md:p-8"
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
                className="relative rounded-2xl border-2 border-[#DC2626] bg-zinc-900/50 p-6 shadow-lg shadow-[#DC2626]/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#DC2626]/20 md:p-8"
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
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#DC2626] px-6 py-3.5 font-sans text-sm font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DC2626]/40"
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
                className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10 md:p-8"
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
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#DC2626] px-6 py-3.5 font-sans text-sm font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DC2626]/40"
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
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10"
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
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10"
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
              className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10"
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
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DC2626]/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle className="size-5" />
              ¡RESERVA UN CUPO!
            </motion.a>
          </div>
        </motion.section>

      </div>
    </div>
  )
}
