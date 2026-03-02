import React from "react";
import { useNavigate } from "react-router-dom";

export default function Banner({
  puntos = 0,
  ultimoMotivo = "-",
  onAccionInicio,
}) {
  const navigate = useNavigate();

  const accion = (ruta, delta, motivo) => {
    if (onAccionInicio) onAccionInicio(delta, motivo);
    navigate(ruta);
  };

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "75vh",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=2400&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Capa oscura ENCIMA de la imagen (para que se lea el texto) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.85) 70%, rgba(0,0,0,.92) 100%)",
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1100,
          margin: "0 auto",
          padding: "90px 16px 70px",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 900,
            lineHeight: 1.05,
          }}
        >
          NO SE TRATA DE EMPEZAR. <br />
          <span style={{ color: "#f97316" }}>SE TRATA DE CONTINUAR.</span>
        </h1>

        <p style={{ opacity: 0.85, marginTop: 14, maxWidth: 820 }}>
          En ZoneGym no vendemos “motivación barata”. Diseñamos constancia:
          horarios claros, clases que te enganchan y un reto mensual que te
          empuja.
        </p>

        {/* Botones */}
        <div
          style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          <button
            onClick={() => accion("/reto", 10, "banner_reto")}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "none",
              background: "#f97316",
              color: "white",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Ver reto del mes
          </button>

          <button
            onClick={() => accion("/horarios", 8, "banner_horarios")}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.18)",
              background: "rgba(255,255,255,.10)",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Ver horarios
          </button>

          <button
            onClick={() => accion("/paquetes", 6, "banner_renovar")}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.18)",
              background: "rgba(255,255,255,.10)",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Renovar
          </button>
        </div>

        {/* Barra */}
        <div
          style={{
            marginTop: 28,
            maxWidth: 900,
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 16,
            padding: 16,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <b>Meta de renovación mensual</b>
            <span style={{ opacity: 0.85 }}>
              {Math.max(0, Math.min(100, puntos))}%
            </span>
          </div>

          <div
            style={{
              height: 10,
              borderRadius: 999,
              background: "rgba(255,255,255,.14)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.max(0, Math.min(100, puntos))}%`,
                borderRadius: 999,
                background: "#f97316",
              }}
            />
          </div>

          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
            Cada interacción suma puntos. Último motivo: <b>{ultimoMotivo}</b>
          </div>
        </div>
      </div>
    </section>
  );
}
