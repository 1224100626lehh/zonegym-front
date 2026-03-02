import React from "react";

export default function Login() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold">Iniciar sesión</h2>
      <p className="text-white/70 mt-2">
        (Demo) Aquí después conectamos el backend.
      </p>

      <div className="mt-6 max-w-md bg-white/5 border border-white/10 rounded-2xl p-6">
        <label className="block text-sm mb-2">Correo</label>
        <input
          className="w-full rounded-xl px-4 py-2 bg-black/40 border border-white/10 outline-none"
          placeholder="tucorreo@ejemplo.com"
        />

        <label className="block text-sm mt-4 mb-2">Contraseña</label>
        <input
          type="password"
          className="w-full rounded-xl px-4 py-2 bg-black/40 border border-white/10 outline-none"
          placeholder="********"
        />

        <button className="mt-5 w-full px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold">
          Entrar
        </button>
      </div>
    </div>
  );
}
