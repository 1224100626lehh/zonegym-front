import React, { useMemo, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";


export default function MiProgreso() {
  // DEMO: cuando haya backend, estos valores vendrán de API
  const objetivo = 30;
  const [completados, setCompletados] = useState(8);
  const [nivel, setNivel] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [racha, setRacha] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [beneficioRenovacion, setBeneficioRenovacion] = useState(false);

  const pct = useMemo(() => {
    const p = Math.round((completados / objetivo) * 100);
    return Math.max(0, Math.min(100, p));
  }, [completados, objetivo]);

  const faltan = Math.max(0, objetivo - completados);
  useEffect(() => {

  fetch(`http://localhost:5000/api/progreso/${completados}`)
    .then(res => res.json())
    .then(data => {
      setNivel(data.nivel);
      setDescripcion(data.descripcion);
    })
    .catch(err => console.log(err));

}, [completados]);
useEffect(() => {

  fetch("http://localhost:5000/api/streak")
    .then(res => res.json())
    .then(data => {
      setRacha(data.streak);
    });

}, []);

  // ✅ Handlers demo (luego los conectas al backend)
  const handleSumarEntrenamiento = async () => {

   const nuevoValor = Math.min(objetivo, completados + 1);

  setCompletados(nuevoValor);

  if(nuevoValor === objetivo){

    setShowConfetti(true);
    setBeneficioRenovacion(true);

    setTimeout(()=>{
      setShowConfetti(false);
    },5000);

  }

};

  const handleResetDemo = async () => {
    setCompletados(0);
    // BACKEND:
    // await api.post("/progreso/reset-demo")
  };

  const handleAgendar = async () => {
    // DEMO: solo alerta
    alert(
      "Demo: aquí después se abrirá agenda / reserva (cuando haya backend).",
    );
    // BACKEND:
    // navigate("/horarios") o abrir modal
  };
  const usarBeneficio = async () => {
  try {

    const res = await fetch("http://localhost:5000/api/beneficio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    if(data.ok){
      alert("🎉 Beneficio de membresía aplicado");
      setBeneficioRenovacion(false);
    }

  } catch(error){
    console.error("Error:", error);
  }
};
  return (
    
    <motion.section
      style={styles.section}
      initial={{ opacity: 0, y: 14, scale: 0.995 }}
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
        <h1 style={styles.title}> Meta en Marcha</h1>
        <h2 style={styles.level}>
         {nivel} - {descripcion}
        </h2>
        <div style={styles.streak}>
         🔥 Racha actual: {racha} días
        </div>
        <p style={styles.subtitle}>
          Ver tu avance te ayuda a no detenerte.{" "}
          <span style={{ opacity: 0.85 }}>
            (Fachada: sin cuenta, sin base de datos real.)
          </span>
        </p>

        {/* Barra */}
        <div style={styles.progressCard}>
          <div style={styles.progressHeader}>
            <span style={styles.progressLabel}>Progreso del mes</span>
            <span style={styles.badge}>
              {completados}/{objetivo} entrenamientos
            </span>
          </div>

          <div style={styles.progressBar}>
            <motion.div
              style={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          </div>

          <div style={styles.progressMsg}>
            Te faltan <b>{faltan}</b> para completar el reto. ¡Estás cerca del
            beneficio de renovación!
          </div>
          {completados === objetivo && (

           <div style={styles.felicidades}>
            🎉 Felicidades has completado {objetivo} días consecutivos
           </div>

           )}
           {beneficioRenovacion && (

          <div style={styles.beneficio}>
           💪 Has desbloqueado tu Beneficio de renovación**.
          </div>

          )}{beneficioRenovacion && (

           <button
           style={styles.btnRenovar}
           onClick={usarBeneficio}
          >
           Usar beneficio de renovación
          </button>

        )}

          {/* Botones */}
          <div style={styles.actions}>
            <button
              style={styles.btnPrimary}
              onClick={handleSumarEntrenamiento} 
              
              
            >
              +1 entrenamiento
            </button>

            <button style={styles.btnGhost} onClick={handleAgendar}>
              Agendar 3 días 
            </button>

            <button style={styles.btnDanger} onClick={handleResetDemo}>
              Reiniciar
            </button>
          </div>

          <div style={styles.hint}>
           
          </div>
        </div>

        {/* Cards */}
        <div style={styles.cards}>
          <motion.div
            style={styles.card}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.18 }}
          >
            <h3 style={styles.cardTitle}>Racha</h3>
            <p style={styles.cardText}>
              2 semanas seguidas cumpliendo 3 días. Eso crea hábito real.
            </p>
          </motion.div>

          <motion.div
            style={styles.card}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.18 }}
          >
            <h3 style={styles.cardTitle}>Logro</h3>
            <p style={styles.cardText}>
              “No fallé dos días seguidos” desbloqueado{" "}
              <span style={styles.check}>✅</span>
            </p>
          </motion.div>

          <motion.div
            style={styles.card}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.18 }}
          >
            <h3 style={styles.cardTitle}>Siguiente paso</h3>
            <p style={styles.cardText}>
              Agenda tus 3 días de la próxima semana (demo).
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}

