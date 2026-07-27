"use client";

import { useState, useEffect } from "react";
import { useRouter } from "../../lib/navigation";

const SUBMARCAS = [
  { value: "aktiva-cursos", label: "Aktiva Cursos" },
  { value: "aktiva-store", label: "Aktiva Store" },
  { value: "activa-publicidad", label: "Activa Publicidad" },
];

const PLATAFORMAS = [
  "Instagram",
  "Facebook",
  "TikTok",
  "WhatsApp",
  "LinkedIn",
];

const ESTADOS = [
  { value: "borrador", label: "Borrador" },
  { value: "programada", label: "Programar" },
];

interface PublicationFormProps {
  initial?: {
    titulo: string;
    contenido?: string;
    imagenUrl?: string;
    plataformas: string[];
    fechaPublicacion?: string;
    estado: string;
    submarca: string;
  };
  isEditing?: boolean;
  publicationId?: string;
}

export default function PublicationForm({
  initial,
  isEditing,
  publicationId,
}: PublicationFormProps) {
  const [titulo, setTitulo] = useState(initial?.titulo ?? "");
  const [contenido, setContenido] = useState(initial?.contenido ?? "");
  const [imagenUrl, setImagenUrl] = useState(initial?.imagenUrl ?? "");
  const [plataformas, setPlataformas] = useState<string[]>(initial?.plataformas ?? []);
  const [fechaPublicacion, setFechaPublicacion] = useState(
    initial?.fechaPublicacion
      ? new Date(initial.fechaPublicacion).toISOString().slice(0, 16)
      : ""
  );
  const [estado, setEstado] = useState(initial?.estado ?? "borrador");
  const [submarca, setSubmarca] = useState(initial?.submarca ?? "aktiva-cursos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const togglePlataforma = (p: string) => {
    setPlataformas((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/publicaciones/${publicationId}` : "/api/publicaciones";

      const body: Record<string, any> = {
        titulo,
        contenido,
        imagenUrl: imagenUrl || null,
        plataformas,
        submarca,
        estado,
      };

      if (estado === "programada" && fechaPublicacion) {
        body.fechaPublicacion = new Date(fechaPublicacion).toISOString();
      }

      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-medium mb-2">
          {isEditing ? "Publicación actualizada" : "Publicación creada"}
        </p>
        <a href="/admin/publicaciones" className="text-sm text-blue-400 hover:text-blue-300">
          Volver a publicaciones
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Título *</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Texto de la publicación</label>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows={4}
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">URL de imagen o video</label>
        <input
          type="url"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          placeholder="https://..."
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-2">Plataformas destino</label>
        <div className="flex flex-wrap gap-2">
          {PLATAFORMAS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => togglePlataforma(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                plataformas.includes(p)
                  ? "bg-blue-600/20 text-blue-400 border-blue-500/20"
                  : "bg-zinc-900/50 text-zinc-400 border-white/10 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Sub-marca</label>
        <div className="flex gap-2">
          {SUBMARCAS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSubmarca(s.value)}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                submarca === s.value
                  ? s.value === "aktiva-cursos"
                    ? "bg-blue-600/20 text-blue-400 border-blue-500/20"
                    : s.value === "aktiva-store"
                    ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-600/20 text-amber-400 border-amber-500/20"
                  : "bg-zinc-900/50 text-zinc-400 border-white/10 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Estado</label>
        <div className="flex gap-2">
          {ESTADOS.map((e) => (
            <button
              key={e.value}
              type="button"
              onClick={() => setEstado(e.value)}
              className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                estado === e.value
                  ? "bg-blue-600/20 text-blue-400 border-blue-500/20"
                  : "bg-zinc-900/50 text-zinc-400 border-white/10 hover:text-white"
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      {estado === "programada" && (
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Fecha y hora de publicación</label>
          <input
            type="datetime-local"
            value={fechaPublicacion}
            onChange={(e) => setFechaPublicacion(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
            required={estado === "programada"}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all disabled:opacity-50"
      >
        {loading ? "Guardando..." : isEditing ? "Actualizar publicación" : "Crear publicación"}
      </button>
    </form>
  );
}
