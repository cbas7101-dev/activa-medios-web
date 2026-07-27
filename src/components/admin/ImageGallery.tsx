"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, MessageCircle, Trash2, ImageIcon } from "lucide-react";

interface Imagen {
  id: string;
  imagenUrl: string;
  prompt: string;
  plataforma: string;
  estilo?: string;
  createdAt: string;
}

export default function ImageGallery() {
  const [images, setImages] = useState<Imagen[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/imagenes?limit=50");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar esta imagen?")) return;
    try {
      await fetch(`/api/imagenes/${id}`, { method: "DELETE" });
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = (url: string, prompt: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `activa-${prompt.slice(0, 20)}.png`;
    link.click();
  };

  const handleWhatsApp = (url: string) => {
    const msg = encodeURIComponent(`📸 Imagen Activa Medios\n${url}`);
    window.open(`https://wa.me/593999099175?text=${msg}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <ImageIcon size={40} className="mx-auto text-zinc-700 mb-3" />
        <p className="text-zinc-500 text-sm">No hay imágenes generadas aún</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {images.map((img) => (
        <div
          key={img.id}
          className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-800"
        >
          <img
            src={img.imagenUrl}
            alt={img.prompt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => handleDownload(img.imagenUrl, img.prompt)}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <Download size={14} className="text-white" />
            </button>
            <button
              onClick={() => handleWhatsApp(img.imagenUrl)}
              className="w-9 h-9 rounded-lg bg-emerald-600/60 hover:bg-emerald-600 flex items-center justify-center"
            >
              <MessageCircle size={14} className="text-white" />
            </button>
            <button
              onClick={() => handleDelete(img.id)}
              className="w-9 h-9 rounded-lg bg-red-600/60 hover:bg-red-600 flex items-center justify-center"
            >
              <Trash2 size={14} className="text-white" />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5">
            <p className="text-[10px] text-zinc-300 line-clamp-2">{img.prompt}</p>
            <span className="text-[8px] text-zinc-500 mt-0.5 block">
              {new Date(img.createdAt).toLocaleDateString("es-EC")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
