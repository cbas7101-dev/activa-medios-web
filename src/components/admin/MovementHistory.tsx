"use client";

import { useState, useEffect } from "react";
import { Clock, Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface Movimiento {
  id: string;
  cantidad: number;
  tipo: string;
  usuario: string;
  motivo?: string;
  createdAt: string;
}

interface MovementHistoryProps {
  insumoId: string;
}

export default function MovementHistory({ insumoId }: MovementHistoryProps) {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        const res = await fetch(`/api/insumos/${insumoId}/movimientos`);
        const data = await res.json();
        setMovimientos(data);
      } catch (err) {
        console.error("Error fetching movimientos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovimientos();
  }, [insumoId]);

  if (loading) {
    return (
      <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <Clock size={16} className="text-zinc-500" />
        Historial de movimientos
      </h2>

      {movimientos.length === 0 ? (
        <p className="text-sm text-zinc-600 text-center py-8">
          No hay movimientos registrados
        </p>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {movimientos.map((mov) => (
            <div
              key={mov.id}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    mov.tipo === "compra"
                      ? "bg-emerald-500/10"
                      : mov.tipo === "uso"
                      ? "bg-red-500/10"
                      : "bg-amber-500/10"
                  }`}
                >
                  {mov.tipo === "compra" ? (
                    <TrendingUp size={14} className="text-emerald-400" />
                  ) : mov.tipo === "uso" ? (
                    <TrendingDown size={14} className="text-red-400" />
                  ) : (
                    <AlertTriangle size={14} className="text-amber-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white capitalize">
                    {mov.tipo === "compra" ? "Compra" : mov.tipo === "uso" ? "Uso" : "Ajuste"}
                    {mov.motivo && (
                      <span className="text-zinc-500 font-normal"> — {mov.motivo}</span>
                    )}
                  </p>
                  <p className="text-[10px] text-zinc-600">
                    {new Date(mov.createdAt).toLocaleDateString("es-EC", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" · "}{mov.usuario}
                  </p>
                </div>
              </div>
              <span
                className={`shrink-0 text-sm font-bold ${
                  mov.tipo === "compra" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {mov.tipo === "compra" ? "+" : "-"}
                {mov.cantidad}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
