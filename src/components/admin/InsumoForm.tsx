"use client";

import { useState } from "react";

const CATEGORIAS = [
  "PERFILES",
  "ILUMINACIÓN",
  "SILVATREAM",
  "ACRÍLICOS",
  "HERRAMIENTAS",
  "ELÉCTRICO",
];

const UNIDADES = [
  "unidades",
  "metros",
  "litros",
  "kilogramos",
  "rollos",
  "piezas",
  "juegos",
  "paquetes",
];

interface InsumoFormProps {
  initial?: {
    nombre: string;
    categoria: string;
    unidadMedida: string;
    stockActual: number;
    stockMinimo: number;
    proveedor?: string;
    imagenUrl?: string;
  };
  isEditing?: boolean;
  insumoId?: string;
}

export default function InsumoForm({ initial, isEditing, insumoId }: InsumoFormProps) {
  const [nombre, setNombre] = useState(initial?.nombre ?? "");
  const [categoria, setCategoria] = useState(initial?.categoria ?? CATEGORIAS[0]);
  const [unidadMedida, setUnidadMedida] = useState(initial?.unidadMedida ?? UNIDADES[0]);
  const [stockActual, setStockActual] = useState(initial?.stockActual ?? 0);
  const [stockMinimo, setStockMinimo] = useState(initial?.stockMinimo ?? 0);
  const [proveedor, setProveedor] = useState(initial?.proveedor ?? "");
  const [imagenUrl, setImagenUrl] = useState(initial?.imagenUrl ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/insumos/${insumoId}` : "/api/insumos";

      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nombre,
          categoria,
          unidadMedida,
          stockActual,
          stockMinimo,
          proveedor: proveedor || null,
          imagenUrl: imagenUrl || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }

      setSuccess(true);
      if (!isEditing) {
        setNombre("");
        setStockActual(0);
        setStockMinimo(0);
        setProveedor("");
        setImagenUrl("");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success && !isEditing) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-medium mb-2">Insumo creado exitosamente</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setSuccess(false)}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Crear otro
          </button>
          <a href="/admin/insumos" className="text-sm text-zinc-400 hover:text-white">
            Volver al inventario
          </a>
        </div>
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
        <label className="block text-sm text-zinc-400 mb-1.5">Nombre del insumo *</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Categoría *</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Unidad de medida *</label>
          <select
            value={unidadMedida}
            onChange={(e) => setUnidadMedida(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          >
            {UNIDADES.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Stock actual</label>
          <input
            type="number"
            value={stockActual}
            onChange={(e) => setStockActual(Number(e.target.value))}
            min={0}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Stock mínimo</label>
          <input
            type="number"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(Number(e.target.value))}
            min={0}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">Proveedor (opcional)</label>
        <input
          type="text"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1.5">URL de imagen (opcional)</label>
        <input
          type="url"
          value={imagenUrl}
          onChange={(e) => setImagenUrl(e.target.value)}
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50"
      >
        {loading
          ? "Guardando..."
          : isEditing
          ? "Actualizar insumo"
          : "Crear insumo"}
      </button>
    </form>
  );
}
