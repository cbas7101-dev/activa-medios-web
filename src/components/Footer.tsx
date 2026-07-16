import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                        <span className="font-heading text-2xl font-extrabold uppercase tracking-tight text-foreground">
                            Activa
                        </span>
                        <span className="font-heading text-2xl font-extrabold uppercase tracking-tight text-primary">
                            Medios
                        </span>
                    </div>
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
                            <Phone className="size-4 text-accent" /> +51 999 888 777
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="size-4 text-accent" /> hola@activamedios.com
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="size-4 text-accent" /> Lima, Perú
                        </li>
                    </ul>
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
