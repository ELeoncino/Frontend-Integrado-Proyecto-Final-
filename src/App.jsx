import React, { useState, useEffect } from "react";
import TodoList from "./Components/TodoList";
import AddTodoForm from "./Components/AddTodoForm";
import LoginPage from "./Components/LoginPage";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [filters, setFilters] = useState({
    completed: null, // null = no filtrar, true = completadas, false = incompletas
    author: "",
    name: "",
  });

  const API_URL = "http://localhost:5000/api/tareas";

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
    fetchTodos();
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    setTodos([]);
  };

  const fetchTodos = async () => {
    if (!token) {
      setError("No se encontró un token válido. Inicia sesión nuevamente.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) handleLogout();
        throw new Error("Error al obtener las tareas.");
      }

      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar las tareas:", err.message);
      setError("Hubo un problema al cargar las tareas.");
    }
  };

  const handleCompletedFilter = (e) => {
    setFilters((prev) => ({
      ...prev,
      completed: e.target.checked ? true : null,
    }));
  };

  const handleIncompleteFilter = (e) => {
    setFilters((prev) => ({
      ...prev,
      completed: e.target.checked ? false : null,
    }));
  };

  const handleAuthorFilter = (e) => {
    setFilters((prev) => ({ ...prev, author: e.target.value }));
  };

  const handleNameFilter = (e) => {
    setFilters((prev) => ({ ...prev, name: e.target.value }));
  };

  const applyFilters = () => {
    let filteredTodos = [...todos];

    if (filters.completed !== null) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.isCompleted === filters.completed
      );
    }

    if (filters.author.trim()) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.creator.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    if (filters.name.trim()) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    return filteredTodos;
  };

  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  if (!token) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <p>Bienvenido, {localStorage.getItem("username") || "usuario"}</p>
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
      {error && <p className="error">{error}</p>}

      <AddTodoForm
        onAddTodo={async (newTodo) => {
          try {
            const response = await fetch(API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(newTodo),
            });

            if (!response.ok) {
              throw new Error("Error al agregar la tarea.");
            }

            const savedTodo = await response.json();
            setTodos([...todos, savedTodo]);
          } catch (error) {
            console.error("Error al agregar la tarea:", error.message);
          }
        }}
      />

      <div className="filter-container">
        <h3>Buscador de Tareas</h3>
        <div className="filter-options">
          <div className="checkboxes">
            <label>
              <input
                type="checkbox"
                onChange={handleCompletedFilter}
                checked={filters.completed === true}
              />
              Completadas
            </label>
            <label>
              <input
                type="checkbox"
                onChange={handleIncompleteFilter}
                checked={filters.completed === false}
              />
              Incompletas
            </label>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Filtrar por autor"
              onChange={handleAuthorFilter}
              value={filters.author}
            />
            <input
              type="text"
              placeholder="Filtrar por nombre de tarea"
              onChange={handleNameFilter}
              value={filters.name}
            />
          </div>
        </div>
      </div>

      <TodoList
        todos={applyFilters()}
        onToggle={async (id) => {
          const todoToToggle = todos.find((todo) => todo._id === id);
          const updatedTodo = {
            ...todoToToggle,
            isCompleted: !todoToToggle.isCompleted,
          };

          try {
            const response = await fetch(`${API_URL}/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(updatedTodo),
            });

            if (!response.ok) {
              throw new Error("Error al alternar el estado de completado.");
            }

            const savedTodo = await response.json();
            setTodos(todos.map((todo) => (todo._id === id ? savedTodo : todo)));
          } catch (error) {
            console.error(
              "Error al alternar el estado de completado:",
              error.message
            );
          }
        }}
        onDelete={async (id) => {
          try {
            const response = await fetch(`${API_URL}/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              throw new Error("Error al eliminar la tarea.");
            }

            setTodos(todos.filter((todo) => todo._id !== id));
          } catch (error) {
            console.error("Error al eliminar la tarea:", error.message);
          }
        }}
        onEdit={async (id) => {
          const todoToEdit = todos.find((todo) => todo._id === id);

          const newName =
            prompt("Editar nombre:", todoToEdit.name) || todoToEdit.name;
          const newDescription =
            prompt("Editar descripción:", todoToEdit.description) ||
            todoToEdit.description;
          const newCreator =
            prompt("Editar autor:", todoToEdit.creator) || todoToEdit.creator;

          const updatedTodo = {
            ...todoToEdit,
            name: newName,
            description: newDescription,
            creator: newCreator,
          };

          try {
            const response = await fetch(`${API_URL}/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(updatedTodo),
            });

            if (!response.ok) {
              throw new Error("Error al editar la tarea.");
            }

            const savedTodo = await response.json();
            setTodos(todos.map((todo) => (todo._id === id ? savedTodo : todo)));
          } catch (error) {
            console.error("Error al editar la tarea:", error.message);
          }
        }}
      />
    </div>
  );
}

export default App;
