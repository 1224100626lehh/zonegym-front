// src/components/secciones/Reto.jsx
import React, { useEffect, useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

export default function Reto() {
  // ✅ Fondo (sin assets para evitar "Failed to resolve import")
  const gymBg =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2400&auto=format&fit=crop";

  // Reto: 12 entrenamientos/mes (como tu pantalla)
  const OBJETIVO_MES = 12;

  // Helpers mes (YYYY-MM)
  const monthKey = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}`;
  }, []);

  const storageKey = useMemo(() => `zg_reto_checkins_${monthKey}`, [monthKey]);
  const storageRuleKey = useMemo(() => `zg_regla_${monthKey}`, [monthKey]);

  const [checkins, setCheckins] = useState([]); // array de "YYYY-MM-DD"
  const [toast, setToast] = useState("");
  const [reglaActiva, setReglaActiva] = useState(false);
  const [mostrarRetos, setMostrarRetos] = useState(false);
  const [retosCompletados, setRetosCompletados] = useState([]);

  const todayISO = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const hoy = useMemo(() => todayISO(), []);
  const yaHiceCheckinHoy = useMemo(
    () => checkins.includes(hoy),
    [checkins, hoy],
  );
  const retosFaciles = [
  { id: 1, texto: "10 minutos de cardio" },
  { id: 2, texto: "15 sentadillas" },
  { id: 3, texto: "20 abdominales" },
  { id: 4, texto: "Beber 2 litros de agua" },
  { id: 5, texto: "Entrenar 30 minutos" }
];

  // Cargar del localStorage (una vez por mes)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setCheckins(parsed);
      else setCheckins([]);
    } catch {
      setCheckins([]);
    }

    try {
      const rawRule = localStorage.getItem(storageRuleKey);
      setReglaActiva(rawRule === "1");
    } catch {
      setReglaActiva(false);
    }
  }, [storageKey, storageRuleKey]);

  // Guardar al cambiar
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checkins));
  }, [checkins, storageKey]);

  useEffect(() => {
    localStorage.setItem(storageRuleKey, reglaActiva ? "1" : "0");
  }, [reglaActiva, storageRuleKey]);

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(window.__zg_toast);
    window.__zg_toast = window.setTimeout(() => setToast(""), 2200);
  };

  // Progreso
  const completados = checkins.length;
  const pct = Math.min(100, Math.round((completados / OBJETIVO_MES) * 100));
  const faltan = Math.max(0, OBJETIVO_MES - completados);

  // ======= Funcionalidad de botones (demo listo para backend) =======
  const onCheckin = () => {
    if (yaHiceCheckinHoy) {
      showToast("✅ Ya hiciste tu check-in de hoy");
      return;
    }
    const next = [...checkins, hoy];
    setCheckins(next);
    showToast("🔥 Check-in registrado (demo)");

    // Backend futuro:
    // POST /api/reto/checkin { date: hoy, month: monthKey }
  };

  const onDescuento = () => {
    if (pct < 100) {
      showToast("🎯 Completa el reto para desbloquear el beneficio (demo)");
      return;
    }
    showToast("🎁 Beneficio aplicado: descuento/regalo (demo)");
    // Backend futuro:
    // POST /api/reto/beneficio { month: monthKey }
  };

  const onRegla = () => {
    setReglaActiva((v) => !v);
    showToast(
      !reglaActiva ? "🛡️ Regla activada" : "🛡️ Regla desactivada)",
    );
    // Backend futuro:
    // POST /api/reto/regla { active: !reglaActiva, month: monthKey }
  };
  const completarReto = (id) => {

  if (retosCompletados.includes(id)) {
    showToast("Este reto ya está completado");
    return;
  }

  const nuevos = [...retosCompletados, id];
  setRetosCompletados(nuevos);

  showToast("🔥 Reto completado");

  // sumar progreso al reto mensual
  if (completados < OBJETIVO_MES) {
    setCheckins([...checkins, `reto-${id}-${Date.now()}`]);
  }

};

  // ======= Animaciones =======
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
    hidden: { opacity: 0, y: 16, scale: 0.985 },
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
        key="reto"
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
          {/* Título */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
             marginTop: "20px",
            }}
          >
           <FaFire color="orange" size={35} />
           <span style={{ color: "white", fontSize: "29px" }}>
            ¡𝐍𝐨 𝐝𝐞𝐣𝐞𝐬 𝐪𝐮𝐞 𝐭𝐮 𝐫𝐚𝐜𝐡𝐚 𝐬𝐞 𝐚𝐩𝐚𝐠𝐞, 𝐜𝐨𝐦𝐨 𝐬𝐞 𝐚𝐩𝐚𝐠𝐨 𝐭𝐮 𝐫𝐞𝐥𝐚𝐜𝐢ó𝐧!
           </span>
          </motion.div>
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
                fontSize: "clamp(26px, 3.6vw, 40px)",
                marginBottom: 8,
                fontWeight: 900,
              }}
            >
              Reto del mes
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,.80)",
                textAlign: "center",
                marginBottom: 18,
              }}
            >
              Objetivo: {OBJETIVO_MES} entrenamientos al mes. Cumplirlo aumenta
              la probabilidad de renovación.
            </p>
          </motion.div>

          {/* Panel progreso */}
          <motion.div
            variants={card}
            custom={1}
            initial="hidden"
            animate="show"
            style={{
              background: "rgba(255,255,255,.07)",
              border: "1px solid rgba(255,255,255,.16)",
              borderRadius: 14,
              padding: 14,
              backdropFilter: "blur(10px)",
              boxShadow: "0 18px 45px rgba(0,0,0,.35)",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div style={{ color: "rgba(255,255,255,.92)", fontWeight: 900 }}>
                Progreso del mes
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  color: "rgba(255,255,255,.92)",
                  background: "rgba(255,90,0,.20)",
                  border: "1px solid rgba(255,90,0,.30)",
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                {completados}/{OBJETIVO_MES} entrenamientos
              </div>
            </div>

            <div style={{ marginTop: 10, position: "relative" }}>
              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: "rgba(255,255,255,.10)",
                  border: "1px solid rgba(255,255,255,.14)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: "linear-gradient(90deg, #ff7a18, #ff3d00)",
                    borderRadius: 999,
                    transition: "width .35s ease",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <span
                  style={{
                    color: "rgba(255,255,255,.78)",
                    fontWeight: 800,
                    fontSize: 13,
                  }}
                >
                  {pct}% renovación
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,.78)",
                    fontWeight: 800,
                    fontSize: 13,
                  }}
                >
                  {faltan === 0
                    ? "✅ Reto completado"
                    : `Te faltan ${faltan} para completar`}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cards de acciones (como tu diseño) */}
          {/* Retos rápidos */}
<motion.div
  variants={card}
  custom={5}
  initial="hidden"
  animate="show"
  whileHover={{ y: -4 }}
  style={cardStyle}
>

<h3 style={h3}>Retos rápidos</h3>

<p style={p}>
Completa pequeños retos para sumar progreso.
</p>

<motion.button
whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.97 }}
onClick={() => setMostrarRetos(!mostrarRetos)}
style={btnPrimary}
>

{mostrarRetos ? "Ocultar retos" : "Ver retos"}

</motion.button>

{mostrarRetos && (

<div style={{marginTop:12}}>

{retosFaciles.map((reto)=>{

const completado = retosCompletados.includes(reto.id);

return(

<div
key={reto.id}
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:8,
background:"rgba(255,255,255,.05)",
padding:"8px 10px",
borderRadius:8
}}
>

<span style={{color:"white"}}>{reto.texto}</span>

<button
onClick={()=>completarReto(reto.id)}
disabled={completado}
style={{
border:"none",
padding:"6px 12px",
borderRadius:20,
background: completado ? "gray" : "#ff3d00",
color:"white",
fontWeight:800,
cursor: completado ? "not-allowed" : "pointer"
}}
>

{completado ? "✓" : "Completar"}

</button>

</div>

)

})}

</div>

)}

</motion.div>
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            {/* Check-in */}
            <motion.div
              variants={card}
              custom={2}
              initial="hidden"
              animate="show"
              whileHover={{ y: -4 }}
              style={cardStyle}
            >
              <h3 style={h3}>Check-in</h3>
              <p style={p}>
                Marca tu asistencia y suma constancia. Máximo 1 check-in
                por día.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCheckin}
                style={{
                  ...btnPrimary,
                  opacity: yaHiceCheckinHoy ? 0.65 : 1,
                  cursor: yaHiceCheckinHoy ? "not-allowed" : "pointer",
                }}
                disabled={yaHiceCheckinHoy}
              >
                {yaHiceCheckinHoy ? "Check-in listo ✅" : "Hacer check-in"}
              </motion.button>

              <div style={miniNote}>
                Hoy: <b>{hoy}</b>
              </div>
            </motion.div>

            {/* Beneficio */}
            <motion.div
              variants={card}
              custom={3}
              initial="hidden"
              animate="show"
              whileHover={{ y: -4 }}
              style={cardStyle}
            >
              <h3 style={h3}>Beneficio</h3>
              <p style={p}>
                Completa el reto y obtén ventaja al renovar.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onDescuento}
                style={{
                  ...btnGhost,
                  border:
                    pct >= 100
                      ? "1px solid rgba(255,90,0,.55)"
                      : "1px solid rgba(255,255,255,.22)",
                  background:
                    pct >= 100 ? "rgba(255,90,0,.12)" : "rgba(255,255,255,.06)",
                }}
              >
                Descuento / regalo
              </motion.button>

              <div style={miniNote}>
                {pct >= 100
                  ? "🎉 Beneficio desbloqueado"
                  : "Bloqueado hasta completar"}
              </div>
            </motion.div>

            {/* Regla */}
            <motion.div
              variants={card}
              custom={4}
              initial="hidden"
              animate="show"
              whileHover={{ y: -4 }}
              style={cardStyle}
            >
              <h3 style={h3}>Plan semanal</h3>
              <p style={p}>
                3 días fijos &gt; 7 días caóticos. La disciplina se agenda.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onRegla}
                style={{
                  ...btnGhost,
                  border: reglaActiva
                    ? "1px solid rgba(255,90,0,.55)"
                    : "1px solid rgba(255,255,255,.22)",
                  background: reglaActiva
                    ? "rgba(255,90,0,.12)"
                    : "rgba(255,255,255,.06)",
                }}
              >
                {reglaActiva ? "Regla activa ✅" : "Regla: no fallar dos"}
              </motion.button>

              <div style={miniNote}>
                {reglaActiva
                  ? "Modo disciplina: activado"
                  : "Actívala para reforzar constancia"}
              </div>
            </motion.div>
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

/* ===== estilos inline (para copiar/pegar sin CSS extra) ===== */
const cardStyle = {
  background: "rgba(255,255,255,.07)",
  border: "1px solid rgba(255,255,255,.16)",
  borderRadius: 14,
  padding: 14,
  backdropFilter: "blur(10px)",
  boxShadow: "0 18px 45px rgba(0,0,0,.35)",
};

const h3 = {
  margin: 0,
  color: "white",
  fontWeight: 900,
};

const p = {
  color: "rgba(255,255,255,.78)",
  margin: "10px 0 12px",
  lineHeight: 1.35,
};

const miniNote = {
  marginTop: 10,
  color: "rgba(255,255,255,.70)",
  fontWeight: 800,
  fontSize: 12,
};

const btnPrimary = {
  width: "100%",
  border: "none",
  padding: "10px 16px",
  borderRadius: 999,
  fontWeight: 900,
  color: "white",
  background: "linear-gradient(90deg, #ff7a18, #ff3d00)",
  boxShadow: "0 10px 24px rgba(255,90,0,.25)",
};

const btnGhost = {
  width: "100%",
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
