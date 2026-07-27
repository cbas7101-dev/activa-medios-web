"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Calendar,
  Copy,
  Trash2,
  MoreHorizontal,
  Clock,
  CheckCircle,
  FileText,
} from "lucide-react";

interface Publicacion {
  id: string;
  titulo: string;
  contenido?: string;
  imagenUrl?: string;
  plataformas: string[];
  fechaPublicacion?: string;
  estado: string;
  submarca: string;
  createdAt: string;
}

const SUBMARCAS = [
  { value: "TODAS", label: "Todas" },
  { value: "aktiva-cursos", label: "Aktiva Cursos" },
  { value: "aktiva-store", label: "Aktiva Store" },
  { value: "activa-publicidad", label: "Activa Publicidad" },
];

const ESTADOS = [
  { value: "TODOS", label: "Todos" },
  { value: "borrador", label: "Borradores" },
  { value: "programada", label: "Programadas" },
  { value: "publicada", label: "Publicadas" },
];

const submarcaColor = (s: string) => {
  switch (s) {
    case "aktiva-cursos":
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    case "aktiva-store":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "activa-publicidad":
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    default:
      return "text-zinc-400 bg-white/5 border-white/10";
  }
};

const estadoColor = (e: string) => {
  switch (e) {
    case "publicada":
      return "text-emerald-400 bg-emerald-500/10";
    case "programada":
      return "text-blue-400 bg-blue-500/10";
    case "borrador":
      return "text-zinc-500 bg-white/5";
    default:
      return "text-zinc-500 bg-white/5";
  }
};

const estadoIcon = (e: string) => {
  switch (e) {
    case "publicada":
      return CheckCircle;
    case "programada":
      return Clock;
    default:
      return FileText;
  }
};

const MOCK_PUBLICACIONES: Publicacion[] = [
  { id: "mock-pub-1", titulo: "Reel: Proceso de instalación Misska", contenido: "Time-lapse del proceso completo de instalación del letrero Misska en Cumbayá — mostrando el armado, soldadura y colocación en fachada.", plataformas: ["Instagram", "TikTok"], fechaPublicacion: new Date(2026, 6, 15, 10, 0).toISOString(), estado: "programada", submarca: "activa-publicidad", createdAt: new Date().toISOString() },
  { id: "mock-pub-2", titulo: "Carrusel: Oferta Cursos 3D", contenido: "Carrusel de 5 slides mostrando los cursos de rotulación 3D con descuento por inscripción temprana — limitado a 10 cupos.", plataformas: ["Instagram", "Facebook"], fechaPublicacion: new Date(2026, 6, 18, 14, 0).toISOString(), estado: "programada", submarca: "aktiva-cursos", createdAt: new Date().toISOString() },
  { id: "mock-pub-3", titulo: "Post: Nuevo Silvatream Neón Flex", contenido: "Lanzamiento del nuevo Silvatream Neón Flex en colores pastel — ideal para locales comerciales con estilo moderno.", plataformas: ["Instagram", "Facebook", "WhatsApp"], fechaPublicacion: new Date(2026, 6, 22, 9, 0).toISOString(), estado: "programada", submarca: "aktiva-store", createdAt: new Date().toISOString() },
  { id: "mock-pub-4", titulo: "Video: Detrás de escena — Letrero Corporativo", contenido: "Behind the scenes de la fabricación de un letrero corporativo de 4 metros de ancho con iluminación LED integrada.", plataformas: ["Instagram", "TikTok", "YouTube"], fechaPublicacion: new Date(2026, 6, 25, 16, 0).toISOString(), estado: "programada", submarca: "activa-publicidad", createdAt: new Date().toISOString() },
  { id: "mock-pub-5", titulo: "Testimonio Cliente: Centro Comercial", contenido: "Cliente frecuente comparte su experiencia trabajando con Activa Medios para la rotulación de su local en el norte de Quito.", plataformas: ["Instagram", "Facebook"], fechaPublicacion: new Date(2026, 6, 28, 11, 0).toISOString(), estado: "programada", submarca: "activa-publicidad", createdAt: new Date().toISOString() },
  { id: "mock-pub-6", titulo: "Infografía: Tipos de acrílico para letreros", contenido: "Guía visual comparativa de acrílico brillante vs mate vs translúcido — cuál elegir según la necesidad del cliente.", plataformas: ["Instagram", "Facebook"], fechaPublicacion: new Date(2026, 6, 30, 12, 0).toISOString(), estado: "programada", submarca: "aktiva-cursos", createdAt: new Date().toISOString() },
];

