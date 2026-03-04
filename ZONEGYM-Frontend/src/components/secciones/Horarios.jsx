// src/components/secciones/Horarios.jsx
import React, { useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Horarios() {
  const navigate = useNavigate();

  // ✅ Imagen de fondo (sin assets para evitar el error)
  const gymBg =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2400&auto=format&fit=crop";

  // Toast simple (demo)
  const [toast, setToast] = useState("");
  // 🔥 Detectar día actual
const hoy = new Date().toLocaleDateString("es-MX", { weekday: "long" });
const hoyCapitalizado = hoy.charAt(0).toUpperCase() + hoy.slice(1);

  const horas = useMemo(
    () => ["6:00 - 8:00", "9:00 - 11:00", "6:00 - 8:00 PM", "8:00 - 9:00 PM"],
    [],
  );

  // ✅ Horario (Sábado solo mañana 8:00am - 2:00pm => aquí lo reflejamos:
  // - Para sábado no mostramos columnas tarde/noche
  const data = useMemo(
    () => [
      {
        dia: "Lunes",
        "6:00 - 8:00": "Fuerza",
        "9:00 - 11:00": "Yoga",
        "6:00 - 8:00 PM": "Box",
        "8:00 - 9:00 PM": "Baile",
      },
      {
        dia: "Martes",
        "6:00 - 8:00": "Indoor Cycling",
        "9:00 - 11:00": "Movilidad",
        "6:00 - 8:00 PM": "Jumping",
        "8:00 - 9:00 PM": "Fuerza",
      },
      {
        dia: "Miércoles",
        "6:00 - 8:00": "Fuerza",
        "9:00 - 11:00": "Yoga",
        "6:00 - 8:00 PM": "Box",
        "8:00 - 9:00 PM": "Baile",
      },
      {
        dia: "Jueves",
        "6:00 - 8:00": "Indoor Cycling",
        "9:00 - 11:00": "Movilidad",
        "6:00 - 8:00 PM": "Jumping",
        "8:00 - 9:00 PM": "Fuerza",
      },
      {
        dia: "Viernes",
        "6:00 - 8:00": "Funcional",
        "9:00 - 11:00": "Yoga",
        "6:00 - 8:00 PM": "Clase especial (rotativa)",
        "8:00 - 9:00 PM": "-",
      },

      // ✅ SÁBADO (8:00am - 2:00pm)
      // Como tu tabla está por bloques fijos, lo dejamos SOLO con mañana
      // y en tarde/noche lo dejamos vacío con "-"
      {
        dia: "Sábado",
        "6:00 - 8:00": "Funcional (8:00 - 10:00 AM)",
        "9:00 - 11:00": "Jumping (10:30 - 12:00 PM)",
        "6:00 - 8:00 PM": "-",
        "8:00 - 9:00 PM": "-",
      },
    ],
    [],
  );

  const mostrarToast = (msg) => {
    setToast(msg);
    window.clearTimeout(window.__zg_toast);
    window.__zg_toast = window.setTimeout(() => setToast(""), 2200);
  };

  // Animaciones
  const page = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: 10,
      filter: "blur(6px)",
      transition: { duration: 0.25 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.08 * i, duration: 0.45, ease: "easeOut" },
    }),
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="horarios"
        variants={page}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{
          minHeight: "calc(100vh - 70px)",
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.65), rgba(0,0,0,.85)), url(${gymBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "70px 0 90px",
        }}
      >
        <div style={{ width: "min(1100px, 92%)", margin: "0 auto" }}>
          {/* TITULO */}
          <motion.div
            variants={card}
            custom={0}
            initial="hidden"
            animate="show"
          >
           <h1
  style={{
    textAlign: "center",
    fontSize: "clamp(30px, 4vw, 44px)",
    marginBottom: 8,
    fontWeight: 900,
    letterSpacing: 0.3,
    background: "linear-gradient(90deg, #ff7a18, #ff3d00, #ff7a18)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "glowMove 4s linear infinite, pulseGlow 3s ease-in-out infinite",
    textShadow: "0 0 20px rgba(255, 90, 0, 0.35)",
  }}
>
  Horarios que sí encajan
