"use client"

import { useState } from "react"
import {
  Calendar, Clock, MapPin, Check, X as XIcon, ChevronDown,
  GraduationCap, Briefcase, TrendingUp, Wrench, MessageCircle,
  Sparkles, Award, BookOpen
} from "lucide-react"

const TEMARIO = [
  {
    titulo: "PARTE 1: Introducción al tema",
    contenido: "Apertura, presentación de insumos, materiales y maquinaria.",
  },
  {
    titulo: "PARTE 2: Elaboración de Rótulos 3D y Neón Flex",
    contenido: "Técnicas de fabricación paso a paso, manejo de materiales, corte y ensamblaje profesional.",
  },
  {
    titulo: "PARTE 3: Iluminación LEDs",
    contenido: "Charla de costos y proformas. Tipos de LED, instalación y conexiones.",
  },
  {
    titulo: "PARTE 4: Bases de Alucobond",
    contenido: "Uso de máquina dobladora, armado de bases y acabados profesionales.",
  },
]

const INCLUYE = [
  "Charla: costos y presupuestos.",
  "Charla: manejo de maquinaria.",
  "Todos los materiales para las prácticas.",
  "Kit de protección personal.",
  "Archivos PDF del curso.",
  "Diploma de participación.",
  "Servicio de cafetería y refrigerio sin costo.",
]

