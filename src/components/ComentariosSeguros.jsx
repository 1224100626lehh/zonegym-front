import React, { useState } from 'react';

const ComentariosSeguros = () => {
  const [input, setInput] = useState('');
  const [comentarioRecibido, setComentarioRecibido] = useState('');

  const enviarAlBackend = async (e) => {
    e.preventDefault();
    
    // Cambia esta URL por la de tu backend en Railway si ya está desplegado
    // Ej: https://tu-backend-railway.app/api/comentarios
    const API_URL = "http://localhost:5000/api/comentarios";

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: input })
      });
      const data = await response.json();
      setComentarioRecibido(data.comentario);
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-gray-900 text-white rounded-lg shadow-xl border border-orange-500">
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Feedback ZONEGYM</h2>
      
      <form onSubmit={enviarAlBackend} className="space-y-4">
        <textarea
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:border-orange-500 focus:outline-none text-white"
          rows="4"
          placeholder="Escribe tu comentario sobre el gym..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Enviar Comentario
        </button>
      </form>

      {comentarioRecibido && (
        <div className="mt-8 p-4 bg-gray-800 rounded border-l-4 border-green-500">
          <h3 className="text-sm uppercase text-gray-400 mb-2">Comentario procesado por el servidor:</h3>
          
          {/* MODO SEGURO (Cumple la especificación del profesor) */}
          <p className="text-lg">{comentarioRecibido}</p>

          {/* RETO DE SEGURIDAD (Para la demostración)
              Descomenta la línea de abajo para mostrarle al profesor cómo NO hacerlo.
              Pruébalo con: <img src=x onerror=alert('XSS')>
          */}
          {/* <div dangerouslySetInnerHTML={{ __html: comentarioRecibido }} /> */}
        </div>
      )}
    </div>
  );
};

export default ComentariosSeguros;