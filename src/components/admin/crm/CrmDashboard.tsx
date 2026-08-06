"use client";

import { useState } from "react";
import {
  Users,
  TrendingUp,
  MessageSquare,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Phone,
  Globe,
  MessageCircle,
  Target,
} from "lucide-react";

const kpiData = [
  {
    label: "Nuevos Leads (Hoy)",
    value: 12,
    change: 23,
    icon: Users,
    color: "blue",
    glow: "hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.25)]",
  },
  {
    label: "Tasa de Conversión IA",
    value: "68%",
    change: 5,
    icon: Target,
    color: "emerald",
    glow: "hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.25)]",
  },
  {
    label: "Chats Activos",
    value: 8,
    change: -2,
    icon: MessageSquare,
    color: "amber",
    glow: "hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.25)]",
  },
  {
    label: "Ventas Cerradas",
    value: 24,
    change: 12,
    icon: DollarSign,
    color: "purple",
    glow: "hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.25)]",
  },
];

const weeklyTrend = [
  { day: "Lun", leads: 8 },
  { day: "Mar", leads: 12 },
  { day: "Mié", leads: 6 },
  { day: "Jue", leads: 15 },
  { day: "Vie", leads: 10 },
  { day: "Sáb", leads: 5 },
  { day: "Dom", leads: 3 },
];

const leadOrigins = [
  { name: "WhatsApp", value: 45, color: "bg-emerald-500", bar: "from-emerald-500 to-emerald-400" },
  { name: "Web", value: 30, color: "bg-blue-500", bar: "from-blue-500 to-blue-400" },
  { name: "Facebook", value: 25, color: "bg-indigo-500", bar: "from-indigo-500 to-indigo-400" },
];

const recentLeads = [
  { name: "María López", service: "Rótulo 3D", status: "Caliente", whatsapp: "+593 99 123 4567", date: "Hoy 10:30" },
  { name: "Carlos Ruiz", service: "Insumos", status: "Frío", whatsapp: "+593 98 765 4321", date: "Hoy 09:15" },
  { name: "Ana García", service: "Lona Impresa", status: "Medio", whatsapp: "+593 97 654 3210", date: "Ayer 18:45" },
  { name: "Pedro Sánchez", service: "Rótulo 3D", status: "Caliente", whatsapp: "+593 96 543 2109", date: "Ayer 16:30" },
  { name: "Sofía Martínez", service: "Tarjetas", status: "Medio", whatsapp: "+593 95 432 1098", date: "Ayer 14:00" },
];

const iconBg: Record<string, string> = {
  blue: "from-blue-600/20 to-blue-500/5",
  emerald: "from-emerald-600/20 to-emerald-500/5",
  amber: "from-amber-600/20 to-amber-500/5",
  purple: "from-purple-600/20 to-purple-500/5",
};

const iconBorder: Record<string, string> = {
  blue: "border-blue-500/20",
  emerald: "border-emerald-500/20",
  amber: "border-amber-500/20",
  purple: "border-purple-500/20",
};

