import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const packagesData = [
  {
    id: "mensual",
    title: "Mensual",
    price: 700,
    oldPrice: 800,
    people: "1 persona",
    description:
      "Ideal para construir hábito y mantener constancia con acceso general al gym.",
    plus: "Acceso general + opción de reservar clases.",
    buttonText: "Elegir mensual",
    badge: "Ahorra $100",
  },
  {
    id: "estudiante",
    title: "Estudiante",
    price: 500,
    oldPrice: 700,
    people: "1 persona",
    description:
      "Pensado para horarios flexibles y para que entrenar sí sea accesible.",
    plus: "Precio especial para estudiantes activos.",
    buttonText: "Elegir estudiante",
    badge: "Ahorra $200",
  },
  {
    id: "pareja",
    title: "Pareja",
    price: 900,
    oldPrice: 1400,
    people: "2 personas",
    description:
      "Entrenar acompañado ayuda a no abandonar y hace más fácil mantener la rutina.",
    plus: "Ideal para dos personas con una sola promoción.",
    buttonText: "Elegir pareja",
    badge: "Ahorra $500",
  },
  {
    id: "familiar",
    title: "Familiar",
    price: 1750,
    oldPrice: 4900,
    people: "Hasta 7 personas",
    description:
      "Para familias que quieren salud, disciplina y ahorro en un solo plan.",
    plus: "Plan familiar para hasta 7 integrantes.",
    buttonText: "Elegir familiar",
    badge: "Ahorra $3150",
  },
];

export default function Paquetes() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const goToRegisterWithPackage = (pkg) => {
    navigate(`/login?mode=register&package=${encodeURIComponent(pkg.title)}`);
  };

  const renovarMensualidad = () => {
    const phoneNumber = "5256695540577"; // CAMBIA ESTE NÚMERO POR EL REAL
    const userName = user?.name ? user.name : "cliente";
    const message = encodeURIComponent(
      `Hola, soy ${userName} y quiero renovar mi mensualidad en ZoneGym. ¿Me pueden apoyar con el proceso de pago y validación?`,
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <motion.section
      style={styles.section}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div style={styles.overlay} />

      <motion.div
        style={styles.container}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45 }}
      >
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.45 }}
        >
          Membresías simples
        </motion.h1>

        <motion.p
          style={styles.subtitle}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
        >
          Entre más fácil sea seguir, más probable es que renueves. Elige el
          plan que mejor se adapte a ti.
        </motion.p>

        <motion.div
          style={styles.grid}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.25,
              },
            },
          }}
        >
          {packagesData.map((pkg) => (
            <motion.div
              key={pkg.id}
              style={styles.card}
              variants={{
                hidden: { opacity: 0, y: 22, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{
                y: -8,
                scale: 1.015,
                borderColor: "rgba(255,122,10,.28)",
                boxShadow: "0 0 28px rgba(255,122,10,.12)",
              }}
              transition={{ duration: 0.22 }}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{pkg.title}</h3>
                <span style={styles.badge}>{pkg.badge}</span>
              </div>

              <div style={styles.people}>{pkg.people}</div>

              <div style={styles.priceWrap}>
                <span style={styles.oldPrice}>${pkg.oldPrice}</span>
                <span style={styles.price}>${pkg.price}</span>
                <span style={styles.priceMonth}>/ mes</span>
              </div>

              <p style={styles.description}>{pkg.description}</p>

              <div style={styles.plusBox}>
                <span style={styles.plusLabel}>Incluye</span>
                <p style={styles.plusText}>{pkg.plus}</p>
              </div>

              <motion.button
                style={styles.chooseBtn}
                onClick={() => goToRegisterWithPackage(pkg)}
                whileHover={{
                  scale: 1.04,
                  y: -2,
                  boxShadow: "0 0 24px rgba(255,122,10,.25)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {pkg.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          style={styles.bottomActions}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
        >
          <motion.button
            style={styles.renewBtn}
            onClick={renovarMensualidad}
            whileHover={{
              scale: 1.04,
              y: -2,
              boxShadow: "0 0 26px rgba(255,122,10,.28)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Renovar mensualidad
          </motion.button>

          <motion.button
            style={styles.secondaryBtn}
            onClick={() => navigate("/login?mode=register")}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Solicitar membresía
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

const styles = {
  section: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    padding: "110px 24px 70px",
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
      "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.80) 45%, rgba(0,0,0,.92) 100%)",
  },
  container: {
    position: "relative",
    zIndex: 2,
    maxWidth: "1500px",
    margin: "0 auto",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: "64px",
    lineHeight: 1.02,
    fontWeight: 900,
    margin: 0,
  },
  subtitle: {
    textAlign: "center",
    fontSize: "18px",
    opacity: 0.92,
    margin: "18px auto 30px",
    maxWidth: "880px",
    lineHeight: 1.5,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "rgba(0,0,0,.45)",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: "24px",
    padding: "24px",
    backdropFilter: "blur(10px)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "34px",
    fontWeight: 900,
    margin: 0,
  },
  badge: {
    fontSize: "13px",
    fontWeight: 800,
    padding: "8px 12px",
    borderRadius: "999px",
    background: "rgba(255,122,10,.14)",
    color: "#ffb26b",
    border: "1px solid rgba(255,122,10,.28)",
    whiteSpace: "nowrap",
  },
  people: {
    fontSize: "15px",
    opacity: 0.8,
    marginBottom: "14px",
  },
  priceWrap: {
    display: "flex",
    alignItems: "flex-end",
    gap: "10px",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  oldPrice: {
    fontSize: "20px",
    color: "rgba(255,255,255,.45)",
    textDecoration: "line-through",
    fontWeight: 700,
  },
  price: {
    fontSize: "46px",
    fontWeight: 900,
    color: "#ff7a0a",
    lineHeight: 1,
  },
  priceMonth: {
    fontSize: "16px",
    opacity: 0.85,
    marginBottom: "6px",
  },
  description: {
    fontSize: "17px",
    lineHeight: 1.55,
    opacity: 0.92,
    minHeight: "95px",
    marginBottom: "16px",
  },
  plusBox: {
    border: "1px solid rgba(255,255,255,.10)",
    background: "rgba(255,255,255,.04)",
    borderRadius: "16px",
    padding: "14px",
    marginBottom: "18px",
  },
  plusLabel: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: 900,
    marginBottom: "8px",
    color: "#ffb26b",
  },
  plusText: {
    margin: 0,
    fontSize: "15px",
    lineHeight: 1.5,
    opacity: 0.9,
  },
  chooseBtn: {
    width: "100%",
    padding: "16px 20px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(90deg, #ff7a0a 0%, #ff8c1a 100%)",
    color: "#111",
    fontWeight: 900,
    fontSize: "18px",
    cursor: "pointer",
  },
  bottomActions: {
    marginTop: "28px",
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  renewBtn: {
    padding: "18px 28px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(90deg, #ff7a0a 0%, #ff8c1a 100%)",
    color: "#111",
    fontWeight: 900,
    fontSize: "18px",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "18px 28px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.16)",
    background: "rgba(255,255,255,.08)",
    color: "#fff",
    fontWeight: 900,
    fontSize: "18px",
    cursor: "pointer",
  },
};
