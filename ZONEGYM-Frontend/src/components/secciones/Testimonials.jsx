import React from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const Testimonials = () => {
  // Fondo externo (NO necesitas carpeta img)
  const BG =
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2400&q=80";

  const container = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, duration: 0.45 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18, scale: 0.985 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  };

  const testimonios = [
    {
      frase: "“Ahora sí soy constante”",
      texto: "Me funcionó elegir 3 días fijos. Ya no lo pienso, solo vengo.",
      tag: "Estudiante",
    },
    {
      frase: "“El reto me empuja”",
      texto: "Ver mi avance me motivó. Esta vez sí termino y renuevo.",
      tag: "Trabajador",
    },
    {
      frase: "“Me siento mejor”",
      texto: "Yoga y movilidad me ayudaron. Regreso porque me hace bien.",
      tag: "Adulto mayor",
    },
  ];

  return (
    <section
      style={{
        backgroundImage: `url("${BG}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-[calc(100vh-80px)]"
    >
      {/* overlay */}
      <div className="min-h-[calc(100vh-80px)] pt-28 pb-16 bg-black/60">
        <div className="container mx-auto px-6">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              variants={item}
              className="text-white text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow"
            >
              Nuestros Testimonios
            </motion.h1>

            <motion.p variants={item} className="text-gray-200 mt-3 text-sm">
              La gente renueva cuando siente resultados y se siente acompañada.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonios.map((t, idx) => (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-2xl p-7 md:p-8 bg-white/10 backdrop-blur-md border border-white/15 shadow-xl"
              >
                <h3 className="text-white font-extrabold text-xl">{t.frase}</h3>
                <p className="text-gray-200 mt-3 text-sm leading-relaxed">
                  {t.texto}
                </p>

                <span className="inline-flex mt-6 bg-red-600 text-white font-bold px-4 py-1.5 rounded-full text-xs">
                  {t.tag}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <div className="h-10" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