export default function CursoLanding() {
  const [acordeonAbierto, setAcordeonAbierto] = useState<number | null>(null)

  const toggleAcordeon = (idx: number) =>
    setAcordeonAbierto((prev) => (prev === idx ? null : idx))

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* ─── HERO ─── */}
        <section className="py-12 text-center md:py-20">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#DC2626]/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#DC2626]">
            <Sparkles className="size-3.5" />
            Curso Presencial
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl font-heading text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl md:leading-tight">
            CURSO PRESENCIAL DE{" "}
            <span className="text-[#DC2626]">RÓTULOS 3D</span> Y{" "}
            <span className="text-[#DC2626]">NEÓN FLEX</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-gray-400 md:text-lg">
            Aprende paso a paso desde 0, en este curso 100% práctico y
            personalizado. Incluye todos los materiales para las prácticas
            profesionales.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">
              <Calendar className="size-5 shrink-0 text-[#DC2626]" />
              <span className="font-sans text-sm text-gray-300">
                <span className="font-semibold text-white">Inicio:</span> 15 de febrero 2025
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">
              <Clock className="size-5 shrink-0 text-[#DC2626]" />
              <span className="font-sans text-sm text-gray-300">
                <span className="font-semibold text-white">Duración:</span> 25 Horas
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">
              <MapPin className="size-5 shrink-0 text-[#DC2626]" />
              <span className="font-sans text-sm text-gray-300">
                <span className="font-semibold text-white">Ubicación:</span> Quito – Ecuador
              </span>
            </div>
          </div>
          <p className="mt-3 font-sans text-xs text-gray-500">
            De Las Toronjas S/N y De Los Melones, Sector El Inca
          </p>
        </section>

        {/* ─── HORARIOS ─── */}
        <section className="py-12 md:py-16">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl">
            Horarios Disponibles
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700 md:p-8">
              <span className="rounded-full bg-[#DC2626]/10 px-3 py-1 font-sans text-xs font-semibold text-[#DC2626]">
                Opción 1
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-white">
                Matutino
              </h3>
              <p className="mt-1 font-sans text-sm text-gray-400">5 días</p>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-zinc-800/50 px-4 py-3">
                <Clock className="size-5 shrink-0 text-[#DC2626]" />
                <span className="font-sans text-sm text-gray-300">
                  Lunes a viernes de <strong className="text-white">8h00 a 13h00</strong>
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700 md:p-8">
              <span className="rounded-full bg-[#DC2626]/10 px-3 py-1 font-sans text-xs font-semibold text-[#DC2626]">
                Opción 2
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-white">
                Fines de Semana
              </h3>
              <p className="mt-1 font-sans text-sm text-gray-400">4 días</p>
              <div className="mt-4 flex items-center gap-3 rounded-xl bg-zinc-800/50 px-4 py-3">
                <Clock className="size-5 shrink-0 text-[#DC2626]" />
                <span className="font-sans text-sm text-gray-300">
                  Sábado y domingo de <strong className="text-white">8h45 a 16h00</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── QUÉ INCLUYE ─── */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl">
              ¿Qué incluye?
            </h2>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {INCLUYE.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-green-500" />
                    <span className="font-sans text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── INVERSIÓN ─── */}
        <section className="py-12 md:py-16">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl">
            Inversión
          </h2>
          <p className="mb-8 text-center font-sans text-sm text-gray-400">
            Formas de pago flexibles para ti
          </p>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative rounded-2xl border-2 border-[#DC2626] bg-zinc-900 p-6 shadow-lg shadow-[#DC2626]/10 md:p-8">
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
                <a
                  href="https://wa.me/593999099175?text=Hola%2C%20quiero%20reservar%20mi%20cupo%20para%20el%20Curso%20Presencial%20de%20R%C3%B3tulos%203D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#DC2626] px-6 py-3.5 font-sans text-sm font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="size-4" />
                  ¡RESERVA UN CUPO!
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700 md:p-8">
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
                <a
                  href="https://wa.me/593999099175?text=Hola%2C%20quiero%20reservar%20mi%20cupo%20para%20el%20Curso%20Presencial%20de%20R%C3%B3tulos%203D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#DC2626] px-6 py-3.5 font-sans text-sm font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="size-4" />
                  ¡RESERVA UN CUPO!
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── QUÉ PODRÁS HACER ─── */}
        <section className="py-12 md:py-16">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl">
            ¿Qué podrás hacer después del curso?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#DC2626]/10">
                <Briefcase className="size-6 text-[#DC2626]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Emprendimiento</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-gray-400">
                Crear tu propio negocio o repotenciar el existente.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#DC2626]/10">
                <TrendingUp className="size-6 text-[#DC2626]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Desarrollo Empresarial</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-gray-400">
                Desarrollar, fabricar e instalar rótulos 3D.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-colors hover:border-zinc-700">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[#DC2626]/10">
                <Wrench className="size-6 text-[#DC2626]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Mecanizar Procesos</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-gray-400">
                Manejar herramientas de corte, suelda y doblado.
              </p>
            </div>
          </div>
        </section>

        {/* ─── TEMARIO ─── */}
        <section className="py-12 md:py-16">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl">
            Temario
          </h2>
          <div className="mx-auto max-w-3xl space-y-3">
            {TEMARIO.map((modulo, idx) => {
              const abierto = acordeonAbierto === idx
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-colors hover:border-zinc-700"
                >
                  <button
                    type="button"
                    onClick={() => toggleAcordeon(idx)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#DC2626]/10 font-sans text-sm font-bold text-[#DC2626]">
                      {idx + 1}
                    </span>
                    <span className="flex-1 font-sans text-sm font-semibold text-white md:text-base">
                      {modulo.titulo}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-gray-500 transition-transform duration-300 ${
                        abierto ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      abierto ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-zinc-800 px-6 py-4">
                      <p className="font-sans text-sm leading-relaxed text-gray-400">
                        {modulo.contenido}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 text-center md:p-12">
            <GraduationCap className="mx-auto size-10 text-[#DC2626]" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-white">
              ¿Listo para empezar?
            </h2>
            <p className="mt-2 font-sans text-sm text-gray-400">
              Cupos limitados. Reserva el tuyo hoy y da el siguiente paso en tu
              carrera profesional.
            </p>
            <a
              href="https://wa.me/593999099175?text=Hola%2C%20quiero%20reservar%20mi%20cupo%20para%20el%20Curso%20Presencial%20de%20R%C3%B3tulos%203D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="size-5" />
              ¡RESERVA UN CUPO!
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
