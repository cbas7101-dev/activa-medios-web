"use client";

import { useState } from "react";
import {
  GripVertical,
  MoreHorizontal,
  Clock,
  Zap,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  service: string;
  status: "Frío" | "Medio" | "Caliente";
  nextAction: string;
  date: string;
  whatsapp: string;
  email: string;
  image: string;
  avatarUrl: string;
}

interface Column {
  id: string;
  title: string;
  subtitle: string;
  leads: Lead[];
  color: string;
  neonBorder: string;
}

const initialData: Column[] = [
  {
    id: "frio",
    title: "Nuevo Lead",
    subtitle: "Frío — Sin calificar",
    color: "blue",
    neonBorder: "border-t-blue-500 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]",
    leads: [
      {
        id: "1", name: "Roberto Mendoza", service: "Lona Impresa", status: "Frío",
        nextAction: "Llamar mañana", date: "2026-07-27",
        whatsapp: "+593 99 111 2233", email: "roberto@email.com",
        image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Roberto+Mendoza&background=1e3a5f&color=fff&size=40",
      },
      {
        id: "2", name: "Lucía Fernández", service: "Tarjetas", status: "Frío",
        nextAction: "Enviar cotización", date: "2026-07-26",
        whatsapp: "+593 98 222 3344", email: "lucia@email.com",
        image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Lucia+Fernandez&background=1e3a5f&color=fff&size=40",
      },
      {
        id: "3", name: "Diego Castro", service: "Insumos", status: "Frío",
        nextAction: "Calificar interés", date: "2026-07-25",
        whatsapp: "+593 97 333 4455", email: "diego@email.com",
        image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Diego+Castro&background=1e3a5f&color=fff&size=40",
      },
    ],
  },
  {
    id: "medio",
    title: "IA Calificando",
    subtitle: "Medio — En análisis",
    color: "amber",
    neonBorder: "border-t-amber-500 shadow-[0_0_15px_-5px_rgba(245,158,11,0.3)]",
    leads: [
      {
        id: "4", name: "María López", service: "Rótulo 3D", status: "Medio",
        nextAction: "Enviar portafolio", date: "2026-07-27",
        whatsapp: "+593 99 123 4567", email: "maria@email.com",
        image: "https://images.unsplash.com/photo-1633376047516-9d0b6f7b10b2?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Maria+Lopez&background=5c3d0e&color=fff&size=40",
      },
      {
        id: "5", name: "Pedro Sánchez", service: "Rótulo 3D", status: "Medio",
        nextAction: "Agendar videollamada", date: "2026-07-26",
        whatsapp: "+593 96 543 2109", email: "pedro@email.com",
        image: "https://images.unsplash.com/photo-1633376047516-9d0b6f7b10b2?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Pedro+Sanchez&background=5c3d0e&color=fff&size=40",
      },
    ],
  },
  {
    id: "caliente",
    title: "Cotización Enviada",
    subtitle: "Caliente — Listo para cerrar",
    color: "red",
    neonBorder: "border-t-red-500 shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]",
    leads: [
      {
        id: "6", name: "Ana García", service: "Lona Impresa", status: "Caliente",
        nextAction: "Seguimiento mañana", date: "2026-07-27",
        whatsapp: "+593 97 654 3210", email: "ana@email.com",
        image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Ana+Garcia&background=7f1d1d&color=fff&size=40",
      },
      {
        id: "7", name: "Carlos Ruiz", service: "Insumos", status: "Caliente",
        nextAction: "Cerrar venta", date: "2026-07-25",
        whatsapp: "+593 98 765 4321", email: "carlos@email.com",
        image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Carlos+Ruiz&background=7f1d1d&color=fff&size=40",
      },
    ],
  },
  {
    id: "negociacion",
    title: "En Negociación",
    subtitle: "Caliente — Cerrando trato",
    color: "purple",
    neonBorder: "border-t-purple-500 shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)]",
    leads: [
      {
        id: "8", name: "Sofía Martínez", service: "Tarjetas", status: "Caliente",
        nextAction: "Enviar contrato", date: "2026-07-24",
        whatsapp: "+593 95 432 1098", email: "sofia@email.com",
        image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Sofia+Martinez&background=3b0764&color=fff&size=40",
      },
    ],
  },
  {
    id: "cerrado",
    title: "Cerrado",
    subtitle: "Venta concretada",
    color: "emerald",
    neonBorder: "border-t-emerald-500 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]",
    leads: [
      {
        id: "9", name: "Jorge Torres", service: "Rótulo 3D", status: "Caliente",
        nextAction: "Programar instalación", date: "2026-07-22",
        whatsapp: "+593 94 321 0987", email: "jorge@email.com",
        image: "https://images.unsplash.com/photo-1633376047516-9d0b6f7b10b2?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Jorge+Torres&background=064e3b&color=fff&size=40",
      },
      {
        id: "10", name: "Valeria Ortiz", service: "Lona Impresa", status: "Medio",
        nextAction: "Entregar pedido", date: "2026-07-20",
        whatsapp: "+593 93 210 9876", email: "valeria@email.com",
        image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=200&fit=crop",
        avatarUrl: "https://ui-avatars.com/api/?name=Valeria+Ortiz&background=064e3b&color=fff&size=40",
      },
    ],
  },
];

