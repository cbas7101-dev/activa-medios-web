"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Package } from "lucide-react";
import StockEditor from "./StockEditor";
import MovementHistory from "./MovementHistory";

interface InsumoData {
  id: string;
  nombre: string;
  categoria: string;
  unidadMedida: string;
  stockActual: number;
  stockMinimo: number;
  imagenUrl?: string;
  proveedor?: string;
}

export default function InsumoDetail({ insumoId }: { insumoId: string }) {
  const [insumo, setInsumo] = useState<InsumoData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInsumo = async () => {
    try {
      const res = await fetch(`/api/insumos/${insumoId}`);
      const data = await res.json();
      setInsumo(data);
    } catch (err) {
      console.error("Error fetching insumo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsumo();
  }, [insumoId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!insumo) {
    return (
      <div className="text-center py-16">
        <Package size={40} className="mx-auto text-zinc-700 mb-3" />
        <p className="text-zinc-500">Insumo no encontrado</p>
        <a href="/admin/insumos" className="text-sm text-blue-400 hover:text-blue-300 mt-2 inline-block">
          Volver al inventario
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <a href="/admin/insumos" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5">
          <ArrowLeft size={14} />
          Volver al inventario
        </a>
        <h1 className="text-2xl font-bold text-white mt-2">{insumo.nombre}</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {insumo.categoria} · {insumo.unidadMedida}
          {insumo.proveedor && <> · Proveedor: {insumo.proveedor}</>}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StockEditor
          insumoId={insumo.id}
          stockActual={insumo.stockActual}
          stockMinimo={insumo.stockMinimo}
          nombre={insumo.nombre}
          onStockUpdate={(newStock) =>
            setInsumo((prev) => (prev ? { ...prev, stockActual: newStock } : prev))
          }
        />
        <MovementHistory insumoId={insumo.id} />
      </div>
    </div>
  );
}