const statusColor: Record<string, string> = {
  Frío: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Medio: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Caliente: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusDot: Record<string, string> = {
  Frío: "bg-blue-500",
  Medio: "bg-amber-500",
  Caliente: "bg-red-500",
};

function TrendingSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 64;
  const h = 24;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0 opacity-60">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CrmDashboard() {
  const [period, setPeriod] = useState<"7d" | "30d">("7d");

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard CRM</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Panel de control de ventas y leads
          </p>
        </div>
        <div className="flex gap-1 bg-zinc-800/50 border border-white/10 rounded-xl p-1">
          {(["7d", "30d"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                period === p
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {p === "7d" ? "Últimos 7 días" : "Últimos 30 días"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          const isUp = kpi.change > 0;
          return (
            <div
              key={kpi.label}
              className={`group relative bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-300 ${kpi.glow} hover:border-white/20 hover:-translate-y-0.5`}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${iconBg[kpi.color]} border ${iconBorder[kpi.color]} flex items-center justify-center`}
                  >
                    <Icon size={20} className={`text-${kpi.color}-400`} />
                  </div>
                  <TrendingSparkline data={[3, 7, 4, 9, 6, 12, kpi.value as number]} />
                </div>
                <p className="text-sm text-zinc-400 mb-1.5">{kpi.label}</p>
                <span className="text-3xl font-bold text-white tracking-tight">
                  {kpi.value}
                </span>
                <div className="flex items-center gap-1.5 mt-2 text-xs">
                  {isUp ? (
                    <ArrowUp size={12} className="text-emerald-400" />
                  ) : (
                    <ArrowDown size={12} className="text-red-400" />
                  )}
                  <span className={isUp ? "text-emerald-400 font-medium" : "text-red-400 font-medium"}>
                    {Math.abs(kpi.change)}%
                  </span>
                  <span className="text-zinc-600">vs periodo anterior</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-white">Tendencia de Leads</h2>
            <div className="flex items-center gap-2 text-[10px] text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Leads esta semana
            </div>
          </div>
          <div className="h-52 flex items-end gap-2">
            {weeklyTrend.map((item) => {
              const maxVal = Math.max(...weeklyTrend.map((d) => d.leads));
              const height = (item.leads / maxVal) * 100;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-zinc-500 font-medium">{item.leads}</span>
                  <div className="w-full rounded-xl bg-emerald-500/10 relative overflow-hidden" style={{ height: "100%" }}>
                    <div
                      className="absolute bottom-0 w-full rounded-xl bg-gradient-to-t from-emerald-500 to-emerald-400 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-500">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
          <h2 className="text-sm font-semibold text-white mb-5">
            Orígenes de Leads
          </h2>
          <div className="flex flex-col gap-4">
            {leadOrigins.map((origin) => {
              const Icon =
                origin.name === "WhatsApp"
                  ? Phone
                  : origin.name === "Web"
                  ? Globe
                  : MessageCircle;
              return (
                <div key={origin.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <Icon size={12} className="text-zinc-400" />
                      </div>
                      <span className="text-sm text-zinc-300">{origin.name}</span>
                    </div>
                    <span className="text-sm font-bold text-white">
                      {origin.value}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${origin.bar} transition-all duration-500 shadow-[0_0_6px_rgba(16,185,129,0.2)]`}
                      style={{ width: `${origin.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-center gap-5">
              <svg width="90" height="90" viewBox="0 0 36 36">
                {leadOrigins.map((origin, i) => {
                  const total = leadOrigins.reduce((s, o) => s + o.value, 0);
                  let offset = 0;
                  for (let j = 0; j < i; j++) offset += leadOrigins[j].value;
                  const pct = origin.value / total;
                  const circumference = 2 * Math.PI * 14;
                  const dash = circumference * pct;
                  const gap = circumference - dash;
                  const rot = (offset / total) * 360;
                  const colors = ["#10b981", "#3b82f6", "#6366f1"];
                  return (
                    <circle
                      key={origin.name}
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={colors[i]}
                      strokeWidth="3"
                      strokeDasharray={`${dash} ${gap}`}
                      strokeLinecap="round"
                      transform={`rotate(${rot - 90} 18 18)`}
                    />
                  );
                })}
              </svg>
              <div className="space-y-1.5">
                {leadOrigins.map((origin, i) => {
                  const colors = ["#10b981", "#3b82f6", "#6366f1"];
                  return (
                    <div key={origin.name} className="flex items-center gap-2 text-[11px]">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i] }} />
                      <span className="text-zinc-400">{origin.name}</span>
                      <span className="text-white font-medium">{origin.value}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
        <h2 className="text-sm font-semibold text-white mb-4">
          Leads Recientes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-zinc-500 border-b border-white/10">
                <th className="text-left py-3 px-3 font-medium">Nombre</th>
                <th className="text-left py-3 px-3 font-medium">Contacto</th>
                <th className="text-left py-3 px-3 font-medium">Servicio</th>
                <th className="text-left py-3 px-3 font-medium">Estado</th>
                <th className="text-left py-3 px-3 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead) => (
                <tr key={lead.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-3 text-white font-medium">{lead.name}</td>
                  <td className="py-3.5 px-3 text-zinc-400">{lead.whatsapp}</td>
                  <td className="py-3.5 px-3 text-zinc-300">{lead.service}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusColor[lead.status]}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[lead.status]}`} />
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-zinc-500 text-xs">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
