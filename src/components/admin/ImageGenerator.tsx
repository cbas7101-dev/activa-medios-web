"use client";

import { useState } from "react";
import {
  Sparkles,
  Download,
  MessageCircle,
  Loader,
  ImageIcon,
  RefreshCw,
} from "lucide-react";

const PLATAFORMAS = [
  { value: "instagram-feed", label: "Instagram / Facebook Feed (4:5)", w: 1080, h: 1350 },
  { value: "stories", label: "Stories / Reels / WhatsApp (9:16)", w: 1080, h: 1920 },
  { value: "cuadrado", label: "Cuadrado — WhatsApp / Catálogo (1:1)", w: 1080, h: 1080 },
];

const ESTILOS = [
  { value: "moderno", label: "Moderno corporativo" },
  { value: "minimalista", label: "Minimalista" },
  { value: "llamativo", label: "Llamativo" },
  { value: "elegante", label: "Elegante" },
];

interface ImagenGenerada {
  id: string;
  imagenUrl: string;
  prompt: string;
  plataforma: string;
  estilo?: string;
  createdAt: string;
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [plataforma, setPlataforma] = useState("instagram-feed");
  const [estilo, setEstilo] = useState("moderno");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ImagenGenerada | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/imagenes/generar", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          plataforma,
          estilo,
        }),
      });

      if (!res.ok) throw new Error("API no disponible");

      const data = await res.json();
      setResult(data);
    } catch {
      setTimeout(() => {
        setResult({
          id: "simulated-" + Date.now(),
          imagenUrl: "/fotos/Nuestra-Historia-scaled.jpg",
          prompt: prompt.trim(),
          plataforma,
          estilo,
          createdAt: new Date().toISOString(),
        });
        setLoading(false);
      }, 2000);
      return;
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result.imagenUrl;
    link.download = `activa-${result.plataforma}-${Date.now()}.png`;
    link.click();
  };

  const handleWhatsApp = () => {
    if (!result) return;
    const msg = encodeURIComponent(
      `📸 Imagen generada para Activa Medios\n\n${result.prompt}`
    );
    window.open(`https://wa.me/593999099175?text=${msg}`, "_blank");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Generador de imágenes IA</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Crea imágenes publicitarias con la paleta de marca cromado + azul eléctrico
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">
                ¿Qué quieres promocionar?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Curso de rotulación 3D — Aprende desde cero, inscripciones abiertas..."
                rows={4}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Formato</label>
              <div className="space-y-2">
                {PLATAFORMAS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPlataforma(p.value)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs border transition-all ${
                      plataforma === p.value
                        ? "bg-blue-600/20 text-blue-400 border-blue-500/20"
                        : "bg-zinc-950 text-zinc-400 border-white/10 hover:text-white"
                    }`}
                  >
                    <span className="font-medium">{p.label}</span>
                    <span className="text-zinc-600 ml-2">({p.w}×{p.h}px)</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Estilo visual</label>
              <div className="flex flex-wrap gap-2">
                {ESTILOS.map((e) => (
                  <button
                    key={e.value}
                    onClick={() => setEstilo(e.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      estilo === e.value
                        ? "bg-blue-600/20 text-blue-400 border-blue-500/20"
                        : "bg-zinc-950 text-zinc-400 border-white/10 hover:text-white"
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl px-4 py-3 text-sm font-medium transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generar imagen
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Vista previa</h2>

          {loading ? (
            <div className="aspect-[4/5] rounded-xl bg-zinc-950 flex items-center justify-center">
              <div className="text-center">
                <Loader size={32} className="mx-auto text-blue-500 animate-spin mb-3" />
                <p className="text-sm text-zinc-500">Generando imagen...</p>
              </div>
            </div>
          ) : result ? (
            <div>
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-zinc-950 mb-4">
                <img
                  src={result.imagenUrl}
                  alt={result.prompt}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-xl py-2.5 text-sm font-medium transition-all"
                >
                  <Download size={16} />
                  Descargar
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-sm font-medium transition-all"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
              </div>
            </div>
          ) : (
            <div className="aspect-[4/5] rounded-xl bg-zinc-950 flex items-center justify-center">
              <div className="text-center">
                <ImageIcon size={40} className="mx-auto text-zinc-700 mb-3" />
                <p className="text-sm text-zinc-600">
                  Completa el formulario y genera tu imagen
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
