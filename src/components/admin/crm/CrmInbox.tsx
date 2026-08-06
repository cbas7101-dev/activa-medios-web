"use client";

import { useState } from "react";
import {
  Search,
  Send,
  Phone,
  Mail,
  Sparkles,
  Bot,
  Clock,
} from "lucide-react";

interface Chat {
  id: string;
  name: string;
  initials: string;
  avatarUrl: string;
  lastMessage: string;
  time: string;
  unread: number;
  platform: "whatsapp" | "messenger" | "web";
  label: string;
  online: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "client" | "ai";
  time: string;
  avatarUrl?: string;
}

const chats: Chat[] = [
  { id: "c1", name: "María López", initials: "ML", avatarUrl: "https://ui-avatars.com/api/?name=Maria+Lopez&background=7f1d1d&color=fff&size=40", lastMessage: "¿Me pueden dar el precio del rótulo 3D?", time: "10:30", unread: 2, platform: "whatsapp", label: "Caliente", online: true },
  { id: "c2", name: "Carlos Ruiz", initials: "CR", avatarUrl: "https://ui-avatars.com/api/?name=Carlos+Ruiz&background=5c3d0e&color=fff&size=40", lastMessage: "Gracias, voy a revisar la cotización", time: "09:15", unread: 0, platform: "web", label: "Medio", online: false },
  { id: "c3", name: "Ana García", initials: "AG", avatarUrl: "https://ui-avatars.com/api/?name=Ana+Garcia&background=7f1d1d&color=fff&size=40", lastMessage: "Sí, me interesa la lona para el evento", time: "Ayer", unread: 1, platform: "whatsapp", label: "Caliente", online: true },
  { id: "c4", name: "Pedro Sánchez", initials: "PS", avatarUrl: "https://ui-avatars.com/api/?name=Pedro+Sanchez&background=5c3d0e&color=fff&size=40", lastMessage: "Ok, agendemos la llamada", time: "Ayer", unread: 0, platform: "messenger", label: "Medio", online: false },
  { id: "c5", name: "Sofía Martínez", initials: "SM", avatarUrl: "https://ui-avatars.com/api/?name=Sofia+Martinez&background=1e3a5f&color=fff&size=40", lastMessage: "¿Tienen tarjetas plastificadas?", time: "Ayer", unread: 3, platform: "whatsapp", label: "Frío", online: true },
  { id: "c6", name: "Diego Castro", initials: "DC", avatarUrl: "https://ui-avatars.com/api/?name=Diego+Castro&background=1e3a5f&color=fff&size=40", lastMessage: "Necesito insumos para mi negocio", time: "27/07", unread: 0, platform: "web", label: "Frío", online: false },
  { id: "c7", name: "Valeria Ortiz", initials: "VO", avatarUrl: "https://ui-avatars.com/api/?name=Valeria+Ortiz&background=5c3d0e&color=fff&size=40", lastMessage: "¿Cuánto tarda la entrega?", time: "26/07", unread: 1, platform: "whatsapp", label: "Medio", online: true },
];

const messages: Record<string, Message[]> = {
  c1: [
    { id: "m1", text: "Hola, buenos días. Quería consultar sobre el servicio de rótulos 3D.", sender: "client", time: "10:15", avatarUrl: "https://ui-avatars.com/api/?name=Maria+Lopez&background=7f1d1d&color=fff&size=40" },
    { id: "m2", text: "¡Hola María! Claro, con gusto te informamos. Nuestros rótulos 3D se fabrican en acrílico y pueden incluir iluminación LED. ¿Tienes un diseño en mente?", sender: "ai", time: "10:16" },
    { id: "m3", text: "Sí, tengo el logo de mi negocio. ¿Me pueden dar el precio?", sender: "client", time: "10:20", avatarUrl: "https://ui-avatars.com/api/?name=Maria+Lopez&background=7f1d1d&color=fff&size=40" },
    { id: "m4", text: "¡Por supuesto! El precio depende del tamaño y la complejidad. ¿De qué dimensiones lo necesitas?", sender: "ai", time: "10:21" },
    { id: "m5", text: "Sería de aproximadamente 60cm x 40cm", sender: "client", time: "10:25", avatarUrl: "https://ui-avatars.com/api/?name=Maria+Lopez&background=7f1d1d&color=fff&size=40" },
    { id: "m6", text: "Perfecto. Un rótulo 3D de 60x40cm en acrílico con instalación incluida tiene un valor de $120. ¿Te gustaría que te envié una cotización formal?", sender: "ai", time: "10:26" },
    { id: "m7", text: "Sí, por favor. ¿Me pueden dar el precio del rótulo 3D?", sender: "client", time: "10:30", avatarUrl: "https://ui-avatars.com/api/?name=Maria+Lopez&background=7f1d1d&color=fff&size=40" },
    { id: "m8", text: "¡Claro! Te he enviado la cotización a tu WhatsApp. Revísala y dime si tienes alguna duda.", sender: "user", time: "10:32" },
  ],
  c5: [
    { id: "sm1", text: "Hola, ¿venden tarjetas de presentación plastificadas?", sender: "client", time: "Ayer 16:45", avatarUrl: "https://ui-avatars.com/api/?name=Sofia+Martinez&background=1e3a5f&color=fff&size=40" },
    { id: "sm2", text: "¡Hola! Sí, trabajamos tarjetas plastificadas en varios acabados. ¿Cuántas unidades necesitas?", sender: "ai", time: "Ayer 16:46" },
    { id: "sm3", text: "Unas 500 unidades", sender: "client", time: "Ayer 16:50", avatarUrl: "https://ui-avatars.com/api/?name=Sofia+Martinez&background=1e3a5f&color=fff&size=40" },
    { id: "sm4", text: "Excelente. El precio para 500 tarjetas plastificadas a full color es de $45. ¿Quieres ver un diseño de muestra?", sender: "ai", time: "Ayer 16:51" },
  ],
};

