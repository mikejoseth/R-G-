import React, { useReducer, useState, useEffect } from 'react';
import '../styles/admin.css';

function reducer(tareas, accion) {
  switch (accion.tipo) {
    case 'agregar':
      return [
        ...tareas, 
        { 
          id: Date.now(), 
          texto: accion.texto, 
          completada: false,
          fechaCreacion: new Date().toLocaleString() // Guardar la fecha y hora de creación
        }
      ];
    case 'editar':
      return tareas.map(tarea =>
        tarea.id === accion.id ? { ...tarea, texto: accion.texto } : tarea
      );
    case 'completar':
      return tareas.map(tarea =>
        tarea.id === accion.id ? { 
          ...tarea, 
          completada: !tarea.completada,
          fechaCompletado: !tarea.completada ? new Date().toLocaleString() : tarea.fechaCompletado // Guardar la fecha y hora de completado
        } : tarea
      );
    case 'eliminar':
      return tareas.filter(tarea => tarea.id !== accion.id);
    default:
      return tareas;
  }
}

function App() {
  const [tareas, dispatch] = useReducer(reducer, [], () => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  const [texto, setTexto] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(() => {
    return localStorage.getItem('welcomeBackgroundImage') || '';
  });

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBackgroundImage(reader.result);
      localStorage.setItem('welcomeBackgroundImage', reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const agregarTarea = texto => {
    dispatch({ tipo: 'agregar', texto });
  };

  const editarTarea = (id, texto) => {
    dispatch({ tipo: 'editar', id, texto });
    setEditandoId(null);
  };

  const completarTarea = id => {
    dispatch({ tipo: 'completar', id });
  };

  const eliminarTarea = id => {
    dispatch({ tipo: 'eliminar', id });
  };

  const iniciarEdicion = tarea => {
    setEditandoId(tarea.id);
    setTexto(tarea.texto);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editandoId) {
      editarTarea(editandoId, texto);
    } else {
      agregarTarea(texto);
    }
    setTexto('');
  };

  const tareasCompletadas = tareas.filter(tarea => tarea.completada);

  return (
    <div className="App">
      <div 
        id="welcomeAdminContainer" 
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <p id="welcomeAdminText">Bienvenido Administrador</p>
        <input type="file" onChange={handleImageChange} />
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Añade una nueva tarea"
            className="task-input"
          />
          <button type="submit" className="task-button">{editandoId ? 'Guardar Cambios' : 'Agregar'}</button>
        </form>
        <div className="task-list">
          {tareas.map(tarea => (
            <div
              key={tarea.id}
              className={`task-item ${tarea.completada ? 'completada' : ''}`}
            >
              <span className="task-text" onClick={() => completarTarea(tarea.id)}>
                {tarea.texto}
              </span>
              <div>
                <small>Creada: {tarea.fechaCreacion}</small>
                {tarea.completada && <small>Completada: {tarea.fechaCompletado}</small>}
              </div>
              <button onClick={() => iniciarEdicion(tarea)} className="task-edit-btn">Editar</button>
              <button onClick={() => eliminarTarea(tarea.id)} className="task-delete-btn">Eliminar</button>
            </div>
          ))}
        </div>
        <div className="completed-tasks">
        <p style={{ fontSize: '30px', color: 'white' }} className="completed-task-text">Tareas Completadas</p>

          <ul className="completed-tasks-list">
            {tareasCompletadas.map(tarea => (
              <li key={tarea.id} className="completed-task-item">
                <span className="completed-task-text">{tarea.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
