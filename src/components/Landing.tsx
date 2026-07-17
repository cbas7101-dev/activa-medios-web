"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    ArrowRight,
    ArrowUpRight,
    Sparkles,
    Package,
    GraduationCap,
    Plus,
    Play,
} from "lucide-react"

const WORKS = [
    { src: "/work-1.png", alt: "Letras corpóreas rojas iluminadas en fachada de restaurante" },
    { src: "/work-2.png", alt: "Letrero neón flex LED dorado en pared interior de cafetería" },
    { src: "/work-3.png", alt: "Logo backlight en acrílico para lobby corporativo" },
    { src: "/work-4.png", alt: "Letras canal iluminadas en exterior de centro comercial" },
    { src: "/work-5.png", alt: "Letras 3D en PVC iluminadas en boutique" },
    { src: "/work-6.png", alt: "Letrero 3D rojo y blanco en fachada de gimnasio" },
]

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
    }),
}

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const cardItem = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
}

export default function Page() {
    const [playing, setPlaying] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            <main>
                <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/hero-sign.png"
                            alt="Letrero 3D iluminado espectacular fabricado por Activa Medios"
                            className="size-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
                    </div>

                    <motion.div
                        className="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-16 md:px-8"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <div className="max-w-2xl">
                            <motion.span
                                variants={fadeUp}
                                custom={0}
                                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-wider text-accent"
                            >
                                <Sparkles className="size-3.5" />
                                Comunicación visual profesional
                            </motion.span>

                            <motion.h1
                                variants={fadeUp}
                                custom={1}
                                className="mt-6 font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-balance text-foreground md:text-7xl"
                            >
                                Dale volumen a <span className="text-primary">tu marca</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                custom={2}
                                className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-muted-foreground text-pretty"
                            >
                                Fabricamos letras corpóreas con acrílico, PVC, aluminio compuesto y neón flex LED.
                                Transformamos espacios con comunicación visual profesional.
                            </motion.p>

                            <motion.div
                                variants={fadeUp}
                                custom={3}
                                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
                            >
                                <a
                                    href="#cotizar"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-sans text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
                                >
                                    Cotiza tu rótulo 3D
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </a>
                                <a
                                    href="/galeria"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/40 px-7 py-3.5 font-sans text-base font-semibold text-foreground transition-all duration-300 hover:bg-foreground/10 hover:border-foreground/60"
                                >
                                    Ver trabajos
                                </a>
                            </motion.div>

                            <motion.div
                                variants={fadeUp}
                                custom={4}
                                className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm text-muted-foreground"
                            >
                                {["Acrílico", "PVC", "Aluminio compuesto", "Neón Flex LED"].map((m) => (
                                    <span key={m} className="flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-accent" />
                                        {m}
                                    </span>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                <section id="servicios" className="relative bg-background py-20 md:py-28">
                    <div className="absolute top-1/4 left-1/3 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/5 blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-red-600/5 blur-[100px]" />

                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <motion.div
                            className="mb-12 max-w-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-accent">
                                Nuestros servicios
                            </span>
                            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance text-foreground md:text-5xl">
                                Todo para tu comunicación visual
                            </h2>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.a
                                href="#cotizar"
                                variants={cardItem}
                                className="group relative col-span-1 row-span-2 flex min-h-96 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20 lg:col-span-2"
                            >
                                <img
                                    src="/service-rotulacion.png"
                                    alt="Letras corpóreas 3D iluminadas en acrílico y neón LED"
                                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                                <div className="relative p-6 md:p-9">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                                        Servicio estrella
                                    </span>
                                    <h3 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                                        Rotulación 3D
                                    </h3>
                                    <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-muted-foreground">
                                        Letras corpóreas iluminadas y no iluminadas. Diseño, fabricación e instalación
                                        profesional que hace destacar tu marca.
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background/40 px-5 py-2.5 font-sans text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground">
                                        Cotizar rótulo 3D
                                        <ArrowUpRight className="size-4" />
                                    </span>
                                </div>
                            </motion.a>

                            <motion.a
                                href="#cotizar"
                                variants={cardItem}
                                className="group relative flex min-h-44 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20"
                            >
                                <img
                                    src="/service-insumos.png"
                                    alt="Insumos y materiales para rotulación"
                                    className="absolute inset-0 size-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                                <div className="relative p-6">
                                    <Package className="size-6 text-accent" />
                                    <h3 className="mt-3 font-heading text-xl font-bold text-foreground">Insumos</h3>
                                    <p className="mt-1 font-sans text-sm text-muted-foreground">
                                        Acrílico, PVC, aluminio, LED y más para tu taller.
                                    </p>
                                </div>
                            </motion.a>

                            <motion.a
                                href="#cotizar"
                                variants={cardItem}
                                className="group relative flex min-h-44 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20"
                            >
                                <img
                                    src="/service-cursos.png"
                                    alt="Cursos de rotulación y fabricación de letras 3D"
                                    className="absolute inset-0 size-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-75"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                                <div className="relative p-6">
                                    <GraduationCap className="size-6 text-accent" />
                                    <h3 className="mt-3 font-heading text-xl font-bold text-foreground">Cursos</h3>
                                    <p className="mt-1 font-sans text-sm text-muted-foreground">
                                        Aprende a fabricar letras corpóreas como un profesional.
                                    </p>
                                </div>
                            </motion.a>
                        </motion.div>

                        <motion.a
                            href="#cotizar"
                            className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg hover:shadow-red-900/10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <span className="flex items-center gap-3 font-sans text-sm font-medium text-muted-foreground group-hover:text-foreground">
                                <Plus className="size-4 text-accent" />
                                Otros servicios: vinil, lonas, señalética, letreros luminosos y más
                            </span>
                            <ArrowUpRight className="size-5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.a>
                    </div>
                </section>

                <section id="galeria" className="relative bg-background py-20 md:py-28">
                    <div className="absolute top-1/3 right-1/4 size-72 rounded-full bg-red-600/5 blur-[100px]" />

                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <motion.div
                            className="mb-12 max-w-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-accent">
                                Nuestros trabajos
                            </span>
                            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance text-foreground md:text-5xl">
                                Proyectos recientes de rotulación 3D
                            </h2>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {WORKS.map((work) => (
                                <motion.div
                                    key={work.src}
                                    variants={cardItem}
                                    className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20"
                                >
                                    <img
                                        src={work.src || "/placeholder.svg"}
                                        alt={work.alt}
                                        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                <section className="relative bg-background py-20 md:py-28">
                    <div className="absolute bottom-1/4 left-1/3 size-80 rounded-full bg-red-600/5 blur-[120px]" />

                    <div className="mx-auto max-w-6xl px-4 md:px-8">
                        <motion.div
                            className="mb-10 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-accent">
                                Nuestro trabajo en video
                            </span>
                            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance text-foreground md:text-5xl">
                                Mira cómo lo hacemos
                            </h2>
                        </motion.div>

                        <motion.div
                            className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {playing ? (
                                <div className="flex size-full items-center justify-center bg-card">
                                    <p className="font-sans text-sm text-muted-foreground">
                                        Reproduciendo video de Activa Medios…
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <img
                                        src="/video-thumb.png"
                                        alt="Proceso de fabricación de letras corpóreas 3D en el taller de Activa Medios"
                                        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-background/40" />
                                    <button
                                        type="button"
                                        onClick={() => setPlaying(true)}
                                        className="absolute inset-0 flex items-center justify-center"
                                        aria-label="Reproducir video"
                                    >
                                        <span className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:shadow-primary/60 md:size-24">
                                            <Play className="size-8 translate-x-0.5 fill-current md:size-10" />
                                        </span>
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-background to-transparent p-6">
                                        <span className="font-sans text-sm font-medium text-foreground">
                                            Fabricación e instalación de rótulo 3D · Activa Medios
                                        </span>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>
                </section>
            </main>

            <motion.section
                id="cotizar"
                className="relative bg-background px-4 pb-20 md:px-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <div className="absolute inset-x-0 top-1/2 mx-auto h-40 w-3/4 -translate-y-1/2 rounded-full bg-red-600/10 blur-[100px]" />
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/30 bg-red-600/10 px-6 py-14 text-center backdrop-blur-md md:py-20">
                    <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-balance text-foreground md:text-5xl">
                        ¿Listo para darle volumen a tu marca?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-muted-foreground text-pretty">
                        Cuéntanos tu idea y recibe una cotización personalizada para tu rótulo 3D sin
                        compromiso.
                    </p>
                    <a
                        href="#inicio"
                        className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-sans text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
                    >
                        Cotiza tu Rótulo 3D
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </motion.section>

        </div>
    )
}