const platformIcons: Record<string, string> = {
  whatsapp: "bg-emerald-500/20 text-emerald-400",
  messenger: "bg-blue-500/20 text-blue-400",
  web: "bg-purple-500/20 text-purple-400",
};

const platformLabels: Record<string, string> = {
  whatsapp: "WA",
  messenger: "FB",
  web: "Web",
};

const labelColors: Record<string, string> = {
  Frío: "bg-blue-500/20 text-blue-400",
  Medio: "bg-amber-500/20 text-amber-400",
  Caliente: "bg-red-500/20 text-red-400",
};

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.sender === "user";
  const isAi = msg.sender === "ai";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 items-end gap-2`}>
      {!isUser && (
        <div className="shrink-0 mb-1">
          {isAi ? (
            <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-500/30 flex items-center justify-center">
              <Bot size={14} className="text-purple-400" />
            </div>
          ) : (
            <img
              src={msg.avatarUrl || ""}
              alt=""
              className="w-7 h-7 rounded-full ring-1 ring-white/10"
            />
          )}
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-br-md shadow-lg shadow-emerald-600/20"
            : isAi
            ? "bg-zinc-800/90 border border-purple-500/20 text-zinc-200 rounded-bl-md shadow-lg shadow-purple-500/5"
            : "bg-zinc-800/50 border border-white/10 text-zinc-200 rounded-bl-md"
        }`}
      >
        {isAi && (
          <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-purple-500/10">
            <Bot size={11} className="text-purple-400" />
            <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">
              IA · Asistente
            </span>
          </div>
        )}
        <p className="text-[13px]">{msg.text}</p>
        <p className="text-[10px] text-zinc-500 mt-1.5 text-right">{msg.time}</p>
      </div>
    </div>
  );
}

