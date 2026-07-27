"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Package, AlertTriangle, Plus } from "lucide-react";

interface Insumo {
  id: string;
  nombre: string;
  categoria: string;
  unidadMedida: string;
  stockActual: number;
  stockMinimo: number;
  imagenUrl?: string;
  proveedor?: string;
}

const CATEGORIAS = [
  "TODOS",
  "PERFILES",
  "ILUMINACIÓN",
  "SILVATREAM",
  "ACRÍLICOS",
  "HERRAMIENTAS",
  "ELÉCTRICO",
];

const MOCK_INSUMOS: Insumo[] = [
  { id: "mock-1", nombre: "Acrílico 3mm Blanco", categoria: "ACRÍLICOS", unidadMedida: "unidad", stockActual: 15, stockMinimo: 5, proveedor: "Distribuidora de Acrílicos" },
  { id: "mock-2", nombre: "Módulos LED Blanco Frío", categoria: "ILUMINACIÓN", unidadMedida: "metro", stockActual: 30, stockMinimo: 10, proveedor: "LedTech S.A." },
  { id: "mock-3", nombre: "Fuente de poder 12V 10A", categoria: "ELÉCTRICO", unidadMedida: "unidad", stockActual: 8, stockMinimo: 3, proveedor: "ElectroSupply" },
  { id: "mock-4", nombre: "Bobina de Aluminio 1m", categoria: "PERFILES", unidadMedida: "metro", stockActual: 50, stockMinimo: 20, proveedor: "Metales del Ecuador" },
  { id: "mock-5", nombre: "Silvatream Blanco 12mm", categoria: "SILVATREAM", unidadMedida: "metro", stockActual: 12, stockMinimo: 5, proveedor: "Silvatream Inc." },
  { id: "mock-6", nombre: "Cinta LED RGB 5050", categoria: "ILUMINACIÓN", unidadMedida: "metro", stockActual: 25, stockMinimo: 10, proveedor: "LedTech S.A." },
  { id: "mock-7", nombre: "Lija Fina #400", categoria: "HERRAMIENTAS", unidadMedida: "unidad", stockActual: 40, stockMinimo: 15, proveedor: "ToolMaster" },
  { id: "mock-8", nombre: "Acrílico Transparente 2mm", categoria: "ACRÍLICOS", unidadMedida: "unidad", stockActual: 20, stockMinimo: 8, proveedor: "Distribuidora de Acrílicos" },
  { id: "mock-9", nombre: "Perfil en U Aluminio 10mm", categoria: "PERFILES", unidadMedida: "metro", stockActual: 35, stockMinimo: 15, proveedor: "Metales del Ecuador" },
  { id: "mock-10", nombre: "Controlador LED RGB", categoria: "ELÉCTRICO", unidadMedida: "unidad", stockActual: 6, stockMinimo: 4, proveedor: "ElectroSupply" },
  { id: "mock-11", nombre: "Silvatream Neón Flex Rosa", categoria: "SILVATREAM", unidadMedida: "metro", stockActual: 18, stockMinimo: 5, proveedor: "Silvatream Inc." },
  { id: "mock-12", nombre: "Taladro Percutor", categoria: "HERRAMIENTAS", unidadMedida: "unidad", stockActual: 3, stockMinimo: 2, proveedor: "ToolMaster" },
];

export default function InventoryTable() {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("TODOS");
  const [useMock, setUseMock] = useState(false);

  const fetchInsumos = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (categoria && categoria !== "TODOS") params.set("categoria", categoria);

      const res = await fetch(`/api/insumos?${params}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setInsumos(data);
        setUseMock(false);
      } else {
        setInsumos(MOCK_INSUMOS);
        setUseMock(true);
      }
    } catch (err) {
      console.error("Error fetching insumos:", err);
      setInsumos(MOCK_INSUMOS);
      setUseMock(true);
    } finally {
      setLoading(false);
    }
  }, [search, categoria]);

  useEffect(() => {
    fetchInsumos();
  }, [fetchInsumos]);

  const handleDescontar = (id: string) => {
    setInsumos((prev) =>
      prev.map((item) =>
        item.id === id && item.stockActual > 0
          ? { ...item, stockActual: item.stockActual - 1 }
          : item
      )
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Inventario</h1>
          <p className="text-sm text-zinc-500 mt-1">{insumos.length} insumos registrados</p>
        </div>
        <a
          href="/admin/insumos/nuevo"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200"
        >
          <Plus size={16} />
          Nuevo insumo
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar insumo..."
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                categoria === cat
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                  : "bg-zinc-900/50 text-zinc-400 border border-white/10 hover:text-white"
              }`}
            >
              {cat === "TODOS" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      ) : insumos.length === 0 ? (
        <div className="text-center py-16">
          <Package size={40} className="mx-auto text-zinc-700 mb-3" />
          <p className="text-zinc-500 text-sm">No se encontraron insumos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {insumos.map((item) => {
            const lowStock = item.stockActual <= item.stockMinimo;
            return (
              <div
                key={item.id}
                className={`bg-zinc-900/50 backdrop-blur-md border rounded-2xl p-4 transition-all duration-200 ${
                  lowStock
                    ? "border-red-500/30"
                    : "border-white/10"
                }`}
              >
                <a href={`/admin/insumos/${item.id}`} className="block">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        lowStock ? "bg-red-500/10" : "bg-blue-500/10"
                      }`}>
                        {lowStock ? (
                          <AlertTriangle size={16} className="text-red-400" />
                        ) : (
                          <Package size={16} className="text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.nombre}</p>
                        <p className="text-[10px] text-zinc-500">{item.categoria}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        lowStock ? "text-red-400" : "text-white"
                      }`}>
                        {item.stockActual}
                      </p>
                      <p className="text-[10px] text-zinc-500">{item.unidadMedida}</p>
                    </div>
                  </div>
                  {lowStock && (
                    <div className="flex items-center gap-1.5 text-[11px] text-red-400 bg-red-500/10 rounded-lg px-2.5 py-1.5">
                      <AlertTriangle size={12} />
                      Stock mínimo: {item.stockMinimo}
                    </div>
                  )}
                  {item.proveedor && (
                    <p className="text-[11px] text-zinc-600 mt-2">{item.proveedor}</p>
                  )}
                </a>
                <button
                  onClick={() => handleDescontar(item.id)}
                  disabled={item.stockActual <= 0}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-medium rounded-xl px-3 py-2 transition-all duration-200 bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Package size={13} />
                  Descontar
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
