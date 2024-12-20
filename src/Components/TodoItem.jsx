import React from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className={`task-item ${todo.isCompleted ? "completed" : ""}`}>
      {/* Checkbox para marcar la tarea como completada */}
      <input
        type="checkbox"
        checked={!!todo.isCompleted} // Asegurar que sea booleano
        onChange={() => onToggle(todo._id)} // Llamar a la función de alternar
      />

      {/* Contenido de la tarea */}
      <div className="text-content">
        <span className="name">{todo.name}</span>
        <p className="description">{todo.description}</p>
        <span className="creator">
          Creado por: <span className="creator-name">{todo.creator}</span>
        </span>
      </div>

      {/* Botones de acción */}
      <div className="buttons">
        <button className="edit-button" onClick={() => onEdit(todo._id)}>
          Editar
        </button>
        <button className="delete-button" onClick={() => onDelete(todo._id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
