"use client";

import { useState } from "react";
import { Plus, Minus, Loader } from "lucide-react";

interface StockEditorProps {
  insumoId: string;
  stockActual: number;
  stockMinimo: number;
  nombre: string;
  onStockUpdate: (newStock: number) => void;
}

export default function StockEditor({
  insumoId,
  stockActual,
  stockMinimo,
  nombre,
  onStockUpdate,
}: StockEditorProps) {
  const [loading, setLoading] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const usuario = "admin";

  const lowStock = stockActual <= stockMinimo;

  const handleMovement = async (cantidad: number, tipo: "compra" | "uso") => {
    setLoading(true);
    try {
      const res = await fetch("/api/movimientos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          insumoId,
          cantidad: Math.abs(cantidad),
          tipo,
          usuario,
          motivo: tipo === "compra" ? "Compra registrada" : "Uso registrado",
        }),
      });

      if (!res.ok) throw new Error("Error al registrar movimiento");

      const newStock =
        tipo === "compra"
          ? stockActual + Math.abs(cantidad)
          : stockActual - Math.abs(cantidad);

      onStockUpdate(newStock);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustom = () => {
    const amount = Number(customAmount);
    if (!amount || amount <= 0) return;

    if (amount > stockActual) {
      handleMovement(amount, "compra");
    } else {
      handleMovement(amount, "uso");
    }
    setCustomAmount("");
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-white mb-4">Ajuste rápido de stock</h2>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-zinc-500">Stock actual</p>
          <p className={`text-3xl font-bold ${lowStock ? "text-red-400" : "text-white"}`}>
            {stockActual}
          </p>
          {lowStock && (
            <p className="text-xs text-red-400 mt-1">
              Por debajo del mínimo ({stockMinimo})
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => handleMovement(1, "compra")}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-xl py-2.5 text-sm font-medium transition-all disabled:opacity-50"
        >
          {loading ? <Loader size={14} className="animate-spin" /> : <Plus size={16} />}
          +1
        </button>
        <button
          onClick={() => handleMovement(5, "compra")}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-xl py-2.5 text-sm font-medium transition-all disabled:opacity-50"
        >
          {loading ? <Loader size={14} className="animate-spin" /> : <Plus size={16} />}
          +5
        </button>
        <button
          onClick={() => handleMovement(10, "compra")}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-xl py-2.5 text-sm font-medium transition-all disabled:opacity-50"
        >
          {loading ? <Loader size={14} className="animate-spin" /> : <Plus size={16} />}
          +10
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleMovement(1, "uso")}
          disabled={loading || stockActual <= 0}
          className="flex-1 flex items-center justify-center gap-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl py-2.5 text-sm font-medium transition-all disabled:opacity-50"
        >
          {loading ? <Loader size={14} className="animate-spin" /> : <Minus size={16} />}
          -1
        </button>
        <button
          onClick={() => handleMovement(5, "uso")}
          disabled={loading || stockActual < 5}
          className="flex-1 flex items-center justify-center gap-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl py-2.5 text-sm font-medium transition-all disabled:opacity-50"
        >
          {loading ? <Loader size={14} className="animate-spin" /> : <Minus size={16} />}
          -5
        </button>
        <button
          onClick={() => handleMovement(10, "uso")}
          disabled={loading || stockActual < 10}
          className="flex-1 flex items-center justify-center gap-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl py-2.5 text-sm font-medium transition-all disabled:opacity-50"
        >
          {loading ? <Loader size={14} className="animate-spin" /> : <Minus size={16} />}
          -10
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Cantidad"
          min={1}
          className="flex-1 bg-zinc-800 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50"
        />
        <button
          onClick={handleCustom}
          disabled={loading || !customAmount}
          className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl px-4 py-2 text-sm font-medium transition-all disabled:opacity-50"
        >
          Ajustar
        </button>
      </div>
    </div>
  );
}
