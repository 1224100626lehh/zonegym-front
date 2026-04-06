import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/secciones/Home.jsx";
import Classes from "./components/secciones/Classes.jsx";
import Horarios from "./components/secciones/Horarios.jsx";
import Paquetes from "./components/secciones/Paquetes.jsx";
import Reto from "./components/secciones/Reto.jsx";
import MiProgreso from "./components/secciones/Progreso.jsx";
import Testimonials from "./components/secciones/Testimonials.jsx";
import Contact from "./components/secciones/Contact.jsx";
import Login from "./components/secciones/auth/Login.jsx";
import ReservaForm from "./components/ReservaForm.jsx";
import AdminPanel from "./components/secciones/admin/AdminPanel.jsx";
import ProtectedMembershipRoute from "./components/ProtectedMembershipRoute.jsx";
import ComentariosSeguros from "./components/ComentariosSeguros.jsx";

export default function App() {
  const [retencion, setRetencion] = useState(0);
  const [ultimoMotivo, setUltimoMotivo] = useState("-");

  const navbarLinks = useMemo(
    () => [
      { label: "Inicio", to: "/" },
      { label: "Clases", to: "/classes" },
      { label: "Horarios", to: "/horarios" },
      { label: "Paquetes", to: "/paquetes" },
      { label: "Reto", to: "/reto" },
      { label: "Mi Progreso", to: "/progreso" },
      { label: "Testimonios", to: "/testimonials" },
      { label: "Contacto", to: "/contacto" },
      { label: "Feedback", to: "/comentarios" },
    ],
    [],
  );

  const sumarRetencion = (puntos, motivo) => {
    setRetencion((prev) => Math.min(100, prev + puntos));
    setUltimoMotivo(motivo || "-");
  };

  return (
    <>
      <Navbar navbarLinks={navbarLinks} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              onAccionInicio={sumarRetencion}
              retencion={retencion}
              ultimoMotivo={ultimoMotivo}
            />
          }
        />

        <Route
          path="/classes"
          element={<Classes onAccionInicio={sumarRetencion} />}
        />

        <Route path="/reservar/:claseId" element={<ReservaForm />} />
        <Route path="/horarios" element={<Horarios />} />
        <Route path="/paquetes" element={<Paquetes />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/comentarios" element={<ComentariosSeguros />} />

        <Route
          path="/reto"
          element={
            <ProtectedMembershipRoute>
              <Reto />
            </ProtectedMembershipRoute>
          }
        />

        <Route
          path="/progreso"
          element={
            <ProtectedMembershipRoute>
              <MiProgreso />
            </ProtectedMembershipRoute>
          }
        />
      </Routes>
    </>
  );
}
