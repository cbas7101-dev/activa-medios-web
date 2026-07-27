"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";

interface Publicacion {
  id: string;
  titulo: string;
  fechaPublicacion?: string;
  estado: string;
  submarca: string;
}

const submarcaColor = (s: string) => {
  switch (s) {
    case "aktiva-cursos": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "aktiva-store": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "activa-publicidad": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    default: return "bg-white/10 text-zinc-400 border-white/20";
  }
};

export default function Calendar() {
  const [posts, setPosts] = useState<Publicacion[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/publicaciones?estado=programada");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleDateString("es-EC", {
    month: "long",
    year: "numeric",
  });

  const getPostsForDay = (day: number) => {
    return posts.filter((p) => {
      if (!p.fechaPublicacion) return false;
      const d = new Date(p.fechaPublicacion);
      return (
        d.getFullYear() === year &&
        d.getMonth() === month &&
        d.getDate() === day
      );
    });
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <Megaphone size={16} className="text-zinc-500" />
          Calendario de publicaciones
        </h2>
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-white capitalize">{monthName}</span>
          <button onClick={nextMonth} className="text-zinc-400 hover:text-white transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-white/5 rounded-xl overflow-hidden">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
          <div key={d} className="bg-zinc-950 text-center text-[10px] text-zinc-500 py-2">
            {d}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-zinc-950 min-h-[80px]" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

          const dayPosts = getPostsForDay(day);

          return (
            <div
              key={day}
              className={`bg-zinc-950 min-h-[80px] p-1.5 ${
                isToday ? "ring-1 ring-blue-500/30" : ""
              }`}
            >
              <span
                className={`text-[10px] ${
                  isToday
                    ? "text-blue-400 font-bold"
                    : "text-zinc-500"
                }`}
              >
                {day}
              </span>
              <div className="mt-1 space-y-0.5">
                {dayPosts.slice(0, 3).map((p) => (
                  <a
                    key={p.id}
                    href={`/admin/publicaciones/${p.id}`}
                    className={`block text-[8px] px-1 py-0.5 rounded border truncate ${submarcaColor(p.submarca)}`}
                  >
                    {p.titulo}
                  </a>
                ))}
                {dayPosts.length > 3 && (
                  <p className="text-[8px] text-zinc-600 px-1">+{dayPosts.length - 3} más</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
