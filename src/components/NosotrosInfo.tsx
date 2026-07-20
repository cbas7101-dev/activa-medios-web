"use client"

import { motion } from "framer-motion"

export default function NosotrosInfo() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center bg-red-600 px-4 py-16 text-center text-white"
    >
      {/* ── Título ── */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-3xl font-bold"
      >
        Nuestra Empresa
      </motion.h2>

      {/* ── Logo ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <img
          src="/logotpo-activa.png"
          alt="Activa Medios"
          className="mx-auto max-w-sm brightness-0 invert my-6"
          loading="lazy"
        />
      </motion.div>

      {/* ── Texto ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-4xl space-y-6 text-lg"
      >
        <p className="text-lg leading-relaxed">
          Somos una empresa dinámica siempre a la vanguardia, con altos valores agregados,
          la calidad en servicio personalizado es nuestra prioridad. Nos motiva el trabajo
          honesto, puntual y creativo cuyo propósito es brindarles una amplia y variada
          línea de servicios y productos publicitarios, especialmente en el área de
          rotulación 3D.
        </p>

        <p className="text-lg leading-relaxed">
          Creada en 2007 en Quito, Ecuador, iniciamos con el objetivo de ser una fuente
          de sustento bajo el lema: <em className="font-semibold">«avancemos juntos»</em>.
          Con responsabilidad, compromiso y profesionalismo creamos Aktiva Publicidad.
          Hemos evolucionado y tecnificado la industria, cambiando nuestro nombre a
          ACTIVA MEDIOS, sin perder la esencia. Son 16 años a su servicio, constituyendo
          una empresa humana que brinda empleo constante y forma talentos propios para
          garantizar un trabajo de calidad, impecable e imponente.
        </p>
      </motion.div>

      {/* ── Imagen inferior (efecto cúpula) ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-6xl mt-16"
      >
        <img
          src="/fotos/Nuestra-Historia-scaled.jpg"
          alt="Historia de Activa Medios"
          className="h-[400px] w-full rounded-t-[3rem] object-cover shadow-2xl"
          loading="lazy"
        />
      </motion.div>
    </motion.section>
  )
}
