"use client"

import { useState, useMemo } from "react"
import {
  ShoppingCart, Plus, Minus, Trash2, X, MessageCircle, Package,
  ChevronRight
} from "lucide-react"

type Producto = {
  id: number
  nombre: string
  precio: number
  imagen: string
  colores?: string[]
  tamanos?: string[]
}

const PRODUCTOS: Producto[] = [
  {
    id: 1, nombre: "Perfil de Aluminio para Letras 3D", precio: 85.00, imagen: "📦",
    colores: ["Rojo", "Blanco", "Amarillo", "Plateado", "Verde", "Negro", "Azul"],
    tamanos: ["6cm - 50m", "8cm - 50m"],
  },
  {
    id: 2, nombre: "LEDs 12V / 110V Luz Blanca y Cálida", precio: 0.35, imagen: "💡",
    colores: ["Blanco", "Cálido", "Rojo", "Azul", "Verde"],
  },
  {
    id: 3, nombre: "Mini LEDs 110V Luz Blanca y Cálida", precio: 0.40, imagen: "💡",
    colores: ["Blanco", "Cálido", "Rojo", "Azul", "Verde"],
  },
  {
    id: 4, nombre: "Silvatream 3/4\"", precio: 25.00, imagen: "📏",
    colores: ["Negro", "Blanco", "Plata"],
  },
  { id: 5, nombre: "Pega Acrílica de Secado Rápido", precio: 33.00, imagen: "🧴" },
  { id: 6, nombre: "Polvo Acrílico 500g", precio: 15.00, imagen: "🧪" },
]

type CartItem = {
  cartKey: string
  id: number
  nombre: string
  variante: string
  precio: number
  cantidad: number
}

function buildCartKey(id: number, color: string, size: string) {
  return `${id}|${color || ""}|${size || ""}`
}