</h1>
            <p
              style={{
                color: "rgba(255,255,255,.80)",
                textAlign: "center",
                marginBottom: 22,
              }}
            >
              Mañana, tarde o noche. Cuando encaja en tu vida, no abandonas.
            </p>
          </motion.div>

          {/* BOTONES (con animación + hover/tap) */}
          <motion.div
            variants={card}
            custom={1}
            initial="hidden"
            animate="show"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 18,
            }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/classes")}
              style={btnPrimary}
            >
              Ver clases
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                mostrarToast("✅ Demo: horario guardado (cuando haya backend)")
              }
              style={btnGhost}
            >
              Guardar horario (demo)
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                mostrarToast("📌 Tip: Elige 3 días fijos para crear hábito")
              }
              style={btnGhost}
            >
              Elige 3 días fijos
            </motion.button>
          </motion.div>

          {/* TABLA */}
          <motion.div
            variants={card}
            custom={2}
            initial="hidden"
            animate="show"
            style={{
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: 14,
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              boxShadow: "0 18px 50px rgba(0,0,0,.35)",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: 820,
                }}
              >
                <thead>
                  <tr>
                    <th style={th}>Día</th>
                    {horas.map((h) => (
                      <th key={h} style={th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {data.map((row, idx) => (
                    <motion.tr
  key={row.dia}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{
    y: -4,
    scale: 1.01,
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  }}
  transition={{ delay: 0.06 * idx, duration: 0.35 }}
  style={{
    background:
      row.dia === hoyCapitalizado
        ? "rgba(255,122,24,.35)"
        : idx % 2 === 0
        ? "rgba(0,0,0,.20)"
        : "rgba(0,0,0,.10)",
    cursor: "pointer",
  }}
>
                    
                      <td style={tdDia}>{row.dia}</td>

                      {horas.map((h) => {
                        const val = row[h] ?? "-";
                        const isEmpty = val === "-" || val === "";

                        return (
                          <td key={h} style={td}>
                            <motion.button
                              whileHover={!isEmpty ? { scale: 1.03 } : {}}
                              whileTap={!isEmpty ? { scale: 0.98 } : {}}
                              disabled={isEmpty}
                              onClick={() =>
                                mostrarToast(
                                  `✅ Demo: Reservaste "${val}" (${row.dia}, ${h})`,
                                )
                              }
                              style={{
                                ...pill,
                                opacity: isEmpty ? 0.45 : 1,
                                cursor: isEmpty ? "not-allowed" : "pointer",
                              }}
                              title={
                                isEmpty
                                  ? "No hay clase en este horario"
                                  : "Demo: al tener backend se guardará la reserva"
                              }
                            >
                              {val}
                            </motion.button>
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: 14 }}>
              <p
                style={{
                  color: "rgba(255,255,255,.80)",
                  margin: 0,
                  fontSize: 13,
                }}
              >
                <b>Tip de retención:</b> Ejemplo: Lun–Mié–Vie o Mar–Jue–Sáb. Si
                lo agendas, lo cumples.
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,.70)",
                  margin: "6px 0 0",
                  fontSize: 12,
                }}
              >
                <b>Sábado:</b> Solo horario de <b>8:00am a 2:00pm</b>. Por eso
                no aparecen clases después.
              </p>
            </div>
          </motion.div>
        </div>

        {/* TOAST */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              style={toastStyle}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </AnimatePresence>
  );
}

/* ======= estilos inline (para que sea copiar/pegar) ======= */
const btnPrimary = {
  border: "none",
  padding: "10px 16px",
  borderRadius: 999,
  fontWeight: 800,
  color: "white",
  background: "linear-gradient(90deg, #ff7a18, #ff3d00)",
  boxShadow: "0 10px 24px rgba(255,90,0,.25)",
};

const btnGhost = {
  border: "1px solid rgba(255,255,255,.22)",
  padding: "10px 16px",
  borderRadius: 999,
  fontWeight: 800,
  color: "rgba(255,255,255,.92)",
  background: "rgba(255,255,255,.06)",
  backdropFilter: "blur(10px)",
};

const th = {
  textAlign: "left",
  padding: "14px 14px",
  color: "rgba(255,255,255,.85)",
  fontSize: 13,
  fontWeight: 900,
  background: "rgba(0,0,0,.35)",
  borderBottom: "1px solid rgba(255,255,255,.12)",
};

const tdDia = {
  padding: "14px 14px",
  color: "white",
  fontWeight: 900,
  borderBottom: "1px solid rgba(255,255,255,.08)",
  whiteSpace: "nowrap",
};

const td = {
  padding: "10px 12px",
  borderBottom: "1px solid rgba(255,255,255,.08)",
};

const pill = {
  width: "100%",
  border: "1px solid rgba(255,255,255,.14)",
  background: "rgba(0,0,0,.25)",
  color: "rgba(255,255,255,.92)",
  padding: "10px 10px",
  borderRadius: 12,
  fontWeight: 800,
  textAlign: "center",
};

const toastStyle = {
  position: "fixed",
  left: "50%",
  bottom: 18,
  transform: "translateX(-50%)",
  background: "rgba(0,0,0,.75)",
  color: "white",
  border: "1px solid rgba(255,255,255,.18)",
  padding: "10px 14px",
  borderRadius: 12,
  backdropFilter: "blur(10px)",
  fontWeight: 800,
  zIndex: 9999,
  
};

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes glowMove {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }

    @keyframes pulseGlow {
      0% { transform: scale(1); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}