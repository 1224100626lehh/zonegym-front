import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ navbarLinks = [] }) {
  return (
    <header className="bg-gradient-to-r from-red-700 to-red-900 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-extrabold tracking-tight">
          <span>🏋️</span>
          <span>ZoneGym Dolores Hidalgo</span>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden md:flex gap-2 text-sm">
            {navbarLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-full transition ${
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* ✅ Botón de inicio de sesión */}
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-sm font-bold"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>

      {/* Menú simple para móvil (si quieres luego lo hacemos hamburguesa) */}
      <div className="md:hidden px-4 pb-3 flex gap-2 overflow-x-auto">
        {navbarLinks.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded-full whitespace-nowrap transition ${
                isActive ? "bg-white/20" : "hover:bg-white/10"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
        <Link
          to="/login"
          className="px-3 py-2 rounded-full whitespace-nowrap bg-white/15 hover:bg-white/25 border border-white/20 font-bold"
        >
          Iniciar sesión
        </Link>
      </div>
    </header>
  );
}
