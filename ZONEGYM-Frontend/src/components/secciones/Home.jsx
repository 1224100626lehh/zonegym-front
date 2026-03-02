import React, { useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const navigate = useNavigate();

  // DEMO: progreso de renovación (antes estaba sumando por clic)
  // aquí lo dejamos como "avance demo" para que se vea la barra
  const [progreso, setProgreso] = useState(58); // cámbialo si quieres

  const progresoTxt = useMemo(() => `${progreso}%`, [progreso]);

  // ✅ Botones (demo) + listos para backend
  const irReto = () => navigate("/reto");
  const irHorarios = () => navigate("/horarios");

  const renovarDemo = async () => {
    // DEMO: suma 7% cada vez hasta 100
    setProgreso((p) => Math.min(100, p + 7));

    // BACKEND (ejemplo):
    // await api.post("/renovacion/intento", { motivo: "banner_renovar" })
    // const { data } = await api.get("/renovacion/mes")
    // setProgreso(data.porcentaje)
  };

  return (
    <motion.section
      style={styles.section}
      initial={{ opacity: 0, y: 16, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div style={styles.overlay} />

      <motion.div
        style={styles.container}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
      >
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
        >
          NO SE TRATA DE EMPEZAR.
          <br />
          <span style={styles.titleAccent}>SE TRATA DE CONTINUAR.</span>
        </motion.h1>

        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
        >
          En ZoneGym no vendemos “motivación barata”. Diseñamos constancia:
          horarios claros, clases que te enganchan y un reto mensual que te
          empuja.
        </motion.p>

        {/* Acciones principales */}
        <motion.div
          style={styles.actions}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
        >
          <button style={styles.btnPrimary} onClick={irReto}>
            Ver reto del mes
          </button>
          <button style={styles.btnGhost} onClick={irHorarios}>
            Ver horarios
          </button>
          <button style={styles.btnGhost2} onClick={renovarDemo}>
            Renovar
          </button>
        </motion.div>

        {/* Mensaje motivacional */}
        <motion.div
          style={styles.msgCard}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.45 }}
        >
          <div style={styles.msgTitle}>Mensaje motivacional</div>
          <div style={styles.msgText}>
            “Hoy no entrenas por el cuerpo que quieres, entrenas por la persona
            en la que te estás convirtiendo. Un día cuenta. Una semana
            construye. Un mes te transforma. No falles dos veces seguidas.”
          </div>
        </motion.div>

        {/* Barra (como antes) */}
        <motion.div
          style={styles.progressWrap}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.45 }}
        >
          <div style={styles.progressHeader}>
            <span style={styles.progressLabel}>Meta de renovación mensual</span>
            <span style={styles.progressPct}>{progresoTxt}</span>
          </div>

          <div style={styles.progressBar}>
            <motion.div
              style={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progreso}%` }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          </div>

          <div style={styles.progressHint}>
            Micro-objetivo: 3 días fijos por semana. Si lo agendas, lo cumples.
            Si lo cumples, renuevas.
          </div>
        </motion.div>

        {/* Tarjetas abajo */}
        <motion.div
          style={styles.cards}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.45 }}
        >
          <Card
            title="⚡ Plan sencillo"
            text="3 días por semana (mínimo). Mejor poco constante que mucho y abandonar."
            onClick={() => navigate("/paquetes")}
          />
          <Card
            title="🕒 Horarios reales"
            text="Opciones mañana/tarde/noche para que el gym encaje en tu vida."
            onClick={irHorarios}
          />
          <Card
            title="🏁 Reto del mes"
            text="12 entrenamientos/mes para crear hábito y aumentar renovación."
            onClick={irReto}
          />
          <Card
            title="🤝 Comunidad"
            text="La gente vuelve cuando se siente acompañada y ve progreso."
            onClick={() => navigate("/testimonios")}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function Card({ title, text, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      style={styles.card}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18 }}
    >
      <div style={styles.cardTitle}>{title}</div>
      <div style={styles.cardText}>{text}</div>
      <div style={styles.cardMini}>Click para ver</div>
    </motion.button>
  );
}

const styles = {
  section: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    padding: "110px 20px 90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // ✅ FOTO INCLUIDA (puedes cambiarla por otra URL)
    backgroundImage:
      'url("https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=2400&auto=format&fit=crop")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.78) 45%, rgba(0,0,0,.88) 100%)",
  },
  container: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "1100px",
    color: "#fff",
    textAlign: "center",
  },

  title: {
    fontSize: "44px",
    fontWeight: 900,
    lineHeight: 1.04,
    marginBottom: "12px",
  },
  titleAccent: {
    color: "#f97316",
    textShadow: "0 0 18px rgba(249,115,22,.35)",
  },
  subtitle: {
    opacity: 0.9,
    maxWidth: "820px",
    margin: "0 auto 18px",
    lineHeight: 1.5,
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    padding: "12px 16px",
    borderRadius: "999px",
    border: 0,
    fontWeight: 900,
    cursor: "pointer",
    background: "#f97316",
    color: "#111",
  },
  btnGhost: {
    padding: "12px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.25)",
    fontWeight: 900,
    cursor: "pointer",
    background: "rgba(0,0,0,.20)",
    color: "#fff",
  },
  btnGhost2: {
    padding: "12px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.16)",
    fontWeight: 900,
    cursor: "pointer",
    background: "rgba(255,255,255,.08)",
    color: "#fff",
  },

  msgCard: {
    margin: "18px auto 14px",
    maxWidth: "760px",
    textAlign: "left",
    background: "rgba(0,0,0,.33)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: "16px",
    padding: "16px 18px",
    backdropFilter: "blur(10px)",
  },
  msgTitle: { fontWeight: 900, marginBottom: "6px" },
  msgText: { opacity: 0.9, lineHeight: 1.45 },

  progressWrap: {
    margin: "10px auto 0",
    maxWidth: "900px",
    textAlign: "left",
    background: "rgba(0,0,0,.28)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: "16px",
    padding: "14px 16px",
    backdropFilter: "blur(10px)",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  progressLabel: { fontWeight: 900, opacity: 0.95 },
  progressPct: { fontWeight: 900, opacity: 0.95 },
  progressBar: {
    height: "10px",
    borderRadius: "999px",
    background: "rgba(255,255,255,.18)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "#f97316",
    boxShadow: "0 0 18px rgba(249,115,22,.45)",
  },
  progressHint: { marginTop: "8px", fontSize: "12px", opacity: 0.85 },

  cards: {
    marginTop: "18px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  },
  card: {
    textAlign: "left",
    padding: "16px 16px 14px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(0,0,0,.28)",
    color: "#fff",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
  },
  cardTitle: { fontWeight: 900, marginBottom: "6px" },
  cardText: { opacity: 0.9, lineHeight: 1.35, marginBottom: "10px" },
  cardMini: { fontSize: "12px", opacity: 0.75 },
};
