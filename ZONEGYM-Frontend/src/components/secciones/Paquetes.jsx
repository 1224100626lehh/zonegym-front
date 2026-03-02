// src/components/secciones/Paquetes.jsx
import React, { useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

export default function Paquetes() {
  // ✅ Imagen de fondo (sin assets para evitar error)
  const gymBg =
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2400&auto=format&fit=crop";

  // Demo: "plan seleccionado" (listo para backend)
  const [selectedId, setSelectedId] = useState(null);
  const [toast, setToast] = useState("");

  const paquetes = useMemo(
    () => [
      {
        id: "mensual",
        titulo: "Mensual",
        desc: "Ideal para construir hábito. Acceso a clases por horario.",
        plus: ["Renovación: si completas el reto, obtienes beneficio."],
        cta: "Elegir mensual",
      },
      {
        id: "estudiante",
        titulo: "Estudiante",
        desc: "Horarios flexibles + clases dinámicas para mantener constancia.",
        plus: ["Plus: Pack reto mensual."],
        cta: "Elegir estudiante",
      },
      {
        id: "pareja",
        titulo: "Pareja",
        desc: "Entrenar acompañado ayuda a no abandonar. Ideal para constancia.",
        plus: ["Plus: Reto en dupla + recordatorio semanal (demo)."],
        cta: "Elegir pareja",
      },
      {
        id: "familiar",
        titulo: "Familiar",
        desc: "Para familias que quieren salud y disciplina juntos.",
        plus: ["Plus: Plan de 3 días fijos por familia (demo)."],
        cta: "Elegir familiar",
      },
    ],
    [],
  );

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(window.__zg_toast);
    window.__zg_toast = window.setTimeout(() => setToast(""), 2200);
  };

  // ✅ Botones funcionales (demo)
  const onElegir = (id, titulo) => {
    setSelectedId(id);
    showToast(`✅ Seleccionaste: ${titulo} (demo)`);
    // Aquí luego llamas backend:
    // POST /api/paquetes/seleccionar { paquete: id }
  };

  const onRenovar = () => {
    if (!selectedId) {
      showToast("⚠️ Primero elige un paquete");
      return;
    }
    showToast("💳 Renovación iniciada (demo). Listo para backend.");
    // Aquí luego backend:
    // POST /api/pagos/renovar { paquete: selectedId }
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
        key="paquetes"
        variants={page}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{
          minHeight: "calc(100vh - 70px)",
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.62), rgba(0,0,0,.88)), url(${gymBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "70px 0 90px",
        }}
      >
        <div style={{ width: "min(1100px, 92%)", margin: "0 auto" }}>
          {/* Encabezado */}
          <motion.div
            variants={card}
            custom={0}
            initial="hidden"
            animate="show"
          >
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "clamp(30px, 4vw, 44px)",
                marginBottom: 8,
                fontWeight: 900,
                letterSpacing: 0.2,
              }}
            >
              Membresías simples
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,.80)",
                textAlign: "center",
                marginBottom: 22,
              }}
            >
              Entre más fácil sea seguir, más probable es que renueves.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={card}
            custom={1}
            initial="hidden"
            animate="show"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 14,
              marginBottom: 16,
            }}
          >
            {paquetes.map((p, i) => {
              const isSelected = selectedId === p.id;

              return (
                <motion.div
                  key={p.id}
                  variants={card}
                  custom={i + 2}
                  initial="hidden"
                  animate="show"
                  whileHover={{ y: -4 }}
                  style={{
                    background: "rgba(255,255,255,.07)",
                    border: isSelected
                      ? "1px solid rgba(255,140,60,.55)"
                      : "1px solid rgba(255,255,255,.14)",
                    borderRadius: 14,
                    padding: 14,
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 18px 45px rgba(0,0,0,.35)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <h3 style={{ margin: 0, color: "white", fontWeight: 900 }}>
                      {p.titulo}
                    </h3>

                    {isSelected && (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 900,
                          color: "rgba(255,255,255,.92)",
                          background: "rgba(255,90,0,.22)",
                          border: "1px solid rgba(255,90,0,.35)",
                          padding: "4px 10px",
                          borderRadius: 999,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Seleccionado
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      color: "rgba(255,255,255,.78)",
                      margin: "10px 0 10px",
                    }}
                  >
                    {p.desc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    {p.plus.map((t, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          color: "rgba(255,255,255,.86)",
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 900,
                            background: "rgba(255,255,255,.10)",
                            border: "1px solid rgba(255,255,255,.16)",
                            padding: "3px 8px",
                            borderRadius: 999,
                          }}
                        >
                          Plus
                        </span>
                        <span style={{ lineHeight: 1.25 }}>{t}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onElegir(p.id, p.titulo)}
                    style={{
                      ...btnGhost,
                      width: "100%",
                      border: isSelected
                        ? "1px solid rgba(255,90,0,.55)"
                        : btnGhost.border,
                      background: isSelected
                        ? "rgba(255,90,0,.12)"
                        : btnGhost.background,
                    }}
                  >
                    {p.cta}
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA principal */}
          <motion.div
            variants={card}
            custom={10}
            initial="hidden"
            animate="show"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onRenovar}
              style={btnPrimary}
            >
              Renovar ahora
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                showToast("📌 Demo: promo aplicada (cuando haya backend)")
              }
              style={btnGhost}
            >
              Aplicar promo (demo)
            </motion.button>
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

/* ======= estilos inline (copiar/pegar) ======= */
const btnPrimary = {
  border: "none",
  padding: "10px 18px",
  borderRadius: 999,
  fontWeight: 900,
  color: "white",
  background: "linear-gradient(90deg, #ff7a18, #ff3d00)",
  boxShadow: "0 10px 24px rgba(255,90,0,.25)",
};

const btnGhost = {
  border: "1px solid rgba(255,255,255,.22)",
  padding: "10px 16px",
  borderRadius: 999,
  fontWeight: 900,
  color: "rgba(255,255,255,.92)",
  background: "rgba(255,255,255,.06)",
  backdropFilter: "blur(10px)",
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
  fontWeight: 900,
  zIndex: 9999,
};
