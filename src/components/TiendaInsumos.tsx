"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingCart, Plus, Minus, Trash2, X, MessageCircle, Package
} from "lucide-react"

type VoltajeOption = {
  voltaje: string
  precio: number
}

type Producto = {
  id: number
  nombre: string
  precio: number
  imagen: string
  categoria: string
  especificaciones: string[]
  colores?: string[]
  tamanos?: string[]
  voltajes?: VoltajeOption[]
}

const PRODUCTOS: Producto[] = [
  {
    id: 1, nombre: "Perfil de Aluminio para Letras 3D", precio: 85.00, imagen: "perfil-de-aluminio.jpeg",
    categoria: "PERFILES", especificaciones: ["Rollos 6cm × 50m", "Rollos 8cm × 50m", "7 colores"],
    colores: ["Rojo", "Blanco", "Amarillo", "Plateado", "Verde", "Negro", "Azul"],
    tamanos: ["6cm - 50m", "8cm - 50m"],
  },
  {
    id: 2, nombre: "LEDs 12V / 110V Luz Blanca y Cálida", precio: 0.35, imagen: "leds.jpeg",
    categoria: "ILUMINACIÓN", especificaciones: ["12V", "110V", "5 colores"],
    colores: ["Blanco", "Cálido", "Rojo", "Azul", "Verde"],
    voltajes: [
      { voltaje: "12V", precio: 0.35 },
      { voltaje: "110V", precio: 0.42 },
    ],
  },
  {
    id: 3, nombre: "Mini LEDs 110V Luz Blanca y Cálida", precio: 0.40, imagen: "mini-leds.jpeg",
    categoria: "ILUMINACIÓN", especificaciones: ["110V", "5 colores"],
    colores: ["Blanco", "Cálido", "Rojo", "Azul", "Verde"],
  },
  {
    id: 4, nombre: "Silvatream 3/4\"", precio: 25.00, imagen: "silvatream.jpeg",
    categoria: "SILVATREAM", especificaciones: ["3/4\"", "3 colores"],
    colores: ["Negro", "Blanco", "Plata"],
  },
  {
    id: 5, nombre: "Polvo Acrílico 500g", precio: 15.00, imagen: "polvo-acrilico.jpeg",
    categoria: "ACRÍLICOS", especificaciones: ["Bolsa 500g"],
  },
  {
    id: 6, nombre: "Dobladora de Acrílico", precio: 120.00, imagen: "dobladora.jpeg",
    categoria: "HERRAMIENTAS", especificaciones: ["Hasta 4mm espesor"],
  },
  {
    id: 7, nombre: "Temporizador", precio: 18.00, imagen: "temporizador.jpeg",
    categoria: "ELÉCTRICO", especificaciones: ["Digital"],
  },
]

type CartItem = {
  cartKey: string
  id: number
  nombre: string
  variante: string
  precio: number
  cantidad: number
}

function buildCartKey(id: number, color: string, size: string, voltaje: string) {
  return `${id}|${color || ""}|${size || ""}|${voltaje || ""}`
}

function buildVarianteLabel(color: string, size: string, voltaje: string) {
  const parts = [color, size, voltaje].filter(Boolean)
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

const staggerCard = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
}

