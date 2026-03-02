import React, { useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Clases() {
  const navigate = useNavigate();

  // ✅ DEMO: para que se sienta interactivo (luego se conecta al backend)
  const [seleccion, setSeleccion] = useState(null);
  const [toast, setToast] = useState("");

  const clases = useMemo(
    () => [
      {
        id: "box",
        nombre: "Box",
        desc: "Alta energía, disciplina, quema calorías y libera estrés.",
        puntos: 6,
      },
      {
        id: "indoor",
        nombre: "Indoor Cycling",
        desc: "Cardio intenso con música. Ideal para completar el reto.",
        puntos: 6,
      },
      {
        id: "jumping",
        nombre: "Jumping",
        desc: "Diversión + cardio. Perfecto si te aburres en pesas.",
        puntos: 6,
      },
      {
        id: "yoga",
        nombre: "Yoga / movilidad",
        desc: "Recuperación y flexibilidad para evitar lesiones y no abandonar.",
        puntos: 6,
      },
      {
        id: "baile",
        nombre: "Baile",
        desc: "Ambiente social: si lo disfrutas, no lo sueltas.",
        puntos: 6,
      },
      {
        id: "fuerza",
        nombre: "Fuerza funcional",
        desc: "Rutinas completas para verte y sentirte fuerte en semanas.",
        puntos: 6,
      },
    ],
    [],
  );

  const reservar = async (clase) => {
    setSeleccion(clase.id);
    setToast(`✅ Reservaste: ${clase.nombre}`);

    // BACKEND (ejemplo):
    // await api.post("/reservas", { claseId: clase.id, fecha: "2026-03-02" })
    // await api.post("/progreso/sumar", { motivo: `clase_${clase.id}`, puntos: clase.puntos })

    // Quitar toast después de 2s
    setTimeout(() => setToast(""), 2000);
  };

  const verHorarios = () => navigate("/horarios");

  return (
    <motion.section
      style={styles.section}
      initial={{ opacity: 0, y: 16, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div style={styles.overlay} />

      <div style={styles.container}>
        {/* Header animado */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          style={styles.header}
        >
          <div style={styles.kicker}>
            Variedad = menos aburrimiento. Menos aburrimiento = más constancia =
            más renovación.
          </div>

          <motion.h1
            style={styles.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
          >
            Clases que te enganchan
          </motion.h1>

          <motion.p
            style={styles.subtitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
          >
            Elige una clase, reserva y mantén tu racha. (Demo: la reserva solo
            muestra interacción).
          </motion.p>

          <motion.div
            style={styles.headerActions}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
          >
            <button style={styles.btnGhost} onClick={verHorarios}>
              Ver horarios
            </button>
          </motion.div>
        </motion.div>

        {/* Toast */}
        {toast ? (
          <motion.div
            style={styles.toast}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {toast}
          </motion.div>
        ) : null}

        {/* Cards */}
        <motion.div
          style={styles.grid}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.45 }}
        >
          {clases.map((c, idx) => (
            <motion.div
              key={c.id}
              style={{
                ...styles.card,
                ...(seleccion === c.id ? styles.cardSelected : {}),
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + idx * 0.06,
                duration: 0.35,
                ease: "easeOut",
              }}
              whileHover={{ y: -5, scale: 1.01 }}
            >
              <div style={styles.cardTop}>
                <div style={styles.cardTitle}>{c.nombre}</div>
                <div style={styles.pill}>+{c.puntos} pts</div>
              </div>

              <div style={styles.cardDesc}>{c.desc}</div>

              <div style={styles.cardBottom}>
                <button style={styles.btnPrimary} onClick={() => reservar(c)}>
                  Reservar clase
                </button>

                <button
                  style={styles.btnMini}
                  onClick={() => {
                    setSeleccion(c.id);
                    setToast(
                      `ℹ️ Tips de ${c.nombre}: llega 10 min antes y elige horario fijo.`,
                    );
                    setTimeout(() => setToast(""), 2000);
                  }}
                >
                  Ver tips
                </button>
              </div>

              <div style={styles.cardHint}>
                (clic suma +{c.puntos} a retención) — demo
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

const styles = {
  section: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    padding: "110px 22px 90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    // ✅ FOTO DE FONDO INCLUIDA (cámbiala si quieres)
    backgroundImage:
      'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2400&auto=format&fit=crop")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,.60) 0%, rgba(0,0,0,.78) 45%, rgba(0,0,0,.90) 100%)",
  },
  container: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "1180px",
    color: "#fff",
  },

  header: {
    textAlign: "center",
    marginBottom: "18px",
  },
  kicker: {
    opacity: 0.9,
    fontSize: "13px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "44px",
    fontWeight: 900,
    margin: "0 0 8px",
    lineHeight: 1.05,
  },
  subtitle: {
    maxWidth: "820px",
    margin: "0 auto",
    opacity: 0.9,
    lineHeight: 1.5,
  },
  headerActions: { marginTop: "14px" },

  toast: {
    margin: "0 auto 14px",
    width: "fit-content",
    padding: "10px 14px",
    borderRadius: "999px",
    background: "rgba(0,0,0,.45)",
    border: "1px solid rgba(255,255,255,.18)",
    backdropFilter: "blur(10px)",
    fontWeight: 800,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "14px",
  },
  card: {
    borderRadius: "18px",
    padding: "16px",
    background: "rgba(0,0,0,.30)",
    border: "1px solid rgba(255,255,255,.14)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 12px 30px rgba(0,0,0,.25)",
    minHeight: "170px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardSelected: {
    border: "1px solid rgba(249,115,22,.55)",
    boxShadow: "0 0 22px rgba(249,115,22,.18)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  cardTitle: { fontSize: "20px", fontWeight: 900 },
  pill: {
    fontSize: "12px",
    fontWeight: 900,
    padding: "6px 10px",
    borderRadius: "999px",
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.14)",
  },
  cardDesc: { marginTop: "10px", opacity: 0.9, lineHeight: 1.35 },

  cardBottom: {
    marginTop: "14px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: 0,
    cursor: "pointer",
    fontWeight: 900,
    background: "#f97316",
    color: "#111",
  },
  btnGhost: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.22)",
    cursor: "pointer",
    fontWeight: 900,
    background: "rgba(0,0,0,.18)",
    color: "#fff",
  },
  btnMini: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.14)",
    cursor: "pointer",
    fontWeight: 900,
    background: "rgba(255,255,255,.08)",
    color: "#fff",
  },
  cardHint: { marginTop: "10px", fontSize: "12px", opacity: 0.75 },
};