export default function PublicationsList() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("TODOS");
  const [submarca, setSubmarca] = useState("TODAS");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [useMock, setUseMock] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (estado !== "TODOS") params.set("estado", estado);
      if (submarca !== "TODAS") params.set("submarca", submarca);

      const res = await fetch(`/api/publicaciones?${params}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setPublicaciones(data);
        setUseMock(false);
      } else {
        setPublicaciones(MOCK_PUBLICACIONES);
        setUseMock(true);
      }
    } catch (err) {
      console.error(err);
      setPublicaciones(MOCK_PUBLICACIONES);
      setUseMock(true);
    } finally {
      setLoading(false);
    }
  }, [search, estado, submarca]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDuplicate = async (id: string) => {
    try {
      await fetch(`/api/publicaciones/${id}/duplicar`, { method: "POST" });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
    setMenuOpen(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta publicación?")) return;
    try {
      await fetch(`/api/publicaciones/${id}`, { method: "DELETE" });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
    setMenuOpen(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Publicaciones</h1>
          <p className="text-sm text-zinc-500 mt-1">{publicaciones.length} publicaciones</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/admin/publicaciones/nueva"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
          >
            <Plus size={16} />
            Nueva publicación
          </a>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar publicaciones..."
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <select
          value={submarca}
          onChange={(e) => setSubmarca(e.target.value)}
          className="bg-zinc-900/50 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
        >
          {SUBMARCAS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="bg-zinc-900/50 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50"
        >
          {ESTADOS.map((e) => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      ) : publicaciones.length === 0 ? (
        <div className="text-center py-16">
          <Megaphone size={40} className="mx-auto text-zinc-700 mb-3" />
          <p className="text-zinc-500 text-sm">No hay publicaciones</p>
        </div>
      ) : (
        <div className="space-y-2">
          {publicaciones.map((pub) => {
            const EstIcon = estadoIcon(pub.estado);
            return (
              <a
                key={pub.id}
                href={`/admin/publicaciones/${pub.id}`}
                className="block bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:bg-zinc-900/80 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${submarcaColor(pub.submarca)}`}>
                        {pub.submarca === "aktiva-cursos" ? "Cursos" : pub.submarca === "aktiva-store" ? "Store" : "Publicidad"}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 ${estadoColor(pub.estado)}`}>
                        <EstIcon size={10} />
                        {pub.estado === "programada" ? "Programada" : pub.estado === "publicada" ? "Publicada" : "Borrador"}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-white">{pub.titulo}</h3>
                    {pub.contenido && (
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{pub.contenido}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-zinc-600">
                      {pub.fechaPublicacion && (
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(pub.fechaPublicacion).toLocaleDateString("es-EC", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                      {pub.plataformas?.length > 0 && (
                        <span>{pub.plataformas.join(", ")}</span>
                      )}
                    </div>
                  </div>
                  <div className="relative shrink-0" onClick={(e) => e.preventDefault()}>
                    <button
                      onClick={() => setMenuOpen(menuOpen === pub.id ? null : pub.id)}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
                    >
                      <MoreHorizontal size={14} className="text-zinc-400" />
                    </button>
                    {menuOpen === pub.id && (
                      <div className="absolute right-0 top-10 bg-zinc-900 border border-white/10 rounded-xl p-1.5 shadow-xl z-10 min-w-[140px]">
                        <button
                          onClick={() => handleDuplicate(pub.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/5 w-full"
                        >
                          <Copy size={12} />
                          Duplicar
                        </button>
                        <button
                          onClick={() => handleDelete(pub.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 w-full"
                        >
                          <Trash2 size={12} />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
