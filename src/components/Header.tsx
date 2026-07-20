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
                <a href="/" className="flex shrink-0 items-center gap-2" aria-label="Activa Medios inicio">
                    <img src="/logotpo-activa.png" alt="Activa Medios" className="h-8 w-auto brightness-0 invert" />
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
                    <div className="hidden items-center gap-1 md:flex">
                        <a
                            href="https://www.instagram.com/activa.medios/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-red-600/20 hover:text-foreground"
                            aria-label="Instagram"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>
                        <a
                            href="https://www.tiktok.com/@mauro.activamedios"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-red-600/20 hover:text-foreground"
                            aria-label="TikTok"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                                <path d="M9 22V4l12-2v18" />
                                <path d="M9 16.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.facebook.com/ActivaPubIicidad/?locale=es_LA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-red-600/20 hover:text-foreground"
                            aria-label="Facebook"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
                            </svg>
                        </a>
                    </div>
                    <a
                        href="/rotulacion-3d"
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
                            href="/rotulacion-3d"
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