function buildVarianteLabel(color: string, size: string) {
  const parts = [color, size].filter(Boolean)
  return parts.length ? parts.join(", ") : ""
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

export default function TiendaInsumos() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  const [modalProduct, setModalProduct] = useState<Producto | null>(null)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [modalCantidad, setModalCantidad] = useState(1)

  const openModal = (producto: Producto) => {
    setModalProduct(producto)
    setSelectedColor(producto.colores?.[0] ?? "")
    setSelectedSize(producto.tamanos?.[0] ?? "")
    setModalCantidad(1)
  }

  const closeModal = () => setModalProduct(null)

  const addToCart = () => {
    if (!modalProduct) return
    const cartKey = buildCartKey(modalProduct.id, selectedColor, selectedSize)
    const variante = buildVarianteLabel(selectedColor, selectedSize)
    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey)
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, cantidad: item.cantidad + modalCantidad }
            : item
        )
      }
      return [
        ...prev,
        {
          cartKey,
          id: modalProduct.id,
          nombre: modalProduct.nombre,
          variante,
          precio: modalProduct.precio,
          cantidad: modalCantidad,
        },
      ]
    })
    closeModal()
    setCartOpen(true)
  }

  const updateCantidad = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, cantidad: Math.max(0, item.cantidad + delta) }
            : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  const removeItem = (cartKey: string) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey))
  }

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.cantidad, 0),
    [cart]
  )

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    [cart]
  )
  const iva = useMemo(() => subtotal * 0.15, [subtotal])
  const total = useMemo(() => subtotal + iva, [subtotal, iva])

  const whatsappMessage = useMemo(() => {
    const lines = [
      "\u{1F534} NUEVO PEDIDO DE INSUMOS",
      "",
      ...cart.map((item) => {
        const label = item.variante
          ? `${item.nombre} (${item.variante})`
          : item.nombre
        return `${item.cantidad}x ${label} - $${(item.precio * item.cantidad).toFixed(2)}`
      }),
      "",
      `    *Total a pagar:* $${total.toFixed(2)}`,
    ]
    return lines.join("\n")
  }, [cart, total])

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Insumos
            </h1>
            <p className="mt-3 font-sans text-base text-gray-400">
              Todo lo necesario para tu rotulación 3D
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative inline-flex size-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 transition-colors hover:bg-zinc-800"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="size-5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTOS.map((producto) => (
            <div
              key={producto.id}
              className="group flex cursor-pointer flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
              onClick={() => openModal(producto)}
            >
              <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-zinc-800 text-2xl">
                {producto.imagen}
              </div>
              <h3 className="font-sans text-base font-bold text-white">
                {producto.nombre}
              </h3>
              <p className="mt-2 font-sans text-2xl font-extrabold text-[#DC2626]">
                ${producto.precio.toFixed(2)}
              </p>
              <p className="mt-1 font-sans text-xs text-gray-500">
                Precio por unidad + IVA
              </p>
              <div className="mt-auto flex items-center justify-between pt-4">
                {(producto.colores || producto.tamanos) && (
                  <span className="font-sans text-xs text-gray-500">
                    {[producto.colores?.length && `${producto.colores.length} colores`, producto.tamanos?.length && `${producto.tamanos.length} tamaños`]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
                <span
                  className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#DC2626] px-4 py-2 font-sans text-xs font-semibold text-white shadow-lg shadow-[#DC2626]/20 transition-transform hover:scale-[1.02] active:scale-95"
                  onClick={(e) => { e.stopPropagation(); openModal(producto) }}
                >
                  Ver opciones
                  <ChevronRight className="size-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-zinc-800 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="size-5" />
            </button>

            <div className="mb-2 flex size-14 items-center justify-center rounded-xl bg-zinc-800 text-2xl">
              {modalProduct.imagen}
            </div>
            <h2 className="mt-4 font-heading text-2xl font-bold text-white">
              {modalProduct.nombre}
            </h2>
            <p className="mt-1 font-sans text-3xl font-extrabold text-[#DC2626]">
              ${modalProduct.precio.toFixed(2)}
            </p>
            <p className="mt-1 font-sans text-xs text-gray-500">
              Precio por unidad + IVA
            </p>

            <div className="mt-6 space-y-5">
              {modalProduct.colores && (
                <div>
                  <p className="mb-2 font-sans text-sm font-semibold text-gray-300">
                    Color: <span className="text-white">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {modalProduct.colores.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-xs font-medium transition-all ${
                          selectedColor === color
                            ? "border-[#DC2626] bg-[#DC2626]/10 text-white ring-1 ring-[#DC2626]"
                            : "border-zinc-700 text-gray-400 hover:border-zinc-500 hover:text-gray-200"
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

              {modalProduct.tamanos && (
                <div>
                  <p className="mb-2 font-sans text-sm font-semibold text-gray-300">
                    Tamaño: <span className="text-white">{selectedSize}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {modalProduct.tamanos.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-4 py-1.5 font-sans text-xs font-medium transition-all ${
                          selectedSize === size
                            ? "border-[#DC2626] bg-[#DC2626]/10 text-white ring-1 ring-[#DC2626]"
                            : "border-zinc-700 text-gray-400 hover:border-zinc-500 hover:text-gray-200"
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
                    onClick={() => setModalCantidad((v) => Math.max(1, v - 1))}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-700 text-gray-300 transition-colors hover:bg-zinc-800 hover:text-white"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="size-4" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={modalCantidad}
                    onChange={(e) =>
                      setModalCantidad(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-center font-sans text-base font-bold text-white outline-none transition-colors focus:border-[#DC2626] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setModalCantidad((v) => v + 1)}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-700 text-gray-300 transition-colors hover:bg-zinc-800 hover:text-white"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="size-4" />
                  </button>
                  <span className="ml-auto font-sans text-sm text-gray-400">
                    Subtotal:{" "}
                    <span className="font-bold text-white">
                      ${(modalProduct.precio * modalCantidad).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={addToCart}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#DC2626] px-6 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Package className="size-5" />
              Agregar al carrito
            </button>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative flex w-full max-w-md flex-col bg-zinc-950 border-l border-zinc-800 shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
              <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-white">
                <ShoppingCart className="size-5 text-[#DC2626]" />
                Carrito
                {totalItems > 0 && (
                  <span className="rounded-full bg-[#DC2626] px-2 py-0.5 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="inline-flex size-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-zinc-800 hover:text-white"
                aria-label="Cerrar carrito"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingCart className="size-12 text-zinc-700" />
                  <p className="mt-4 font-sans text-sm text-gray-500">
                    Tu carrito está vacío
                  </p>
                  <p className="mt-1 font-sans text-xs text-gray-600">
                    Agrega productos para empezar
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.cartKey}
                      className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-semibold text-white truncate">
                          {item.nombre}
                        </p>
                        {item.variante && (
                          <p className="font-sans text-xs text-gray-500">
                            {item.variante}
                          </p>
                        )}
                        <p className="mt-0.5 font-sans text-sm font-bold text-[#DC2626]">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => updateCantidad(item.cartKey, -1)}
                          className="inline-flex size-7 items-center justify-center rounded-full border border-zinc-700 text-gray-300 transition-colors hover:bg-zinc-700 hover:text-white"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="flex size-8 items-center justify-center font-sans text-sm font-bold text-white">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCantidad(item.cartKey, 1)}
                          className="inline-flex size-7 items-center justify-center rounded-full border border-zinc-700 text-gray-300 transition-colors hover:bg-zinc-700 hover:text-white"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.cartKey)}
                        className="inline-flex size-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-zinc-800 px-6 py-5">
                <div className="space-y-2 font-sans text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>IVA (15%)</span>
                    <span>${iva.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-zinc-800 pt-2 text-lg font-extrabold text-white">
                    <span>Total</span>
                    <span className="text-[#DC2626]">${total.toFixed(2)}</span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/593999099175?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="size-5" />
                  Enviar pedido por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </div>
  )
}
