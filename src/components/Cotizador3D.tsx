"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, Send, Ruler, Type, Image, Wrench, MessageCircle } from "lucide-react"

const ANCHO_FACTOR: { angostas: { chars: string[]; factor: number }; medias: { chars: string[]; factor: number }; anchas: { chars: string[]; factor: number }; espacio: { factor: number } } = {
    angostas: { chars: ["I", "J", "L", "i", "j", "l", "t", "1", ".", ",", "'", '"'], factor: 0.4 },
    medias: {
        chars: [
            "A", "B", "C", "D", "E", "F", "G", "H", "K", "N", "O", "P", "Q", "R",
            "S", "T", "U", "V", "X", "Y", "Z", "0", "2", "3", "4", "5", "6", "7", "8", "9",
            "a", "b", "c", "d", "e", "f", "g", "h", "k", "n", "o", "p", "q", "r",
            "s", "u", "v", "x", "y", "z",
            "Á", "É", "Í", "Ó", "Ú", "á", "é", "í", "ó", "ú", "Ñ", "ñ",
        ],
        factor: 0.7,
    },
    anchas: { chars: ["M", "W", "m", "w"], factor: 0.95 },
    espacio: { factor: 0.45 },
}

function getCharFactor(char: string): number {
    if (ANCHO_FACTOR.angostas.chars.includes(char)) return ANCHO_FACTOR.angostas.factor
    if (ANCHO_FACTOR.medias.chars.includes(char)) return ANCHO_FACTOR.medias.factor
    if (ANCHO_FACTOR.anchas.chars.includes(char)) return ANCHO_FACTOR.anchas.factor
    if (char === " ") return ANCHO_FACTOR.espacio.factor
    return 0.7
}

const ACABADOS = [
    { id: 1, nombre: "Metálico sin luz", multiplicador: 1, desc: "Acabado metálico estándar sin iluminación" },
    { id: 2, nombre: "Metálico con luz", multiplicador: 2, desc: "Metálico con iluminación LED integrada" },
    { id: 3, nombre: "Metálico + frente de acrílico", multiplicador: 3, desc: "Metálico con frente en acrílico iluminado" },
    { id: 4, nombre: "Acrílico 100% / Aluminio", multiplicador: 4, desc: "Frente de acrílico o aluminio", hasSub: true },
    { id: 5, nombre: "Acero inoxidable", multiplicador: 5, desc: "Acero inoxidable de alta durabilidad", hasSub: true },
    { id: 6, nombre: "Bronce", multiplicador: 6, desc: "Acabado premium en bronce macizo" },
]

const SUB_ACRILICO = ["Acrílico 100%", "Aluminio"]
const SUB_INOX = ["Brillante", "Mate", "Cepillado"]

const MONTHS = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]

function formatQuitoDate(): string {
    const d = new Date()
    return `Quito, ${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`
}

const RED = "#DC2626"

const fadeSlide = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.35, ease: "easeOut" },
}

