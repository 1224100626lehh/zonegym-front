import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuResponsivo({ open, navbarLinks = [], onClose }) {
  // ✅ si está cerrado, NO renderiza nada (evita barras duplicadas)
  if (!open) return null;

  const linkClass = ({ isActive }) =>
    [
      "block w-full text-left px-4 py-3 rounded-xl font-semibold transition",
      isActive ? "bg-white/15 border border-white/15" : "hover:bg-white/10",
    ].join(" ");

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Fondo oscuro */}
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Cerrar menú"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-neutral-950 text-white border-l border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-extrabold text-lg">Menú</div>
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          {navbarLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={linkClass}
              end={l.to === "/"}
              onClick={onClose}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </aside>
    </div>
  );
}