export default function TiendaInsumos() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  const [modalProduct, setModalProduct] = useState<Producto | null>(null)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedVoltaje, setSelectedVoltaje] = useState("")
  const [modalCantidad, setModalCantidad] = useState(1)

  const unitPrice = useMemo(() => {
    if (!modalProduct) return 0
    if (modalProduct.voltajes && selectedVoltaje) {
      const opt = modalProduct.voltajes.find((v) => v.voltaje === selectedVoltaje)
      if (opt) return opt.precio
    }
    return modalProduct.precio
  }, [modalProduct, selectedVoltaje])

  const openModal = (producto: Producto) => {
    setModalProduct(producto)
    setSelectedColor(producto.colores?.[0] ?? "")
    setSelectedSize(producto.tamanos?.[0] ?? "")
    setSelectedVoltaje(producto.voltajes?.[0]?.voltaje ?? "")
    setModalCantidad(1)
  }

  const closeModal = () => setModalProduct(null)

  const addToCart = () => {
    if (!modalProduct) return
    const cartKey = buildCartKey(modalProduct.id, selectedColor, selectedSize, selectedVoltaje)
    const variante = buildVarianteLabel(selectedColor, selectedSize, selectedVoltaje)
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
          precio: unitPrice,
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
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-black pt-24 pb-16">
      <div className="absolute top-1/4 right-1/4 size-80 rounded-full bg-red-600/5 blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 size-72 rounded-full bg-red-600/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          className="mb-10 flex items-center justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Insumos
            </h1>
            <p className="mt-3 font-sans text-base text-gray-400">
              Todo lo necesario para tu rotulación 3D
            </p>
          </div>
          <motion.button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative inline-flex size-12 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-900/60 backdrop-blur-md transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-900/10"
            aria-label="Abrir carrito"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="size-5 text-white" />
            {totalItems > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-bold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </motion.span>
            )}
          </motion.button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerCard}
          initial="hidden"
          animate="visible"
        >
          {PRODUCTOS.map((producto) => (
            <motion.div
              key={producto.id}
              variants={cardItem}
              className="group flex cursor-pointer flex-col rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-red-900/10"
              onClick={() => openModal(producto)}
            >
              <img
                src={`/insumos/${producto.imagen}`}
                alt={producto.nombre}
                className="w-full aspect-square object-cover rounded-t-xl"
                loading="lazy"
                decoding="async"
              />
              <div className="p-6 pt-4">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">
                {producto.categoria}
              </span>
              <h3 className="text-white text-base font-medium mb-3 leading-tight">
                {producto.nombre}
              </h3>
              {producto.especificaciones.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {producto.especificaciones.map((spec, i) => (
                    <span key={i} className="bg-zinc-800/80 text-zinc-400 text-[11px] px-2 py-1 rounded">
                      {spec}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center mt-auto pt-2">
                <span className="text-white text-lg font-bold">
                  ${producto.precio.toFixed(2)}
                </span>
                <span
                  className="text-red-700 hover:text-red-600 text-xs font-bold uppercase transition-colors cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); openModal(producto) }}
                >
                  VER PRODUCTO
                </span>
              </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {modalProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
              className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-xl md:p-8 overflow-hidden"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-[300px] md:h-[500px] bg-zinc-900/50 rounded-xl flex items-center justify-center p-4">
                  <img
                    src={`/insumos/${modalProduct.imagen}`}
                    alt={modalProduct.nombre}
                    className="w-full h-full object-contain rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-white">
                      {modalProduct.nombre}
                    </h2>
                    <p className="mt-1 font-sans text-3xl font-extrabold text-[#DC2626]">
                      ${unitPrice.toFixed(2)}
                    </p>
                    <p className="font-sans text-xs text-gray-500">
                      Precio por unidad + IVA
                    </p>
                  </div>

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

                  {modalProduct.voltajes && (
                    <div>
                      <p className="mb-2 font-sans text-sm font-semibold text-gray-300">
                        Voltaje: <span className="text-white">{selectedVoltaje}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {modalProduct.voltajes.map((opt) => (
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
                        onClick={() => setModalCantidad((v) => Math.max(1, v - 1))}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-700/50 text-gray-300 transition-colors hover:bg-zinc-800 hover:text-white"
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
                        className="w-20 rounded-xl border border-zinc-700/50 bg-zinc-900/60 px-3 py-2 text-center font-sans text-base font-bold text-white outline-none backdrop-blur-md transition-all duration-300 focus:border-[#DC2626] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        onClick={() => setModalCantidad((v) => v + 1)}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-zinc-700/50 text-gray-300 transition-colors hover:bg-zinc-800 hover:text-white"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="size-4" />
                      </button>
                      <span className="ml-auto font-sans text-sm text-gray-400">
                        Subtotal:{" "}
                        <span className="font-bold text-white">
                          ${(unitPrice * modalCantidad).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={addToCart}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-[#DC2626] px-6 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#DC2626]/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#DC2626]/40 active:scale-95"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Package className="size-5" />
                    Agregar al carrito
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setCartOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative flex w-full max-w-md flex-col bg-zinc-950/95 border-l border-white/10 shadow-2xl backdrop-blur-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
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
                  <motion.div
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ShoppingCart className="size-12 text-zinc-700" />
                    <p className="mt-4 font-sans text-sm text-gray-500">
                      Tu carrito está vacío
                    </p>
                    <p className="mt-1 font-sans text-xs text-gray-600">
                      Agrega productos para empezar
                    </p>
                  </motion.div>
                ) : (
                  <motion.ul
                    className="space-y-4"
                    variants={staggerCard}
                    initial="hidden"
                    animate="visible"
                  >
                    {cart.map((item) => (
                      <motion.li
                        key={item.cartKey}
                        variants={cardItem}
                        className="flex items-center gap-4 rounded-xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-900/5"
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
                            className="inline-flex size-7 items-center justify-center rounded-full border border-zinc-700/50 text-gray-300 transition-colors hover:bg-zinc-700 hover:text-white"
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
                            className="inline-flex size-7 items-center justify-center rounded-full border border-zinc-700/50 text-gray-300 transition-colors hover:bg-zinc-700 hover:text-white"
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
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>

              {cart.length > 0 && (
                <motion.div
                  className="border-t border-zinc-800 px-6 py-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
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
                    className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 font-sans text-base font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#25D366]/40 active:scale-95"
                  >
                    <MessageCircle className="size-5" />
                    Enviar pedido por WhatsApp
                  </a>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