const styles = {
  beneficio:{
 marginTop:"20px",
 fontSize:"20px",
 fontWeight:"800",
 color:"#22c55e",
 textAlign:"center"
},

btnRenovar:{
 marginTop:"10px",
 padding:"12px 18px",
 borderRadius:"999px",
 border:"none",
 background:"#22c55e",
 color:"#111",
 fontWeight:"900",
 cursor:"pointer"
},
  felicidades:{
 marginTop:"15px",
 fontSize:"22px",
 fontWeight:"900",
 color:"#22c55e",
 textAlign:"center"
},
  level: {
  fontSize: "22px",
  fontWeight: "800",
  color: "#f97316",
  marginBottom: "10px"
}, streak:{
 fontSize:"20px",
 fontWeight:"800",
 color:"#22c55e",
 marginBottom:"10px"
},

  section: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    padding: "120px 20px 90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2400&auto=format&fit=crop")',
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
  title: { fontSize: "34px", fontWeight: 900, marginBottom: "6px" },
  subtitle: { opacity: 0.9, marginBottom: "26px", lineHeight: 1.4 },

  progressCard: {
    textAlign: "left",
    background: "rgba(0,0,0,.35)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: "16px",
    padding: "18px 18px 16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
  },
  progressHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "10px",
  },
  progressLabel: { fontWeight: 900, opacity: 0.95 },
  badge: {
    fontSize: "12px",
    fontWeight: 900,
    padding: "6px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.18)",
    background: "rgba(0,0,0,.25)",
    whiteSpace: "nowrap",
  },
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
  progressMsg: { marginTop: "10px", opacity: 0.9, fontSize: "14px" },

  actions: {
    marginTop: "14px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  btnPrimary: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "0",
    fontWeight: 900,
    cursor: "pointer",
    background: "#f97316",
    color: "#111",
  },
  btnGhost: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.25)",
    fontWeight: 900,
    cursor: "pointer",
    background: "rgba(0,0,0,.25)",
    color: "#fff",
  },
  btnDanger: {
    padding: "10px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(255,80,80,.35)",
    fontWeight: 900,
    cursor: "pointer",
    background: "rgba(255,80,80,.12)",
    color: "#fff",
  },
  hint: { marginTop: "10px", fontSize: "12px", opacity: 0.8 },

  cards: {
    marginTop: "16px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    textAlign: "left",
  },
  card: {
    background: "rgba(0,0,0,.30)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: "16px",
    padding: "18px",
    backdropFilter: "blur(10px)",
  },
  cardTitle: { fontSize: "16px", fontWeight: 900, marginBottom: "6px" },
  cardText: { opacity: 0.9, lineHeight: 1.35, margin: 0 },
  check: { fontSize: "14px", marginLeft: "6px" },
};
