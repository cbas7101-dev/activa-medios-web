"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { X, Package, Minus, Plus } from "lucide-react"
import type { Producto } from "./TiendaInsumos"

type ModalCompraProps = {
  product: Producto | null
  onClose: () => void
  onAddToCart: (
    product: Producto,
    color: string,
    size: string,
    voltaje: string,
    cantidad: number
  ) => void
}

const COLOR_MAP: Record<string, string> = {
  Rojo: "#DC2626",
  Blanco: "#F5F5F5",
  Amarillo: "#EAB308",
  Plateado: "#A1A1AA",
  Verde: "#22C55E",
  Negro: "#1A1A1A",
  Azul: "#3B82F6",
  Cálido: "#F59E0B",
  Plata: "#A1A1AA",
}

export default function ModalCompra({ product, onClose, onAddToCart }: ModalCompraProps) {
  const [localProduct, setLocalProduct] = useState<Producto | null>(null)
  const [visible, setVisible] = useState(false)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedVoltaje, setSelectedVoltaje] = useState("")
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    if (product) {
      setLocalProduct(product)
      setSelectedColor(product.colores?.[0] ?? "")
      setSelectedSize(product.tamanos?.[0] ?? "")
      setSelectedVoltaje(product.voltajes?.[0]?.voltaje ?? "")
      setCantidad(1)
      requestAnimationFrame(() => setVisible(true))
    } else if (localProduct) {
      setVisible(false)
      const timer = setTimeout(() => setLocalProduct(null), 300)
      return () => clearTimeout(timer)
    }
  }, [product])

  const unitPrice = useMemo(() => {
    if (!localProduct) return 0
    if (localProduct.voltajes && selectedVoltaje) {
      const opt = localProduct.voltajes.find((v) => v.voltaje === selectedVoltaje)
      if (opt) return opt.precio
    }
    return localProduct.precio
  }, [localProduct, selectedVoltaje])

  const handleBackdrop = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 300)
  }, [onClose])

  const handleAdd = useCallback(() => {
    if (!localProduct) return
    onAddToCart(localProduct, selectedColor, selectedSize, selectedVoltaje, cantidad)
    setVisible(false)
    setTimeout(onClose, 300)
  }, [localProduct, selectedColor, selectedSize, selectedVoltaje, cantidad, onAddToCart, onClose])

  if (!localProduct) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-out will-change-[opacity] ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdrop}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className={`relative w-full max-w-5xl rounded-2xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl md:p-8 overflow-hidden transition-all duration-300 ease-out will-change-[transform,opacity] ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleBackdrop}
          className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-zinc-800 hover:text-white"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-[4/3] md:aspect-square bg-zinc-900/50 rounded-xl flex items-center justify-center p-4">
            <img
              src={`/insumos/${localProduct.imagen}`}
              alt={localProduct.nombre}
              className="w-full h-full object-contain rounded-lg"
              decoding="async"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                {localProduct.nombre}
              </h2>
              <p className="mt-1 font-sans text-3xl font-extrabold text-[#DC2626]">
                ${unitPrice.toFixed(2)}
              </p>
              <p className="font-sans text-xs text-gray-500">
                Precio por unidad + IVA
              </p>
            </div>

            {localProduct.colores && (
              <div>
                <p className="mb-2 font-sans text-sm font-semibold text-gray-300">
                  Color: <span className="text-white">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {localProduct.colores.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-xs font-medium transition-all ${
                        selectedColor === color
                          ? "border-[#DC2626] bg-[#DC2626]/10 text-white ring-1 ring-[#DC2626]"
                          : "border-zinc-700/50 text-gray-400 hover:border-zinc-500 hover:text-gray-200"
                      }`}
                    >
                      <span
                        className="inline-block size-3.5 rounded-full border border-zinc-600"
                        style={{ backgroundColor: COLOR_MAP[color] ?? "#666" }}
                      />
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {localProduct.voltajes && (
              <div>
                <p className="mb-2 font-sans text-sm font-semibold text-gray-300">
                  Voltaje: <span className="text-white">{selectedVoltaje}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {localProduct.voltajes.map((opt) => (
                    <button
                      key={opt.voltaje}
                      type="button"
                      onClick={() => setSelectedVoltaje(opt.voltaje)}
                      className={`rounded-full border px-4 py-1.5 font-sans text-xs font-medium transition-all ${
                        selectedVoltaje === opt.voltaje
                          ? "border-[#DC2626] bg-[#DC2626]/10 text-white ring-1 ring-[#DC2626]"
                          : "border-zinc-700/50 text-gray-400 hover:border-zinc-500 hover:text-gray-200"
                      }`}
                    >
                      {opt.voltaje} — ${opt.precio.toFixed(2)}/u
                    </button>
                  ))}
                </div>
              </div>
            )}

            {localProduct.tamanos && (
              <div>
                <p className="mb-2 font-sans text-sm font-semibold text-gray-300">
                  Tamaño: <span className="text-white">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {localProduct.tamanos.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border px-4 py-1.5 font-sans text-xs font-medium transition-all ${
                        selectedSize === size
                          ? "border-[#DC2626] bg-[#DC2626]/10 text-white ring-1 ring-[#DC2626]"
                          : "border-zinc-700/50 text-gray-400 hover:border-zinc-500 hover:text-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="mb-2 font-sans text-sm font-semibold text-gray-300">
                Cantidad
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCantidad((v) => Math.max(1, v - 1))}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-700/50 text-gray-300 transition-colors hover:bg-zinc-800 hover:text-white"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="size-4" />
                </button>
                <input
                  type="number"
                  min={1}
                  value={cantidad}
                  onChange={(e) =>
                    setCantidad(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20 rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-3 py-2 text-center font-sans text-base font-bold text-white outline-none backdrop-blur-md transition-all duration-300 focus:border-[#DC2626] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => setCantidad((v) => v + 1)}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-700/50 text-gray-300 transition-colors hover:bg-zinc-800 hover:text-white"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="size-4" />
                </button>
                <span className="ml-auto font-sans text-sm text-gray-400">
                  Subtotal:{" "}
                  <span className="font-bold text-white">
                    ${(unitPrice * cantidad).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#DC2626] px-6 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#DC2626]/40 active:scale-95"
            >
              <Package className="size-5" />
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
