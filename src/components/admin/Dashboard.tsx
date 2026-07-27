"use client";

import { useState, useEffect } from "react";
import {
  Package,
  AlertTriangle,
  Megaphone,
  ImageIcon,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface Insumo {
  id: string;
  nombre: string;
  stockActual: number;
  stockMinimo: number;
  categoria: string;
}

interface Publicacion {
  id: string;
  titulo: string;
  fechaPublicacion: string;
  estado: string;
  submarca: string;
}

interface Imagen {
  id: string;
  imagenUrl: string;
  prompt: string;
  createdAt: string;
}

export default function Dashboard() {
  const [lowStock, setLowStock] = useState<Insumo[]>([]);
  const [upcomingPosts, setUpcomingPosts] = useState<Publicacion[]>([]);
  const [recentImages, setRecentImages] = useState<Imagen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [insumosRes, publicacionesRes, imagenesRes] = await Promise.all([
          fetch("/api/insumos"),
          fetch("/api/publicaciones"),
          fetch("/api/imagenes?limit=4"),
        ]);

        const insumos: Insumo[] = await insumosRes.json();
        const publicaciones: Publicacion[] = await publicacionesRes.json();
        const imagenes: Imagen[] = await imagenesRes.json();

        setLowStock(insumos.filter((i) => i.stockActual <= i.stockMinimo));

        const now = new Date();
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        setUpcomingPosts(
          publicaciones.filter((p) => {
            if (!p.fechaPublicacion) return false;
            const date = new Date(p.fechaPublicacion);
            return (
              p.estado === "programada" &&
              date >= now &&
              date <= weekFromNow
            );
          })
        );

        setRecentImages(imagenes);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const submarcaLabel = (s: string) => {
    switch (s) {
      case "aktiva-cursos":
        return "Cursos";
      case "aktiva-store":
        return "Store";
      case "activa-publicidad":
        return "Publicidad";
      default:
        return s;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Resumen del panel de administración</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
            <span className="text-2xl font-bold text-white">{lowStock.length}</span>
          </div>
          <p className="text-sm text-zinc-400">Insumos con stock bajo</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Megaphone size={20} className="text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-white">{upcomingPosts.length}</span>
          </div>
          <p className="text-sm text-zinc-400">Publicaciones próximos 7 días</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <ImageIcon size={20} className="text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-white">{recentImages.length}</span>
          </div>
          <p className="text-sm text-zinc-400">Imágenes generadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Package size={16} className="text-zinc-500" />
            Insumos con stock bajo
          </h2>
          {lowStock.length === 0 ? (
            <p className="text-sm text-zinc-600">Todo en orden — ningún insumo con stock bajo</p>
          ) : (
            <div className="space-y-2">
              {lowStock.map((item) => (
                <a
                  key={item.id}
                  href={`/admin/insumos/${item.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{item.nombre}</p>
                    <p className="text-xs text-zinc-500">{item.categoria}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-400">{item.stockActual}</p>
                    <p className="text-xs text-zinc-500">mín: {item.stockMinimo}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Megaphone size={16} className="text-zinc-500" />
            Próximas publicaciones
          </h2>
          {upcomingPosts.length === 0 ? (
            <p className="text-sm text-zinc-600">No hay publicaciones programadas para los próximos 7 días</p>
          ) : (
            <div className="space-y-2">
              {upcomingPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/admin/publicaciones/${post.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{post.titulo}</p>
                    <span
                      className={`inline-block text-[10px] px-2 py-0.5 rounded-full border mt-1 ${submarcaColor(post.submarca)}`}
                    >
                      {submarcaLabel(post.submarca)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 shrink-0 ml-3">
                    {new Date(post.fechaPublicacion).toLocaleDateString("es-EC", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {recentImages.length > 0 && (
        <div className="mt-6 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <ImageIcon size={16} className="text-zinc-500" />
            Últimas imágenes generadas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recentImages.map((img) => (
              <a
                key={img.id}
                href="/admin/imagenes"
                className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-800 group"
              >
                <img
                  src={img.imagenUrl}
                  alt={img.prompt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <p className="text-[10px] text-zinc-300 line-clamp-2">{img.prompt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
