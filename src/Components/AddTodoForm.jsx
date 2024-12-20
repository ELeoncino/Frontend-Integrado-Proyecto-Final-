import React, { useState } from "react";
import PropTypes from "prop-types";

// Componente AddTodoForm
const AddTodoForm = ({ onAddTodo }) => {
  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!name.trim() || !description.trim() || !creator.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Llamar a la función de agregar tarea
    onAddTodo({ name, description, creator });

    // Limpiar los campos del formulario
    setName("");
    setDescription("");
    setCreator("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      {/* Campo para el nombre de la tarea */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la tarea"
        aria-label="Nombre de la tarea"
        required
      />

      {/* Campo para la descripción */}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        aria-label="Descripción"
        required
      />

      {/* Campo para el autor */}
      <input
        type="text"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        placeholder="Autor"
        aria-label="Autor"
        required
      />

      {/* Botón para enviar el formulario */}
      <button type="submit" className="add-button">
        Añadir
      </button>
    </form>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