const statusColors: Record<string, string> = {
  Frío: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Medio: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Caliente: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusDot: Record<string, string> = {
  Frío: "bg-blue-500",
  Medio: "bg-amber-500",
  Caliente: "bg-red-500",
};

function KanbanCard({
  lead,
  onDragStart,
  onDelete,
}: {
  lead: Lead;
  onDragStart: (e: React.DragEvent, lead: Lead, colId: string) => void;
  onDelete: (id: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead, "")}
      className="bg-zinc-800/90 border border-white/10 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing hover:border-white/25 hover:shadow-lg transition-all group"
    >
      <div className="relative h-24 overflow-hidden bg-zinc-700">
        <img
          src={lead.image}
          alt={lead.service}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/90 via-zinc-800/30 to-transparent" />
        <button
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
          className="absolute top-2 right-2 p-1 rounded-lg bg-black/40 text-zinc-400 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal size={14} />
        </button>
        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute right-2 top-10 z-20 bg-zinc-800 border border-white/10 rounded-xl p-1 min-w-[120px] shadow-xl">
              <button
                onClick={() => { onDelete(lead.id); setShowMenu(false); }}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </>
        )}
        <div className="absolute bottom-2 left-2.5 flex items-center gap-2">
          <img
            src={lead.avatarUrl}
            alt={lead.name}
            className="w-6 h-6 rounded-full ring-2 ring-zinc-800"
          />
          <span className="text-xs font-semibold text-white drop-shadow-lg">
            {lead.name}
          </span>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-zinc-400">{lead.service}</p>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusColors[lead.status]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[lead.status]}`} />
            {lead.status}
          </span>
        </div>

        <div className="flex items-start gap-2 mt-2.5 pt-2.5 border-t border-white/5">
          <Zap size={12} className="text-amber-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              {lead.nextAction}
            </p>
            <p className="text-[10px] text-zinc-600 mt-1 flex items-center gap-1">
              <Clock size={10} />
              {lead.date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [search, setSearch] = useState("");
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string>("");

  const handleDragStart = (e: React.DragEvent, lead: Lead, colId: string) => {
    setDraggedLead(lead);
    const parentCol = columns.find((c) => c.leads.some((l) => l.id === lead.id));
    if (parentCol) setDraggedFrom(parentCol.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (targetColId: string) => {
    if (!draggedLead || draggedFrom === targetColId) return;
    setColumns((prev) => {
      const next = prev.map((col) => ({
        ...col,
        leads: col.leads.filter((l) => l.id !== draggedLead.id),
      }));
      const targetCol = next.find((c) => c.id === targetColId);
      if (targetCol) {
        const updatedLead = { ...draggedLead };
        if (targetColId === "frio") updatedLead.status = "Frío";
        else if (targetColId === "medio") updatedLead.status = "Medio";
        else updatedLead.status = "Caliente";
        targetCol.leads = [...targetCol.leads, updatedLead];
      }
      return next;
    });
    setDraggedLead(null);
    setDraggedFrom("");
  };

  const handleDelete = (id: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        leads: col.leads.filter((l) => l.id !== id),
      }))
    );
  };

  const filteredColumns = columns.map((col) => ({
    ...col,
    leads: search
      ? col.leads.filter(
          (l) =>
            l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.service.toLowerCase().includes(search.toLowerCase())
        )
      : col.leads,
  }));

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Embudo de Ventas</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Arrastra las tarjetas entre columnas para actualizar el estado
          </p>
        </div>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar lead..."
            className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 pl-9 text-white text-sm w-64 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory">
        {filteredColumns.map((col) => {
          const totalInCol = columns.find((c) => c.id === col.id)?.leads.length ?? 0;
          return (
            <div
              key={col.id}
              className="flex-shrink-0 w-72 snap-start"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.id)}
            >
              <div
                className={`rounded-xl border border-t-2 ${col.neonBorder} bg-zinc-900/60 backdrop-blur-sm`}
              >
                <div className="px-3.5 py-3 border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                      {col.title}
                    </h3>
                    <span className="text-xs font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
                      {totalInCol}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{col.subtitle}</p>
                </div>

                <div className="p-2.5 space-y-2.5 min-h-[160px]">
                  {col.leads.length === 0 ? (
                    <div className="flex items-center justify-center h-24 rounded-lg border border-dashed border-white/5 bg-white/[0.02]">
                      <p className="text-xs text-zinc-600">Arrastra leads aquí</p>
                    </div>
                  ) : (
                    col.leads.map((lead) => (
                      <KanbanCard
                        key={lead.id}
                        lead={lead}
                        onDragStart={handleDragStart}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