const staggerCard = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardItem = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function Cotizador3D() {
    const [step, setStep] = useState(1)

    const [nombre, setNombre] = useState("")
    const [telefono, setTelefono] = useState("")
    const [ancho, setAncho] = useState<number>(0)
    const [alto, setAlto] = useState<number>(0)
    const [texto, setTexto] = useState("")
    const [altoLetra, setAltoLetra] = useState<number>(0)

    const [acabadoIdx, setAcabadoIdx] = useState(0)
    const [subAcabado, setSubAcabado] = useState("")
    const [instalacion, setInstalacion] = useState<boolean | null>(null)

    const isWide = ancho > 4

    const suggestedAltoLetra = useMemo(() => {
        if (alto > 0) return Math.round(alto * 100 * 0.7)
        return 0
    }, [alto])

    const tol = useMemo(() => {
        if (!texto || altoLetra <= 0) return 0
        let total = 0
        for (const char of texto) {
            total += altoLetra * getCharFactor(char)
        }
        return Math.round(total * 100) / 100
    }, [texto, altoLetra])

    const precioBase = useMemo(() => tol * 1, [tol])
    const multiplicador = useMemo(() => ACABADOS[acabadoIdx]?.multiplicador ?? 1, [acabadoIdx])
    let subtotal = useMemo(() => precioBase * multiplicador, [precioBase, multiplicador])

    if (instalacion && !isWide) {
        subtotal += 100
    }

    const iva = useMemo(() => Math.round(subtotal * 0.15 * 100) / 100, [subtotal])
    const total = useMemo(() => Math.round((subtotal + iva) * 100) / 100, [subtotal, iva])

    const instalacionText = useMemo(() => {
        if (instalacion === null) return ""
        if (isWide) return "A confirmar (proyecto +4m)"
        return instalacion ? "Sí (+$100)" : "No"
    }, [instalacion, isWide])

    const whatsappMessage = useMemo(() => {
        const lines = [
            "\u{1F534} NUEVA SOLICITUD DE COTIZACIÓN \u2013 RÓTULOS 3D",
            `Cliente: ${nombre}`,
            `Teléfono: ${telefono}`,
            `Fecha: ${formatQuitoDate()}`,
            `Medidas de fachada: ${ancho}m x ${alto}m`,
            `Texto a rotular: "${texto}"`,
            `Alto de letra estimado: ${altoLetra} cm`,
            `Acabado seleccionado: ${ACABADOS[acabadoIdx].nombre} (x${multiplicador})${subAcabado ? ` - ${subAcabado}` : ""}`,
            `Instalación: ${instalacionText}`,
            "",
            "\u2014 Estimado de referencia \u2014",
            `Subtotal: $${subtotal.toFixed(2)}`,
            `IVA (15%): $${iva.toFixed(2)}`,
            `Total estimado: $${total.toFixed(2)}`,
            "",
            "Este es un valor referencial. Confirmamos medidas exactas y precio final antes de producción.",
        ]
        return lines.join("\n")
    }, [nombre, telefono, ancho, alto, texto, altoLetra, acabadoIdx, multiplicador, subAcabado, instalacionText, subtotal, iva, total])

    const canGoNext = useMemo(() => {
        if (step === 1) {
            return nombre.trim() && telefono.trim() && ancho > 0 && alto > 0 && texto.trim() && altoLetra > 0
        }
        if (step === 2) return true
        if (step === 3) return instalacion !== null
        return true
    }, [step, nombre, telefono, ancho, alto, texto, altoLetra, instalacion])

    const nextStep = () => {
        if (canGoNext && step < 4) {
            if (step === 2) {
                setSubAcabado("")
            }
            setStep((s) => s + 1)
        }
    }

    const prevStep = () => {
        if (step > 1) setStep((s) => s - 1)
    }

    const handleAcabadoSelect = (idx: number) => {
        setAcabadoIdx(idx)
        setSubAcabado("")
    }

    const progressPercent = ((step - 1) / 3) * 100

    return (
        <div className="relative min-h-screen bg-black pt-24 pb-16">
            <div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-red-600/5 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 size-80 rounded-full bg-red-600/5 blur-[100px]" />

            <div className="mx-auto max-w-4xl px-4 md:px-8">

                <motion.div
                    className="mb-10 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                        Cotiza tu <span className="text-[#DC2626]">Rótulo 3D</span>
                    </h1>
                    <p className="mt-3 font-sans text-base text-gray-400">
                        Completa los pasos y recibe un estimado al instante
                    </p>
                </motion.div>

                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <div className="flex items-center justify-between gap-2 font-sans text-sm text-gray-500">
                        {["Datos y medidas", "Acabado", "Instalación", "Resumen"].map((label, i) => (
                            <span key={label} className={`text-center ${step === i + 1 ? "font-semibold text-white" : ""} ${i + 1 < step ? "text-[#DC2626]" : ""}`}>
                                {label}
                            </span>
                        ))}
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-[#DC2626] transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-6 md:p-10 shadow-2xl shadow-red-900/5"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div key="step1" className="space-y-6" {...fadeSlide}>
                                <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                                    <Ruler className="size-6 text-[#DC2626]" />
                                    <h2 className="font-heading text-2xl font-bold text-white">Paso 1: Datos del cliente y medidas</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block font-sans text-sm font-medium text-gray-300">Nombre *</label>
                                        <input
                                            type="text"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            placeholder="Tu nombre"
                                            className="w-full rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-4 py-3 font-sans text-white placeholder-gray-500 outline-none backdrop-blur-md transition-all duration-300 focus:border-[#DC2626] focus:shadow-lg focus:shadow-red-900/10"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block font-sans text-sm font-medium text-gray-300">Teléfono *</label>
                                        <input
                                            type="text"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            placeholder="+51 999 888 777"
                                            className="w-full rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-4 py-3 font-sans text-white placeholder-gray-500 outline-none backdrop-blur-md transition-all duration-300 focus:border-[#DC2626] focus:shadow-lg focus:shadow-red-900/10"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block font-sans text-sm font-medium text-gray-300">Ancho de fachada (metros) *</label>
                                        <input
                                            type="number"
                                            value={ancho || ""}
                                            onChange={(e) => setAncho(Number(e.target.value))}
                                            placeholder="Ej: 5"
                                            step="0.1"
                                            min="0"
                                            className="w-full rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-4 py-3 font-sans text-white placeholder-gray-500 outline-none backdrop-blur-md transition-all duration-300 focus:border-[#DC2626] focus:shadow-lg focus:shadow-red-900/10"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block font-sans text-sm font-medium text-gray-300">Alto de fachada (metros) *</label>
                                        <input
                                            type="number"
                                            value={alto || ""}
                                            onChange={(e) => setAlto(Number(e.target.value))}
                                            placeholder="Ej: 2"
                                            step="0.1"
                                            min="0"
                                            className="w-full rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-4 py-3 font-sans text-white placeholder-gray-500 outline-none backdrop-blur-md transition-all duration-300 focus:border-[#DC2626] focus:shadow-lg focus:shadow-red-900/10"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="mb-1.5 block font-sans text-sm font-medium text-gray-300">Texto a rotular *</label>
                                        <input
                                            type="text"
                                            value={texto}
                                            onChange={(e) => setTexto(e.target.value.toUpperCase())}
                                            placeholder="Ej: GOLDEN"
                                            className="w-full rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-4 py-3 font-sans text-white placeholder-gray-500 outline-none backdrop-blur-md transition-all duration-300 focus:border-[#DC2626] focus:shadow-lg focus:shadow-red-900/10"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block font-sans text-sm font-medium text-gray-300">
                                            Alto de letra (cm)
                                            {suggestedAltoLetra > 0 && !altoLetra && (
                                                <span className="ml-2 text-xs text-gray-500">(sugerido: <button type="button" onClick={() => setAltoLetra(suggestedAltoLetra)} className="underline text-[#DC2626]">{suggestedAltoLetra} cm</button>)</span>
                                            )}
                                        </label>
                                        <input
                                            type="number"
                                            value={altoLetra || ""}
                                            onChange={(e) => setAltoLetra(Number(e.target.value))}
                                            placeholder={suggestedAltoLetra > 0 ? `Sugerido: ${suggestedAltoLetra}` : "Ej: 35"}
                                            className="w-full rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-4 py-3 font-sans text-white placeholder-gray-500 outline-none backdrop-blur-md transition-all duration-300 focus:border-[#DC2626] focus:shadow-lg focus:shadow-red-900/10"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="step2" className="space-y-6" {...fadeSlide}>
                                <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                                    <Image className="size-6 text-[#DC2626]" />
                                    <h2 className="font-heading text-2xl font-bold text-white">Paso 2: Elige el acabado</h2>
                                </div>

                                <motion.div
                                    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                                    variants={staggerCard}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {ACABADOS.map((acabado, idx) => (
                                        <motion.button
                                            key={acabado.id}
                                            type="button"
                                            onClick={() => handleAcabadoSelect(idx)}
                                            variants={cardItem}
                                            className={`relative flex flex-col items-start gap-2 rounded-xl border p-5 text-left font-sans transition-all duration-300 ${acabadoIdx === idx
                                                ? "border-[#DC2626] bg-[#DC2626]/10 ring-1 ring-[#DC2626] shadow-lg shadow-red-900/20"
                                                : "border-zinc-700/50 bg-zinc-900/60 backdrop-blur-md hover:-translate-y-1 hover:border-zinc-500 hover:shadow-lg hover:shadow-red-900/5"
                                                }`}
                                        >
                                            {acabadoIdx === idx && (
                                                <span className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-[#DC2626]">
                                                    <Check className="size-4 text-white" />
                                                </span>
                                            )}
                                            <span className={`text-base font-bold ${acabadoIdx === idx ? "text-white" : "text-gray-300"}`}>
                                                {acabado.nombre}
                                            </span>
                                            <span className="text-sm text-gray-500">{acabado.desc}</span>
                                            <span className="mt-1 text-xs font-semibold text-[#DC2626]">
                                                x{acabado.multiplicador}
                                            </span>

                                            {acabado.hasSub && acabadoIdx === idx && acabado.id === 4 && (
                                                <motion.div
                                                    className="mt-3 flex w-full gap-2"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    {SUB_ACRILICO.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); setSubAcabado(opt) }}
                                                            className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${subAcabado === opt ? "bg-[#DC2626] text-white" : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"}`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}

                                            {acabado.hasSub && acabadoIdx === idx && acabado.id === 5 && (
                                                <motion.div
                                                    className="mt-3 flex w-full gap-2"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    {SUB_INOX.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            onClick={(e) => { e.stopPropagation(); setSubAcabado(opt) }}
                                                            className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${subAcabado === opt ? "bg-[#DC2626] text-white" : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"}`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    ))}
                                </motion.div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div key="step3" className="space-y-6" {...fadeSlide}>
                                <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                                    <Wrench className="size-6 text-[#DC2626]" />
                                    <h2 className="font-heading text-2xl font-bold text-white">Paso 3: Instalación</h2>
                                </div>

                                {isWide && (
                                    <motion.div
                                        className="rounded-xl border border-[#DC2626]/30 bg-[#DC2626]/10 p-4 font-sans text-sm text-red-300 backdrop-blur-md"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        Tu proyecto supera los 4m de ancho. Nuestro equipo revisará la logística de instalación y te confirmará el costo exacto.
                                    </motion.div>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setInstalacion(true)}
                                        className={`flex-1 rounded-xl border p-5 text-center font-sans transition-all duration-300 ${instalacion === true
                                            ? "border-[#DC2626] bg-[#DC2626]/10 ring-1 ring-[#DC2626] shadow-lg shadow-red-900/20"
                                            : "border-zinc-700/50 bg-zinc-900/60 backdrop-blur-md hover:-translate-y-1 hover:border-zinc-500 hover:shadow-lg hover:shadow-red-900/5"
                                            }`}
                                    >
                                        <span className={`text-lg font-bold ${instalacion === true ? "text-white" : "text-gray-300"}`}>
                                            Sí, deseo instalación
                                        </span>
                                        <span className="mt-1 block text-sm text-gray-500">+$100</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setInstalacion(false)}
                                        className={`flex-1 rounded-xl border p-5 text-center font-sans transition-all duration-300 ${instalacion === false
                                            ? "border-[#DC2626] bg-[#DC2626]/10 ring-1 ring-[#DC2626] shadow-lg shadow-red-900/20"
                                            : "border-zinc-700/50 bg-zinc-900/60 backdrop-blur-md hover:-translate-y-1 hover:border-zinc-500 hover:shadow-lg hover:shadow-red-900/5"
                                            }`}
                                    >
                                        <span className={`text-lg font-bold ${instalacion === false ? "text-white" : "text-gray-300"}`}>
                                            No, sin instalación
                                        </span>
                                        <span className="mt-1 block text-sm text-gray-500">Lo recojo en taller</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div key="step4" className="space-y-6" {...fadeSlide}>
                                <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                                    <Send className="size-6 text-[#DC2626]" />
                                    <h2 className="font-heading text-2xl font-bold text-white">Paso 4: Resumen y envío</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2 rounded-xl border border-white/10 bg-zinc-900/60 p-5 font-sans backdrop-blur-md">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Datos del cliente</h3>
                                        <p className="text-white"><span className="text-gray-400">Nombre:</span> {nombre}</p>
                                        <p className="text-white"><span className="text-gray-400">Teléfono:</span> {telefono}</p>
                                        <p className="text-white"><span className="text-gray-400">Fecha:</span> {formatQuitoDate()}</p>
                                    </div>
                                    <div className="space-y-2 rounded-xl border border-white/10 bg-zinc-900/60 p-5 font-sans backdrop-blur-md">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Medidas y texto</h3>
                                        <p className="text-white"><span className="text-gray-400">Fachada:</span> {ancho}m x {alto}m</p>
                                        <p className="text-white"><span className="text-gray-400">Texto:</span> {texto}</p>
                                        <p className="text-white"><span className="text-gray-400">Alto de letra:</span> {altoLetra} cm</p>
                                    </div>
                                    <div className="space-y-2 rounded-xl border border-white/10 bg-zinc-900/60 p-5 font-sans backdrop-blur-md">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Acabado</h3>
                                        <p className="text-white">{ACABADOS[acabadoIdx].nombre} (x{multiplicador}){subAcabado ? ` - ${subAcabado}` : ""}</p>
                                    </div>
                                    <div className="space-y-2 rounded-xl border border-white/10 bg-zinc-900/60 p-5 font-sans backdrop-blur-md">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Instalación</h3>
                                        <p className="text-white">{instalacionText}</p>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-md">
                                    <div className="grid grid-cols-2 gap-4 font-sans md:grid-cols-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-500">TOL calculado</p>
                                            <p className="mt-1 text-xl font-bold text-white">{tol.toFixed(2)} cm</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-500">Subtotal</p>
                                            <p className="mt-1 text-xl font-bold text-white">${subtotal.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-500">IVA (15%)</p>
                                            <p className="mt-1 text-xl font-bold text-white">${iva.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-500">Total estimado</p>
                                            <p className="mt-1 text-2xl font-extrabold text-[#DC2626]">${total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 font-sans text-xs text-gray-500">
                                        Cotización estimada de referencia. El precio final se confirma con la medición exacta de nuestro equipo.
                                    </p>
                                </div>

                                <motion.a
                                    href={`https://wa.me/593999099175?text=${encodeURIComponent(whatsappMessage)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#25D366]/40"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <MessageCircle className="size-6" />
                                    Enviar cotización por WhatsApp
                                </motion.a>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={step === 1}
                            className="inline-flex items-center gap-2 rounded-full border border-zinc-700/50 px-6 py-3 font-sans text-sm font-semibold text-gray-300 backdrop-blur-md transition-all duration-300 hover:bg-zinc-800 hover:-translate-x-1 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0"
                        >
                            <ChevronLeft className="size-4" />
                            Atrás
                        </button>

                        {step < 4 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!canGoNext}
                                className="inline-flex items-center gap-2 rounded-full bg-[#DC2626] px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#DC2626]/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Siguiente
                                <ChevronRight className="size-4" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-6 py-3 font-sans text-sm font-semibold text-gray-300 transition-all duration-300 hover:bg-zinc-700 hover:-translate-y-0.5"
                            >
                                Nueva cotización
                            </button>
                        )}
                    </motion.div>

                </motion.div>
            </div>
        </div>
    )
}
