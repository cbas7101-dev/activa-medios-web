import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
                <div className="md:col-span-2">
                    <a href="/" className="inline-flex items-center gap-2" aria-label="Activa Medios inicio">
                        <span className="font-heading text-2xl font-extrabold uppercase tracking-tight text-foreground">
                            Activa
                        </span>
                        <span className="font-heading text-2xl font-extrabold uppercase tracking-tight text-primary">
                            Medios
                        </span>
                    </a>
                    <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
                        Agencia de comunicación visual especializada en rotulación 3D, letras corpóreas y
                        soluciones luminosas que transforman espacios y hacen crecer tu marca.
                    </p>
                </div>

                <div>
                    <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                        Servicios
                    </h3>
                    <ul className="mt-4 space-y-3 font-sans text-sm text-muted-foreground">
                        <li><a href="/rotulacion-3d" className="transition-colors hover:text-accent">Rotulación 3D</a></li>
                        <li><a href="/insumos" className="transition-colors hover:text-accent">Insumos</a></li>
                        <li><a href="/cursos" className="transition-colors hover:text-accent">Cursos</a></li>
                        <li><a href="/galeria" className="transition-colors hover:text-accent">Galería</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                        Contacto
                    </h3>
                    <ul className="mt-4 space-y-3 font-sans text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <Phone className="size-4 text-accent" />
                            <a href="tel:+593999099175" className="transition-colors hover:text-accent">+593 999 099 175</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="size-4 text-accent" />
                            <a href="mailto:activamedios.ec@gmail.com" className="transition-colors hover:text-accent">activamedios.ec@gmail.com</a>
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="size-4 text-accent" /> Quito, Ecuador
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                        Síguenos
                    </h3>
                    <div className="mt-4 flex items-center gap-3">
                        <a
                            href="https://www.instagram.com/activa.medios/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex size-9 items-center justify-center rounded-full bg-zinc-800 text-muted-foreground transition-all duration-300 hover:bg-[#DC2626] hover:text-white"
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
                            className="flex size-9 items-center justify-center rounded-full bg-zinc-800 text-muted-foreground transition-all duration-300 hover:bg-[#DC2626] hover:text-white"
                            aria-label="TikTok"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.facebook.com/ActivaPubIicidad/?locale=es_LA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex size-9 items-center justify-center rounded-full bg-zinc-800 text-muted-foreground transition-all duration-300 hover:bg-[#DC2626] hover:text-white"
                            aria-label="Facebook"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-border">
                <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
                    <p className="font-sans text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Activa Medios. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}
