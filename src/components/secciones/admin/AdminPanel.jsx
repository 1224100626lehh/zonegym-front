import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from '../../api'  // ← NUEVO

const API_URL = "http://localhost:5000";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!currentUser || currentUser.role !== "admin") {
      alert("Acceso solo para administrador");
      navigate("/");
      return;
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiFetch(`/api/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      alert("Error al obtener usuarios");
    }
  };

  const changeStatus = async (id, action) => {
    try {
      const response = await fetch(`${API_URL}/api/users${action}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      alert(data.message);
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar usuario");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 text-red-500">
          Panel de Administración
        </h1>
        <p className="text-gray-300 mb-8">
          Revisa solicitudes de membresía, comprobantes y activa usuarios.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full text-sm">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Correo</th>
                <th className="p-3 text-left">Paquete</th>
                <th className="p-3 text-left">Referencia</th>
                <th className="p-3 text-left">Comprobante</th>
                <th className="p-3 text-left">Mensaje</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((u) => u.role !== "admin")
                .map((user) => (
                  <tr key={user._id} className="border-t border-white/10">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.packageName || "-"}</td>
                    <td className="p-3">{user.paymentReference || "-"}</td>
                    <td className="p-3">{user.paymentProof || "-"}</td>
                    <td className="p-3">{user.messageForAdmin || "-"}</td>
                    <td className="p-3">
                      {user.membershipStatus === "active" ? (
                        <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-bold">
                          Activo
                        </span>
                      ) : user.membershipStatus === "pending" ? (
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                          Pendiente
                        </span>
                      ) : (
                        <span className="bg-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="p-3 flex gap-2 flex-wrap">
                      <button
                        onClick={() => changeStatus(user._id, "activate")}
                        className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg font-bold"
                      >
                        Activar
                      </button>
                      <button
                        onClick={() => changeStatus(user._id, "deactivate")}
                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg font-bold"
                      >
                        Desactivar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
