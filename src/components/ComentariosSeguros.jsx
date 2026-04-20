import { useState } from 'react'

function ComentariosSeguros() {
  const [texto, setTexto] = useState('');
  const [comentario, setComentario] = useState('');
  const [modoInseguro, setModoInseguro] = useState(false);

  const enviarComentario = async () => {
    if (!texto.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto })
      });
      const data = await res.json();
      setComentario(data.comentario);
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Sistema de Comentarios Seguro</h2>
      <p style={{ color: '#666' }}>
        Prueba escribiendo: <code>&lt;img src=x onerror=alert('XSS')&gt;</code>
      </p>

      <textarea
        rows={4}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <br />
      <button
        onClick={enviarComentario}
        style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}
      >
        Enviar
      </button>

      {comentario && (
        <div style={{ marginTop: '1.5rem' }}>
          <h4>Resultado:</h4>

          {/* MODO SEGURO */}
          {!modoInseguro && (
            <div style={{
              background: '#e8f5e9',
              border: '1px solid #a5d6a7',
              padding: '1rem',
              borderRadius: '6px'
            }}>
              <strong>✅ Modo Seguro</strong> — React escapa el HTML automáticamente:
              <div style={{ marginTop: '0.5rem' }}>{comentario}</div>
            </div>
          )}

          {/* MODO INSEGURO — Reto del ejercicio */}
          {modoInseguro && (
            <div style={{
              background: '#ffebee',
              border: '1px solid #ef9a9a',
              padding: '1rem',
              borderRadius: '6px'
            }}>
              <strong>⚠️ Modo Inseguro</strong> — dangerouslySetInnerHTML ejecuta el HTML:
              <div
                style={{ marginTop: '0.5rem' }}
                dangerouslySetInnerHTML={{ __html: comentario }}
              />
            </div>
          )}

          <button
            onClick={() => setModoInseguro(!modoInseguro)}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: modoInseguro ? '#4caf50' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {modoInseguro
              ? '✅ Cambiar a modo SEGURO'
              : '⚠️ Activar modo INSEGURO'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ComentariosSeguros;