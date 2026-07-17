"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
    { label: "Inicio", href: "/" },
    { label: "Rotulación 3D", href: "/rotulacion-3d" },
    { label: "Insumos", href: "/insumos" },
    { label: "Cursos", href: "/cursos" },
    { label: "Otros servicios", href: "/otros-servicios" },
    { label: "Galería", href: "/galeria" },
    { label: "Nosotros", href: "/nosotros" },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                ? "border-b border-border bg-background/80 backdrop-blur-md"
                : "border-b border-transparent bg-transparent"
                }`}
        >
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
                <a href="/" className="flex items-center gap-2" aria-label="Activa Medios inicio">
                    <span className="font-heading text-xl font-extrabold uppercase tracking-tight text-foreground">
                        Activa
                    </span>
                    <span className="font-heading text-xl font-extrabold uppercase tracking-tight text-primary">
                        Medios
                    </span>
                </a>

                <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="relative font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <a
                        href="/#cotizar"
                        className="hidden rounded-full bg-primary px-5 py-2.5 font-sans text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 md:inline-flex"
                    >
                        Cotiza tu Rótulo 3D
                    </a>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="inline-flex size-10 items-center justify-center rounded-md text-foreground lg:hidden"
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
                    <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Móvil">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="rounded-md px-3 py-3 font-sans text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="/#cotizar"
                            onClick={() => setMenuOpen(false)}
                            className="mt-2 rounded-full bg-primary px-5 py-3 text-center font-sans text-sm font-semibold text-primary-foreground"
                        >
                            Cotiza tu Rótulo 3D
                        </a>
                    </nav>
                </div>
            )}
        </header>
    )
}
