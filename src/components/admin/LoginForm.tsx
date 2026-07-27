"use client";

import { useState } from "react";
import { authClient } from "../../lib/auth-client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await authClient.signIn.email({
        email,
        password,
      });

      if (signInError) {
        setError("Credenciales incorrectas");
        return;
      }

      window.location.href = "/admin";
    } catch {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6">
      <div className="text-center mb-8">
        <img
          src="/logotpo-activa.png"
          alt="Activa Medios"
          className="w-16 h-16 mx-auto mb-4 rounded-2xl"
        />
        <h1 className="text-xl font-bold text-white">Panel de Administración</h1>
        <p className="text-sm text-zinc-500 mt-1">Activa Medios</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
            placeholder="admin@activamedios.ec"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