export default function CrmInbox() {
  const [selectedChat, setSelectedChat] = useState<string>("c1");
  const [aiAuto, setAiAuto] = useState(true);
  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>(messages);
  const [searchTerm, setSearchTerm] = useState("");

  const currentChat = chats.find((c) => c.id === selectedChat);
  const currentMessages = chatMessages[selectedChat] || [];

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = () => {
    if (!inputText.trim() || !selectedChat) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      text: inputText.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }),
    };
    setChatMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }));
    setInputText("");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Inbox Inteligente</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Bandeja unificada de conversaciones con clientes
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Left panel - Chat list */}
        <div className="lg:w-72 shrink-0 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar conversación..."
                className="w-full bg-zinc-800/80 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => {
              const isSelected = selectedChat === chat.id;
              const hasUnread = chat.unread > 0;
              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full text-left px-3 py-3 border-b border-white/5 transition-all ${
                    isSelected
                      ? "bg-emerald-600/10 border-l-2 border-l-emerald-500"
                      : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="relative shrink-0">
                      <img
                        src={chat.avatarUrl}
                        alt={chat.name}
                        className="w-10 h-10 rounded-full ring-1 ring-white/10"
                      />
                      {chat.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-900" />
                      )}
                      <span
                        className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold border-2 border-zinc-900 ${platformIcons[chat.platform]}`}
                      >
                        {platformLabels[chat.platform]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-sm font-medium truncate ${hasUnread ? "text-white" : "text-zinc-300"}`}>
                          {chat.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 shrink-0">{chat.time}</span>
                      </div>
                      <p className={`text-xs truncate mt-0.5 ${hasUnread ? "text-zinc-300 font-medium" : "text-zinc-500"}`}>
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${labelColors[chat.label]}`}>
                          {chat.label}
                        </span>
                        {hasUnread && (
                          <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center panel - Chat */}
        <div className="flex-1 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden min-w-0">
          {currentChat ? (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0 bg-zinc-900/80">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={currentChat.avatarUrl}
                      alt={currentChat.name}
                      className="w-9 h-9 rounded-full ring-1 ring-white/10"
                    />
                    {currentChat.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-900" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{currentChat.name}</h3>
                    <div className="flex items-center gap-1.5">
                      {currentChat.online && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                      <span className={`text-[10px] font-medium ${currentChat.online ? "text-emerald-400" : "text-zinc-500"}`}>
                        {currentChat.online ? "En línea ahora" : "Desconectado"}
                      </span>
                      <span className="text-zinc-600">·</span>
                      <span className={`text-[10px] font-medium ${currentChat.label === "Caliente" ? "text-red-400" : currentChat.label === "Medio" ? "text-amber-400" : "text-blue-400"}`}>
                        {currentChat.label}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-zinc-500">IA:</span>
                    <button
                      onClick={() => setAiAuto(!aiAuto)}
                      className={`relative w-10 h-5 rounded-full transition-all ${
                        aiAuto ? "bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                          aiAuto ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                    <span className={`font-semibold ${aiAuto ? "text-emerald-400" : "text-zinc-500"}`}>
                      {aiAuto ? "ON" : "OFF"}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="flex-1 overflow-y-auto p-4 space-y-1"
                style={{
                  backgroundImage: "radial-gradient(ellipse at top, rgba(99,102,241,0.03) 0%, transparent 60%)",
                }}
              >
                {currentMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-sm text-zinc-600">No hay mensajes en esta conversación</p>
                  </div>
                ) : (
                  <>
                    {currentMessages.map((msg) => (
                      <ChatMessage key={msg.id} msg={msg} />
                    ))}
                    <div className="text-center pt-3">
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-600 bg-zinc-800/50 px-3 py-1 rounded-full">
                        {aiAuto && currentMessages.length > 0 ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            La IA está lista para responder automáticamente
                          </>
                        ) : (
                          "Responde manualmente al cliente"
                        )}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="p-3 border-t border-white/10 shrink-0 bg-zinc-900/80">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-zinc-800/80 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl p-2.5 transition-all shadow-lg shadow-emerald-600/20"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-zinc-600">Selecciona una conversación</p>
            </div>
          )}
        </div>

        {/* Right panel - Client profile */}
        <div className="lg:w-72 shrink-0 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          {currentChat ? (
            <>
              <div className="p-5 pb-0 text-center">
                <div className="relative inline-block mb-3">
                  <img
                    src={currentChat.avatarUrl}
                    alt={currentChat.name}
                    className="w-16 h-16 rounded-full ring-2 ring-white/10 mx-auto"
                  />
                  {currentChat.online && (
                    <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-900" />
                  )}
                </div>
                <h3 className="text-sm font-semibold text-white">{currentChat.name}</h3>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <span className={`text-[10px] font-medium ${currentChat.label === "Caliente" ? "text-red-400" : currentChat.label === "Medio" ? "text-amber-400" : "text-blue-400"}`}>
                    {currentChat.label}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-[10px] text-zinc-500">
                    {currentChat.platform === "whatsapp" ? "WhatsApp" : currentChat.platform === "messenger" ? "Messenger" : "Web"}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2.5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5 text-sm text-zinc-400">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Phone size={12} className="text-zinc-500" />
                  </div>
                  <span className="truncate text-xs">+593 99 123 4567</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-zinc-400">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Mail size={12} className="text-zinc-500" />
                  </div>
                  <span className="truncate text-xs">cliente@email.com</span>
                </div>
              </div>

              <div className="p-5 pb-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative">
                    <Sparkles size={14} className="text-purple-400 relative z-10" />
                    <span className="absolute inset-0 animate-ping opacity-20">
                      <Sparkles size={14} className="text-purple-400" />
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                    Resumen de IA
                  </span>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-600/30 via-purple-500/20 to-purple-600/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                  <div className="relative bg-zinc-800/80 border border-purple-500/20 rounded-xl p-3.5">
                    <div className="flex items-start gap-2">
                      <Bot size={14} className="text-purple-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Cliente interesada en rótulos 3D para su negocio. Ha solicitado una
                          cotización específica de 60x40cm. Muestra alta intención de compra y
                          disposición a cerrar en los próximos días.
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-purple-400/70">
                          <span className="w-1 h-1 rounded-full bg-purple-400" />
                          Análisis generado en tiempo real
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-3">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Clasificación IA
                </span>
                <div className="mt-2.5 space-y-2">
                  <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white/[0.03]">
                    <span className="text-zinc-400">Intención de compra:</span>
                    <span className="text-emerald-400 font-semibold">Alta</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white/[0.03]">
                    <span className="text-zinc-400">Presupuesto estimado:</span>
                    <span className="text-white font-semibold">$120 - $200</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white/[0.03]">
                    <span className="text-zinc-400">Urgencia:</span>
                    <span className="text-amber-400 font-semibold">Media</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto p-5 pt-3 border-t border-white/10">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2.5 block">
                  Próxima acción sugerida
                </span>
                <div className="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                  <Clock size={14} className="text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Enviar cotización formal y agendar llamada de seguimiento para mañana.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full p-5">
              <p className="text-sm text-zinc-600 text-center">Selecciona un chat para ver el perfil</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
