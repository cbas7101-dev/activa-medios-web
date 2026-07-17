"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/593999099175"
            target="_blank"
            rel="noopener noreferrer"
            className="group fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40"
            aria-label="Escríbenos por WhatsApp"
        >
            <span className="absolute -top-10 right-0 whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-1.5 font-sans text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                ¡Escríbenos!
            </span>
            <MessageCircle className="size-7 fill-current" />
        </a>
    )
}
