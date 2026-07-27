"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Megaphone,
  ImageIcon,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { authClient } from "../../lib/auth-client";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    label: "Inventario",
    href: "/admin/insumos",
    icon: Package,
  },
  {
    label: "Publicaciones",
    href: "/admin/publicaciones",
    icon: Megaphone,
  },
  {
    label: "Generador IA",
    href: "/admin/imagenes",
    icon: ImageIcon,
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  const isActive = (href: string) => {
    if (href === "/admin") return currentPath === href;
    return currentPath.startsWith(href);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-xl p-2.5"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 h-screen w-64
          bg-zinc-900/80 backdrop-blur-xl border-r border-white/10
          flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/logotpo-activa.png"
              alt="Activa Medios"
              className="w-8 h-8 rounded-lg"
            />
            <div>
              <h2 className="text-sm font-semibold text-white">Activa Medios</h2>
              <p className="text-[10px] text-zinc-500">Panel de administración</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                  transition-all duration-200
                  ${
                    active
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <item.icon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 w-full transition-all duration-200"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
