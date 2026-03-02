import React from "react";
import { FaWhatsapp, FaMapMarkerAlt, FaClock } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const Contact = () => {
  // WhatsApp real (MX). Si quieres forzar +52, sería 5214281317534
  const WHATSAPP_LINK =
    "https://wa.me/524281317534?text=Hola%20ZoneGym%20👋%20Quiero%20informes%20por%20favor";

  const MAP_LINK = "https://maps.app.goo.gl/2jXWwymPXQQCtvgM6?g_st=ic";

  // Fondo externo (NO necesitas carpeta img)
  const BG =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=80";

  // Animaciones
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

  return (
    <section
      style={{
        backgroundImage: `url("${BG}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-[calc(100vh-80px)]"
    >
      {/* overlay oscuro */}
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
              Contacto y ubicación
            </motion.h1>

            <motion.p
              variants={item}
              className="text-gray-200 mt-3 text-sm md:text-base"
            >
              ¿Listo para tu mes? Escríbenos y te recomendamos horarios según tu
              rutina.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
          >
            {/* WhatsApp */}
            <motion.div
              variants={item}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-2xl p-7 md:p-8 bg-white/10 backdrop-blur-md border border-white/15 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-white text-2xl" />
                <h3 className="text-white font-extrabold text-xl">WhatsApp</h3>
              </div>

              <p className="text-gray-200 mt-3 text-sm leading-relaxed">
                Respuestas rápidas para dudas, horarios y renovación.
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-6 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg transition"
              >
                Enviar mensaje
              </a>
            </motion.div>

            {/* Dirección */}
            <motion.div
              variants={item}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-2xl p-7 md:p-8 bg-white/10 backdrop-blur-md border border-white/15 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-white text-2xl" />
                <h3 className="text-white font-extrabold text-xl">Dirección</h3>
              </div>

              <p className="text-gray-200 mt-3 text-sm leading-relaxed">
                ZoneGym, Dolores Hidalgo. Toca para abrir el mapa.
              </p>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-6 border border-white/25 hover:border-white/40 text-white font-bold px-5 py-2.5 rounded-lg transition"
              >
                Ver mapa
              </a>
            </motion.div>

            {/* Horarios */}
            <motion.div
              variants={item}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-2xl p-7 md:p-8 bg-white/10 backdrop-blur-md border border-white/15 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <FaClock className="text-white text-2xl" />
                <h3 className="text-white font-extrabold text-xl">
                  Horario del gym
                </h3>
              </div>

              <div className="text-gray-200 mt-3 text-sm leading-relaxed space-y-1">
                <p>
                  <span className="font-bold text-white">Lun–Vie:</span> 6:00 AM
                  – 10:00 PM
                </p>
                <p>
                  <span className="font-bold text-white">Sáb:</span> 8:00 AM –
                  2:00 PM
                </p>
                <p>
                  <span className="font-bold text-white">Dom:</span> Cerrado /
                  eventos especiales
                </p>
              </div>
            </motion.div>
          </motion.div>

          <div className="h-10" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
