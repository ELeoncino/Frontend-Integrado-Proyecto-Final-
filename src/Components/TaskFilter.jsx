import React, { useState } from "react";

function TaskFilter({ todos, onFilter }) {
  const [authorFilter, setAuthorFilter] = useState("");
  const [nameFilter, setNameFilter] = useState(""); // Filtro por nombre de la tarea
  const [showCompleted, setShowCompleted] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);

  const handleFilterChange = () => {
    let filtered = [...todos];

    // Filtro por tareas completadas
    if (showCompleted) {
      filtered = filtered.filter((todo) => todo.isCompleted);
    }

    // Filtro por tareas incompletas
    if (showIncomplete) {
      filtered = filtered.filter((todo) => !todo.isCompleted);
    }

    // Filtro por autor
    if (authorFilter.trim()) {
      filtered = filtered.filter((todo) =>
        todo.creator.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    // Filtro por nombre de la tarea
    if (nameFilter.trim()) {
      filtered = filtered.filter((todo) =>
        todo.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    onFilter(filtered);
  };

  return (
    <div className="filter-container">
      <h3>Buscador de Tareas</h3>
      <div className="filter-options">
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => {
              setShowCompleted(e.target.checked);
              handleFilterChange();
            }}
          />
          Completadas
        </label>
        <label>
          <input
            type="checkbox"
            checked={showIncomplete}
            onChange={(e) => {
              setShowIncomplete(e.target.checked);
              handleFilterChange();
            }}
          />
          Incompletas
        </label>
        <input
          type="text"
          placeholder="Filtrar por autor"
          value={authorFilter}
          onChange={(e) => {
            setAuthorFilter(e.target.value);
            handleFilterChange();
          }}
        />
        <input
          type="text"
          placeholder="Filtrar por nombre de tarea"
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value);
            handleFilterChange();
          }}
        />
      </div>
    </div>
  );
}

export default TaskFilter;
