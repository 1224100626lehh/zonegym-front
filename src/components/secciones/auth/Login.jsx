import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Login.css";
import apiFetch from '../../api'  // ← NUEVO

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    packageName: "",
    paymentReference: "",
    paymentProof: "",
    messageForAdmin: "",
  });

  useEffect(() => {
    const mode = searchParams.get("mode");
    const selectedPackage = searchParams.get("package");

    if (mode === "register") {
      setIsRegister(true);
    }

    if (selectedPackage) {
      setFormData((prev) => ({
        ...prev,
        packageName: selectedPackage,
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      packageName: "",
      paymentReference: "",
      paymentProof: "",
      messageForAdmin: "",
    });
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister ? "register" : "login";

    const bodyData = isRegister
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          packageName: formData.packageName,
          paymentReference: formData.paymentReference,
          paymentProof: formData.paymentProof,
          messageForAdmin: formData.messageForAdmin,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await apiFetch(`/api/users/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Ocurrió un error");
        return;
      }

      if (isRegister) {
        alert(
          "Solicitud enviada correctamente. Tu cuenta queda pendiente de activación hasta que el administrador valide tu pago.",
        );
        resetForm();
        setIsRegister(false);
        navigate("/login");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      //alert(data.message || `Bienvenido, ${data.name}`);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Solicitar membresía" : "Iniciar Sesión"}</h2>

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {isRegister && (
          <>
            <input
              type="text"
              name="packageName"
              placeholder="Paquete o membresía"
              value={formData.packageName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="paymentReference"
              placeholder="Referencia de pago"
              value={formData.paymentReference}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="paymentProof"
              placeholder="Link, folio o nombre del comprobante"
              value={formData.paymentProof}
              onChange={handleChange}
              required
            />

            <textarea
              name="messageForAdmin"
              placeholder="Mensaje para el administrador"
              value={formData.messageForAdmin}
              onChange={handleChange}
              rows="4"
              required
              style={{
                marginBottom: "18px",
                padding: "12px",
                borderRadius: "8px",
                border: "2px solid #333",
                backgroundColor: "#1f1f1f",
                color: "white",
                fontSize: "14px",
                width: "100%",
                resize: "vertical",
              }}
            />
          </>
        )}

        <button type="submit">
          {isRegister ? "Enviar comprobante y solicitar acceso" : "Entrar"}
        </button>

        <p className="toggle-text">
          {isRegister
            ? "¿Ya tienes cuenta activa?"
            : "¿Aún no tienes membresía?"}
          <span
            onClick={toggleMode}
            style={{ cursor: "pointer", marginLeft: "6px" }}
          >
            {isRegister ? "Inicia sesión" : "Solicitar membresía"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
