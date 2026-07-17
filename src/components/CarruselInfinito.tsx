"use client"

const IMAGES = [
  "/fotos/Barranco.jpg",
  "/fotos/Chicberry-scaled.jpg",
  "/fotos/Julian-gaitan-5-scaled.jpg",
  "/fotos/Remax.jpg",
  "/fotos/Misska-scaled.jpg",
]

export default function CarruselInfinito() {
  return (
    <section className="overflow-hidden bg-black py-20">
      <div className="mx-auto mb-10 max-w-7xl px-4 md:px-8">
        <span className="font-sans text-sm font-semibold uppercase tracking-wider text-[#DC2626]">
          Portafolio
        </span>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Nuestros <span className="text-[#DC2626]">trabajos</span>
        </h2>
      </div>

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div
          className="flex animate-marquee gap-5 hover:[animation-play-state:paused]"
          aria-label="Galería de trabajos"
        >
          {[...IMAGES, ...IMAGES].map((src, i) => (
            <div
              key={i}
              className="relative h-48 w-80 shrink-0 overflow-hidden rounded-2xl bg-zinc-800"
            >
              <img
                src={src}
                alt={`Trabajo ${(i % IMAGES.length) + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const t = e.currentTarget
                  t.style.display = "none"
                  const p = t.parentElement
                  if (p) {
                    p.className =
                      "relative h-48 w-80 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center"
                    const span = document.createElement("span")
                    span.className = "font-sans text-sm text-zinc-600"
                    span.textContent = `marquee-${(i % IMAGES.length) + 1}.jpg`
                    p.appendChild(span)
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
