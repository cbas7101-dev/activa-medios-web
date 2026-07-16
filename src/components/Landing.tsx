"use client"

import { useState } from "react"
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

export default function Page() {
    const [playing, setPlaying] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            <main>
                {/* ==================== HERO ==================== */}
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

                    <div className="relative mx-auto w-full max-w-7xl px-4 pt-28 pb-16 md:px-8">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-sans text-xs font-medium uppercase tracking-wider text-accent">
                                <Sparkles className="size-3.5" />
                                Comunicación visual profesional
                            </span>

                            <h1 className="mt-6 font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-balance text-foreground md:text-7xl">
                                Dale volumen a <span className="text-primary">tu marca</span>
                            </h1>

                            <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-muted-foreground text-pretty">
                                Fabricamos letras corpóreas con acrílico, PVC, aluminio compuesto y neón flex LED.
                                Transformamos espacios con comunicación visual profesional.
                            </p>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <a
                                    href="#cotizar"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-sans text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105"
                                >
                                    Cotiza tu rótulo 3D
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </a>
                                <a
                                    href="#galeria"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/40 px-7 py-3.5 font-sans text-base font-semibold text-foreground transition-colors hover:bg-foreground/10"
                                >
                                    Ver trabajos
                                </a>
                            </div>

                            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm text-muted-foreground">
                                {["Acrílico", "PVC", "Aluminio compuesto", "Neón Flex LED"].map((m) => (
                                    <span key={m} className="flex items-center gap-2">
                                        <span className="size-1.5 rounded-full bg-accent" />
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==================== SERVICES (BENTO) ==================== */}
                <section id="servicios" className="relative bg-background py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <div className="mb-12 max-w-2xl">
                            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-accent">
                                Nuestros servicios
                            </span>
                            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance text-foreground md:text-5xl">
                                Todo para tu comunicación visual
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
                            {/* Main - Rotulación 3D */}
                            <a
                                href="#cotizar"
                                className="group relative col-span-1 row-span-2 flex min-h-96 flex-col justify-end overflow-hidden rounded-3xl border border-border lg:col-span-2"
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
                                    <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background/40 px-5 py-2.5 font-sans text-sm font-semibold text-foreground backdrop-blur transition-colors group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground">
                                        Cotizar rótulo 3D
                                        <ArrowUpRight className="size-4" />
                                    </span>
                                </div>
                            </a>

                            {/* Insumos */}
                            <a
                                href="#cotizar"
                                className="group relative flex min-h-44 flex-col justify-end overflow-hidden rounded-3xl border border-border"
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
                            </a>

                            {/* Cursos */}
                            <a
                                href="#cotizar"
                                className="group relative flex min-h-44 flex-col justify-end overflow-hidden rounded-3xl border border-border"
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
                            </a>
                        </div>

                        {/* Otros servicios */}
                        <a
                            href="#cotizar"
                            className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-4 transition-colors hover:border-accent/60"
                        >
                            <span className="flex items-center gap-3 font-sans text-sm font-medium text-muted-foreground group-hover:text-foreground">
                                <Plus className="size-4 text-accent" />
                                Otros servicios: vinil, lonas, señalética, letreros luminosos y más
                            </span>
                            <ArrowUpRight className="size-5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                    </div>
                </section>

                {/* ==================== WORKS (GALLERY) ==================== */}
                <section id="galeria" className="bg-background py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-4 md:px-8">
                        <div className="mb-12 max-w-2xl">
                            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-accent">
                                Nuestros trabajos
                            </span>
                            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance text-foreground md:text-5xl">
                                Proyectos recientes de rotulación 3D
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {WORKS.map((work) => (
                                <div
                                    key={work.src}
                                    className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-border"
                                >
                                    <img
                                        src={work.src || "/placeholder.svg"}
                                        alt={work.alt}
                                        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ==================== VIDEO SHOWCASE ==================== */}
                <section className="bg-background py-20 md:py-28">
                    <div className="mx-auto max-w-6xl px-4 md:px-8">
                        <div className="mb-10 text-center">
                            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-accent">
                                Nuestro trabajo en video
                            </span>
                            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-balance text-foreground md:text-5xl">
                                Mira cómo lo hacemos
                            </h2>
                        </div>

                        <div className="group relative aspect-video overflow-hidden rounded-3xl border border-border">
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
                                        <span className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-transform duration-300 group-hover:scale-110 md:size-24">
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
                        </div>
                    </div>
                </section>
            </main>

            {/* ==================== CTA BAND ==================== */}
            <section id="cotizar" className="bg-background px-4 pb-20 md:px-8">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/30 bg-[color:var(--brand-red)]/20 px-6 py-14 text-center md:py-20">
                    <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold tracking-tight text-balance text-foreground md:text-5xl">
                        ¿Listo para darle volumen a tu marca?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-muted-foreground text-pretty">
                        Cuéntanos tu idea y recibe una cotización personalizada para tu rótulo 3D sin
                        compromiso.
                    </p>
                    <a
                        href="#inicio"
                        className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-sans text-base font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105"
                    >
                        Cotiza tu Rótulo 3D
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </section>

        </div>
    )
}

